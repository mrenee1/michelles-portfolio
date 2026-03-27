import React, { useRef, useEffect, useCallback, type ReactNode } from "react";

const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v: number, p = 3) => parseFloat(v.toFixed(p));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number) =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

type Props = {
  children: ReactNode;
  className?: string;
  borderRadius?: number;
  glowColor?: string;
  glowSize?: string;
  shineEnabled?: boolean;
};

export default function TiltCard({
  children,
  className = "",
  borderRadius = 20,
  glowColor = "rgba(255, 0, 122, 0.35)",
  glowSize = "55%",
  shineEnabled = true,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const setVars = useCallback((px: number, py: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const w = el.clientWidth || 1;
    const h = el.clientHeight || 1;
    const pxPct = clamp((100 / w) * px);
    const pyPct = clamp((100 / h) * py);
    const cx = pxPct - 50;
    const cy = pyPct - 50;

    el.style.setProperty("--px", `${pxPct}%`);
    el.style.setProperty("--py", `${pyPct}%`);
    el.style.setProperty("--rx", `${round(-(cx / 6))}deg`);
    el.style.setProperty("--ry", `${round(cy / 5)}deg`);
    el.style.setProperty("--bgx", `${adjust(pxPct, 0, 100, 37, 63)}%`);
    el.style.setProperty("--bgy", `${adjust(pyPct, 0, 100, 37, 63)}%`);
    el.style.setProperty("--dist", `${clamp(Math.hypot(pyPct - 50, pxPct - 50) / 50, 0, 1)}`);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let raf: number | null = null;
    let tx = el.clientWidth / 2;
    let ty = el.clientHeight / 2;
    let cx = tx;
    let cy = ty;
    let running = false;
    let lastTs = 0;

    const step = (ts: number) => {
      if (!running) return;
      if (!lastTs) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      const k = 1 - Math.exp(-dt / 0.12);
      cx += (tx - cx) * k;
      cy += (ty - cy) * k;
      setVars(cx, cy);
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        raf = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      raf = requestAnimationFrame(step);
    };

    const onEnter = () => el.classList.add("tilt-active");
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      start();
    };
    const onLeave = () => {
      el.classList.remove("tilt-active");
      tx = el.clientWidth / 2;
      ty = el.clientHeight / 2;
      start();
    };

    setVars(el.clientWidth / 2, el.clientHeight / 2);

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [setVars]);

  return (
    <div
      ref={wrapRef}
      className={`tilt-card ${className}`}
      style={{
        "--tilt-radius": `${borderRadius}px`,
        "--glow-color": glowColor,
        "--glow-size": glowSize,
      } as React.CSSProperties}
    >
      <div className="tilt-glow" />
      <div ref={innerRef} className="tilt-inner">
        {children}
        {shineEnabled && <div className="tilt-shine" />}
        <div className="tilt-glare" />
      </div>
    </div>
  );
}
