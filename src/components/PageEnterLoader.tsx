import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const MIN_MS = 1050;

export function PageEnterLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShow(false);
      return;
    }

    const started = performance.now();
    const done = () => {
      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      window.setTimeout(() => setShow(false), wait);
    };

    if (document.readyState === "complete") done();
    else window.addEventListener("load", done, { once: true });
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="page-enter-loader"
          className="fixed inset-0 z-[600] flex flex-col items-center justify-center gap-8 bg-surface/92 dark:bg-surface/94 backdrop-blur-md"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-busy="true"
          aria-label="Loading"
        >
          <div className="relative flex flex-col items-center">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/45 blur-[72px] sm:h-56 sm:w-56 sm:blur-[88px] md:h-64 md:w-64"
              aria-hidden
            />
            <div className="relative h-36 w-36 overflow-hidden rounded-full border-2 border-primary/25 bg-surface-card shadow-[0_0_40px_rgba(255,0,122,0.35)] ring-4 ring-primary/10 sm:h-44 sm:w-44 md:h-48 md:w-48">
              <img
                src="/headshot.png"
                alt=""
                className="h-full w-full object-cover object-top"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
          <motion.p
            className="font-headline text-sm font-bold uppercase tracking-[0.35em] text-primary"
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
