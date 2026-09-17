/**
 * Single source of truth for business content.
 *
 * Everything marked with `placeholder: true` is draft copy the owner still needs
 * to confirm. The site surfaces those flags in two places:
 *   1. a small `†` marker next to the claim itself (components/DraftFlag.tsx)
 *   2. a "Before you launch" panel in the footer listing every open item
 * Deleting the items from `draftFlags` (plus the matching `flag` props in the
 * components) is all it takes to ship a clean, unflagged site.
 */

export const site = {
  name: "Down South Pressure Washing",
  shortName: "Down South",
  clientName: "Down South PW",
  phone: {
    display: "(910) 273-8654",
    href: "tel:+19102738654",
    sms: "sms:+19102738654",
    /** E.164 form, used by the optional SMS notification integration. */
    e164: "+19102738654",
  },
  email: "downsouthpressurewashing@yahoo.com",
  address: {
    city: "Wade",
    state: "NC",
    zip: "28395",
    line: "Wade, NC 28395",
  },
  serviceArea: {
    /** PLACEHOLDER — confirm the exact counties / travel radius. */
    short: "Wade, NC & surrounding areas",
    long: "Wade, NC and the surrounding area — nearby communities across Cumberland and the surrounding counties.",
    placeholder: true,
  },
  /** PLACEHOLDER — confirm licence and insurance details. */
  credentials: {
    label: "Licensed & Insured",
    placeholder: true,
  },
  social: {
    facebook: "https://facebook.com/DownSouthPW",
  },
  /** PLACEHOLDER — confirm real working hours. */
  hours: {
    label: "Mon–Sat, daylight hours",
    placeholder: true,
  },
} as const;

export type Service = {
  id: string;
  index: string;
  title: string;
  /** One line a stranger can understand instantly. */
  summary: string;
  /** Concrete deliverables — no adjectives, no filler. */
  includes: readonly string[];
  /** Scope that still needs confirming. */
  placeholder?: boolean;
};

export const services: readonly Service[] = [
  {
    id: "house-washing",
    index: "01",
    title: "House Washing",
    summary:
      "Low-pressure soft wash that lifts mildew, pollen and road grime off siding and trim without driving water behind it.",
    includes: [
      "Vinyl, brick and fiber-cement siding",
      "Soffits, fascia and shutters",
      "Plants pre-wet, then rinsed down",
    ],
  },
  {
    id: "driveway-sidewalk",
    index: "02",
    title: "Driveway & Sidewalk Cleaning",
    summary:
      "Surface cleaning that pulls algae, tire marks and pine-straw tannin out of concrete and brings the colour back.",
    includes: [
      "Driveways, aprons and curbs",
      "Walkways, steps and patios",
      "Stain pre-treatment where it is needed",
    ],
  },
  {
    id: "deck-patio",
    index: "03",
    title: "Deck & Patio Washing",
    summary:
      "Wood, composite and pavers cleaned at a pressure the material can actually take — and no more than that.",
    includes: [
      "Decking, railings and steps",
      "Composite and paver patios",
      "Re-sanding / sealing available on request",
    ],
    placeholder: true,
  },
  {
    id: "roof-soft-wash",
    index: "04",
    title: "Roof Soft-Washing",
    summary:
      "A shingle-safe soft wash that kills the black streaking instead of blasting it. No high pressure on your roof.",
    includes: [
      "Asphalt shingle stain removal",
      "Soffit and gutter-line brightening",
      "No-pressure application only",
    ],
  },
  {
    id: "gutter-brightening",
    index: "05",
    title: "Gutter Brightening",
    summary:
      "The tiger stripes on the outside of your gutters come off, so the roofline stops being the worst-looking part of the house.",
    includes: [
      "Exterior gutter faces and downspouts",
      "Oxidation and streaking removed",
      "Interior flush available as an add-on",
    ],
    placeholder: true,
  },
  {
    id: "commercial-equipment",
    index: "06",
    title: "Commercial & Equipment",
    summary:
      "Storefronts, walkways and concrete lots — plus trucks, trailers and heavy equipment washed where they sit.",
    includes: [
      "Storefronts, entries and sidewalks",
      "Dumpster pads and concrete lots",
      "Fleet, trailers and equipment",
    ],
  },
];
export const steps = [
  {
    index: "01",
    title: "Request a free quote",
    body: "Call, text, or send the form below with a photo of what needs cleaning. Photos get you the fastest and most accurate number.",
  },
  {
    index: "02",
    title: "We schedule the visit",
    body: "You get a firm price and a day. No vague arrival windows, and no surprise add-ons when the trailer pulls up.",
  },
  {
    index: "03",
    title: "Walk away with a like-new exterior",
    body: "We clean, rinse the plants back down, and you get the before and after photos of the actual job.",
  },
] as const;

export type Reason = {
  id: string;
  title: string;
  body: string;
  placeholder?: boolean;
};

export const reasons: readonly Reason[] = [
  {
    id: "local",
    title: "Locally owned",
    body: "A Wade, NC business — not a franchise call centre. You talk to the person who shows up and does the work.",
  },
  {
    id: "reliable",
    title: "Reliable",
    body: "You get a day and a price, and we hold to both. If weather pushes the job, you hear it from us first.",
  },
  {
    id: "proof",
    title: "Visible results",
    body: "Every job on this page is a real one. Nobody has to take our word for it — look at the photos and judge for yourself.",
  },
  {
    id: "flexible",
    title: "Flexible scheduling",
    body: "Early mornings, evenings and Saturdays where it makes sense — including before-hours commercial work.",
    placeholder: true,
  },
] as const;
/**
 * PLACEHOLDER CONTENT — sample copy only.
 * Real reviews must replace these before launch. Attributions are deliberately
 * generic rather than inventing customer names.
 */
export const testimonials = [
  {
    quote:
      "He showed up when he said he would, and the driveway looks like new concrete. No upselling, no runaround — just did the work.",
    attribution: "Sample review — replace with a real customer quote",
  },
  {
    quote:
      "We had green algae all over the north side of the house and the walkway. It is all gone, and the plants were fine afterwards.",
    attribution: "Sample review — replace with a real customer quote",
  },
  {
    quote:
      "Had him wash two of our trucks and the trailer out at the yard. Worth it — the equipment does not look its age anymore.",
    attribution: "Sample review — replace with a real customer quote",
  },
] as const;

export const faqs = [
  {
    q: "How much does it cost?",
    a: "Every job is priced from photos or a quick look, because the number depends on square footage, how heavy the buildup is and how easy the surface is to reach. Send a few photos and you get a firm price up front — not a range that creeps up when we pull in.",
  },
  {
    q: "Will pressure washing damage my siding or roof?",
    a: "Not the way it is done here. Siding, trim and shingles get a low-pressure soft wash, and the cleaners do the work. High pressure is kept for concrete, where it belongs.",
  },
  {
    q: "Do I need to be home?",
    a: "No. If we can reach an outdoor spigot and the areas being cleaned, go about your day. We will send photos when the job is done.",
  },
  {
    q: "Do you use my water?",
    a: "Yes, we tie into your outdoor spigot. That is standard for the trade, and it works out to a small fraction of a usual water bill.",
  },
  {
    q: "What about my plants and pets?",
    a: "Plants get pre-wet before we start and rinsed down after. Keep pets inside while we are spraying, and let them back out once we have packed up.",
  },
  {
    q: "Do you take commercial work?",
    a: "Yes — storefronts, walkways, dumpster pads and concrete lots, plus trucks, trailers and heavy equipment washed where they sit.",
  },
] as const;
/** Every open question, surfaced in the footer so nothing gets lost. */
export const draftFlags = [
  {
    label: "Licensed & insured",
    note: "Confirm the exact licence and insurance wording, and that we may publish it.",
  },
  {
    label: "Service area",
    note: "Confirm the real counties and/or travel radius instead of “surrounding areas”.",
  },
  {
    label: "Services list",
    note: "Confirm the six services, their scope, and the add-ons (re-sanding / sealing, gutter flush).",
  },
  {
    label: "Testimonials",
    note: "Swap the three sample reviews for real ones — Facebook recommendations work well here.",
  },
  {
    label: "Hours",
    note: "Confirm working hours, or drop the line from the footer entirely.",
  },
  {
    label: "Lead delivery",
    note: "The quote form needs an email provider switched on — see README > “Turning the quote form on”.",
  },
] as const;

/** Convenience for mailto / SMS fallbacks. */
export const contactLine = `${site.phone.display} · ${site.email}`;