/**
 * Shared motion tokens.
 *
 * House rules (see DESIGN.md > Motion):
 *   - one orchestrated entrance, on the hero only
 *   - everywhere else, motion answers something the user did: a hover, a press,
 *     a scroll, a carousel step
 *   - no "fade and slide up" wrapper on every section
 */

/** Easing used for entrances and anything that should settle, not bounce. */
export const EASE_BRAND: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Easing for UI state changes that should feel mechanical and immediate. */
export const EASE_SNAP: [number, number, number, number] = [0.2, 0.9, 0.12, 1];

/** Durations, in seconds, for Framer Motion. */
export const DUR = {
  micro: 0.16,
  state: 0.26,
  enter: 0.62,
  arc: 0.78,
} as const;

export const SPRING_SOFT = {
  type: "spring",
  stiffness: 240,
  damping: 30,
  mass: 0.9,
} as const;

export const SPRING_SNAP = {
  type: "spring",
  stiffness: 420,
  damping: 34,
} as const;

/** Stagger container for the hero's single orchestrated entrance. */
export const orchestrate = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.052, delayChildren: 0.08 },
  },
} as const;

/** Per-word rise used by the hero headline. */
export const wordRise = {
  hidden: { opacity: 0, y: "0.72em", filter: "blur(7px)" },
  show: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: DUR.enter, ease: EASE_BRAND },
  },
} as const;

/** Generic "settle into place" used for hero CTAs and proof chips. */
export const settle = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_BRAND },
  },
} as const;

/**
 * Respects the OS "reduce motion" setting at the component level.
 * Framer Motion's own `useReducedMotion` is preferred inside components; this
 * helper exists for the few places we branch on it during render.
 */
export const reducedVariants = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
} as const;
