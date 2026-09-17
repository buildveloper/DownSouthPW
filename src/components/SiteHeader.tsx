"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";

import { CtaLink } from "@/components/Button";
import { IconClose, IconMenu, IconPhone } from "@/components/Icons";
import { LogoLockup } from "@/components/Logo";
import { site } from "@/lib/site";

const NAV = [
  { id: "services", label: "Services" },
  { id: "before-after", label: "Before & after" },
  { id: "in-action", label: "In action" },
  { id: "how-it-works", label: "How it works" },
  { id: "faq", label: "FAQ" },
] as const;

/**
 * Header.
 *
 * Transparent over the hero (the hero is already the page's black, so there is
 * nothing to see through) and then it settles onto a solid, blurred bar once the
 * page scrolls. The nav highlights whichever section is crossing the middle of
 * the viewport, which is the one navigation affordance a one-page site actually
 * benefits from.
 */
export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => setSolid(value > 24));

  /* Current section: whichever one is crossing the viewport middle. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* Drawer: lock the page behind it and close on Escape. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        solid || open
          ? "border-line bg-ink-950/85 backdrop-blur-md"
          : "border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 md:h-20">
        <a
          href="#top"
          className="rounded-sm"
          aria-label={`${site.name} — back to top`}
        >
          <LogoLockup size={42} priority />
        </a>

        <nav aria-label="Page sections" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`relative block py-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${
                    active === item.id
                      ? "text-accent"
                      : "text-fg-muted hover:text-silver-100"
                  }`}
                >
                  {item.label}
                  {active === item.id ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phone.href}
            className="hidden items-center gap-2 text-[0.875rem] font-semibold text-silver-200 transition-colors hover:text-accent xl:inline-flex"
          >
            <IconPhone className="size-4 text-accent" />
            {site.phone.display}
          </a>

          <CtaLink href="#quote" size="sm" className="hidden sm:inline-flex">
            Get a Free Quote
          </CtaLink>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid size-11 place-items-center rounded-md border border-line-strong text-silver-200 transition-colors hover:border-accent/60 hover:text-accent lg:hidden"
          >
            <IconMenu className="size-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-ink-950/97 backdrop-blur-xl lg:hidden"
          >
            <div className="shell flex h-16 items-center justify-between md:h-20">
              <LogoLockup size={42} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-md border border-line-strong text-silver-200 transition-colors hover:border-accent/60 hover:text-accent"
              >
                <IconClose className="size-5" />
              </button>
            </div>

            <nav aria-label="Page sections">
              <ul className="shell mt-6 flex flex-col border-t border-line">
                {NAV.map((item) => (
                  <li key={item.id} className="border-b border-line">
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4 font-display text-[1.35rem] uppercase text-silver-100 transition-colors hover:text-accent"
                    >
                      {item.label}
                      <span aria-hidden="true" className="text-accent">
                        &rarr;
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="shell mt-8 flex flex-col gap-3">
              <CtaLink
                href="#quote"
                size="lg"
                full
                onClick={() => setOpen(false)}
              >
                Get a Free Quote
              </CtaLink>
              <CtaLink href={site.phone.href} variant="outline" size="lg" full>
                <IconPhone className="size-4" />
                Call {site.phone.display}
              </CtaLink>
              <p className="mt-2 text-center text-[0.8125rem] text-fg-faint">
                {site.serviceArea.short}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}