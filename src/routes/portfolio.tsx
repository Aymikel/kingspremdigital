import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { listProjects, listServices } from "@/lib/content.functions";

export const Route = createFileRoute("/portfolio")({
  loader: async () => {
    const [services, projects] = await Promise.all([listServices(), listProjects()]);
    return { services, projects };
  },
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
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center text-muted-foreground">
      We couldn't load the portfolio right now. Please refresh the page.
    </div>
  ),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { services, projects } = Route.useLoaderData();
  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.service?.slug === active);

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
          {[{ slug: "all", name: "All" }, ...services].map((c) => (
            <button
              key={c.slug}
              onClick={() => setActive(c.slug)}
              className={`px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                active === c.slug ? "bg-foreground text-background" : "hover:text-accent"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.id} className="group">
              <Link to="/portfolio/$slug" params={{ slug: p.slug }}>
                <div
                  className={`mb-4 overflow-hidden bg-secondary ${p.cover_ratio ?? "aspect-[4/5]"}`}
                >
                  {p.video_url ? (
                    <video
                      src={p.video_url}
                      controls
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                  ) : p.cover_url ? (
                    <img
                      src={p.cover_url}
                      alt={`${p.title} — ${p.description}`}
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="px-4 text-center font-display text-2xl uppercase text-foreground/15">
                        {p.title}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl uppercase leading-tight">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-accent">
                    {p.service?.name ?? "Studio"}
                  </span>
                </div>
              </Link>
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
