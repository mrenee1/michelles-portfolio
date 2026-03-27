import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import QRCode from "react-qr-code";
import { usePageMeta } from "@/src/lib/utils";

const CONTACT_EMAIL = "michelle@creativesolutionspartners.com";
const MAILTO_BASE = `mailto:${CONTACT_EMAIL}`;
const PRIMARY_QR = "#ff007a";
const TOPICS = [
  "Brand Strategy",
  "Web Design & Development",
  "Automation & Systems",
  "AI-Powered Tools",
  "Other",
] as const;

const MAX_MAILTO_CHARS = 1900;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function buildMailtoBody(name: string, email: string, topic: string, message: string) {
  return `Name: ${name}
Email: ${email}
Topic: ${topic}

${message}`;
}

function truncateForMailto(
  subject: string,
  body: string,
  name: string,
  replyEmail: string,
  topic: string
): { subject: string; body: string } {
  let s = subject;
  let b = body;
  let href = `${MAILTO_BASE}?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(b)}`;
  if (href.length <= MAX_MAILTO_CHARS) return { subject: s, body: b };

  b = `${b.slice(0, 600)}\n\n[Message was shortened for your email app. Feel free to add more detail in your reply.]`;
  href = `${MAILTO_BASE}?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(b)}`;
  if (href.length <= MAX_MAILTO_CHARS) return { subject: s, body: b };

  s = "Portfolio inquiry";
  b = `Name: ${name}\nEmail: ${replyEmail}\nTopic: ${topic}\n\n[Please paste your full message here. It was too long to pre-fill automatically.]`;
  return { subject: s, body: b };
}

export default function Contact() {
  usePageMeta("Contact", "Ready to streamline your systems, elevate your brand, or integrate AI into your workflow? Let's talk.");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    const name = fullName.trim();
    const em = email.trim();
    const msg = message.trim();
    const top = topic.trim();

    if (!name) {
      setFormError("Please enter your name.");
      return;
    }
    if (!em || !isValidEmail(em)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!top) {
      setFormError("Please choose how I can help.");
      return;
    }
    if (!msg) {
      setFormError("Please add a short message.");
      return;
    }

    const subject = `Portfolio inquiry: ${top}`;
    const body = buildMailtoBody(name, em, top, msg);
    const { subject: sub, body: bod } = truncateForMailto(subject, body, name, em, top);
    window.location.href = `${MAILTO_BASE}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(bod)}`;
  };

  return (
    <div className="pt-36 md:pt-44 pb-0">
      {/* ── Header ── */}
      <section className="page-container mb-20 md:mb-28">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">Get In Touch</span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.5rem,6vw,4.25rem)] font-headline font-extrabold leading-[1.1] tracking-tight text-on-surface mb-6 max-w-3xl"
          >
            Let's build something{" "}
            <span className="text-primary">worth talking about.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-on-surface-variant max-w-2xl font-medium leading-relaxed"
          >
            Ready to streamline your systems, elevate your brand, or integrate AI into your workflow? Let's talk growth.
          </motion.p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="bg-surface-blush section-spacing">
        <div className="page-container">
          <div className="grid grid-cols-12 gap-8 lg:gap-20">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="col-span-12 lg:col-span-5 space-y-10"
            >
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
                    <Mail size={22} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">Email</h3>
                    <a
                      href={MAILTO_BASE}
                      className="text-lg font-bold text-on-surface break-all underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
                {[
                  { icon: <Phone size={22} />, label: "Phone", value: "501-913-5473" },
                  { icon: <MapPin size={22} />, label: "Location", value: "Remote / Global" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">{item.label}</h3>
                      <p className="text-lg font-bold text-on-surface">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-primary/25 bg-white p-6 shadow-ambient dark:border-primary/35 dark:bg-white">
                <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-primary">Email me</p>
                <div className="mx-auto flex max-w-[200px] justify-center rounded-xl bg-white p-3 ring-2 ring-primary/15">
                  <QRCode
                    value={MAILTO_BASE}
                    size={168}
                    level="M"
                    fgColor={PRIMARY_QR}
                    bgColor="#ffffff"
                    className="h-auto w-full"
                  />
                </div>
                <p className="mt-4 text-center text-sm font-medium text-neutral-900">
                  Scan to open your mail app with {CONTACT_EMAIL}
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="col-span-12 lg:col-span-7"
            >
              <form
                className="space-y-7 rounded-2xl border border-border bg-surface-card p-8 shadow-card md:p-10"
                onSubmit={handleSubmit}
                noValidate
              >
                {formError && (
                  <p className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-on-surface" role="alert">
                    {formError}
                  </p>
                )}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-border bg-surface-blush px-5 py-3.5 text-sm font-medium text-on-surface transition-all placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-border bg-surface-blush px-5 py-3.5 text-sm font-medium text-on-surface transition-all placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-topic" className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant">
                    How can I help?
                  </label>
                  <select
                    id="contact-topic"
                    name="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-border bg-surface-blush px-5 py-3.5 text-sm font-medium text-on-surface transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select a topic</option>
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full resize-none rounded-xl border border-border bg-surface-blush px-5 py-3.5 text-sm font-medium text-on-surface transition-all placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <p className="text-xs text-on-surface-variant/80">
                  Submitting opens your email app with this message to me. Nothing is stored on this site.
                </p>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-primary py-4 text-sm font-bold text-white transition-all duration-300 hover:shadow-premium"
                >
                  Send Message{" "}
                  <Send size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
