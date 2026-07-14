import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import projMarket from "../assets/project-market.jpg";
import projBrand from "../assets/project-brand.jpg";
import projChurch from "../assets/project-church.jpg";
import projWeb from "../assets/project-web.jpg";
import projConference from "../assets/project-conference.jpg";
import projWedding from "../assets/project-wedding.jpg";
import projProduct from "../assets/project-product.jpg";
import svcStream from "../assets/service-stream.jpg";
import svcGraphic from "../assets/service-graphic.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Pro-Visual Media" },
      {
        name: "description",
        content:
          "Selected work from the Pro-Visual studio: web design, branding, live streaming, photography, and film across Nigeria.",
      },
      { property: "og:title", content: "Portfolio — Pro-Visual Media" },
      {
        property: "og:description",
        content: "A gallery of recent projects from our Akure studio.",
      },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

const CATS = ["All", "Web Design", "Branding", "Live Streaming", "Photography", "Videography"] as const;
type Cat = (typeof CATS)[number];

const ITEMS: { title: string; cat: Cat; img: string; desc: string }[] = [
  { title: "The Heart of Ondo", cat: "Videography", img: projMarket, desc: "Documentary short film." },
  { title: "Tech Hub Rebrand", cat: "Branding", img: projBrand, desc: "Full visual identity system." },
  { title: "Glory Chapel Live", cat: "Live Streaming", img: projChurch, desc: "Multi-cam 4K broadcast." },
  { title: "Origins Commerce", cat: "Web Design", img: projWeb, desc: "E-commerce storefront." },
  { title: "Ondo Innovation Summit", cat: "Photography", img: projConference, desc: "Two-day event coverage." },
  { title: "Ade & Tobi Wedding", cat: "Photography", img: projWedding, desc: "Wedding storytelling." },
  { title: "Neon Sole Campaign", cat: "Videography", img: projProduct, desc: "Product launch film." },
  { title: "City Assembly Stream", cat: "Live Streaming", img: svcStream, desc: "Corporate assembly." },
  { title: "Fowa Group Identity", cat: "Branding", img: svcGraphic, desc: "Logo and collateral." },
];

function PortfolioPage() {
  const [active, setActive] = useState<Cat>("All");
  const filtered = active === "All" ? ITEMS : ITEMS.filter((i) => i.cat === active);

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <span className="mb-6 block font-mono text-xs uppercase tracking-widest text-accent">
          Portfolio
        </span>
        <h1 className="max-w-4xl text-balance font-display text-6xl uppercase leading-[0.9] md:text-8xl">
          Selected work from the studio.
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12 flex flex-wrap gap-2 border-y border-foreground/10 py-6">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                active === c
                  ? "bg-foreground text-background"
                  : "hover:text-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.title} className="group cursor-pointer">
              <div className="mb-4 aspect-[4/5] overflow-hidden bg-secondary">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl uppercase leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {p.desc}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-accent">
                  {p.cat}
                </span>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-24 text-center text-muted-foreground">
            No projects in this category yet.
          </p>
        )}
      </section>

      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-8 font-display text-5xl uppercase leading-tight md:text-6xl">
            Your project could be next.
          </h2>
          <Link
            to="/contact"
            className="inline-block bg-foreground px-8 py-4 font-bold uppercase tracking-tighter text-background hover:bg-accent"
          >
            Start a Project
          </Link>
        </div>
      </section>
    </div>
  );
}
