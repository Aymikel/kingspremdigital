import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight, Star } from "lucide-react";

import heroImg from "../assets/hero-studio.jpg";
import svcWeb from "../assets/service-web.jpg";
import svcGraphic from "../assets/service-graphic.jpg";
import svcStream from "../assets/service-stream.jpg";
import svcRental from "../assets/service-rental.jpg";
import svcPhoto from "../assets/service-photo.jpg";
import svcVideo from "../assets/service-video.jpg";
import projMarket from "../assets/project-market.jpg";
import projBrand from "../assets/project-brand.jpg";
import projChurch from "../assets/project-church.jpg";
import projWeb from "../assets/project-web.jpg";
import projConference from "../assets/project-conference.jpg";
import projWedding from "../assets/project-wedding.jpg";
import projProduct from "../assets/project-product.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const SERVICES = [
  {
    n: "01",
    title: "Website Design",
    desc: "Modern, responsive websites designed to grow your business and attract more customers.",
    img: svcWeb,
  },
  {
    n: "02",
    title: "Graphic Design",
    desc: "Brand identity, logos, flyers, banners, social media designs, business cards, and marketing materials.",
    img: svcGraphic,
  },
  {
    n: "03",
    title: "Live Streaming",
    desc: "Professional live streaming for churches, conferences, weddings, seminars, concerts, and corporate events.",
    img: svcStream,
  },
  {
    n: "04",
    title: "Equipment Rental",
    desc: "High-quality cameras, projectors, LED screens, microphones, sound systems, and lighting for hire.",
    img: svcRental,
  },
  {
    n: "05",
    title: "Photography",
    desc: "Professional photography for weddings, birthdays, graduations, corporate branding, products, and events.",
    img: svcPhoto,
  },
  {
    n: "06",
    title: "Videography",
    desc: "Commercial videos, documentaries, event coverage, promotional videos, interviews, and music videos.",
    img: svcVideo,
  },
];

const WHY = [
  { t: "Creative Professionals", d: "Experienced designers and media experts delivering quality work." },
  { t: "Affordable Pricing", d: "Professional services that fit your budget without cutting corners." },
  { t: "Fast Delivery", d: "Projects completed within agreed timelines — no missed deadlines." },
  { t: "Modern Technology", d: "Latest software and cinema-grade equipment on every project." },
  { t: "Customer Satisfaction", d: "We prioritize excellence and long-term relationships over one-off jobs." },
  { t: "Reliable Support", d: "Available before, during, and after project completion." },
];

const PROJECTS = [
  { img: projMarket, title: "The Heart of Ondo", cat: "Documentary", desc: "Cinematic film chronicling market life in Akure.", span: "lg:col-span-2 lg:row-span-2" },
  { img: projBrand, title: "Tech Hub Rebrand", cat: "Branding", desc: "Full visual identity for a growing tech incubator." },
  { img: projChurch, title: "Glory Chapel Live", cat: "Live Streaming", desc: "Multi-cam streaming for a 5,000-seat auditorium." },
  { img: projWeb, title: "Origins Commerce", cat: "Web Design", desc: "E-commerce platform for a lifestyle brand." },
  { img: projConference, title: "Ondo Innovation Summit", cat: "Event Coverage", desc: "Full photo and video coverage of a two-day conference." },
  { img: projWedding, title: "Ade & Tobi Wedding", cat: "Photography", desc: "Traditional and white wedding storytelling." },
  { img: projProduct, title: "Neon Sole Campaign", cat: "Product Video", desc: "Kinetic product film for a sneaker launch." },
];

const PROCESS = [
  { n: "01", t: "Consultation", d: "We understand your goals, audience, and project requirements." },
  { n: "02", t: "Planning", d: "We develop a clear strategy, deliverables, and timeline." },
  { n: "03", t: "Creation", d: "Our creative team designs and produces your project." },
  { n: "04", t: "Delivery", d: "We review, refine, and deliver polished, high-quality results." },
];

const TESTIMONIALS = [
  { q: "The team exceeded our expectations. Professional, creative, and always on time.", who: "Pastor Emeka O.", role: "Church Media Director" },
  { q: "Our new website completely transformed how customers see our business.", who: "Mrs. Ade Bakare", role: "Business Owner" },
  { q: "Their photography and livestream quality were outstanding — worth every naira.", who: "Tunde A.", role: "Event Organizer" },
];

const BLOG = [
  { t: "Why Every Business Needs a Professional Website in 2026", cat: "Web Design", read: "6 min read" },
  { t: "10 Graphic Design Mistakes Businesses Should Avoid", cat: "Branding", read: "8 min read" },
  { t: "How to Plan a Successful Live Streaming Event", cat: "Live Streaming", read: "5 min read" },
];

function Index() {
  return (
    <div className="text-foreground">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-32">
        <div className="animate-reveal">
          <span className="mb-6 block font-mono text-xs uppercase tracking-widest text-accent">
            Akure, Ondo State — Est. 2018
          </span>
          <h1 className="mb-8 text-balance font-display text-6xl leading-[0.9] tracking-tighter uppercase md:text-8xl lg:text-9xl">
            Creative Media <span className="text-accent">Solutions</span> That
            Bring Your Ideas to Life
          </h1>
          <p className="mb-10 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
            We help businesses, churches, organizations, and individuals create
            outstanding digital experiences through web design, branding, live
            streaming, photography, videography, and professional media
            equipment rental.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="bg-accent px-8 py-4 font-bold uppercase tracking-tighter text-accent-foreground transition-transform hover:scale-[1.02]"
            >
              Get Started
            </Link>
            <Link
              to="/portfolio"
              className="border border-foreground/20 px-8 py-4 font-bold uppercase tracking-tighter transition-colors hover:bg-foreground hover:text-background"
            >
              View Portfolio
            </Link>
          </div>
        </div>

        <div className="animate-reveal mt-20 [animation-delay:200ms]">
          <img
            src={heroImg}
            alt="Pro-Visual media crew filming with a cinema camera in the Akure studio"
            width={1600}
            height={900}
            className="aspect-video w-full rounded-sm object-cover outline outline-black/5"
          />
        </div>
      </section>

      {/* Trust */}
      <section className="border-y border-foreground/5 bg-secondary py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-6 md:flex-row">
          <p className="max-w-sm font-display text-2xl uppercase leading-none">
            Trusted by businesses, churches &amp; organizations
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 opacity-40 grayscale">
            <div className="font-display text-3xl">RCCG CITY</div>
            <div className="font-display text-3xl">ONDO TECH</div>
            <div className="font-display text-3xl">ELITE BIZ</div>
            <div className="font-display text-3xl">AKURE HUB</div>
            <div className="font-display text-3xl">FOWA GROUP</div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-2">
        <div>
          <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-accent">
            Who We Are
          </span>
          <h2 className="font-display text-5xl uppercase leading-none md:text-6xl">
            A creative media company built in Akure.
          </h2>
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            We are a creative media company based in Akure, Ondo State,
            dedicated to helping brands communicate effectively through
            innovative design, digital technology, and visual storytelling.
          </p>
          <p>
            Our mission is to provide affordable, professional, and high-quality
            media solutions that inspire confidence and drive results — for
            organizations of every size.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 border-b-2 border-accent pb-1 font-mono text-xs uppercase tracking-[0.2em] text-foreground hover:text-accent"
          >
            Learn more about the studio <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-accent">
              Our Services
            </span>
            <h2 className="font-display text-6xl uppercase leading-none">
              Our Arsenal
            </h2>
          </div>
          <p className="max-w-md font-medium text-muted-foreground">
            Integrated media capabilities designed to scale with your
            organization's ambition — from a single flyer to a multi-city event.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px border border-foreground/5 bg-foreground/5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.n}
              className="group bg-background p-8 transition-colors hover:bg-foreground hover:text-background"
            >
              <span className="mb-12 block font-mono text-xs text-accent">
                {s.n} /
              </span>
              <h3 className="mb-4 font-display text-3xl uppercase">{s.title}</h3>
              <p className="mb-8 text-sm leading-relaxed opacity-80">
                {s.desc}
              </p>
              <div className="h-40 overflow-hidden bg-secondary group-hover:bg-white/10">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="border-b-2 border-accent pb-1 font-mono text-xs uppercase tracking-[0.2em] hover:text-accent"
          >
            View all services →
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-accent">
              Why Choose Us
            </span>
            <h2 className="font-display text-6xl uppercase leading-none">
              Why clients keep coming back
            </h2>
          </div>
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w) => (
              <div key={w.t} className="border-t border-foreground/10 pt-6">
                <div className="mb-4 flex size-8 items-center justify-center bg-accent text-accent-foreground">
                  <Check size={16} strokeWidth={3} />
                </div>
                <h3 className="mb-2 font-display text-2xl uppercase leading-tight">
                  {w.t}
                </h3>
                <p className="text-sm text-muted-foreground">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-foreground py-24 text-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-accent">
                Featured Projects
              </span>
              <h2 className="font-display text-6xl uppercase leading-none">
                The Reel
              </h2>
            </div>
            <div className="hidden font-mono text-xs opacity-50 md:block">
              SELECTED WORK / 2024–2026
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PROJECTS.map((p, i) => (
              <div
                key={p.title}
                className={`space-y-3 ${p.span ?? ""} ${i === 0 ? "" : ""}`}
              >
                <div
                  className={`overflow-hidden bg-white/5 ${i === 0 ? "aspect-[4/5]" : "aspect-[3/4]"}`}
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-xl uppercase leading-tight">
                      {p.title}
                    </p>
                    <p className="mt-1 text-xs text-white/50">{p.desc}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-accent">
                    {p.cat}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/portfolio"
              className="inline-block bg-accent px-8 py-4 font-bold uppercase tracking-tighter text-accent-foreground"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16">
          <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-accent">
            How We Work
          </span>
          <h2 className="font-display text-6xl uppercase leading-none">
            A simple, considered process
          </h2>
        </div>
        <div className="space-y-px border-y border-foreground/10 bg-foreground/10">
          {PROCESS.map((step, i) => (
            <div
              key={step.n}
              className="grid grid-cols-12 items-center gap-6 bg-background py-8"
            >
              <div className="col-span-2 font-mono text-sm text-accent md:col-span-1">
                {step.n}
              </div>
              <div className="col-span-10 md:col-span-4">
                <h3 className="font-display text-3xl uppercase leading-none">
                  {step.t}
                </h3>
              </div>
              <div className="col-span-12 text-muted-foreground md:col-span-6">
                {step.d}
              </div>
              <div className="col-span-12 hidden justify-end md:col-span-1 md:flex">
                {i < PROCESS.length - 1 && (
                  <ArrowRight size={18} className="text-foreground/30" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-accent">
              Testimonials
            </span>
            <h2 className="font-display text-6xl uppercase leading-none">
              What our clients say
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.who}
                className="flex flex-col bg-background p-8"
              >
                <div className="mb-6 flex gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mb-8 flex-1 text-lg leading-relaxed">
                  "{t.q}"
                </p>
                <footer>
                  <div className="font-display text-lg uppercase leading-tight">
                    {t.who}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {t.role}
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground py-24 text-background">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="mb-6 text-balance font-display text-6xl uppercase leading-none md:text-8xl">
            Ready to bring your <span className="text-accent">ideas</span> to
            life?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/60">
            Whether you're launching a brand, organizing an event, or growing
            your online presence, we're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-accent px-8 py-4 font-bold uppercase tracking-tighter text-accent-foreground"
            >
              Get a Free Quote
            </Link>
            <Link
              to="/contact"
              className="border border-white/20 px-8 py-4 font-bold uppercase tracking-tighter hover:bg-white hover:text-foreground"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-accent">
              Latest Insights
            </span>
            <h2 className="font-display text-6xl uppercase leading-none">
              From the journal
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden border-b-2 border-accent pb-1 font-mono text-xs uppercase tracking-[0.2em] md:inline-block hover:text-accent"
          >
            Read all →
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {BLOG.map((b) => (
            <article
              key={b.t}
              className="group cursor-pointer border-t border-foreground/10 pt-6"
            >
              <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span className="text-accent">{b.cat}</span>
                <span>{b.read}</span>
              </div>
              <h3 className="font-display text-2xl uppercase leading-tight group-hover:text-accent">
                {b.t}
              </h3>
            </article>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-2"
      >
        <div>
          <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-accent">
            Let's Work Together
          </span>
          <h2 className="mb-8 font-display text-6xl uppercase leading-none">
            Ready to <br />
            <span className="text-accent">create?</span>
          </h2>
          <div className="space-y-6 font-medium">
            <p className="text-muted-foreground">
              We respond to every inquiry within 24 hours. Prefer to talk?
              Call or WhatsApp the studio directly.
            </p>
            <div>
              <div className="mb-1 font-mono text-xs uppercase text-accent">
                Office
              </div>
              <div className="text-lg">Akure, Ondo State, Nigeria</div>
            </div>
            <div>
              <div className="mb-1 font-mono text-xs uppercase text-accent">
                Phone
              </div>
              <div className="text-lg">+234 800 000 0000</div>
            </div>
            <div>
              <div className="mb-1 font-mono text-xs uppercase text-accent">
                Email
              </div>
              <div className="text-lg underline">hello@pro-visual.ng</div>
            </div>
            <div>
              <div className="mb-1 font-mono text-xs uppercase text-accent">
                Hours
              </div>
              <div className="text-lg">
                Mon – Fri, 8:00 – 18:00 · Sat, 9:00 – 15:00
              </div>
            </div>
          </div>
        </div>
        <div>
          <Link
            to="/contact"
            className="block bg-foreground p-10 text-background transition-colors hover:bg-accent"
          >
            <div className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
              Send Inquiry
            </div>
            <div className="font-display text-4xl uppercase leading-tight">
              Start a project brief →
            </div>
            <p className="mt-6 text-sm text-white/60">
              Tell us about your project, timeline, and budget. We'll get back
              within one business day.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
