import { createFileRoute, Link } from "@tanstack/react-router";
import { listServices } from "@/lib/content.functions";

export const Route = createFileRoute("/services")({
  loader: () => listServices(),
  head: () => ({
    meta: [
      { title: "Services — Kingsprem Digital" },
      {
        name: "description",
        content:
          "Web design, graphic design, live streaming, photography, videography, and media equipment rental across Nigeria.",
      },
      { property: "og:title", content: "Services — Kingsprem Digital" },
      {
        property: "og:description",
        content: "Six integrated media services from a single studio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center text-muted-foreground">
      We couldn't load our services right now. Please refresh the page.
    </div>
  ),
  component: ServicesPage,
});

function ServicesPage() {
  const services = Route.useLoaderData();

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <span className="mb-6 block font-mono text-xs uppercase tracking-widest text-accent">
          Services
        </span>
        <h1 className="max-w-4xl text-balance font-display text-6xl uppercase leading-[0.9] md:text-8xl">
          Integrated capabilities. One studio.
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="space-y-24">
          {services.map((s, i) => (
            <div
              key={s.id}
              className={`grid items-center gap-12 md:grid-cols-2 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                {s.hero_video_url ? (
                  <video
                    src={s.hero_video_url}
                    controls
                    playsInline
                    preload="metadata"
                    className="aspect-[4/3] w-full rounded-sm bg-secondary object-cover"
                  />
                ) : s.hero_image_url ? (
                  <img
                    src={s.hero_image_url}
                    alt={s.name}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-sm object-cover"
                  />
                ) : (
                  <div className="flex aspect-[4/3] w-full items-center justify-center rounded-sm bg-secondary">
                    <span className="font-display text-4xl uppercase text-foreground/15">
                      {s.name}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <span className="mb-4 block font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")} /
                </span>
                <h2 className="mb-6 font-display text-5xl uppercase leading-none">
                  {s.name}
                </h2>
                <p className="mb-8 text-lg text-muted-foreground">{s.description}</p>
                {s.includes.length > 0 && (
                  <ul className="mb-8 grid grid-cols-2 gap-y-2 border-t border-foreground/10 pt-6">
                    {s.includes.map((inc) => (
                      <li key={inc} className="font-mono text-xs uppercase tracking-widest">
                        · {inc}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="inline-block bg-foreground px-6 py-3 text-sm font-bold uppercase tracking-widest text-background hover:bg-accent"
                  >
                    View work
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-block border border-foreground/20 px-6 py-3 text-sm font-medium uppercase tracking-widest hover:bg-secondary"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-foreground py-24 text-background">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-8 font-display text-5xl uppercase leading-tight md:text-6xl">
            Not sure what you need?
          </h2>
          <p className="mb-10 text-lg text-ink-foreground/60">
            Book a free 30-minute consultation. We'll help you scope the right package for
            your goal and budget.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-accent px-8 py-4 font-bold uppercase tracking-tighter"
          >
            Book Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
