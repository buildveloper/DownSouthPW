import { DraftFlag } from "@/components/DraftFlag";
import { IconCheck, IconArrowRight } from "@/components/Icons";
import { QuoteLink } from "@/components/QuoteLink";
import { Section, SectionHeading } from "@/components/Section";
import { services } from "@/lib/site";

/**
 * Services.
 *
 * Numbered cards rather than six icons: an icon per service is the single most
 * generic pattern in this trade, and a number reads like a scope of work. Each
 * card also carries its own route into the quote form, pre-selected.
 */
export function Services() {
  return (
    <Section id="services" tone="light">
      <SectionHeading
        tone="light"
        eyebrow="What we clean"
        title="Six jobs, done properly."
        lede="Everything below is quoted from photos or a quick look, so you get a firm price before anyone touches a hose. Tell us which one you need and we will take it from there."
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.id} className="flex">
            <article className="group flex w-full flex-col rounded-lg border border-ink-900/10 bg-card-light p-6 transition-colors duration-300 hover:border-accent-strong/35 hover:bg-white">
              <div className="flex items-center gap-4">
                <span className="text-eyebrow font-semibold text-spray-700/75">
                  {service.index}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-ink-900/10 transition-colors duration-300 group-hover:bg-accent-strong/35"
                />
              </div>

              <h3 className="text-h3 mt-5 text-ink-900">
                {service.title}
                {service.placeholder ? (
                  <DraftFlag label={`${service.title} scope`} />
                ) : null}
              </h3>

              <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-on-light-muted">
                {service.summary}
              </p>

              <ul className="mt-5 flex flex-1 flex-col gap-2.5 border-t border-ink-900/10 pt-5">
                {service.includes.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2.5 text-[0.875rem] leading-snug text-ink-900/85"
                  >
                    <IconCheck className="mt-0.5 size-3.5 shrink-0 text-spray-700" />
                    {line}
                  </li>
                ))}
              </ul>

              <QuoteLink
                serviceId={service.id}
                className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-spray-700 transition-colors duration-200 hover:text-ink-900"
              >
                Price this job
                <IconArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </QuoteLink>
            </article>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-3xl text-[0.8125rem] leading-relaxed text-fg-on-light-muted">
        <span aria-hidden="true" className="mr-1.5 text-draft">
          †
        </span>
        The list above is drafted from standard residential and commercial
        pressure washing scope. Confirm the services, the add-ons (deck
        re-sanding and sealing, gutter interior flush) and anything the owner
        does not offer before this page goes live.
      </p>
    </Section>
  );
}