import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PORTFOLIO_ASSISTANT_SYSTEM_PROMPT } from "./systemPrompt";

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";
const MAX_CONTEXT_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 8000;
const MAX_BODY_BYTES = 120_000;

type Role = "user" | "assistant";

type IncomingMessage = {
  role: Role;
  content: string;
};

type AnthropicContentBlock = { type: string; text?: string };

type AnthropicMessageResponse = {
  content?: AnthropicContentBlock[];
  error?: { message?: string; type?: string };
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function parseBody(req: VercelRequest): unknown {
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return req.body;
}

function validateMessages(raw: unknown): IncomingMessage[] | null {
  if (!Array.isArray(raw)) return null;
  const out: IncomingMessage[] = [];
  for (const item of raw) {
    if (!isRecord(item)) return null;
    const role = item.role;
    const content = item.content;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    const trimmed = content.trim();
    if (!trimmed) return null;
    if (trimmed.length > MAX_MESSAGE_CHARS) return null;
    out.push({ role, content: trimmed });
  }
  return out;
}

/** Anthropic requires the sequence to start with a user message. */
function normalizeForModel(messages: IncomingMessage[]): { role: Role; content: string }[] {
  let start = 0;
  while (start < messages.length && messages[start].role === "assistant") start += 1;
  const sliced = messages.slice(start).slice(-MAX_CONTEXT_MESSAGES);
  // After taking the context window, the slice may now start with an assistant message.
  // Strip any leading assistant messages so Anthropic always receives a user-first sequence.
  let slicedStart = 0;
  while (slicedStart < sliced.length && sliced[slicedStart].role === "assistant") slicedStart += 1;
  return sliced.slice(slicedStart);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("[chat] Missing ANTHROPIC_API_KEY");
    return res.status(503).json({ error: "Chat is temporarily unavailable." });
  }

  const bodyUnknown = parseBody(req);
  if (!isRecord(bodyUnknown)) {
    return res.status(400).json({ error: "Invalid JSON body." });
  }

  const rawMessages = bodyUnknown.messages;
  const messages = validateMessages(rawMessages);
  if (!messages) {
    return res.status(400).json({ error: "Invalid messages payload." });
  }

  const forModel = normalizeForModel(messages);
  if (forModel.length === 0) {
    return res.status(400).json({ error: "No user messages to respond to." });
  }

  const serialized = JSON.stringify({ messages: forModel });
  if (serialized.length > MAX_BODY_BYTES) {
    return res.status(413).json({ error: "Request too large." });
  }

  try {
    const anthropicRes = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 2048,
        system: PORTFOLIO_ASSISTANT_SYSTEM_PROMPT,
        messages: forModel,
      }),
    });

    const data = (await anthropicRes.json()) as AnthropicMessageResponse;

    if (!anthropicRes.ok) {
      const errType = data.error?.type ?? "unknown";
      const errMsg = data.error?.message ?? anthropicRes.statusText;
      console.error("[chat] Anthropic API error", {
        status: anthropicRes.status,
        type: errType,
        message: errMsg,
      });
      return res.status(502).json({ error: "The assistant could not complete that request." });
    }

    const text = (data.content ?? [])
      .filter((b) => b.type === "text" && typeof b.text === "string")
      .map((b) => b.text as string)
      .join("")
      .trim();

    if (!text) {
      console.error("[chat] Empty model output");
      return res.status(502).json({ error: "The assistant returned an empty response." });
    }

    return res.status(200).json({ reply: text });
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown error";
    console.error("[chat] Upstream failure", { message });
    return res.status(502).json({ error: "Could not reach the assistant. Try again shortly." });
  }
}
