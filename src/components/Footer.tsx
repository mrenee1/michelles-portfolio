import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const externalLinks = [
  { name: "Biz Boost Agency", href: "https://thebizboostagency.com/" },
  { name: "Creative Solutions Partners", href: "https://www.creativesolutionspartners.com/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mreneewilliams/" },
];

export function Footer() {
  return (
    <footer className="border-t border-black/[0.04] mt-0">
      <div className="page-container py-16 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="text-lg font-bold tracking-tight text-on-surface font-headline mb-1">
              Michelle Williams
            </div>
            <p className="text-sm text-on-surface-variant">
              &copy; {new Date().getFullYear()} Michelle Williams. Strategy &middot; Systems &middot; Growth.
            </p>
          </div>
          <div className="flex gap-10">
            <Link to="/projects" className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium">
              Projects
            </Link>
            <Link to="/experience" className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium">
              Experience
            </Link>
            <Link to="/contact" className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </div>
        </div>

        <div className="border-t border-black/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3">
            {externalLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-on-surface-variant hover:text-primary transition-colors font-medium inline-flex items-center gap-1.5"
              >
                {link.name}
                <ExternalLink className="w-3 h-3 opacity-40" />
              </a>
            ))}
          </div>
          <p className="text-xs text-on-surface-variant/50 font-medium">
            Built with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
