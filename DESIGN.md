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

## 9. Themes

There are two themes and a toggle, and both are driven by one attribute:

```
html[data-theme="dark"]   (default)
html[data-theme="light"]
```

Because every component reads semantic tokens (`bg-page`, `text-fg`,
`border-line`) rather than raw ramp values, the whole site re-skins on that
attribute. The ramps — ink, silver, spray — never move, which is what keeps both
themes looking like the same brand.

**What changes, and what deliberately does not**

| Token | Dark | Light |
|---|---|---|
| `page` | `#08090b` | `#f7f9fa` |
| `surface` | `#0e1114` | `#eef1f3` |
| `surface-raised` (cards, panels) | `#05070a` | `#ffffff` |
| `line` / `line-strong` | `#232a30` / `#333d45` | `#dde2e5` / `#c3cbd0` |
| `fg` / `fg-muted` / `fg-faint` | silver / grey | ink / grey |
| `accent` (text + lines) | `#81b5cc` | `#2f647d` |
| `surface-light` (always-light bands) | `#eef1f3` | `#ffffff` |
| `veil` (hover fills) | white 5% | ink 5% |
| `accent-fill` / `accent-ink` (the CTA) | constant | constant |

Three decisions worth understanding:

1. **The accent is two tokens.** `accent-fill` + `accent-ink` are the primary
   button and stay `#81b5cc` / `#06212e` in both themes, so the conversion
   element is the same recognisable object everywhere (and passes AAA on either
   ground, at 9.4:1). `accent` is text and lines, and it darkens to `spray-700`
   in light mode because the sampled blue only measures 2.1:1 on white.
2. **The always-light bands keep fixed ink values.** Services, In Action, Why
   Down South and FAQ are light in both themes, so their `text-ink-900` and
   `border-ink-900/10` classes are correct as written. In light mode the
   alternation becomes silver → white instead of black → silver, so the rhythm
   survives the switch.
3. **The logo never changes.** Its badge always sits on its native black plate
   (`bg-black`), which is why it looks correct in both themes. Likewise, text
   that sits **on a photograph** (the hero caption) keeps fixed silver values,
   because that ground is the photo, not the theme.

**Rules**

- Default is dark: the owner's logo is a white badge on a black ground, so dark
  is the brand's native presentation. A stored choice always wins.
- New components must reference semantic tokens, never `ink-*`/`silver-*` ramps,
  unless the ground is provably constant (a photograph, or the always-light
  bands).

## 10. Accessibility

- **Keyboard:** the galleries are focusable scrollable regions with an
  `aria-label`; controls have full labels including what they drive; the FAQ is
  native `<details>`; the mobile sheet closes on Escape.
- **Focus:** a 2px `focus-visible` outline everywhere — `spray-300` on dark,
  `spray-700` on light bands — plus a skip link.
- **Forms:** every input has a real `<label>`, `aria-invalid` plus
  `aria-describedby` when invalid, inline error text, and focus moves to the
  first invalid field on submit. Errors use `role="alert"`.
- **Contrast** is measured, not assumed (see §3 and §9). The primary CTA passes
  AAA on both grounds.
- **Motion** honours `prefers-reduced-motion` twice (§8).
- **Imagery:** every job photo has descriptive alt text written from what is
  actually visible — describing the *transformation*, not just the subject.
- No carousel library, no modal library, no tab-trap.

---

## 11. Responsive

Designed from a 390px viewport upward, not a desktop layout squeezed down.

- Galleries are snap-scroll rails on **every** breakpoint, with a deliberate peek
  of the next tile so scrollability is obvious without arrows.
- The services grid is 1 → 2 → 3 columns; the quote form is single-column on
  mobile with full-width, 44px+ touch targets.
- The sticky CTA is a bottom bar on mobile (two equal buttons,
  `env(safe-area-inset-bottom)` aware) and a floating pill on desktop.
- Mobile nav is a full-screen sheet, and it also carries the theme toggle.
- The `hoverable:` custom variant keeps hover styling off touch devices, so a tap
  never leaves a card stuck in its hover state.
- Typography is fluid (`clamp()`), so there are no breakpoint text jumps.

---

## 12. Performance

- The page is **static**. One dynamic route: `/api/quote`.
- No icon library, no carousel library, no form library. Runtime dependencies:
  `next`, `react`, `react-dom`, `framer-motion`.
- Fonts self-hosted via `next/font`; no font flash, no layout shift.
- Images are local and served through `next/image` (WebP, responsive `sizes`,
  lazy below the fold, `priority` on the hero only).
- No SVG blur filters: the arc's glow is layered strokes, because a real gaussian
  blur over that area is one of the few effects that reliably stutters on a
  mid-range phone.
- One ambient gradient, in the hero, and nowhere else.

---

## 13. Conversion principles applied

- **Proof before promises.** A real before/after is in the hero; the gallery is
  section 4; "In Action" shows the person who will be on the property.
- **The phone is always one tap away** — header, hero, every section close, the
  sticky bar and the footer, plus an `sms:` link for photo-by-text.
- **Price objection handled up front:** the form asks for a photo instead of a
  site visit, and the FAQ answers "how much" first and honestly.
- **Every service card routes into the quote form** with the service
  pre-selected, so nobody picks the same option twice.
- **No invented numbers.** No "500+ happy customers", no rating aggregate, no
  price ranges. Every claim is either verifiable or flagged.
- **Failure paths are conversion paths.** If the form cannot send, the error
  panel offers call, text and a pre-filled email with the details intact — a
  lead is never lost to a silent failure.

---

## 14. Things to avoid (anti-patterns)

- A third background colour, or a second large gradient.
- Purple-blue AI gradients, glassmorphism, oversized rounded cards.
- An icon per service — the most generic pattern in this trade. Numbered cards
  read like a scope of work instead.
- An icon + heading + paragraph grid where concrete deliverables belong.
- Decorative motion below the fold, or a fade-up wrapper on every section.
- Rounded-everything, `shadow-2xl` on everything, pill buttons.
- Filling gaps with stock photography. There are no stock images in this repo and
  there never should be — the real photos are the entire advantage.
- Copy that could belong to any company in any city.