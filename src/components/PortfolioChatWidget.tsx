import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, SendHorizontal, X } from "lucide-react";
import { cn } from "@/src/lib/utils";

type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

const GREETING =
  "Hi, I can answer questions about Michelle's work, projects, and how she partners with businesses. What would you like to know?";

const STARTER_CHIPS = [
  "What does Michelle build?",
  "Tell me about ProspectLens",
  "What kind of clients should work with Michelle?",
  "Does Michelle use AI to code?",
] as const;

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

type ApiSuccess = { reply: string };
type ApiError = { error: string };

function isApiSuccess(data: unknown): data is ApiSuccess {
  return typeof data === "object" && data !== null && typeof (data as ApiSuccess).reply === "string";
}

function isApiError(data: unknown): data is ApiError {
  return typeof data === "object" && data !== null && typeof (data as ApiError).error === "string";
}

function looksLikeHtml(text: string) {
  const t = text.trimStart();
  return t.startsWith("<!DOCTYPE") || t.startsWith("<!doctype") || t.startsWith("<html");
}

async function readChatResponse(res: Response): Promise<{
  data: unknown | null;
  parseFailed: boolean;
  rawText: string;
}> {
  const rawText = await res.text();
  if (!rawText.trim()) return { data: null, parseFailed: false, rawText };
  try {
    return { data: JSON.parse(rawText) as unknown, parseFailed: false, rawText };
  } catch {
    return { data: null, parseFailed: true, rawText };
  }
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-on-surface-variant/50"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </div>
  );
}

export function PortfolioChatWidget() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [fabAttention, setFabAttention] = useState(true);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: "welcome", role: "assistant", content: GREETING },
  ]);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setFabAttention(false);
  }, []);

  useEffect(() => {
    if (!fabAttention) return;
    const t = window.setTimeout(() => setFabAttention(false), 7000);
    return () => window.clearTimeout(t);
  }, [fabAttention]);

  const scrollToBottom = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, pending, scrollToBottom]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendText = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || pending) return;

      setErrorBanner(null);
      const userMsg: ChatMessage = { id: newId(), role: "user", content: text };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setPending(true);

      const historyForApi = [...messages, userMsg].map(({ role, content }) => ({ role, content }));

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: historyForApi }),
        });

        const { data, parseFailed, rawText } = await readChatResponse(res);

        if (parseFailed) {
          setErrorBanner(
            import.meta.env.DEV && looksLikeHtml(rawText)
              ? "Chat API is not running on this dev server. Use the live site, run `vercel dev`, or set VITE_DEV_API_PROXY in .env.local to your deployed URL (e.g. https://michellewilliams.dev)."
              : import.meta.env.DEV
                ? "Could not read the assistant response. If you use `npm run dev` only, proxy /api to your deployment: VITE_DEV_API_PROXY=https://yoursite.com in .env.local"
                : "Could not read the assistant response. Please try again in a moment."
          );
          return;
        }

        if (data === null && !res.ok) {
          setErrorBanner(`Request failed (${res.status}). Try again.`);
          return;
        }

        if (data === null) {
          setErrorBanner("The assistant returned an empty response.");
          return;
        }

        if (!res.ok) {
          const msg = isApiError(data) ? data.error : "Something went wrong. Try again.";
          setErrorBanner(msg);
          return;
        }

        if (!isApiSuccess(data) || !data.reply.trim()) {
          setErrorBanner("The assistant returned an empty reply.");
          return;
        }

        setMessages((prev) => [...prev, { id: newId(), role: "assistant", content: data.reply.trim() }]);
      } catch {
        setErrorBanner("Network error. Check your connection and try again.");
      } finally {
        setPending(false);
      }
    },
    [messages, pending]
  );

  const onSubmit = useCallback(() => {
    void sendText(input);
  }, [input, sendText]);

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label="Ask about Michelle"
            initial={{ opacity: 0, y: 14, scale: 0.98, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(2px)" }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "flex h-[min(32rem,calc(100dvh-5.5rem))] w-[min(calc(100vw-2rem),22rem)] flex-col overflow-hidden rounded-2xl border border-border sm:h-[min(36rem,calc(100dvh-6rem))]",
              "bg-surface-card/95 shadow-elevated backdrop-blur-xl"
            )}
          >
            <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div className="min-w-0">
                <p className="font-headline text-sm font-semibold tracking-tight text-on-surface truncate">
                  Ask about Michelle
                </p>
                <p className="text-[11px] text-on-surface-variant/90 truncate">Portfolio assistant</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high/80 hover:text-on-surface"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </header>

            <div
              ref={listRef}
              className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-3"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "max-w-[92%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                    m.role === "user"
                      ? "ml-auto bg-primary/12 text-on-surface border border-primary/15"
                      : "mr-auto bg-surface-container-low/90 text-on-surface border border-border"
                  )}
                >
                  {m.content}
                </div>
              ))}

              {pending && (
                <div className="mr-auto flex items-center gap-2 rounded-2xl border border-border bg-surface-container-low/90 px-3.5 py-2.5">
                  <TypingIndicator />
                  <span className="text-[11px] text-on-surface-variant">Thinking</span>
                </div>
              )}

              {!pending && messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {STARTER_CHIPS.map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => void sendText(label)}
                      className={cn(
                        "rounded-full border border-border bg-surface-container-high/40 px-3 py-1.5 text-left text-[11px] font-medium",
                        "text-on-surface-variant transition-colors hover:border-primary/25 hover:text-on-surface hover:bg-surface-container-high/70"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {errorBanner && (
              <div className="border-t border-border bg-surface-container-low/80 px-4 py-2 text-center text-[11px] text-on-surface-variant">
                {errorBanner}
              </div>
            )}

            <div className="border-t border-border p-3">
              <div className="flex items-end gap-2 rounded-xl border border-border bg-surface-container-low/50 p-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask me anything..."
                  rows={1}
                  className={cn(
                    "max-h-28 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-[13px] text-on-surface",
                    "placeholder:text-on-surface-variant/60 focus:outline-none"
                  )}
                  disabled={pending}
                  aria-label="Message"
                />
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={pending || !input.trim()}
                  className={cn(
                    "mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                    "bg-primary text-white shadow-sm hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-35"
                  )}
                  aria-label="Send message"
                >
                  <SendHorizontal className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-on-surface-variant/70">
                Enter to send · Shift+Enter for a new line
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        layout
        onClick={() => {
          setOpen((v) => !v);
          setFabAttention(false);
        }}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          "relative flex h-14 w-14 items-center justify-center rounded-full border border-border",
          "bg-surface-card text-primary shadow-card transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]",
          fabAttention && !open && "portfolio-chat-fab-attention"
        )}
        aria-label={open ? "Close portfolio assistant" : "Open portfolio assistant"}
      >
        <MessageCircle className="h-6 w-6" strokeWidth={1.75} />
      </motion.button>
    </div>
  );
}
