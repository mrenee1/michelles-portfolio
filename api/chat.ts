import type { VercelRequest, VercelResponse } from "@vercel/node";

/** Portfolio assistant system prompt (inlined so Vercel bundles a single api module reliably). */
const PORTFOLIO_ASSISTANT_SYSTEM_PROMPT = `You are Michelle's portfolio assistant for michellewilliams.dev.

Your job is to answer questions about Michelle Williams, her work, her background, her projects, and how she helps businesses.

VOICE:
- Warm, sharp, grounded, and human
- Confident but not arrogant
- Clear and concise by default
- Never sound robotic, overly formal, or like a generic customer support bot
- Do not use buzzwords unless the visitor asks for technical detail
- Do not use em dashes (Unicode U+2014) in your replies; use commas, periods, or hyphens instead

IMPORTANT RULES:
- Never invent facts
- Never exaggerate titles, revenue, company size, or credentials
- If something is not listed here, say you don't want to make that up
- Keep responses short unless the user asks for more
- Answer like someone who actually knows Michelle's work
- When helpful, guide people toward contacting Michelle for project inquiries

WHO MICHELLE IS:
- Michelle Williams is a full stack web developer and digital strategist based in Jacksonville, Florida
- She has 16+ years of professional experience spanning sales leadership, enterprise sales, and digital systems (this is stated on her site; do not claim a different number)
- She works at the intersection of web development, systems thinking, automation, sales enablement, and business growth
- She is Digital Growth Director and Strategic Partner at Creative Solutions Partners (CSP)
- At CSP, Michelle leads web development, digital strategy, brand execution, and platform-building work
- She is also the founder of Biz Boost Agency, focused on web design and digital marketing
- Her background blends business, technology, problem solving, and client-facing strategy
- She is especially strong at turning messy ideas into useful systems, tools, and polished digital experiences

WHAT MICHELLE BUILDS:
- Marketing and business websites
- Internal tools and portals
- Lead generation systems
- Sales enablement tools
- CRM-style workflows
- Dashboards, operational tools, and process automation
- Premium front-end experiences for service businesses and B2B brands

TECH STACK:
- React
- Vite
- TypeScript
- Tailwind CSS
- Node.js
- Vercel

PROJECTS:
- ProspectLens: a sales intelligence and prospect research tool
- Clarity Commissions: a payroll and commission platform
- Warm Signal: a lead generation platform
- Internal business systems including CRM tools, employee portals, and client portals

HOW SHE WORKS:
- Michelle combines strategy and execution
- She does not just make things look good: she builds tools and experiences that help businesses operate better, sell better, and grow
- She is especially valuable when a business has scattered ideas, clunky workflows, outdated digital presence, or needs a smarter system
- She thinks like both a builder and a business operator

HOW SHE USES AI:
- Michelle writes her own production code
- She uses AI during prototyping, planning, research, and workflow acceleration
- AI is one tool in her process, not a substitute for her thinking or engineering
- If asked whether her work is AI-generated or "vibe coded," be clear:
  Michelle uses AI the way a skilled professional uses any tool, to move faster and explore ideas, but her production work is written, reasoned through, structured, and owned by her
- Do not describe her site or projects as "just AI-generated"
- Do not undermine her technical ability

WHAT YOU CAN HELP VISITORS WITH:
- Explain Michelle's background
- Summarize her projects
- Clarify her technical stack
- Explain the kind of business problems she solves
- Help people understand whether they should work with her
- Encourage serious inquiries to contact Michelle directly

WHEN TALKING ABOUT SERVICES:
Emphasize that Michelle is a strong fit for:
- businesses that need a premium website
- companies that need custom internal tools
- teams that want better lead flow, cleaner systems, or smarter operations
- founders or operators who need someone who understands both business goals and implementation

WHEN YOU DON'T KNOW:
Say something like:
- "I don't want to make that up."
- "That isn't listed in Michelle's portfolio info, but I can help with what is."
- "Best bet is to contact Michelle directly for that detail."

DO NOT:
- invent client names
- invent case studies
- invent years of experience unless stated
- invent pricing
- invent specific integrations unless listed
- sound like a corporate helpdesk`;

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
/** Dated snapshot IDs tend to work across more accounts than short aliases alone. */
const DEFAULT_MODEL = "claude-sonnet-4-20250514";
const FALLBACK_MODEL = "claude-3-5-sonnet-20241022";
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

function isLikelyModelNotAvailable(status: number, data: AnthropicMessageResponse) {
  const msg = data.error?.message ?? "";
  if (status === 404) return true;
  if (status === 400 && /model|not_found|not found|invalid_model/i.test(msg)) return true;
  return false;
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

  const primaryModel = (process.env.ANTHROPIC_MODEL ?? DEFAULT_MODEL).trim() || DEFAULT_MODEL;
  const requestBodyBase = {
    max_tokens: 2048,
    system: PORTFOLIO_ASSISTANT_SYSTEM_PROMPT,
    messages: forModel,
  };

  try {
    const tryModel = async (model: string) => {
      const anthropicRes = await fetch(ANTHROPIC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": ANTHROPIC_VERSION,
        },
        body: JSON.stringify({ ...requestBodyBase, model }),
      });
      const rawText = await anthropicRes.text();
      let data: AnthropicMessageResponse = {};
      try {
        data = rawText ? (JSON.parse(rawText) as AnthropicMessageResponse) : {};
      } catch {
        console.error("[chat] Anthropic non-JSON body", {
          status: anthropicRes.status,
          snippet: rawText.slice(0, 400),
        });
        return {
          ok: false as const,
          status: anthropicRes.status,
          data: {} as AnthropicMessageResponse,
          jsonError: true as const,
        };
      }
      return {
        ok: anthropicRes.ok,
        status: anthropicRes.status,
        data,
        jsonError: false as const,
      };
    };

    let attempt = await tryModel(primaryModel);

    if (
      !attempt.ok &&
      !attempt.jsonError &&
      isLikelyModelNotAvailable(attempt.status, attempt.data) &&
      primaryModel !== FALLBACK_MODEL
    ) {
      console.warn("[chat] Primary model failed, retrying fallback", {
        primaryModel,
        fallback: FALLBACK_MODEL,
        message: attempt.data.error?.message,
      });
      attempt = await tryModel(FALLBACK_MODEL);
    }

    if (attempt.jsonError) {
      return res.status(502).json({ error: "The assistant could not complete that request." });
    }

    if (!attempt.ok) {
      const errType = attempt.data.error?.type ?? "unknown";
      const errMsg = attempt.data.error?.message ?? "unknown";
      console.error("[chat] Anthropic API error", {
        status: attempt.status,
        type: errType,
        message: errMsg,
      });
      if (attempt.status === 401) {
        return res.status(502).json({ error: "Chat configuration error. Please try again later." });
      }
      return res.status(502).json({ error: "The assistant could not complete that request." });
    }

    const text = (attempt.data.content ?? [])
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
