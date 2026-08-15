import { createFileRoute, Link } from "@tanstack/react-router";
import svcWeb from "../assets/service-web.jpg";
import svcGraphic from "../assets/service-graphic.jpg";
import svcStream from "../assets/service-stream.jpg";
import svcRental from "../assets/service-rental.jpg";
import svcPhoto from "../assets/service-photo.jpg";
import svcVideo from "../assets/service-video.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Kingsprem Digital" },
      {
        name: "description",
        content:
          "Web design, graphic design, live streaming, photography, videography, and media equipment rental in Akure and across Nigeria.",
      },
      { property: "og:title", content: "Services — Kingsprem Digital" },
      {
        property: "og:description",
        content:
          "Six integrated media services from a single studio in Akure.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    n: "01",
    title: "Website Design",
    img: svcWeb,
    desc: "Modern, responsive websites — from landing pages to full e-commerce platforms — built to convert and easy to maintain.",
    includes: ["UI/UX design", "Responsive development", "SEO foundations", "Analytics setup"],
  },
  {
    n: "02",
    title: "Graphic Design",
    img: svcGraphic,
    desc: "Full visual identity systems and marketing collateral that make your brand impossible to ignore.",
    includes: ["Logo & identity", "Flyers & banners", "Social media kits", "Print collateral"],
  },
  {
    n: "03",
    title: "Live Streaming",
    img: svcStream,
    desc: "Multi-cam professional streaming for churches, conferences, weddings, seminars, concerts, and corporate events.",
    includes: ["Multi-camera capture", "Broadcast switching", "Multi-platform output", "On-site engineers"],
  },
  {
    n: "04",
    title: "Equipment Rental",
    img: svcRental,
    desc: "Cinema-grade cameras, projectors, LED screens, microphones, sound systems, lighting, laptops, and streaming rigs for hire.",
    includes: ["Camera & lens kits", "Sound systems", "LED walls & projectors", "Lighting packages"],
  },
  {
    n: "05",
    title: "Photography",
    img: svcPhoto,
    desc: "Weddings, birthdays, graduations, corporate branding, products, and events — with an editorial eye.",
    includes: ["Weddings & events", "Corporate portraits", "Product photography", "Editorial shoots"],
  },
  {
    n: "06",
    title: "Videography",
    img: svcVideo,
    desc: "Commercial videos, documentaries, event coverage, promotional videos, interviews, music videos, and social content.",
    includes: ["Commercial films", "Event coverage", "Music videos", "Social content"],
  },
];

function ServicesPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <span className="mb-6 block font-mono text-xs uppercase tracking-widest text-accent">
          Services
        </span>
        <h1 className="max-w-4xl text-balance font-display text-6xl uppercase leading-[0.9] md:text-8xl">
          Six integrated capabilities. One studio.
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="space-y-24">
          {SERVICES.map((s, i) => (
            <div
              key={s.n}
              className={`grid items-center gap-12 md:grid-cols-2 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-sm object-cover"
                />
              </div>
              <div>
                <span className="mb-4 block font-mono text-xs text-accent">
                  {s.n} /
                </span>
                <h2 className="mb-6 font-display text-5xl uppercase leading-none">
                  {s.title}
                </h2>
                <p className="mb-8 text-lg text-muted-foreground">{s.desc}</p>
                <ul className="mb-8 grid grid-cols-2 gap-y-2 border-t border-foreground/10 pt-6">
                  {s.includes.map((inc) => (
                    <li
                      key={inc}
                      className="font-mono text-xs uppercase tracking-widest"
                    >
                      · {inc}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-block bg-foreground px-6 py-3 text-sm font-bold uppercase tracking-widest text-background hover:bg-accent"
                >
                  Request Quote
                </Link>
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
            Book a free 30-minute consultation. We'll help you scope the right
            package for your goal and budget.
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
