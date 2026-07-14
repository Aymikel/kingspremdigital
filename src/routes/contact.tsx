import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Pro-Visual Media, Akure" },
      {
        name: "description",
        content:
          "Contact Pro-Visual Media in Akure, Ondo State. Get a free quote, or reach us by phone, email, or WhatsApp.",
      },
      { property: "og:title", content: "Contact — Pro-Visual Media" },
      {
        property: "og:description",
        content: "Get in touch to start a project or request a quote.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(6, "Enter a valid phone").max(30),
  service: z.string().min(1, "Choose a service"),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

const SERVICES = [
  "Website Design",
  "Graphic Design",
  "Live Streaming",
  "Photography",
  "Videography",
  "Equipment Rental",
  "Not sure yet",
];

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    const result = schema.safeParse(data);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    // No backend wired — simulate submission
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Message sent. We'll respond within 24 hours.");
      (e.target as HTMLFormElement).reset();
    }, 700);
  }

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <span className="mb-6 block font-mono text-xs uppercase tracking-widest text-accent">
          Contact
        </span>
        <h1 className="max-w-4xl text-balance font-display text-6xl uppercase leading-[0.9] md:text-8xl">
          Let's work together.
        </h1>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 pb-24 md:grid-cols-2">
        <div className="space-y-8">
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
            <a href="tel:+2348000000000" className="text-lg hover:underline">
              +234 800 000 0000
            </a>
          </div>
          <div>
            <div className="mb-1 font-mono text-xs uppercase text-accent">
              Email
            </div>
            <a
              href="mailto:hello@pro-visual.ng"
              className="text-lg underline"
            >
              hello@pro-visual.ng
            </a>
          </div>
          <div>
            <div className="mb-1 font-mono text-xs uppercase text-accent">
              Working Hours
            </div>
            <div className="text-lg">Mon – Fri, 8:00 AM – 6:00 PM</div>
            <div className="text-lg">Sat, 9:00 AM – 3:00 PM</div>
          </div>
          <a
            href="https://wa.me/2348000000000"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-accent px-6 py-3 text-sm font-bold uppercase tracking-widest text-accent-foreground"
          >
            Chat on WhatsApp
          </a>

          <div className="mt-10 aspect-[4/3] bg-secondary p-8">
            <div className="flex h-full flex-col justify-between">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Studio Location
              </div>
              <div>
                <div className="font-display text-3xl uppercase leading-none">
                  Akure
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Ondo State · Nigeria · 7.2571° N, 5.2058° E
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6 bg-card p-10 shadow-xl shadow-black/5">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Name
              </label>
              <input
                name="name"
                type="text"
                required
                maxLength={100}
                className="border-b border-foreground/10 bg-transparent py-2 transition-colors focus:border-accent focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                maxLength={255}
                className="border-b border-foreground/10 bg-transparent py-2 transition-colors focus:border-accent focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Phone
            </label>
            <input
              name="phone"
              type="tel"
              required
              maxLength={30}
              className="border-b border-foreground/10 bg-transparent py-2 transition-colors focus:border-accent focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Service Needed
            </label>
            <select
              name="service"
              required
              defaultValue=""
              className="border-b border-foreground/10 bg-transparent py-2 transition-colors focus:border-accent focus:outline-none"
            >
              <option value="" disabled>
                Choose a service
              </option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={5}
              maxLength={1000}
              className="border-b border-foreground/10 bg-transparent py-2 transition-colors focus:border-accent focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-foreground py-4 font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </div>
  );
}
