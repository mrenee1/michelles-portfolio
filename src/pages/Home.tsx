import { motion } from "motion/react";
import { ArrowRight, Target, Code2, Cpu, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/src/lib/utils";

const pillars = [
  {
    title: "Brand Strategy",
    description: "Positioning for authority, clarity, and market dominance.",
    icon: <Target className="w-7 h-7" />,
  },
  {
    title: "Web Design & Development",
    description: "High-performance digital ecosystems built for conversion.",
    icon: <Code2 className="w-7 h-7" />,
  },
  {
    title: "Automation & Systems",
    description: "Streamlining operations to scale without overhead.",
    icon: <Cpu className="w-7 h-7" />,
  },
  {
    title: "AI-Driven Growth",
    description: "Custom AI solutions that drive intelligence and efficiency.",
    icon: <Zap className="w-7 h-7" />,
  },
];

const growthSteps = [
  { title: "Position the Brand", desc: "Define authority and market fit." },
  { title: "Build the Experience", desc: "Create high-conversion digital homes." },
  { title: "Streamline the Systems", desc: "Automate for scale and efficiency." },
  { title: "Drive Growth", desc: "Execute data-driven scaling strategies." },
];

export default function Home() {
  usePageMeta(undefined, "Michelle Williams — Digital strategist, systems builder, and founder. 18+ years driving business growth through strategy, web development, automation, and AI.");

  return (
    <div className="pt-36 md:pt-44">
      {/* ═══════════════════════════════════
          1. HERO
          ═══════════════════════════════════ */}
      <section className="page-container mb-0 pb-28 md:pb-36">
        <div className="max-w-[52rem]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">Strategy &middot; Execution &middot; Systems</span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.75rem,7.5vw,5rem)] font-headline font-extrabold leading-[1.08] tracking-tight text-on-surface mb-8"
          >
            I design and build digital systems that drive{" "}
            <span className="text-primary">revenue and real business growth.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed mb-14 max-w-2xl"
          >
            18+ years of sales leadership combined with a deep obsession for scalable technology, AI, and automation — turned into systems that actually move the needle.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#live-work"
              className="btn-primary px-8 py-4 text-base"
            >
              View Live Work <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              to="/contact"
              className="bg-on-surface text-white px-8 py-4 rounded-full font-bold text-base hover:bg-on-surface/90 transition-all duration-300"
            >
              Let's Build Something
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          2. WHO I AM
          ═══════════════════════════════════ */}
      <section className="bg-surface-blush section-spacing">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="lg:col-span-4 flex justify-center"
            >
              <div className="relative w-full max-w-xs lg:max-w-none">
                <div className="absolute -inset-12 bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative rounded-2xl overflow-hidden shadow-elevated bg-white p-3 border border-black/[0.04]">
                  <img
                    alt="Michelle Williams"
                    className="w-full aspect-[4/5] object-cover rounded-xl"
                    src="/headshot.png"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8"
            >
              <div className="section-label mb-8">
                <span className="section-label-line" />
                <span className="section-label-text">Who I Am</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-headline font-bold leading-tight mb-8">
                Operator. Builder. Strategist.
              </h2>
              <div className="space-y-6 text-lg text-on-surface-variant font-medium leading-[1.8]">
                <p>
                  Michelle's career started where business meets people — on the sales floor. After nearly two decades leading high-performing teams at Verizon, Best Buy, and Apple, then selling enterprise solutions at Comcast Business, she developed an uncommon skill set: the ability to see a business from the customer's first touch all the way through the systems that power it.
                </p>
                <p>
                  Today, she operates at the intersection of strategy, technology, and execution — serving as a Strategic Partner at Creative Solutions Partners while building her own agency, Biz Boost, from the ground up. Every system she architects is designed to do one thing: drive real, measurable business growth.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to="/experience"
                  className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:gap-3 transition-all duration-300"
                >
                  Read the full story <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          3. WHAT I BRING
          ═══════════════════════════════════ */}
      <section className="section-spacing">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 md:mb-24"
          >
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-headline font-bold leading-tight">
              What I Bring
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-surface-blush p-10 lg:p-12 rounded-2xl border border-black/[0.04] hover:border-primary/20 hover:shadow-card transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/8 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {pillar.icon}
                </div>
                <h4 className="font-bold text-xl mb-3 leading-snug">{pillar.title}</h4>
                <p className="text-on-surface-variant text-base font-medium leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          4. HOW I HELP BUSINESSES GROW
          ═══════════════════════════════════ */}
      <section className="bg-on-surface section-spacing">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 md:mb-24"
          >
            <div className="section-label">
              <span className="w-10 h-px bg-primary" />
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">The Framework</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-headline font-bold text-white leading-tight">
              How I Help Businesses Grow
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {growthSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="space-y-4"
              >
                <div className="text-primary font-headline text-7xl font-black opacity-25 leading-none">
                  0{i + 1}
                </div>
                <h4 className="text-xl font-bold text-white">{step.title}</h4>
                <p className="text-white/50 text-base leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          5. LIVE WORK CTA
          ═══════════════════════════════════ */}
      <section id="live-work" className="bg-surface-blush section-spacing">
        <div className="page-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="section-label justify-center mb-8">
              <span className="section-label-line" />
              <span className="section-label-text">Live Work</span>
              <span className="section-label-line" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-headline font-bold leading-tight mb-6">
              Real systems. Real results.
            </h2>
            <p className="text-xl text-on-surface-variant font-medium leading-relaxed mb-12 max-w-2xl mx-auto">
              From my own agency to AI-powered tools and enterprise platforms — see the live products and systems I've built for real businesses.
            </p>
            <Link
              to="/projects"
              className="btn-primary px-10 py-4 text-lg"
            >
              View All Projects <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          7. CTA
          ═══════════════════════════════════ */}
      <section className="section-spacing px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-10 leading-[1.12]"
          >
            Let's build something that moves your business forward.
          </motion.h2>
          <Link
            to="/contact"
            className="btn-primary px-12 py-5 text-lg"
          >
            Let's Build
          </Link>
        </div>
      </section>
    </div>
  );
}
