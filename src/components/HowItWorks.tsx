"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import { CtaLink } from "@/components/Button";
import { IconPhone } from "@/components/Icons";
import { Section, SectionHeading } from "@/components/Section";
import { steps, site } from "@/lib/site";

/**
 * How it works.
 *
 * The connector between the three steps draws itself as the section scrolls —
 * scroll-driven, so it is motion the reader controls, and it explains the
 * sequence rather than decorating it. Everything else in this section is static.
 */
export function HowItWorks() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.7"],
  });
  const drawn = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    mass: 0.6,
  });

  const progress = reduce ? 1 : drawn;

  return (
    <Section id="how-it-works" tone="dark">
      <SectionHeading
        eyebrow="How it works"
        title="Three steps, no guesswork."
        lede="You will know the price and the day before anything gets wet, and you will see the finish in photos when the job is done."
      />

      <div ref={ref} className="relative mt-14">
        {/* Desktop connector: runs behind the step numbers. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-line md:block"
        >
          <motion.div
            style={{ scaleX: progress }}
            className="h-px origin-left bg-accent"
          />
        </div>

        {/* Mobile connector: runs down the left of the stack. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 left-[1.75rem] top-4 w-px bg-line md:hidden"
        >
          <motion.div
            style={{ scaleY: progress }}
            className="h-full w-px origin-top bg-accent"
          />
        </div>

        <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step) => (
            <li key={step.index} className="relative flex gap-5 md:block">
              <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-sm border border-line bg-surface-raised font-display text-[1.3rem] leading-none text-accent md:size-16 md:text-[1.45rem]">
                {step.index}
              </span>

              <div className="md:mt-7">
                <h3 className="text-h3 text-fg-strong">{step.title}</h3>
                <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-fg-muted">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
        <CtaLink href="#quote" size="lg">
          Get a Free Quote
        </CtaLink>
        <CtaLink href={site.phone.href} variant="outline" size="lg">
          <IconPhone className="size-4" />
          Call {site.phone.display}
        </CtaLink>
      </div>
    </Section>
  );
}