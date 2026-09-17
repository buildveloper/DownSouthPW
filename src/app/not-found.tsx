import type { Metadata } from "next";

import { CtaLink } from "@/components/Button";
import { LogoBadge } from "@/components/Logo";
import { IconArrowRight } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="grit relative isolate overflow-hidden bg-page">
      <div className="shell flex min-h-[70vh] flex-col justify-center py-24">
        <LogoBadge size={68} priority />
        <p className="mt-8 text-eyebrow font-semibold uppercase text-accent">
          404
        </p>
        <h1 className="text-h2 mt-4 max-w-2xl text-fg-strong">
          That page has been washed off the map.
        </h1>
        <p className="mt-5 max-w-lg text-[1rem] leading-relaxed text-fg-muted">
          The link is broken, not your exterior. Head back to the start, or call{" "}
          <a
            href={site.phone.href}
            className="font-medium text-silver-200 underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent"
          >
            {site.phone.display}
          </a>{" "}
          and we will point you the right way.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <CtaLink href="/" size="lg">
            Back to the start
            <IconArrowRight className="size-4" />
          </CtaLink>
          <CtaLink href="/#quote" variant="outline" size="lg">
            Get a Free Quote
          </CtaLink>
        </div>
      </div>
    </section>
  );
}