import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import farmLogo from "../assets/work/farm-logo-full.jpg.asset.json";
import farmLogoAlt from "../assets/work/farm-logo-alt.png.asset.json";
import mistellConv from "../assets/work/mistell-convocation.png.asset.json";
import convInvite from "../assets/work/convocation-invite.png.asset.json";
import letterhead from "../assets/work/maesta-letterhead.jpg.asset.json";
import pastriesCard from "../assets/work/pastries-card.jpg.asset.json";
import mistellReel from "../assets/work/mistell-reel.mp4.asset.json";
import mistellLogo from "../assets/work/mistell-logo.jpg.asset.json";
import mistellLogoNavy from "../assets/work/mistell-logo-navy.jpg.asset.json";
import pastriesMockup from "../assets/work/pastries-card-mockup.png.asset.json";
import divineFlyer from "../assets/work/divine-life-flyer.jpg.asset.json";
import bookCover from "../assets/work/holy-spirit-book-cover.png.asset.json";
import jambFlyer from "../assets/work/jamb-support-flyer.png.asset.json";
import farmLetterhead from "../assets/work/farm-letterhead.jpg.asset.json";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Kingsprem Digital" },
      {
        name: "description",
        content:
          "Selected work from Kingsprem Digital: logo design, flyers, invitations, business cards, letterheads and promo videos for brands across Nigeria.",
      },
      { property: "og:title", content: "Portfolio — Kingsprem Digital" },
      {
        property: "og:description",
        content: "A gallery of recent design and video projects from our Akure studio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

const CATS = [
  "All",
  "Branding",
  "Flyer Design",
  "Stationery",
  "Book Covers",
  "Mockups",
  "Video",
] as const;
type Cat = (typeof CATS)[number];

type Item = {
  title: string;
  cat: Exclude<Cat, "All">;
  src: string;
  desc: string;
  video?: boolean;
  ratio?: string;
};

const ITEMS: Item[] = [
  {
    title: "Excellent Greatness Farm Venture",
    cat: "Branding",
    src: farmLogo.url,
    desc: "Primary circular logo mark for an agro venture.",
    ratio: "aspect-square",
  },
  {
    title: "Excellent Greatness Farm — Alt Mark",
    cat: "Branding",
    src: farmLogoAlt.url,
    desc: "Simplified secondary logo lockup.",
    ratio: "aspect-square",
  },
  {
    title: "Mistell Treats Convocation Flyer",
    cat: "Flyer Design",
    src: mistellConv.url,
    desc: "Celebration menu campaign flyer.",
    ratio: "aspect-square",
  },
  {
    title: "Dr. Busayo Sarah Ige — Convocation",
    cat: "Flyer Design",
    src: convInvite.url,
    desc: "PhD convocation invitation design.",
    ratio: "aspect-square",
  },
  {
    title: "Maesta Graphics Studio Letterhead",
    cat: "Stationery",
    src: letterhead.url,
    desc: "Corporate letterhead layout.",
    ratio: "aspect-[3/4]",
  },
  {
    title: "Pastries Jungle Business Card",
    cat: "Stationery",
    src: pastriesCard.url,
    desc: "Double-sided business card design.",
    ratio: "aspect-[16/10]",
  },
  {
    title: "Mistell Treats Promo Reel",
    cat: "Video",
    src: mistellReel.url,
    desc: "Short-form food promo video.",
    video: true,
    ratio: "aspect-[9/16]",
  },
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
                active === c ? "bg-foreground text-background" : "hover:text-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.title} className="group">
              <div
                className={`mb-4 ${p.ratio ?? "aspect-[4/5]"} overflow-hidden bg-secondary`}
              >
                {p.video ? (
                  <video
                    src={p.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={p.src}
                    alt={`${p.title} — ${p.desc}`}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl uppercase leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
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
