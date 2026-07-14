import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Pro-Visual Media" },
      {
        name: "description",
        content:
          "Insights on design, media, branding, and technology from the Pro-Visual studio.",
      },
      { property: "og:title", content: "Journal — Pro-Visual Media" },
      {
        property: "og:description",
        content: "Articles on design, media, branding, and technology.",
      },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const POSTS = [
  {
    t: "Why Every Business Needs a Professional Website in 2026",
    cat: "Web Design",
    read: "6 min read",
    date: "Jun 12, 2026",
    excerpt:
      "Your website is the front door of your business. Here's why a professional site is no longer optional for Nigerian SMEs.",
  },
  {
    t: "10 Graphic Design Mistakes Businesses Should Avoid",
    cat: "Branding",
    read: "8 min read",
    date: "May 28, 2026",
    excerpt:
      "From bad logos to mismatched fonts — the design missteps that quietly cost you customers.",
  },
  {
    t: "How to Plan a Successful Live Streaming Event",
    cat: "Live Streaming",
    read: "5 min read",
    date: "May 10, 2026",
    excerpt:
      "The pre-production checklist we use for every conference and church broadcast.",
  },
  {
    t: "Choosing the Right Camera for Your First Product Shoot",
    cat: "Photography",
    read: "7 min read",
    date: "Apr 22, 2026",
    excerpt:
      "You don't need the most expensive body — you need the right glass and lighting.",
  },
  {
    t: "A Church Media Team's Guide to Multi-Cam Streaming",
    cat: "Live Streaming",
    read: "9 min read",
    date: "Apr 05, 2026",
    excerpt:
      "Practical setup notes from streaming 200+ services across Ondo State.",
  },
  {
    t: "Building a Brand That Feels Nigerian and Global",
    cat: "Branding",
    read: "6 min read",
    date: "Mar 18, 2026",
    excerpt:
      "Identity systems that honor local culture without leaning on cliché.",
  },
];

function BlogPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <span className="mb-6 block font-mono text-xs uppercase tracking-widest text-accent">
          Journal
        </span>
        <h1 className="max-w-4xl text-balance font-display text-6xl uppercase leading-[0.9] md:text-8xl">
          Notes from the studio.
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <article
              key={p.t}
              className="group cursor-pointer border-t border-foreground/10 pt-6"
            >
              <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span className="text-accent">{p.cat}</span>
                <span>{p.date}</span>
              </div>
              <h2 className="mb-3 font-display text-2xl uppercase leading-tight group-hover:text-accent">
                {p.t}
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">{p.excerpt}</p>
              <span className="font-mono text-[10px] uppercase tracking-widest">
                {p.read}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-8 font-display text-5xl uppercase leading-tight md:text-6xl">
            Stay in the loop.
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-muted-foreground">
            One considered article a month. No spam. Unsubscribe anytime.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto flex max-w-md gap-2 border-b border-foreground/20 pb-2"
          >
            <input
              type="email"
              placeholder="your@email.com"
              required
              className="flex-1 bg-transparent py-2 focus:outline-none"
            />
            <button className="bg-foreground px-6 py-2 text-sm font-bold uppercase tracking-widest text-background">
              Subscribe
            </button>
          </form>
          <p className="mt-8">
            <Link to="/contact" className="font-mono text-xs uppercase tracking-widest text-accent">
              Or contact the studio →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
