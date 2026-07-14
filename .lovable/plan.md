## Plan: Pro-Visual Creative Media Agency Website

Build a multi-page marketing site using the **Editorial grid** direction (Bebas Neue display + Inter body + JetBrains Mono, cream background, orange accent, black/white contrast, sharp corners).

### 1. Design tokens (`src/styles.css`)
- Replace default theme with editorial palette: `--background` cream (oklch equivalent of hsl(40 20% 97%)), `--foreground` near-black, `--accent` warm orange (hsl(12 85% 50%)).
- Register `--font-display` (Bebas Neue), `--font-body` (Inter), `--font-mono` (JetBrains Mono).
- Add `reveal-up` keyframe.
- Load Google Fonts via `<link>` tag in `__root.tsx` head (per Tailwind v4 rule — no remote `@import`).

### 2. Route structure (TanStack file-based)
Create files under `src/routes/`:
- `index.tsx` — Home (all wireframe sections)
- `about.tsx` — Company story, mission, vision, team, values
- `services.tsx` — Overview + detail cards for all 6 services
- `portfolio.tsx` — Filterable project gallery
- `pricing.tsx` — Packages per service + custom quote CTA
- `blog.tsx` — Article list (static sample content)
- `contact.tsx` — Contact form, details, WhatsApp CTA, map placeholder
- `faq.tsx` — Common questions

Each route sets its own `head()` with unique title/description/og tags.

### 3. Shared components (`src/components/`)
- `SiteNav.tsx` — sticky nav, logo "PRO-VISUAL", 7 menu items, "Get a Quote" button. Uses TanStack `<Link>`.
- `SiteFooter.tsx` — logo + description, Quick Links, Services, Follow Us, Newsletter, copyright.
- `SectionHeader.tsx` — reusable display headline + muted subhead.
- Mount `SiteNav` and `SiteFooter` in `__root.tsx` around `<Outlet />`.

### 4. Home page sections (per wireframe, in order)
1. Hero — eyebrow, giant display headline with orange emphasis on "Solutions", subhead, Get Started + View Portfolio buttons, wide hero image.
2. Trust — headline + 4 grayscale client wordmarks.
3. About — "Who We Are" two-column with Learn More link to `/about`.
4. Services — "Our Arsenal" section with 6 service cards in 3-col grid (hairline dividers, numbered 01–06, hover invert to black). Button → `/services`.
5. Why Choose Us — 6 value props with checkmark bullets in a 2 or 3-col grid.
6. Featured Projects — "The Reel" dark section, editorial mixed-aspect grid (8 project cards). Button → `/portfolio`.
7. Process — 4-step numbered rows with arrow between steps.
8. Testimonials — 3 quote cards with 5-star rating.
9. CTA — "Ready to Bring Your Ideas to Life?" with Get a Free Quote + Contact buttons.
10. Blog Preview — 3 latest article cards. Button → `/blog`.
11. Contact — split layout with office/phone/email/hours + contact form.

### 5. Imagery
Generate hero + service + portfolio images with `imagegen--generate_image`, stored under `src/assets/`. Realistic Nigerian creative-studio photography style. Import as ES6 modules.

### 6. Contact form
Client-side only (no backend). Zod validation for name/email/phone/service/message with length caps. Show toast on submit via existing shadcn sonner.

### 7. SEO / metadata
- Update `__root.tsx` default head: title "Pro-Visual Media — Creative Media Agency in Akure, Nigeria", description, og tags. Add Google Fonts `<link>` here.
- Each leaf route defines route-specific `head()` with matching og:title/description; add og:image only where a hero image is available.

### 8. Out of scope for this plan
- No backend/Cloud, no auth, no CMS. Blog posts and portfolio items are hardcoded arrays.
- No embedded Google Map (placeholder image + address instead — avoids API key requirement).

### Tech notes
- All colors via semantic tokens; no hardcoded `text-white`/`bg-black` in components.
- Route strings must match filenames exactly (e.g. `createFileRoute("/about")`).
- Use `<Link to="/services">` (never `<a href>`) for internal nav.
- Wrap `<Outlet />` in `__root.tsx` with `<SiteNav />` above and `<SiteFooter />` below inside `QueryClientProvider`.
