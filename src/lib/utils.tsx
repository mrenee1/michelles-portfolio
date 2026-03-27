import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useState, useCallback, useMemo, createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Production site origin (canonical URLs, Open Graph). */
export const SITE_ORIGIN = "https://mreneewilliams.com";

const BRAND = "Michelle Williams";

const DEFAULT_DESCRIPTION =
  "I'm Michelle Williams, a digital strategist, systems builder, and founder. 16+ years turning strategy, web development, automation, and AI into measurable business results.";

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  const selector = attr === "name" ? `meta[name="${key}"]` : `meta[property="${key}"]`;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Updates document title, meta description, canonical URL, and Open Graph / Twitter tags per route (SPA-friendly).
 */
export function usePageMeta(title?: string, description?: string) {
  const { pathname } = useLocation();
  const canonicalUrl = `${SITE_ORIGIN}${pathname === "/" ? "/" : pathname.replace(/\/$/, "") || "/"}`;

  useEffect(() => {
    const desc = description ?? DEFAULT_DESCRIPTION;
    const fullTitle = title ? `${title} | ${BRAND}` : `${BRAND} | Strategy · Systems · Growth`;

    document.title = fullTitle;

    setMetaTag("name", "description", desc);
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", desc);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:image", `${SITE_ORIGIN}/og-image.png`);

    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", desc);
    setMetaTag("name", "twitter:image", `${SITE_ORIGIN}/og-image.png`);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
  }, [title, description, canonicalUrl]);
}

type Theme = "light" | "dark";

type ThemeCtx = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeCtx>({ theme: "light", toggle: () => {} });

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
    const timer = setTimeout(() => root.classList.remove("theme-transition"), 500);
    return () => clearTimeout(timer);
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
