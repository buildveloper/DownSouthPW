import { CtaLink } from "@/components/Button";
import { DraftFlag } from "@/components/DraftFlag";
import { IconPhone } from "@/components/Icons";
import { WaterArcBand } from "@/components/WaterArc";
import { site } from "@/lib/site";

/**
 * Closing band.
 *
 * The arc returns here, drawn on scroll rather than on load, so the page ends on
 * the same gesture it opened with — which is the whole point of having one
 * signature move instead of a different effect in every section.
 */
export function FinalCTA() {
  return (
    <section className="grit relative isolate overflow-hidden border-t border-line bg-surface">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <WaterArcBand className="absolute left-1/2 top-1/2 w-[128%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-30" />
      </div>

      <div className="shell relative z-10 py-20 md:py-28">
        <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-accent">
          <span aria-hidden="true" className="h-px w-7 bg-accent/50" />
          Free quotes
        </p>

        <h2 className="text-h2 mt-4 max-w-3xl text-fg-strong">
          Let&rsquo;s get it clean.
        </h2>

        <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-fg-muted">
          Send one photo of what needs cleaning and you get a firm price back. No
          visit needed just to find out what it costs, and no pressure once you
          have the number.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <CtaLink href="#quote" size="lg" className="sm:min-w-[13rem]">
            Get a Free Quote
          </CtaLink>
          <CtaLink href={site.phone.href} variant="outline" size="lg">
            <IconPhone className="size-4" />
            Call {site.phone.display}
          </CtaLink>
        </div>

        <p className="mt-7 text-[0.8125rem] text-fg-faint">
          Serving {site.serviceArea.short}. {site.hours.label}
          <DraftFlag label="working hours" /> ·{" "}
          <a
            href={site.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-silver-300 underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            More work on Facebook
          </a>
        </p>
      </div>
    </section>
  );
}