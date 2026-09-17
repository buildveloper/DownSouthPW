"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";

import { CtaLink } from "@/components/Button";
import { IconPhone } from "@/components/Icons";
import { site } from "@/lib/site";

/**
 * Sticky call to action.
 *
 * Two forms, one rule: it appears once the reader is past the hero, and it gets
 * out of the way the moment the quote form is on screen. A sticky bar that
 * covers the form it is pointing at is the most common way this pattern goes
 * wrong.
 *
 * Both versions are unmounted rather than hidden, so nothing invisible stays in
 * the tab order.
 */
export function StickyCTA() {
  const [pastHero, setPastHero] = useState(false);
  const [formInView, setFormInView] = useState(false);
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (value) => setPastHero(value > 640));

  useEffect(() => {
    const el = document.getElementById("quote");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { rootMargin: "-12% 0px -20% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !formInView;
  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 320, damping: 32 };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="sticky-mobile"
          initial={{ y: 140 }}
          animate={{ y: 0 }}
          exit={{ y: 140 }}
          transition={spring}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-page/95 backdrop-blur-md lg:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <div className="shell flex items-center gap-2 pt-3">
            <CtaLink
              href={site.phone.href}
              variant="outline"
              size="md"
              className="flex-1"
            >
              <IconPhone className="size-4" />
              Call Now
            </CtaLink>
            <CtaLink href="#quote" size="md" className="flex-1">
              Get a Quote
            </CtaLink>
          </div>
        </motion.div>
      ) : null}

      {visible ? (
        <motion.div
          key="sticky-desktop"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={spring}
          className="fixed bottom-8 right-8 z-40 hidden items-center gap-1.5 rounded-lg border border-line bg-page/90 p-1.5 shadow-lift backdrop-blur-md lg:flex"
        >
          <a
            href={site.phone.href}
            aria-label={`Call ${site.phone.display}`}
            className="grid size-11 place-items-center rounded-md border border-line-strong text-accent transition-colors hover:border-accent/70 hover:bg-veil"
          >
            <IconPhone className="size-4" />
          </a>
          <CtaLink href="#quote" size="md">
            Get a Free Quote
          </CtaLink>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}