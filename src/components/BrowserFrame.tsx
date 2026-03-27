export default function BrowserFrame({ src, title }: { src: string; title: string }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-chrome-frame w-full">
      <div className="flex items-center gap-2 px-4 py-3 bg-chrome-toolbar border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className="flex-1 mx-3 bg-chrome-address/90 rounded-md px-3 py-1 text-xs text-white/35 font-mono tracking-wide">
          {title}
        </div>
      </div>
      <div className="relative w-full" style={{ height: "650px" }}>
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
