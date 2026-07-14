import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 border-b border-foreground/5 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="font-display text-3xl tracking-tighter text-foreground"
        >
          PRO&#8209;VISUAL
        </Link>

        <div className="hidden gap-8 text-sm font-medium uppercase tracking-widest md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="transition-colors hover:text-accent"
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden bg-foreground px-6 py-2 text-sm font-bold uppercase tracking-tighter text-background transition-colors hover:bg-accent md:inline-block"
          >
            Get a Quote
          </Link>
          <button
            aria-label="Toggle menu"
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-foreground/5 bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-foreground/5 py-3 text-sm font-medium uppercase tracking-widest"
                activeProps={{ className: "text-accent" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 bg-foreground px-6 py-3 text-center text-sm font-bold uppercase tracking-tighter text-background"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
