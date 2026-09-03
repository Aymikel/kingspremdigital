import { createFileRoute } from "@tanstack/react-router";

const FAQS = [
  {
    q: "Where are you based and do you travel?",
    a: "We are based in Nigeria and travel across the country — Lagos, Ibadan, Abuja, and beyond. Travel costs are quoted transparently in the project brief.",
  },
  {
    q: "How long does a typical project take?",
    a: "A brand identity or 5-page website usually takes 2–4 weeks. Event coverage is same-day capture with edited deliverables in 5–10 days. Larger projects get a custom timeline in the proposal.",
  },
  {
    q: "Do you require a deposit?",
    a: "Yes — a 50% deposit confirms the booking, with the balance due on delivery. Enterprise engagements can be structured on a monthly retainer.",
  },
  {
    q: "Can we rent equipment without hiring your crew?",
    a: "Absolutely. Our rental catalogue is available to vetted productions with proof of ID and a refundable damage deposit.",
  },
  {
    q: "Do you cover church services and religious events?",
    a: "Weekly. Live streaming for churches and Christian conferences is one of our core specialties.",
  },
  {
    q: "What if I don't know exactly what I need?",
    a: "Book a free 30-minute consultation. We'll help you scope the right package, and there's no obligation to proceed.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Kingsprem Digital" },
      {
        name: "description",
        content:
          "Answers to common questions about working with Kingsprem Digital: pricing, timelines, deliverables, and more.",
      },
      { property: "og:title", content: "FAQ — Kingsprem Digital" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <span className="mb-6 block font-mono text-xs uppercase tracking-widest text-accent">
          FAQ
        </span>
        <h1 className="max-w-3xl text-balance font-display text-6xl uppercase leading-[0.9] md:text-8xl">
          Answers to what clients ask most.
        </h1>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="divide-y divide-foreground/10 border-y border-foreground/10">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-2xl uppercase leading-tight">
                {f.q}
                <span className="mt-1 font-mono text-accent transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
