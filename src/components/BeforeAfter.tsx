import { CtaLink } from "@/components/Button";
import { MediaRail } from "@/components/MediaRail";
import { Section, SectionHeading } from "@/components/Section";
import { beforeAfter } from "@/lib/media";

/**
 * Before & after.
 *
 * The strongest sales tool in this trade, so it sits high on the page. The
 * collages arrive from the owner already composed side-by-side (or stacked), so
 * this is a gallery: adding a drag-to-reveal slider over an image that is itself
 * a before/after split would be a second control fighting the first.
 */
export function BeforeAfter() {
  return (
    <Section id="before-after" tone="dark">
      <SectionHeading
        eyebrow="Before & after"
        title="See what a wash actually does."
        lede="Every photo here is a finished job from the owner's own camera roll. Where the split runs top to bottom the top half is before; where it runs left to right the left half is before."
      />

      <MediaRail
        items={beforeAfter}
        tone="dark"
        aspect="aspect-square"
        label="Before and after photos of completed jobs"
      />

      <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:gap-5">
        <CtaLink href="#quote" size="lg">
          Get a Free Quote
        </CtaLink>
        <p className="text-[0.9375rem] text-fg-muted">
          Want your place on this page? It starts with a photo.
        </p>
      </div>
    </Section>
  );
}