"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Site-wide motion policy.
 *
 * `reducedMotion="user"` makes every Framer Motion animation on the site respect
 * the operating system's reduce-motion setting, without each component having to
 * remember. Components that need to branch during render (the hero, the arc)
 * still call useReducedMotion themselves.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}