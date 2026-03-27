import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { usePageMeta } from "@/src/lib/utils";

export default function Experience() {
  usePageMeta("Experience", "18+ years of building, leading, and solving real problems: from consumer sales to enterprise strategy to digital systems that generate measurable revenue.");

  return (
    <div className="pt-36 md:pt-44 pb-0">
      {/* ── Hero Header ── */}
      <section className="page-container mb-20 md:mb-28">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">Experience &amp; Evolution</span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.5rem,6vw,4.25rem)] font-headline font-extrabold leading-[1.1] tracking-tight text-on-surface mb-6 max-w-3xl"
          >
            18+ years of building, leading, and{" "}
            <span className="text-primary">solving real problems.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed max-w-2xl"
          >
            From the frontline of consumer sales to enterprise strategy to building the digital systems behind modern, high-performing businesses.
          </motion.p>
        </div>
      </section>

      {/* ── Narrative + Photo ── */}
      <section className="bg-surface-blush section-spacing">
        <div className="page-container">
          <div className="editorial-grid items-center">
            {/* Narrative */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="col-span-12 lg:col-span-7 order-2 lg:order-1"
            >
              <div className="space-y-7 text-lg md:text-xl text-on-surface-variant font-medium leading-[1.8]">
                <p>
                  Michelle's career started where business meets people: on the sales floor. At Verizon, Best Buy, and Apple, she developed a deep understanding of customer psychology, sales execution, and how high-performing teams operate. Those years built the foundation: how to read a room, close a deal, and deliver consistent results.
                </p>
                <p>
                  She later moved into the enterprise space at Comcast Business, where she worked with mid-market and enterprise clients, translating complex technology into real business outcomes. That experience expanded her perspective from transactions to systems, and how the right infrastructure turns operations into revenue.
                </p>
                <p>
                  Today, Michelle operates at the intersection of strategy, technology, and execution.
                </p>
                <p>
                  At Creative Solutions Partners, she serves as a strategic partner leading digital initiatives: building and optimizing brand strategy, web experiences, automation systems, and AI-driven infrastructure that support scalable, revenue-generating operations.
                </p>
                <p>
                  Separately, she is the founder of Biz Boost Agency, where she builds sites that convert and growth systems for businesses while also creating opportunities for other developers to contribute, collaborate, and grow under a strong brand and strategic direction.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-12 bg-surface-card p-8 md:p-10 rounded-2xl border-l-[6px] border-primary shadow-ambient"
              >
                <p className="italic text-on-surface font-bold leading-relaxed text-xl md:text-2xl">
                  "Real systems produce real business results."
                </p>
              </motion.div>

              <div className="mt-8 flex flex-wrap gap-3">
                {["Strategic Partner", "Founder", "Digital Operator", "Systems Architect", "Growth Strategist"].map((badge) => (
                  <span key={badge} className="strategy-pill">{badge}</span>
                ))}
              </div>
            </motion.div>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="col-span-12 lg:col-span-5 order-1 lg:order-2 flex justify-center"
            >
              <div className="relative max-w-sm lg:max-w-none w-full">
                <div className="absolute -inset-12 bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative rounded-2xl overflow-hidden shadow-elevated bg-surface-card p-3 border border-border">
                  <img
                    alt="Michelle Williams"
                    className="w-full aspect-[4/5] object-cover rounded-xl"
                    src="/headshot.png"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Strengths ── */}
      <section className="section-spacing">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 md:mb-20"
          >
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">Core Strengths</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold">
              What I bring to every engagement
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { label: "Sales & Customer Intelligence", items: "Consumer psychology, enterprise sales, B2B strategy, account management" },
              { label: "Leadership & Operations", items: "Team building, performance management, sales operations, process design" },
              { label: "Digital Strategy & Execution", items: "Brand engineering, web development, systems architecture, conversion optimization" },
              { label: "Automation & AI", items: "Workflow automation, AI integration, custom tooling, operational intelligence" },
              { label: "Entrepreneurship", items: "Business development, market positioning, growth strategy, venture building" },
              { label: "Technical Fluency", items: "Full-stack development, CRM systems, infrastructure planning, data architecture" },
            ].map((strength, i) => (
              <motion.div
                key={strength.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="bg-surface-blush p-8 rounded-2xl border border-border hover:border-primary/15 transition-all duration-400"
              >
                <h4 className="font-bold text-base mb-3 text-on-surface">{strength.label}</h4>
                <p className="text-on-surface-variant text-sm font-medium leading-relaxed">{strength.items}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-surface-inverted section-spacing">
        <div className="page-container text-center">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl font-headline font-bold text-white mb-8 leading-tight max-w-3xl mx-auto"
          >
            Ready to work with someone who understands both sides of the table?
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/projects"
              className="btn-primary px-8 py-4"
            >
              See My Work <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="bg-surface-card text-on-surface px-8 py-4 rounded-full font-bold hover:opacity-90 transition-all duration-300"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
