import { DraftFlag } from "@/components/DraftFlag";
import { Section, SectionHeading } from "@/components/Section";
import { reasons } from "@/lib/site";

/**
 * Why Down South.
 *
 * Deliberately a spec sheet rather than another card grid: four reasons on hair-
 * line rules, with the numeral treated as a water mark. It reads as credentials
 * instead of marketing, which is the register this audience responds to.
 */
export function WhyDownSouth() {
  return (
    <Section id="why-us" tone="light">
      <SectionHeading
        tone="light"
        eyebrow="Why Down South"
        title="Reasons people call back."
        lede="No franchise script, no rotating crews. The same person quotes the job, does the job and answers the phone afterwards."
      />

      <div className="mt-12 grid border-t border-ink-900/12 sm:grid-cols-2">
        {reasons.map((reason, i) => (
          <div
            key={reason.id}
            className="flex gap-5 border-b border-ink-900/12 py-8 sm:border-r sm:pr-9 sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:pl-9 sm:[&:nth-child(2n)]:pr-0"
          >
            <span
              aria-hidden="true"
              className="font-display text-[2.25rem] leading-none text-ink-900/12"
            >
              {`0${i + 1}`}
            </span>
            <span>
              <h3 className="text-h3 text-ink-900">
                {reason.title}
                {reason.placeholder ? (
                  <DraftFlag label={`${reason.title} claim`} />
                ) : null}
              </h3>
              <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-fg-on-light-muted">
                {reason.body}
              </p>
            </span>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-3xl border-l-2 border-spray-700 pl-5 font-display text-[1.25rem] uppercase leading-snug tracking-[0.01em] text-ink-900 md:text-[1.5rem]">
        If it will not come clean, we say so before you pay for it.
      </p>
    </Section>
  );
}