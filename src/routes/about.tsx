import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "../assets/photos/camera-rig.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Kingsprem Digital, Akure" },
        {
          name: "description",
          content:
            "Our story, mission, and the team behind Kingsprem Digital — a creative media studio in Nigeria.",
        },
      { property: "og:title", content: "About — Kingsprem Digital" },
      {
        property: "og:description",
        content:
          "Meet the creative media studio helping Nigerian brands, churches, and organizations tell better stories.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const VALUES = [
  { t: "Craft", d: "Every deliverable is measured against studio-grade quality — not client tolerance." },
  { t: "Clarity", d: "Transparent pricing, honest timelines, and briefs that leave no guesswork." },
  { t: "Consistency", d: "The same standard whether it's a small event or a multi-city campaign." },
  { t: "Community", d: "Rooted in Akure. Invested in the growth of the region's creative scene." },
];

const TEAM = [
  { n: "Adewale O.", r: "Creative Director" },
  { n: "Ifeoma N.", r: "Lead Designer" },
  { n: "Chuka E.", r: "Head of Production" },
  { n: "Bola A.", r: "Lead Photographer" },
];

function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <span className="mb-6 block font-mono text-xs uppercase tracking-widest text-accent">
          About the studio
        </span>
        <h1 className="mb-10 max-w-4xl text-balance font-display text-6xl uppercase leading-[0.9] md:text-8xl">
          A creative media studio built in Akure, working across Nigeria.
        </h1>
        <img
          src={heroImg.url}
          alt="Inside the Kingsprem Digital studio"
          className="aspect-[21/9] w-full rounded-sm object-cover"
        />
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-2">
        <div>
          <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-accent">
            Our Story
          </span>
          <h2 className="font-display text-4xl uppercase leading-tight">
            Built on craft. Still learning every day.
          </h2>
        </div>
        <div className="space-y-6 text-lg text-muted-foreground">
          <p>
            Kingsprem Digital started as two friends filming Sunday services on a
            borrowed camera. Over the years, we've grown into a full-service
            creative media studio serving churches, businesses, and
            organizations across Nigeria and beyond.
          </p>
          <p>
            We built the studio we wished existed here — one that treats a
            small business brief with the same craft as a national brand
            campaign.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-2">
        <div className="bg-secondary p-10">
          <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-accent">
            Mission
          </span>
          <p className="font-display text-3xl uppercase leading-tight">
            To provide affordable, professional, and high-quality media
            solutions that inspire confidence and drive real business results.
          </p>
        </div>
        <div className="bg-foreground p-10 text-background">
          <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-accent">
            Vision
          </span>
          <p className="font-display text-3xl uppercase leading-tight">
            To be West Africa's most trusted creative media partner — the
            studio brands recommend without hesitation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="mb-16 font-display text-6xl uppercase leading-none">
          Values
        </h2>
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.t} className="border-t border-foreground/10 pt-6">
              <h3 className="mb-3 font-display text-3xl uppercase">{v.t}</h3>
              <p className="text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-16 font-display text-6xl uppercase leading-none">
            The Team
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((t) => (
              <div key={t.n} className="bg-background p-8">
                <div className="mb-6 aspect-square bg-foreground/10" />
                <h3 className="font-display text-2xl uppercase">{t.n}</h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {t.r}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="mb-8 font-display text-5xl uppercase leading-tight md:text-6xl">
          Let's build something worth sharing.
        </h2>
        <Link
          to="/contact"
          className="inline-block bg-accent px-8 py-4 font-bold uppercase tracking-tighter text-accent-foreground"
        >
          Start a project
        </Link>
      </section>
    </div>
  );
}
