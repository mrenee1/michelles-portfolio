/** Shared viewport height for all project previews (live iframes and static images). */
export const PROJECT_FRAME_VIEWPORT_CLASS =
  "relative w-full h-[380px] sm:h-[440px] md:h-[520px] lg:h-[560px]";

export default function BrowserFrame({ src, title }: { src: string; title: string }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-chrome-frame w-full">
      <div className="flex h-10 shrink-0 items-center gap-2 px-4 bg-chrome-toolbar border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className="flex-1 min-w-0 mx-3 bg-chrome-address/90 rounded-md px-3 py-1 text-xs text-white/35 font-mono tracking-wide truncate" title={title}>
          {title}
        </div>
      </div>
      <div className={PROJECT_FRAME_VIEWPORT_CLASS}>
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}
