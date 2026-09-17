"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { IconArrowLeft, IconArrowRight } from "@/components/Icons";
import type { GalleryItem } from "@/lib/media";

type Tone = "dark" | "light";

/**
 * MediaRail — one gallery, used twice.
 *
 * The owner's before/after collages and his action shots are both "look at the
 * real work" content, so they share a single component with a single behaviour
 * rather than two lookalike carousels. Differences are limited to the tile
 * aspect ratio, the caption weight and whether hovering zooms the photo.
 *
 * Behaviour notes:
 *   - native horizontal scroll with snap points, so trackpads, touch and
 *     keyboard all work without a JavaScript carousel engine
 *   - the rail itself is focusable, so arrow keys scroll it
 *   - no per-tile entrance animation: the photos are the content, and 5
 *     staggered reveals would make a slow page feel slower
 */
export function MediaRail({
  items,
  tone = "dark",
  aspect = "aspect-square",
  /** Tailwind width classes; the values leave a deliberate peek of the next tile. */
  tileWidth = "w-[78%] sm:w-[46%] lg:w-[31.5%]",
  /** `action` adds a hover zoom and tighter captions. */
  variant = "gallery",
  label,
}: {
  items: readonly GalleryItem[];
  tone?: Tone;
  aspect?: string;
  tileWidth?: string;
  variant?: "gallery" | "action";
  label: string;
}) {
  const railRef = useRef<HTMLUListElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const reduce = useReducedMotion();

  const { scrollXProgress } = useScroll({ container: railRef, axis: "x" });
  const progress = useSpring(scrollXProgress, {
    stiffness: 220,
    damping: 34,
    mass: 0.5,
  });

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft >= max - 8);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const step = useCallback(
    (direction: -1 | 1) => {
      const el = railRef.current;
      if (!el) return;
      const tile = el.firstElementChild as HTMLElement | null;
      const delta = tile ? tile.offsetWidth + 16 : el.clientWidth * 0.8;
      el.scrollBy({
        left: direction * delta,
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [reduce],
  );

  const captionTitle =
    tone === "light"
      ? "text-[0.9375rem] font-semibold text-ink-900"
      : "text-[0.9375rem] font-semibold text-fg-strong";
  const captionNote =
    tone === "light"
      ? "text-[0.8125rem] text-fg-on-light-muted"
      : "text-[0.8125rem] text-fg-faint";
  const tileBorder =
    tone === "light"
      ? "border-ink-900/10 bg-card-light"
      : "border-line bg-surface-raised";

  return (
    <div role="region" aria-label={label} className="mt-10 md:mt-12">
      <ul
        ref={railRef}
        tabIndex={0}
        onScroll={sync}
        aria-label={`${label} — scrollable`}
        className="rail -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-1 md:-mx-8 md:gap-5 md:px-8 xl:-mx-10 xl:px-10"
      >
        {items.map((item, i) => (
          <li key={item.id} className={`shrink-0 snap-start ${tileWidth}`}>
            <figure className="group flex h-full flex-col">
              <div
                className={`relative overflow-hidden rounded-lg border ${tileBorder} ${aspect}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={2048}
                  height={2048}
                  loading={i === 0 ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 78vw"
                  style={{ objectPosition: item.focus ?? "50% 50%" }}
                  className={`h-full w-full object-cover ${
                    variant === "action"
                      ? "transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hoverable:group-hover:scale-[1.045]"
                      : "transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hoverable:group-hover:scale-[1.015]"
                  }`}
                />
              </div>

              <figcaption className="mt-3 flex flex-col gap-1">
                <span className={captionTitle}>{item.title}</span>
                <span className={`${captionNote} leading-snug`}>
                  {item.note}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-5">
        {/* Progress reads the rail's real scroll position, so it never lies. */}
        <div
          className={`h-px flex-1 ${
            tone === "light" ? "bg-ink-900/15" : "bg-line"
          }`}
        >
          <motion.div
            style={{ scaleX: progress }}
            className="h-px origin-left bg-accent"
          />
        </div>

        <p
          className={`hidden text-[0.75rem] font-medium tabular-nums sm:block ${
            tone === "light" ? "text-fg-on-light-muted" : "text-fg-faint"
          }`}
        >
          {items.length} jobs
        </p>

        <div className="flex items-center gap-2">
          <RailButton
            tone={tone}
            label={`Previous — ${label}`}
            disabled={atStart}
            onClick={() => step(-1)}
          >
            <IconArrowLeft className="size-4" />
          </RailButton>
          <RailButton
            tone={tone}
            label={`Next — ${label}`}
            disabled={atEnd}
            onClick={() => step(1)}
          >
            <IconArrowRight className="size-4" />
          </RailButton>
        </div>
      </div>
    </div>
  );
}

function RailButton({
  children,
  label,
  onClick,
  disabled,
  tone,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled: boolean;
  tone: Tone;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.94 }}
      transition={{ type: "spring", stiffness: 420, damping: 34 }}
      className={`inline-flex size-11 items-center justify-center rounded-md border transition-colors duration-200 disabled:opacity-35 ${
        tone === "light"
          ? "border-ink-900/15 text-ink-900 hover:border-accent-strong hover:bg-ink-900/[0.04] disabled:hover:border-ink-900/15 disabled:hover:bg-transparent"
          : "border-line-strong text-fg hover:border-accent/70 hover:bg-veil disabled:hover:border-line-strong disabled:hover:bg-transparent"
      }`}
    >
      {children}
    </motion.button>
  );
}