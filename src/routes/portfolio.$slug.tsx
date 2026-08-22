import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProjectDetail } from "@/lib/content.functions";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: async ({ params }) => {
    const project = await getProjectDetail({ data: { slug: params.slug } });
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project unavailable — Kingsprem Digital" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.title} — Kingsprem Digital`;
    const description =
      loaderData.description.slice(0, 155) || `${loaderData.title} by Kingsprem Digital.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center text-muted-foreground">
      We couldn't load this project. Please refresh the page.
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="mb-4 font-display text-4xl uppercase">Project not found</h1>
      <Link to="/portfolio" className="font-mono text-xs uppercase tracking-widest text-accent">
        Back to portfolio
      </Link>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const p = Route.useLoaderData();

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Link
          to="/portfolio"
          className="mb-8 inline-block font-mono text-xs uppercase tracking-widest text-accent"
        >
          ← All work
        </Link>
        <h1 className="max-w-4xl text-balance font-display text-5xl uppercase leading-[0.95] md:text-7xl">
          {p.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">{p.description}</p>

        <dl className="mt-10 grid gap-6 border-t border-foreground/10 pt-6 font-mono text-xs uppercase tracking-widest sm:grid-cols-3">
          {p.service && (
            <div>
              <dt className="text-muted-foreground">Service</dt>
              <dd className="mt-1">
                <Link to="/services/$slug" params={{ slug: p.service.slug }} className="text-accent">
                  {p.service.name}
                </Link>
              </dd>
            </div>
          )}
          {p.client_name && (
            <div>
              <dt className="text-muted-foreground">Client</dt>
              <dd className="mt-1">{p.client_name}</dd>
            </div>
          )}
          {p.project_date && (
            <div>
              <dt className="text-muted-foreground">Date</dt>
              <dd className="mt-1">
                {new Date(p.project_date).toLocaleDateString("en-NG", {
                  month: "long",
                  year: "numeric",
                })}
              </dd>
            </div>
          )}
        </dl>
      </section>

      {p.video_url && (
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <video
            src={p.video_url}
            controls
            playsInline
            preload="metadata"
            className="max-h-[80vh] w-full bg-secondary object-contain"
          />
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 pb-24">
        {p.media.length === 0 && !p.cover_url && !p.video_url ? (
          <p className="border border-dashed border-foreground/20 p-16 text-center text-muted-foreground">
            Media for this project is coming soon.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {(p.media.length ? p.media : p.cover_url
              ? [{ id: "cover", url: p.cover_url, media_type: "image", caption: null }]
              : []
            ).map((m) => (
              <figure key={m.id} className="space-y-3">
                <div className="overflow-hidden bg-secondary">
                  {m.media_type === "video" ? (
                    <video
                      src={m.url}
                      controls
                      playsInline
                      preload="metadata"
                      className="max-h-[80vh] w-full object-contain"
                    />
                  ) : (
                    <img
                      src={m.url}
                      alt={m.caption ?? p.title}
                      loading="lazy"
                      className="max-h-[80vh] w-full object-contain"
                    />
                  )}
                </div>
                {m.caption && (
                  <figcaption className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {m.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </section>

      <section className="bg-foreground py-24 text-background">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-8 font-display text-5xl uppercase leading-tight md:text-6xl">
            Let's build yours next.
          </h2>
          <Link
            to="/contact"
            className="inline-block bg-accent px-8 py-4 font-bold uppercase tracking-tighter text-accent-foreground"
          >
            Start a Project
          </Link>
        </div>
      </section>
    </div>
  );
}
