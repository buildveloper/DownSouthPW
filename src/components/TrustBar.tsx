import { DraftFlag } from "@/components/DraftFlag";
import { IconArea, IconClock, IconPin, IconShield } from "@/components/Icons";
import { site } from "@/lib/site";

/**
 * Trust bar.
 *
 * Kept to four items and one line each. Anything longer stops being a trust bar
 * and starts being a second hero that delays the services.
 */
const ITEMS = [
  {
    icon: IconShield,
    label: "Licensed & Insured",
    note: "Coverage details to confirm",
    flag: "licensed and insured claim",
  },
  {
    icon: IconPin,
    label: "Locally Owned",
    note: `Based in ${site.address.line}`,
  },
  {
    icon: IconArea,
    label: "Wade, NC & surrounding areas",
    note: "Exact radius to confirm",
    flag: "service area",
  },
  {
    icon: IconClock,
    label: "Free Estimates",
    note: "Photos get you a faster number",
  },
] as const;

export function TrustBar() {
  return (
    <section
      aria-label="Why homeowners call Down South"
      className="relative border-y border-line bg-surface"
    >
      <div className="shell relative z-10 py-8 md:py-10">
        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <li key={item.label} className="flex items-start gap-3.5">
              <span
                aria-hidden="true"
                className="grid size-10 shrink-0 place-items-center rounded-sm border border-line bg-ink-950/70 text-accent"
              >
                <item.icon className="size-[1.15rem]" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[0.9375rem] font-semibold leading-tight text-silver-100">
                  {item.label}
                  {"flag" in item && item.flag ? (
                    <DraftFlag label={item.flag} />
                  ) : null}
                </span>
                <span className="text-[0.75rem] leading-snug text-fg-faint">
                  {item.note}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}