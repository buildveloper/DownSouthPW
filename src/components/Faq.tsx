import { CtaLink } from "@/components/Button";
import { IconPhone } from "@/components/Icons";
import { Eyebrow, Section } from "@/components/Section";
import { faqs, site } from "@/lib/site";

/**
 * FAQ.
 *
 * Objection handling, placed just before the close: price, safety, access,
 * water, plants and commercial work. Native <details> elements, so it is
 * keyboard-operable, accessible and free of JavaScript.
 */
export function Faq() {
  return (
    <Section id="faq" tone="light">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow tone="light">Questions</Eyebrow>
          <h2 className="text-h2 mt-4 text-ink-900">
            The things people ask first.
          </h2>
          <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-fg-on-light-muted">
            If your question is not here, call and get an answer in a sentence
            instead of a sales pitch.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <CtaLink href={site.phone.href} variant="outlineLight" size="md">
              <IconPhone className="size-4" />
              Call {site.phone.display}
            </CtaLink>
            <CtaLink href="#quote" size="md">
              Get a Free Quote
            </CtaLink>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="border-t border-ink-900/12">
            {faqs.map((faq) => (
              <li key={faq.q} className="border-b border-ink-900/12">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.0625rem] font-semibold text-ink-900 transition-colors hover:text-spray-700">
                    {faq.q}
                    <span
                      aria-hidden="true"
                      className="relative mt-1.5 size-4 shrink-0"
                    >
                      <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-spray-700" />
                      <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-spray-700 transition-transform duration-200 group-open:scale-y-0" />
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-6 pr-8 text-[0.9375rem] leading-relaxed text-fg-on-light-muted">
                    {faq.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}