/** Shared viewport height for all project previews (live iframes and static images). */
export const PROJECT_FRAME_VIEWPORT_CLASS =
  "relative w-full h-[380px] sm:h-[440px] md:h-[520px] lg:h-[560px]";

type BrowserFrameProps = {
  src: string;
  title: string;
  /**
   * Optional static screenshot. Use for sites that block iframe embedding
   * (X-Frame-Options / CSP frame-ancestors); the image links out to the live site.
   */
  preview?: string;
};

export default function BrowserFrame({ src, title, preview }: BrowserFrameProps) {
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
      <div className={`overflow-hidden ${PROJECT_FRAME_VIEWPORT_CLASS}`}>
        {preview ? (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title} in a new tab`}
            className="absolute inset-0 block"
          >
            <img
              src={preview}
              alt={`${title} homepage preview`}
              className="absolute inset-0 w-full h-full object-cover object-top"
              loading="lazy"
            />
            <span className="absolute bottom-3 right-3 z-[3] bg-surface-inverted/55 backdrop-blur-sm text-white/85 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-md pointer-events-none">
              Homepage Preview
            </span>
          </a>
        ) : (
          <iframe
            src={src}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        )}
      </div>
    </div>
  );
}
