import { Link, useLocation } from "react-router-dom";
import { cn, useTheme } from "@/src/lib/utils";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav">
      <div className="flex justify-between items-center w-full px-6 md:px-8 py-5 max-w-7xl mx-auto">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-on-surface font-headline"
          onClick={() => setMobileOpen(false)}
        >
          Michelle Williams
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-semibold tracking-wide transition-colors duration-300",
                location.pathname === link.path
                  ? "text-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full text-on-surface-variant hover:text-primary transition-colors duration-200 hover:bg-surface-container-high/60"
          >
            {theme === "light" ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
          </button>
          <Link
            to="/contact"
            className="btn-primary px-6 py-2.5 text-sm"
          >
            Let's Build
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full text-on-surface-variant hover:text-primary transition-colors"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            className="p-2 -mr-2 text-on-surface"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border px-6 pb-8 pt-4 space-y-1" style={{ background: "var(--mobile-bg)" }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block py-3 text-lg font-semibold transition-colors",
                location.pathname === link.path
                  ? "text-primary"
                  : "text-on-surface-variant"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4">
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary justify-center w-full px-6 py-3"
            >
              Let's Build
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
