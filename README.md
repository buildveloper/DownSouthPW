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

## Light and dark mode

The site ships with both themes and a toggle in the header (and in the mobile
menu). Default is **dark** — the owner's logo is a white badge on a black ground,
so dark is the brand's native presentation. A visitor's choice is stored in
`localStorage` and re-applied before first paint, so there is no flash.

How it works, for future edits:

- Every component reads **semantic tokens** (`bg-page`, `text-fg`,
  `border-line`, `accent`…), never raw `ink-*` / `silver-*` ramp values.
- `html[data-theme="light"]` overrides those same variables in
  `@layer base` — see `src/app/globals.css`.
- The full token table and the reasoning behind it is in
  [`DESIGN.md` § 9](./DESIGN.md).

The toggle itself (`src/components/ThemeToggle.tsx`) holds **no React state**: the
theme lives on `document.documentElement[data-theme]`, set by a tiny inline script
as the first node of `<body>`. That is why there is no theme flash and no
hydration mismatch. `suppressHydrationWarning` on `<html>` covers the one
attribute that script may change.

To make light the default instead, edit `themeInitScript` in
`src/components/ThemeToggle.tsx`.

## Turning the quote form on

The form is wired to `/api/quote`, which tries several delivery routes in order
(`src/app/api/quote/route.ts`). It works with **zero configuration**, but the
default provider needs a one-time activation:

### 1. Default: FormSubmit (no account, no API key)

Leads are forwarded to `downsouthpressurewashing@yahoo.com`.

> **One action required.** The first time anyone submits the form, FormSubmit
> emails that address asking for confirmation. Click **Activate** once and every
> lead after that lands in the inbox automatically. Until then, submissions are
> not delivered — the site cannot do this for you.

To change the destination, set `QUOTE_TO_EMAIL` in `.env.local`.

Uploaded photos are attached to the email. Test it after activating by sending one
real submission with a photo.

### 2. Optional upgrade: Resend

Set `RESEND_API_KEY` and `QUOTE_FROM_EMAIL` in `.env.local` and Resend replaces
FormSubmit — a properly formatted email with photo attachments, plus a reply-to
on the customer. Verify your sending domain in Resend first.

### 3. Optional: SMS notification

Set the four Twilio variables in `.env.local` and every lead also arrives as a
text, so a lead never sits unread in an inbox.

### Whatever happens, no lead is silently lost

- Every valid submission is also written to the server log as
  `[quote] new lead {…}`, and best-effort to `data/leads.jsonl`.
- If no email channel succeeds, the API returns a failure and the visitor sees a
  call / text / pre-filled-email fallback — so a lead can call instead of
  disappearing.

### Testing it

```bash
npm run build && npm start
```

Then, without emailing anyone:

```bash
# invalid → 422 with per-field errors
curl -X POST localhost:3000/api/quote -d "name=A&phone=12" -H "Content-Type: application/x-www-form-urlencoded"
# honeypot → 200, nothing sent
curl -X POST localhost:3000/api/quote -d "name=Bot&phone=9105551234&service=house-washing&company=botcorp" -H "Content-Type: application/x-www-form-urlencoded"
```

Send one real submission yourself afterwards to confirm delivery end to end.

## Before you launch

The page itself lists every open item in the footer under
**"Before you launch — 6 items to confirm"** (expand it). Each one is also marked
inline with a small amber `†`. That list lives in `draftFlags` in
`src/lib/site.ts`; delete an entry there and remove the matching `DraftFlag`
prop at the call site.

| Open item | Why it cannot be guessed |
|---|---|
| Licensed & insured | Publishing a licence claim without confirming it would be a false statement |
| Service area | "Wade, NC & surrounding areas" is a stand-in for the real counties / radius |
| Services list | Drafted from standard scope, including the deck re-sanding and gutter-flush add-ons |
| Testimonials | Three clearly-labelled sample reviews, with no invented customer names |
| Hours | Footer line only; remove it if the business does not want hours published |
| Lead delivery | FormSubmit needs its one-time activation (above) |

## Deploying

The site deploys as-is to Vercel (or any host that runs `next build`).

1. Set `NEXT_PUBLIC_SITE_URL` to the real domain once it exists — this drives
   canonical URLs, Open Graph tags, `robots.txt` and `sitemap.xml`.
2. Set the quote-delivery variables you are using (`.env.local` locally, project
   settings on Vercel).
3. Submit one real quote request and click FormSubmit's activation link.
4. Replace the sample reviews.

Note: `data/leads.jsonl` is a local development convenience. On a serverless host
the filesystem is read-only, so the log line in the hosting dashboard is the
durable record — which is exactly why email delivery is the real path.

## Verification performed

- `npm run build` — clean production build; `/` prerenders as static,
  `/api/quote` is dynamic, TypeScript passes with no errors.
- Served the production build and checked: hero copy, every section, the logo in
  header/hero/footer, both photo galleries, the quote form, the theme attribute
  and the toggle script, `robots.txt`, `sitemap.xml`, the favicon, the 404 page
  and the security headers.
- `/api/quote`: invalid input → `422` with per-field errors; honeypot submissions
  → `200` with nothing sent.
- Both themes and `prefers-reduced-motion` are handled in CSS and in
  `MotionConfig`.