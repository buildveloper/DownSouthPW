import { MediaRail } from "@/components/MediaRail";
import { Section, SectionHeading } from "@/components/Section";
import { inAction } from "@/lib/media";

/**
 * In action.
 *
 * A trust section, not filler: it shows who is coming onto the property and that
 * the work is real. Hover zoom only — five staggered photo reveals here would
 * fight the before/after gallery above it and make the page feel slower than it
 * is. The chips below describe what the photos actually show, which is a claim
 * that needs no corroboration.
 */
const SHOWN = [
  "House washing",
  "Concrete & walkways",
  "Trucks, trailers & equipment",
] as const;

export function InAction() {
  return (
    <Section id="in-action" tone="light">
      <SectionHeading
        tone="light"
        eyebrow="In action"
        title="This is who shows up."
        lede="One locally owned operation — no sales crew and no call centre. These are working shots: a house wash, concrete and walkways, and the fleet, trailer and equipment jobs that come with a working yard."
      />

      <MediaRail
        items={inAction}
        tone="light"
        aspect="aspect-[3/4]"
        variant="action"
        tileWidth="w-[64%] sm:w-[38%] lg:w-[23.5%]"
        label="Photos of Down South Pressure Washing at work"
      />

      <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink-900/10 pt-7">
        {SHOWN.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2.5 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-ink-900/75"
          >
            <span
              aria-hidden="true"
              className="inline-block size-1.5 shrink-0 bg-spray-700"
            />
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}