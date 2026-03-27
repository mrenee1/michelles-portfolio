import { motion } from "motion/react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/src/lib/utils";
import BrowserFrame from "@/src/components/BrowserFrame";
import TiltCard from "@/src/components/TiltCard";

const brandProject = {
  title: "Biz Boost Agency",
  tag: "Agency Platform, Founded & Built by Michelle",
  description:
    "The home base. Biz Boost Agency is where Michelle builds sites that convert and growth systems for businesses, while creating opportunities for developers to contribute, collaborate, and grow under a strong brand and strategic direction.",
  url: "https://thebizboostagency.com/",
  color: "#ff007a",
};

const projects = [
  {
    title: "Creative Solutions Partners",
    tag: "Platform",
    description:
      "At Creative Solutions Partners, she operates as a Strategic Partner and Digital Growth Director, leading initiatives across brand strategy, web development, marketing, content systems, automation, and AI-driven infrastructure to build scalable ecosystems that produce real business results.",
    url: "https://www.creativesolutionspartners.com/",
    color: "#008080",
    featured: true,
  },
  {
    title: "Partner Workspace",
    tag: "Client + Partner Platform",
    badge: "System Build",
    description:
      "A structured digital workspace designed to centralize client and partner operations, including project tracking, file management, communication, and resource access, within a clean, scalable interface. This platform shows how organized systems and intuitive interfaces reduce friction, improve visibility, and support more efficient collaboration across teams.",
    url: "https://cspportal-newpartner.manus.space",
    preview: "/partner-workspace-dashboard.png",
    color: "#1e293b",
    featured: true,
  },
  {
    title: "StackWise",
    tag: "AI Product",
    badge: "AI-Powered",
    description:
      "An AI-powered tool that generates personalized technology stacks based on user input, helping builders, founders, and teams quickly identify the right tools, frameworks, and architecture for their projects. It combines user experience, logic, and AI-driven recommendations into a practical, scalable solution.",
    url: "https://stackwise-ghw44nfo.manus.space",
    color: "#0d0d1a",
    featured: true,
  },
  {
    title: "Prospect Lens",
    tag: "AI Tool",
    description:
      "An AI-driven lead intelligence tool that helps sales teams identify and prioritize high-value opportunities in real time.",
    url: "https://prospectlens-8bzbueep.manus.space/",
    color: "#006868",
    featured: false,
  },
  {
    title: "Creative Solutions Insights",
    tag: "AI Content Hub",
    description:
      "Automated content platform created to surface relevant business, health, and technology insights while reinforcing authority and discoverability.",
    url: "https://creativesolutionsinsights.com/",
    color: "#1a1a2e",
    featured: false,
  },
  {
    title: "Outfitter Booking Platform",
    subtitle: "Buck N Ducks",
    tag: "Vertical SaaS",
    badge: "Industry Platform",
    elevated: true,
    description:
      "A specialized booking and operations platform designed for hunting and fishing outfitters that combines reservations, client management, and experience coordination into one streamlined system. It shows how industry-specific software can simplify operations, improve customer experience, and create scalable infrastructure for niche businesses.",
    url: "https://bucknducks-j2fbqrr6.manus.space",
    color: "#2d3b2d",
    featured: false,
  },
];

type ProjectCardProps = {
  key?: string;
  project: (typeof projects)[0];
  index: number;
  large?: boolean;
};

function BrandedFallback({ title, color }: { title: string; color: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
      style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
    >
      <span className="text-white/90 text-2xl md:text-3xl font-headline font-bold leading-tight tracking-tight">
        {title}
      </span>
      <span className="text-white/40 text-xs font-bold uppercase tracking-[0.25em] mt-3">
        Live Preview
      </span>
    </div>
  );
}

function ProjectCard({ project, index, large = false }: ProjectCardProps) {
  const hasLiveUrl = project.url !== "#";
  const isElevated = project.elevated;
  const useTilt = large || isElevated;

  const aspect = large
    ? "aspect-[16/8] md:aspect-[16/7]"
    : isElevated
      ? "aspect-[16/9]"
      : "aspect-[16/10]";

  const glowColor = project.color === "#008080"
    ? "rgba(0, 128, 128, 0.3)"
    : project.color === "#0d0d1a"
      ? "rgba(100, 100, 255, 0.25)"
      : `${project.color}55`;

  const previewContent = project.preview ? (
    <div className="browser-frame">
      <div className={`browser-header ${isElevated ? "h-11" : ""}`}>
        <div className="flex gap-2">
          <div className="browser-dot bg-[#FF5F57]" />
          <div className="browser-dot bg-[#FFBD2E]" />
          <div className="browser-dot bg-[#28C840]" />
        </div>
        <div className="flex-1 mx-3 bg-[#3a3a3a]/30 rounded-md px-3 py-1">
          <span className="text-[10px] text-on-surface-variant/50 font-medium truncate">
            {project.title}
          </span>
        </div>
      </div>
      <div className={`overflow-hidden relative ${aspect}`}>
        <img
          src={project.preview}
          alt={`${project.title} dashboard preview`}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <span className="absolute bottom-3 right-3 z-[3] bg-black/40 backdrop-blur-sm text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-md pointer-events-none">
          Dashboard View
        </span>
      </div>
    </div>
  ) : hasLiveUrl ? (
    <BrowserFrame src={project.url} title={project.title} />
  ) : (
    <div className="browser-frame">
      <div className="browser-header">
        <div className="flex gap-2">
          <div className="browser-dot bg-[#FF5F57]" />
          <div className="browser-dot bg-[#FFBD2E]" />
          <div className="browser-dot bg-[#28C840]" />
        </div>
      </div>
      <div className={`overflow-hidden relative ${aspect}`}>
        <BrandedFallback title={project.title} color={project.color} />
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className={`group ${isElevated ? "md:col-span-2" : ""}`}
    >
      {useTilt ? (
        <TiltCard
          borderRadius={16}
          glowColor={glowColor}
          glowSize="50%"
        >
          {previewContent}
        </TiltCard>
      ) : (
        <div className="transition-all duration-300 ease-out group-hover:scale-[1.02] group-hover:shadow-hover">
          {previewContent}
        </div>
      )}

      <div className="mt-8 md:mt-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-[11px]">
            {project.tag}
          </span>
          {project.badge && (
            <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {project.badge}
            </span>
          )}
        </div>
        <h3
          className={`font-headline font-bold ${
            large ? "text-3xl md:text-4xl" : "text-2xl"
          } ${project.subtitle ? "mb-1" : "mb-2.5"}`}
        >
          {project.title}
        </h3>
        {project.subtitle && (
          <p className="text-on-surface-variant/70 text-sm font-semibold mb-2.5">{project.subtitle}</p>
        )}
        <p className="text-on-surface-variant font-medium leading-relaxed mb-5 text-[0.938rem]">
          {project.description}
        </p>
        {hasLiveUrl ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-surface-inverted text-white px-6 py-3 rounded-full text-sm font-bold hover:shadow-premium transition-all duration-300 hover:[background:linear-gradient(135deg,#ff007a_0%,#d6006e_50%,#c2185b_100%)]"
          >
            View Live Site <ExternalLink className="w-4 h-4" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 text-on-surface-variant/50 text-sm font-bold">
            Coming Soon
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  usePageMeta("Projects", "Live projects, digital ecosystems, and growth engines built for real businesses: agency platforms, AI-powered tools, and more.");

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

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
              <span className="section-label-text">Live Work</span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.5rem,6vw,4.25rem)] font-headline font-extrabold leading-[1.1] tracking-tight text-on-surface mb-6 max-w-3xl"
          >
            Real systems.{" "}
            <span className="text-primary">Real results.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-on-surface-variant max-w-2xl font-medium leading-relaxed"
          >
            Live projects, digital ecosystems, and growth engines built for real businesses.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          THE BRAND — Biz Boost Agency
          ══════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] py-28 md:py-36 lg:py-40">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
          >
            <div className="section-label mb-10">
              <span className="w-10 h-px bg-primary" />
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">Founder Brand</span>
            </div>

            <TiltCard
              borderRadius={12}
              glowColor="rgba(255, 0, 122, 0.4)"
              glowSize="45%"
            >
              <BrowserFrame src={brandProject.url} title={brandProject.title} />
            </TiltCard>

            <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div className="max-w-2xl">
                <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
                  {brandProject.tag}
                </span>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-white mb-4 leading-tight">
                  {brandProject.title}
                </h3>
                <p className="text-lg text-white/60 font-medium leading-relaxed">
                  {brandProject.description}
                </p>
              </div>
              <a
                href={brandProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary shrink-0 px-8 py-4 text-sm w-fit"
              >
                View Live Site <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SELECTED WORK
          ══════════════════════════════════════════ */}
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
              <span className="section-label-text">Selected Platforms &amp; Systems</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold">
              Platforms &amp; Products
            </h2>
          </motion.div>
          <div className="space-y-24 md:space-y-32">
            {featured.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                large
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── More Projects ── */}
      <section className="bg-surface-blush section-spacing">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 md:mb-16"
          >
            <div className="section-label">
              <span className="section-label-line" />
              <span className="section-label-text">More Projects</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold">
              Additional Builds
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20">
            {rest.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-spacing px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl font-headline font-bold mb-8 leading-tight"
          >
            Have a project in mind?
          </motion.h2>
          <Link
            to="/contact"
            className="btn-primary px-10 py-4 text-lg"
          >
            Let's Talk <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
