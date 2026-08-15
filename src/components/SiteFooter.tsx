import { Link } from "@tanstack/react-router";
import kdLogoNavy from "../assets/kd-logo-navy.jpg.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-ink px-6 pt-20 pb-10 text-ink-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <img
                src={kdLogoNavy.url}
                alt="Kingsprem Digital logo"
                className="h-11 w-11 object-contain"
              />
              <span className="font-display text-2xl font-bold tracking-tight">
                KINGSPREM DIGITAL
              </span>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-ink-foreground/60">
              We provide professional web design, branding, photography,
              videography, live streaming, and media equipment rental services
              across Nigeria — from our studio in Akure, Ondo State.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex max-w-sm gap-0 border-b border-ink-foreground/20 pb-1"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent py-2 text-sm placeholder:text-ink-foreground/30 focus:outline-none"
                required
              />
              <button className="font-mono text-[10px] uppercase tracking-widest text-accent">
                Subscribe →
              </button>
            </form>
          </div>

          <div>
            <h5 className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              Quick Links
            </h5>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link to="/" className="hover:text-accent">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-accent">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-accent">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-accent">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-accent">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-accent">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              Services
            </h5>
            <ul className="space-y-3 text-sm font-medium">
              <li>Website Design</li>
              <li>Graphic Design</li>
              <li>Live Streaming</li>
              <li>Photography</li>
              <li>Videography</li>
              <li>Equipment Rental</li>
            </ul>

            <h5 className="mt-8 mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              Follow Us
            </h5>
            <div className="flex gap-4 text-sm">
              <a href="#" className="hover:text-accent">
                Facebook
              </a>
              <a href="#" className="hover:text-accent">
                Instagram
              </a>
              <a href="#" className="hover:text-accent">
                LinkedIn
              </a>
              <a href="#" className="hover:text-accent">
                YouTube
              </a>
              <a href="#" className="hover:text-accent">
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-ink-foreground/5 pt-10 md:flex-row">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-foreground/40">
            © 2026 Kingsprem Digital. All rights reserved. — Akure, Nigeria
          </div>
          <div className="flex items-center gap-3">
            <div className="size-2 animate-pulse rounded-full bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-foreground/60">
              Now booking projects
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
