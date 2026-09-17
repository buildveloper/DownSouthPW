"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { CtaLink } from "@/components/Button";
import { DraftFlag } from "@/components/DraftFlag";
import { IconPhone } from "@/components/Icons";
import { LogoBadge } from "@/components/Logo";
import { WaterArc } from "@/components/WaterArc";
import { beforeAfter } from "@/lib/media";
import { orchestrate, settle, SPRING_SOFT, wordRise } from "@/lib/motion";
import { site } from "@/lib/site";

/** "Restore the curb appeal, one wash at a time." */
const HEADLINE = "Restore the curb appeal, one wash at a time.";
const WORDS = HEADLINE.split(" ");
/** "curb appeal" carries the payoff, so it is the only emphasised phrase. */
const EMPHASIS = new Set([2, 3]);

const PROOF = [
  "Free estimates",
  "Locally owned in Wade",
  "Real job photos — no stock",
] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const heroJob = beforeAfter[0];

  return (
    <section
      id="top"
      className="grit relative isolate overflow-hidden bg-page"
      aria-labelledby="hero-heading"
    >
      {/*
        One ambient wash of the brand blue behind everything. This is the only
        large soft gradient on the site — a second one anywhere would tip the
        design into the generic look it is deliberately avoiding.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-18rem] h-[52rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(129,181,204,0.11),rgba(129,181,204,0.03)_46%,transparent_68%)]"
      />

      <div className="shell relative z-10 grid gap-16 pb-20 pt-28 md:pb-28 md:pt-32 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pb-32">
        <motion.div
          className="lg:col-span-7"
          variants={orchestrate}
          initial={reduce ? "show" : "hidden"}
          animate="show"
        >
          <motion.p
            variants={settle}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-eyebrow font-semibold uppercase text-accent"
          >
            <span aria-hidden="true" className="h-px w-7 bg-accent/50" />
            Wade, NC
            <span aria-hidden="true" className="text-fg-faint">
              /
            </span>
            <span className="text-fg-muted">Residential &amp; commercial</span>
          </motion.p>

          <h1
            id="hero-heading"
            className="text-display mt-5 max-w-[17ch] text-fg-strong"
          >
            {WORDS.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                variants={wordRise}
                className={`inline-block ${EMPHASIS.has(i) ? "text-accent" : ""}`}
              >
                {word}
                {i < WORDS.length - 1 ? "\u00A0" : ""}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={settle}
            className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-fg-muted md:text-[1.125rem]"
          >
            Pressure washing and soft washing for homes, driveways, roofs and
            commercial property. A firm price before we start, and before-and-after
            photos of every job we finish.
          </motion.p>

          <motion.div
            variants={settle}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <CtaLink href="#quote" size="lg" className="sm:min-w-[13rem]">
              Get a Free Quote
            </CtaLink>
            <CtaLink href={site.phone.href} variant="outline" size="lg">
              <IconPhone className="size-4" />
              Call {site.phone.display}
            </CtaLink>
          </motion.div>

          <motion.p
            variants={settle}
            className="mt-4 text-[0.875rem] text-fg-faint"
          >
            Got a photo of the mess?{" "}
            <a
              href={site.phone.sms}
              className="font-medium text-fg underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              Text it to {site.phone.display}
            </a>{" "}
            for the fastest number.
          </motion.p>

          <motion.ul
            variants={settle}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6"
          >
            {PROOF.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[0.8125rem] font-medium text-fg-muted"
              >
                <span
                  aria-hidden="true"
                  className="inline-block size-1.5 shrink-0 bg-accent"
                />
                {item}
              </li>
            ))}
            <li className="flex items-center gap-2 text-[0.8125rem] font-medium text-fg-muted">
              <span
                aria-hidden="true"
                className="inline-block size-1.5 shrink-0 bg-accent"
              />
              {site.credentials.label}
              <DraftFlag label="licensed and insured claim" />
            </li>
          </motion.ul>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[32rem] lg:col-span-5 lg:max-w-none">
          {/*
            The arc clears the photo and runs off both edges of the frame, the
            same gesture as the logo's water sweep.
          */}
          <WaterArc
            variant="hero"
            className="pointer-events-none absolute -left-[16%] -top-[30%] w-[132%] max-w-none"
          />

          <motion.figure
            className="relative overflow-hidden rounded-xl border border-line bg-surface-raised shadow-lift"
            initial={reduce ? false : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <Image
              src={heroJob.src}
              alt={heroJob.alt}
              width={2048}
              height={2048}
              priority
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 88vw, 94vw"
              className="aspect-square w-full object-cover"
            />

            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink-950/92 via-ink-950/55 to-transparent px-4 pb-4 pt-16 md:px-5 md:pb-5">
              <span className="flex flex-col">
                <span className="script text-[1.35rem] leading-none text-spray-300">
                  Before &amp; after
                </span>
                <span className="mt-2 text-[0.8125rem] font-medium leading-snug text-silver-100">
                  {heroJob.title} · {site.address.city}, {site.address.state}
                </span>
              </span>
              <span className="hidden shrink-0 rounded-sm border border-white/20 bg-ink-950/60 px-2 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-silver-200 sm:inline-block">
                Real job
              </span>
            </figcaption>
          </motion.figure>

          {/* The owner's own logo, stamped on the work the way it is on his posts. */}
          <motion.div
            className="absolute -left-3 -top-5 md:-left-6 md:-top-7"
            initial={reduce ? false : { opacity: 0, scale: 0.82, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ ...SPRING_SOFT, delay: 0.78 }}
          >
            <LogoBadge
              size={84}
              className="shadow-[0_18px_40px_-20px_rgba(0,0,0,0.95)] ring-4 ring-page"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}