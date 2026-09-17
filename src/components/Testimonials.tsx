import { IconStar } from "@/components/Icons";
import { Section, SectionHeading } from "@/components/Section";
import { testimonials } from "@/lib/site";

/**
 * Testimonials.
 *
 * PLACEHOLDER COPY. The three quotes are written samples standing in for real
 * reviews, and they say so on the page — a fake-looking five-star review is
 * worse than no review at all.
 */
export function Testimonials() {
  return (
    <Section id="reviews" tone="dark">
      <SectionHeading
        eyebrow="Reviews"
        title="What people say afterwards."
        lede="Straight from the folks who booked the job. These three are samples standing in for the real thing until the owner's reviews are collected."
      />

      <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
        {testimonials.map((item) => (
          <li key={item.quote} className="flex flex-col bg-page p-6 md:p-7">
            <span
              aria-hidden="true"
              className="script text-[2.5rem] leading-[0.6] text-accent/70"
            >
              &ldquo;
            </span>

            <blockquote className="mt-5 flex-1">
              <p className="text-[1rem] leading-relaxed text-silver-200">
                {item.quote}
              </p>
            </blockquote>

            <div className="mt-6 flex flex-col gap-2 border-t border-line pt-5">
              <span
                className="flex items-center gap-1 text-accent"
                aria-label="Five star rating (sample)"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} />
                ))}
              </span>
              <span className="text-[0.8125rem] font-medium text-fg-faint">
                {item.attribution}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-[0.8125rem] leading-relaxed text-fg-faint">
        <span aria-hidden="true" className="mr-1.5 text-draft">
          †
        </span>
        Editable in{" "}
        <code className="rounded-xs bg-white/5 px-1 py-0.5 text-silver-300">
          src/lib/site.ts
        </code>{" "}
        → <code className="rounded-xs bg-white/5 px-1 py-0.5 text-silver-300">
          testimonials
        </code>
        . Replace the quotes and swap the attribution lines for real names, towns
        and jobs.
      </p>
    </Section>
  );
}