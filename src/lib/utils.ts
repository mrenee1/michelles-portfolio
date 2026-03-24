import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BRAND = "Michelle Williams";

export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${BRAND}` : `${BRAND} | Strategy · Systems · Growth`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) {
      meta.setAttribute("content", description);
    }
  }, [title, description]);
}
