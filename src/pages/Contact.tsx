import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { usePageMeta } from "@/src/lib/utils";

export default function Contact() {
  usePageMeta("Contact", "Ready to streamline your systems, elevate your brand, or integrate AI into your workflow? Let's talk.");

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
                {[
                  { icon: <Mail size={22} />, label: "Email", value: "michelle@mreneewilliams.com" },
                  { icon: <Phone size={22} />, label: "Phone", value: "501-913-5473" },
                  { icon: <MapPin size={22} />, label: "Location", value: "Remote / Global" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center text-primary shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-1">
                        {item.label}
                      </h3>
                      <p className="text-lg font-bold text-on-surface">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-surface-card p-8 rounded-2xl border border-border shadow-ambient">
                <h4 className="text-base font-bold text-on-surface mb-3">Office Hours</h4>
                <p className="text-on-surface-variant font-medium text-sm leading-relaxed">
                  Monday – Friday<br />
                  9:00 AM – 6:00 PM EST
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
                className="bg-surface-card p-8 md:p-10 rounded-2xl border border-border shadow-card space-y-7"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full bg-surface-blush border border-border rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className="w-full bg-surface-blush border border-border rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant">
                    How can I help?
                  </label>
                  <select className="w-full bg-surface-blush border border-border rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm appearance-none">
                    <option>Brand Strategy</option>
                    <option>Web Design & Development</option>
                    <option>Automation & Systems</option>
                    <option>AI-Powered Tools</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full bg-surface-blush border border-border rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm resize-none"
                  />
                </div>

                <button className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:shadow-premium transition-all duration-300 group text-sm">
                  Send Message{" "}
                  <Send
                    size={18}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
