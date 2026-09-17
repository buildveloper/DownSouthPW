# Down South Pressure Washing — website

A marketing site for **Down South Pressure Washing**, Wade, NC 28395 — a real
local pressure washing business that previously had a Facebook page and no
website. Built from scratch: Next.js App Router, TypeScript, Tailwind v4,
Framer Motion.

- **Design system:** [`DESIGN.md`](./DESIGN.md) — read this first. It documents the
  palette sampled from the actual logo, the type system, the motion rules, the
  conversion principles and the anti-patterns to avoid.
- **Real content only:** the owner's own logo and real job photography. No stock
  images, no invented statistics, no fake prices.
- **Working quote form:** name, phone, service, photo upload — emails the lead to
  `downsouthpressurewashing@yahoo.com`.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm start            # serve the production build
npm run typecheck    # tsc --noEmit
```

Requires Node 20.9+ (built and verified on Node 24).

## What is where

```
public/
  logo/                       the owner's real logo (badge + square original)
  BeforeAndAfterCollages/     five pre-composed before/after collages (2048²)
  images/                     five real working shots

src/
  app/
    layout.tsx                fonts, metadata, header/footer, JSON-LD
    page.tsx                  the whole page, in reading order
    globals.css               design tokens (@theme) + base + components
    api/quote/route.ts        the quote endpoint (see "Turning the quote form on")
    robots.ts, sitemap.ts, not-found.tsx, icon.png
  components/
    Hero.tsx                  orchestrated entrance + real before/after
    MediaRail.tsx             the one gallery component, used twice
    WaterArc.tsx              the signature water-arc animation
    QuoteForm.tsx             form, validation, photo upload, states
    ...                       TrustBar, Services, BeforeAfter, InAction,
                              HowItWorks, WhyDownSouth, Testimonials, Faq,
                              FinalCTA, SiteHeader, SiteFooter, StickyCTA,
                              Button, Section, Logo, Icons, DraftFlag, QuoteLink
  lib/
    site.ts                   ALL business content: NAP, services, steps,
                              reasons, testimonials, FAQ, draft flags
    media.ts                  image manifest: real paths, alt text, captions
    motion.ts                 easing, springs, hero variants
```

## Editing the content

Almost every word on the page comes from two files. No component needs editing to
change copy.

| What | File |
|---|---|
| Phone, email, address, service area, hours, credentials, Facebook link | `src/lib/site.ts` → `site` |
| The six services + what each includes | `src/lib/site.ts` → `services` |
| The three "how it works" steps | `src/lib/site.ts` → `steps` |
| The four "why us" reasons | `src/lib/site.ts` → `reasons` |
| Reviews | `src/lib/site.ts` → `testimonials` |
| FAQ | `src/lib/site.ts` → `faqs` |
| Photo paths, captions and alt text | `src/lib/media.ts` |
| The outstanding-items list in the footer | `src/lib/site.ts` → `draftFlags` |

**Adding a new job photo:** drop the file into the matching folder under
`public/`, then add one entry to `beforeAfter` or `inAction` in
`src/lib/media.ts`. Both galleries are driven by those arrays, so they pick it up
automatically. Write real alt text — describe what is actually in the photo.

<!-- NEXT -->