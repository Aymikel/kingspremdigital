import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getServiceDetail } from "@/lib/content.functions";

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ params }) => {
    const data = await getServiceDetail({ data: { slug: params.slug } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Service unavailable — Kingsprem Digital" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { service } = loaderData;
    const title = `${service.name} — Kingsprem Digital`;
    const description =
      service.description.slice(0, 155) || `${service.name} services by Kingsprem Digital.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center text-muted-foreground">
      We couldn't load this service. Please refresh the page.
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="mb-4 font-display text-4xl uppercase">Service not found</h1>
      <Link to="/services" className="font-mono text-xs uppercase tracking-widest text-accent">
        Back to services
      </Link>
    </div>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service, projects } = Route.useLoaderData();

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Link
          to="/services"
          className="mb-8 inline-block font-mono text-xs uppercase tracking-widest text-accent"
        >
          ← All services
        </Link>
        <h1 className="max-w-4xl text-balance font-display text-6xl uppercase leading-[0.9] md:text-8xl">
          {service.name}
        </h1>
        {service.tagline && (
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {service.tagline}
          </p>
        )}
        <p className="mt-8 max-w-3xl text-lg text-muted-foreground">{service.description}</p>

        {service.includes.length > 0 && (
          <ul className="mt-10 grid max-w-3xl grid-cols-2 gap-y-2 border-t border-foreground/10 pt-6 md:grid-cols-4">
            {service.includes.map((inc) => (
              <li key={inc} className="font-mono text-xs uppercase tracking-widest">
                · {inc}
              </li>
            ))}
          </ul>
        )}
      </section>

      {(service.hero_video_url || service.hero_image_url) && (
        <section className="mx-auto max-w-7xl px-6 pb-16">
          {service.hero_video_url ? (
            <video
              src={service.hero_video_url}
              controls
              playsInline
              preload="metadata"
              className="max-h-[70vh] w-full bg-secondary object-cover"
            />
          ) : (
            <img
              src={service.hero_image_url!}
              alt={service.name}
              className="max-h-[70vh] w-full object-cover"
            />
          )}
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-10 font-display text-4xl uppercase leading-none">
          Projects under {service.name}
        </h2>

        {projects.length === 0 ? (
          <p className="border border-dashed border-foreground/20 p-16 text-center text-muted-foreground">
            No projects published under this service yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
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
                        <span className="font-display text-3xl uppercase text-foreground/15">
                          {p.title}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-2xl uppercase leading-tight">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                  {p.media.length > 1 && (
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-accent">
                      {p.media.length} items in gallery
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-8 font-display text-5xl uppercase leading-tight md:text-6xl">
            Need {service.name.toLowerCase()}?
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
