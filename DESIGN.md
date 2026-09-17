# DESIGN.md — Down South Pressure Washing

The source of truth for how this site looks, moves and reads. If a change
disagrees with this document, either the change is wrong or this document needs
updating — but it should never be quietly ignored.

---

## 1. What this is

A one-page marketing site for a real, small, local business: Down South Pressure
Washing, Wade, NC 28395. Before this, the business existed only as a Facebook
page. The visitor is usually standing in their driveway, on a phone, looking at a
stained slab or a green wall, choosing between three local numbers.

That sentence drives almost every decision below. It means:

- **Mobile first, genuinely.** The primary viewport is a ~390px phone on a
  cellular connection, not a 27" monitor on fibre.
- **Proof beats promises.** Pressure washing sells with before-and-after photos,
  so a real one is in the hero and a full gallery sits high on the page.
- **Price is the objection.** "How much?" is the first question everyone has, so
  the form is built around sending a photo and the FAQ answers price first.
- **Phone contact is a first-class path, not a fallback.** Every section offers a
  call option, and a sticky bar puts calling one thumb-tap away.

The visitor is a homeowner first and a commercial property or yard manager
second. They want a number and a date. What earns trust here is real job photos,
a named local town, a person who answers, and no upsell language. What loses it
is stock imagery, invented reviews and "we're passionate about clean" copy.

## 2. How the palette was sampled

Nothing in the palette was chosen by taste. Every brand value was measured from
the owner's actual logo file:

```
/public/logo/491991785_679408204837148_1618388454364210265_n.jpg   (200 x 200)
```

What that file actually contains — and this matters for layout, see §6:

- a **solid black square** ground (`#000000`)
- the artwork is a **white circular badge** inside it
- inside the badge: a **black North Carolina silhouette**, **DOWN SOUTH** in
  heavy condensed caps with a silver/white gradient fill, **PRESSURE WASHING**
  in a light-blue script, and a **blue water arc** with spray sweeping across

Measured by sampling pixels (median of the high-chroma blue pixels, excluding the
anti-aliased fringe):

| Sample | Value | Used for |
|---|---|---|
| Ground / black | `#000000` | logo plate, footer, deepest ink |
| Silver ramp | `#F0F0F0` `#C0C0C0` `#808080` `#515151` | text and line ramps |
| **Core brand blue** | `#81B5CC` | the accent, everywhere |
| Spray highlight | `#B2D4E8` | arc highlight, hover states |
| Deep spray shadow | `#173441` | arc tail, focus ring on light panels |

The blue is the important one: `#81B5CC` is a **steel / silver-blue**, not a
saturated cyan. That is why this does not look like a generic blue-gradient SaaS
page — the accent came off a water arc drawn in a Facebook profile picture.

## 3. Colour system

Two grounds, one accent. Defined once as CSS variables in `@theme`
(`src/app/globals.css`) and consumed only through semantic tokens.

**Ramps** (raw material, never referenced directly by a component):

- `--color-ink-950…500` — the logo's black, lifted into a usable ramp
- `--color-silver-50…500` — the wordmark's white → grey treatment
- `--color-spray-50…900` — the blue arc, with `spray-400 = #81B5CC` as the core

**Semantic tokens** (what components actually use):

| Token | Value | Purpose |
|---|---|---|
| `page` | `#08090b` | default page ground |
| `surface` | `#0e1114` | raised dark band |
| `line` / `line-strong` | `#232a30` / `#333d45` | hairlines and borders |
| `fg` / `fg-muted` / `fg-faint` | silver-100 / -400 / -500 | text hierarchy |
| `accent` | `#81b5cc` | CTAs, links, the arc |
| `accent-ink` | `#06212e` | type on top of the accent |
| `surface-light` | silver-100 | the alternating light bands |
| `draft` | `#e0a63c` | placeholder markers **only** — never brand |

**Contrast**, measured rather than assumed:

- `#81b5cc` on `#06212e` → **9.4:1** — the primary button passes AAA, which is why
  the same button works on black chrome *and* on silver panels
- `silver-400` on `#08090b` → **7.8:1** — all body copy in dark sections
- `#4c575e` on `silver-100` → **7.4:1** — body copy on light panels
- `spray-700` on `silver-100` → **5.6:1** — accents and eyebrows on light panels

**Rules**

1. Never introduce a third ground. Dark and silver alternate; the accent is the
   only colour on either.
2. The accent is for: primary buttons, in-text links, the arc, focus rings,
   active nav, numerals. Not for: body text, large fills, decoration.
3. Amber is reserved for pre-launch placeholder markers. If it appears anywhere
   else, something has gone wrong.

---

## 4. Typography

| Face | Var | Role |
|---|---|---|
| **Anton** | `--font-display` | headlines, step numerals, the pull quote. The logo wordmark's register |
| **Inter** | `--font-sans` | body, forms, UI, captions |
| **Yellowtail** | `--font-script` | the logo's "Pressure Washing" script. Before/after labels only |

All three load through `next/font/google`: self-hosted, no external request, no
layout shift.

**Scale** — fluid, defined once as tokens so nothing is hand-tuned per section:

- `text-display` — `clamp(2.45rem, 7.4vw, 4.85rem)`, line-height 0.92
- `text-h2` — `clamp(1.8rem, 4.3vw, 2.85rem)`
- `text-h3` — `clamp(1.12rem, 2vw, 1.4rem)`
- `text-eyebrow` — 0.72rem, `0.2em` tracking, uppercase
- body — 0.9375–1.125rem, line-height ≈1.6 / captions — 0.8125rem

**Rules**

1. Headlines are uppercase Anton and short enough to read in one breath. If a
   headline needs a comma-spliced clause, it is not a headline.
2. Anton never sets body copy and never appears below 1rem.
3. The script face is seasoning: once per section, maximum. It is the one place
   the hand-made quality of the original logo carries into the page.
4. Measure is capped (`max-w-[17ch]` on the hero, `max-w-2xl` on ledes) so lines
   never run the full width of a desktop.

## 5. Layout and rhythm

- One container: `.shell` — `max-width: 84rem`, padding 1.25rem → 2rem → 2.5rem.
- Section padding `py-16 md:py-24`, consistently, so the page reads as one
  document rather than a stack of panels.
- Grid: 12 columns on desktop via `lg:col-span-*`; a single column on mobile,
  never a squeezed two-up.
- Radii are deliberately tight (2px → 10px). Rounded-everything is the fastest
  way to make a trade business look like a template.
- Galleries scroll horizontally on every breakpoint with a deliberate peek of the
  next tile. Three of five photos crammed into a desktop grid would be too small
  to sell the work.

**Ground alternation** — never two identical panels back to back:

| # | Section | Ground |
|---|---|---|
| 1 | Hero | page (dark) |
| 2 | Trust bar | surface (dark) |
| 3 | Services | light |
| 4 | Before & after | page (dark) |
| 5 | In action | light |
| 6 | How it works | page (dark) |
| 7 | Quote | surface (dark) |
| 8 | Why Down South | light |
| 9 | Reviews | page (dark) |
| 10 | FAQ | light |
| 11 | Final CTA | surface (dark) |
| 12 | Footer | ink-950 (dark) |

---

## 6. Surfaces, depth and the logo

The logo's ground is `#000000`, nearly the page's `#08090b`. That is not a
coincidence: the page colour was chosen to match, so the owner's real artwork can
be dropped in unedited.

**Logo rules** (`src/components/Logo.tsx`):

1. The real file is always used. The artwork is never redrawn, recoloured or
   traced.
2. It is always presented inside a circular clip on a **black plate**
   (`bg-black` + `overflow-hidden rounded-full`). Because the plate matches the
   file's own black ground, the square JPEG's corners vanish and the badge reads
   correctly on dark chrome *and* on light panels.
3. Below ~120px the logo's own lettering is unreadable, so the header and footer
   pair the badge with a typeset lockup: **DOWN SOUTH** in Anton and
   *Pressure Washing* in Yellowtail + `spray-400` — the same two treatments the
   logo itself uses.
4. The hero stamps the badge onto the job photo, the way the owner stamps it onto
   his Facebook posts.

**Depth** is restrained: two shadows total (`shadow-lift`, `shadow-card`), one
inset top highlight, and a ~3% `feTurbulence` grit overlay (`.grit`) on large dark
fields so they read as a surface rather than a flat fill.

## 7. Components

| Component | Responsibility |
|---|---|
| `Button.tsx` | `ctaClasses()` + `CtaLink` / `CtaButton`. Press and hover feedback live here so every CTA on the site feels identical |
| `Section.tsx` | `Section`, `Eyebrow`, `SectionHeading`. Every band on the page goes through it |
| `MediaRail.tsx` | The one gallery: native snap-scroll, focusable rail, scroll-synced progress, tone-aware, optional hover zoom |
| `QuoteForm.tsx` | Client validation, photo previews, honeypot, inline errors, success/failure states |
| `DraftFlag.tsx` | The `†` marker plus the one consolidated "before you launch" panel |
| `Icons.tsx` | Hand-drawn set on one grid, square caps, no rounded joins — no icon dependency |
| `QuoteLink.tsx` | "Price this job": a real anchor first, with a custom event that pre-selects the dropdown |

**Component rules**

1. One component reused beats two lookalikes. This is why there is exactly one
   gallery rather than a separate carousel for each photo set.
2. Hover styles only fire on devices that actually hover, via the `hoverable:`
   variant — so a tap on a phone never leaves a card stuck in its hover state.
3. Every interactive element ships with `hover`, `focus-visible`, `active` and,
   where relevant, `disabled` states before it counts as finished.
4. Nothing is styled inline twice. Shared numbers (radius, shadow, easing,
   duration, colour) come from tokens.

---

## 8. Motion system

**The rule: one orchestrated entrance, then only interaction-triggered motion.**

Motion is allowed when it answers something the reader did or explains structure:

| Allowed | Where |
|---|---|
| Orchestrated entrance | Hero only — arc draws, mist fans out, headline words rise, badge stamps down |
| Scroll-driven draw | The arc returns in the closing band; the 3-step connector draws itself |
| Interaction | Carousel scroll + progress, hover zoom, button press, sticky bar slide-in, nav underline |
| State change | Form submitting → sent; drawer open; active-section highlight |

**Forbidden**

- Fade-and-slide-up on every section. There is no generic "Reveal" wrapper in this
  codebase, on purpose.
- Per-image entrance animations in the galleries. Five staggered reveals would
  make the page feel slower, not richer.
- Motion below the fold that runs on load.

**Curves and durations** (`src/lib/motion.ts`): `EASE_BRAND`
`cubic-bezier(.22,1,.36,1)` for anything that settles; `EASE_SNAP` for UI state;
`SPRING_SOFT` (240/30) for entrances; `SPRING_SNAP` (420/34) for presses. Entrance
0.62s, arc 0.78s, state 0.26s, micro 0.16s.

<!-- NEXT -->