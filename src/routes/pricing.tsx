import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Kingsprem Digital" },
      {
        name: "description",
        content:
          "Transparent packages for web design, live streaming, photography, videography, and equipment rental. Custom quotes on request.",
      },
      { property: "og:title", content: "Pricing — Kingsprem Digital" },
      {
        property: "og:description",
        content: "Package pricing and custom quotes for creative media services.",
      },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

const PACKAGES = [
  {
    name: "Starter",
    price: "₦250,000",
    tag: "Small businesses",
    features: [
      "5-page responsive website",
      "Logo + basic brand kit",
      "1-day photography session",
      "Social media starter pack",
    ],
  },
  {
    name: "Studio",
    price: "₦850,000",
    tag: "Most popular",
    features: [
      "Full custom website (up to 15 pages)",
      "Complete brand identity",
      "2-day photo & video shoot",
      "Live stream for one event",
      "3 months post-launch support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    tag: "Multi-city campaigns",
    features: [
      "Custom platform development",
      "Multi-event streaming",
      "Documentary production",
      "Dedicated account team",
      "Ongoing retainer available",
    ],
  },
];

const RATES = [
  { label: "Extra photography day", price: "₦80,000" },
  { label: "Extra videography day", price: "₦150,000" },
  { label: "Live stream setup (per event)", price: "from ₦180,000" },
  { label: "Camera rental (per day)", price: "from ₦45,000" },
  { label: "LED screen rental", price: "from ₦120,000" },
  { label: "Sound system", price: "from ₦75,000" },
];

function PricingPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <span className="mb-6 block font-mono text-xs uppercase tracking-widest text-accent">
          Pricing
        </span>
        <h1 className="max-w-4xl text-balance font-display text-6xl uppercase leading-[0.9] md:text-8xl">
          Fair, transparent, no surprises.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
          Start with a package or build a custom scope. Every quote includes
          consultation, revisions, and post-delivery support.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-px border border-foreground/10 bg-foreground/10 md:grid-cols-3">
          {PACKAGES.map((p) => (
            <div
              key={p.name}
              className={`p-10 ${
                p.featured
                  ? "bg-foreground text-background"
                  : "bg-background"
              }`}
            >
              <div className="mb-6 font-mono text-[10px] uppercase tracking-widest text-accent">
                {p.tag}
              </div>
              <h3 className="mb-4 font-display text-5xl uppercase leading-none">
                {p.name}
              </h3>
              <div className="mb-8 font-display text-6xl leading-none tracking-tight">
                {p.price}
              </div>
              <ul className="mb-10 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check
                      size={16}
                      strokeWidth={3}
                      className="mt-0.5 shrink-0 text-accent"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`inline-block w-full px-6 py-3 text-center text-sm font-bold uppercase tracking-widest ${
                  p.featured
                    ? "bg-accent text-accent-foreground"
                    : "bg-foreground text-background hover:bg-accent"
                }`}
              >
                {p.price === "Custom" ? "Request Quote" : "Get Started"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 font-display text-5xl uppercase leading-none">
            À la carte rates
          </h2>
          <div className="divide-y divide-foreground/10 border-y border-foreground/10">
            {RATES.map((r) => (
              <div
                key={r.label}
                className="flex items-baseline justify-between py-4"
              >
                <span className="font-medium">{r.label}</span>
                <span className="font-mono text-sm text-accent">{r.price}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            All prices in Nigerian Naira (NGN). VAT excluded.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="mb-8 font-display text-5xl uppercase leading-tight md:text-6xl">
          Need a custom quote?
        </h2>
        <Link
          to="/contact"
          className="inline-block bg-accent px-8 py-4 font-bold uppercase tracking-tighter text-accent-foreground"
        >
          Request Custom Quote
        </Link>
      </section>
    </div>
  );
}
