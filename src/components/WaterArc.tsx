"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

import { DUR, EASE_BRAND } from "@/lib/motion";

/**
 * The water arc.
 *
 * This is the site's one signature gesture, and it is taken straight from the
 * logo: a blue spray arc sweeping across the wordmark. It is drawn once — on the
 * hero — plus a quieter, scroll-triggered version in the closing band. Nothing
 * else on the page uses it, which is what keeps it feeling like a signature
 * rather than decoration.
 *
 * The mist is plain circles rather than an SVG blur filter: a real gaussian blur
 * over this area is one of the few things that reliably stutters on a mid-range
 * phone, and layered strokes read almost identically at this size.
 */

type Droplet = {
  /** Start position on the arc, in viewBox units. */
  cx: number;
  cy: number;
  r: number;
  /** Drift away from the arc as the spray fans out. */
  dx: number;
  dy: number;
};

const DROPLETS: readonly Droplet[] = [
  { cx: 62, cy: 308, r: 1.4, dx: -22, dy: -18 },
  { cx: 90, cy: 288, r: 1.8, dx: -16, dy: -26 },
  { cx: 120, cy: 250, r: 2.2, dx: -10, dy: -34 },
  { cx: 150, cy: 214, r: 1.6, dx: -4, dy: -42 },
  { cx: 186, cy: 182, r: 3, dx: 2, dy: -50 },
  { cx: 224, cy: 156, r: 2, dx: 8, dy: -56 },
  { cx: 268, cy: 140, r: 3.6, dx: 10, dy: -62 },
  { cx: 312, cy: 131, r: 1.8, dx: 12, dy: -66 },
  { cx: 356, cy: 128, r: 2.6, dx: 14, dy: -64 },
  { cx: 404, cy: 129, r: 3.2, dx: 16, dy: -58 },
  { cx: 452, cy: 134, r: 1.7, dx: 18, dy: -52 },
  { cx: 500, cy: 146, r: 2.4, dx: 20, dy: -46 },
  { cx: 548, cy: 166, r: 1.5, dx: 24, dy: -38 },
  { cx: 596, cy: 194, r: 2.8, dx: 26, dy: -30 },
  { cx: 646, cy: 218, r: 1.9, dx: 28, dy: -24 },
  { cx: 690, cy: 190, r: 2.2, dx: 30, dy: -20 },
];

const ARC_PATH =
  "M -40 322 C 150 322 212 130 392 128 C 546 126 612 216 760 146";

export function WaterArc({
  variant = "hero",
  className = "",
}: {
  variant?: "hero" | "band";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const rawId = useId();
  // useId() contains colons, which are not safe inside url(#…) references.
  const uid = rawId.replace(/:/g, "");

  const isHero = variant === "hero";
  const draw = isHero ? DUR.arc : 0.9;

  const strokeAnim = (delay: number) =>
    reduce
      ? { pathLength: 1 }
      : {
          pathLength: [0, 1],
          transition: { duration: draw, ease: EASE_BRAND, delay },
        };

  /** Hero draws on load; the closing band draws when it scrolls into view. */
  const trigger = (delay: number) =>
    isHero
      ? { animate: strokeAnim(delay) }
      : {
          whileInView: strokeAnim(delay),
          viewport: { once: true, amount: 0.4 },
        };

  const mistTarget = (drop: Droplet) => ({
    opacity: 0.55,
    x: drop.dx,
    y: drop.dy,
    scale: 1,
  });

  const mistTrigger = (drop: Droplet) =>
    isHero
      ? { animate: mistTarget(drop) }
      : {
          whileInView: mistTarget(drop),
          viewport: { once: true, amount: 0.4 },
        };

  const mistTransition = (i: number) =>
    reduce
      ? { duration: 0 }
      : {
          type: "spring" as const,
          stiffness: 190,
          damping: 22,
          delay: 0.42 + i * 0.035,
        };

  return (
    <svg
      viewBox="0 0 720 420"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={`${uid}core`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b2d4e8" stopOpacity="0" />
          <stop offset="14%" stopColor="#b2d4e8" />
          <stop offset="52%" stopColor="#81b5cc" />
          <stop offset="100%" stopColor="#22495c" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`${uid}breath`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#81b5cc" stopOpacity="0" />
          <stop offset="40%" stopColor="#81b5cc" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#173441" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Wide breath under the arc — stands in for a blur, at a fraction of the cost. */}
      <motion.path
        d={ARC_PATH}
        stroke={`url(#${uid}breath)`}
        strokeWidth={isHero ? 34 : 24}
        fill="none"
        initial={{ pathLength: reduce ? 1 : 0 }}
        {...trigger(0)}
      />

      {/* Core. */}
      <motion.path
        d={ARC_PATH}
        stroke={`url(#${uid}core)`}
        strokeWidth={isHero ? 7 : 5}
        fill="none"
        initial={{ pathLength: reduce ? 1 : 0 }}
        {...trigger(0.04)}
      />

      {/* Catch-light: one soft flash along the wet arc after it lands. */}
      <motion.path
        d={ARC_PATH}
        stroke="#eef7fb"
        strokeWidth={isHero ? 1.6 : 1.2}
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: reduce ? 0.3 : [0, 0.34, 0] }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.95 }}
      />

      {/* Spray mist. */}
      <g>
        {DROPLETS.map((drop, i) => (
          <motion.circle
            key={`${drop.cx}-${drop.cy}`}
            cx={drop.cx}
            cy={drop.cy}
            r={drop.r}
            fill={i % 3 === 0 ? "#b2d4e8" : "#81b5cc"}
            initial={
              reduce
                ? { opacity: 0.5, x: drop.dx, y: drop.dy }
                : { opacity: 0, x: 0, y: 0, scale: 0.4 }
            }
            {...mistTrigger(drop)}
            transition={mistTransition(i)}
          />
        ))}
      </g>
    </svg>
  );
}

export function WaterArcBand({ className = "" }: { className?: string }) {
  return <WaterArc variant="band" className={className} />;
}