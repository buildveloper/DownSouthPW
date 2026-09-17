import { DraftFlag, DraftPanel } from "@/components/DraftFlag";
import {
  IconFacebook,
  IconMail,
  IconPhone,
  IconPin,
} from "@/components/Icons";
import { LogoLockup } from "@/components/Logo";
import { services, site } from "@/lib/site";

/**
 * Footer.
 *
 * The real logo again, in full lockup, plus the whole NAP block — phone, email
 * and service area — because that is what a local customer copies down. It also
 * carries the one list of outstanding draft items.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-page">
      <div className="shell py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <LogoLockup size={60} />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-fg-muted">
              Pressure washing and soft washing for homes, driveways, roofs and
              commercial property in {site.serviceArea.short.toLowerCase()}.
            </p>

            <div className="mt-7 flex flex-col gap-3">
              <a
                href={site.phone.href}
                className="inline-flex items-center gap-3 text-[1rem] font-semibold text-fg-strong transition-colors hover:text-accent"
              >
                <IconPhone className="size-5 text-accent" />
                {site.phone.display}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-start gap-3 text-[0.9375rem] text-fg-muted transition-colors hover:text-accent"
              >
                <IconMail className="mt-0.5 size-5 shrink-0 text-accent" />
                <span className="break-all">{site.email}</span>
              </a>
            </div>

            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2.5 rounded-md border border-line-strong px-3.5 py-2.5 text-[0.8125rem] font-semibold text-fg transition-colors hover:border-accent/70 hover:text-accent"
            >
              <IconFacebook className="size-4" />
              facebook.com/DownSouthPW
            </a>
          </div>

          <nav aria-label="What we clean" className="md:col-span-4">
            <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-fg-faint">
              What we clean
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-[0.9375rem] text-fg-muted transition-colors hover:text-accent"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-fg-faint">
              Where we work
            </h2>
            <ul className="mt-5 flex flex-col gap-3 text-[0.9375rem] text-fg-muted">
              <li className="flex items-start gap-2.5">
                <IconPin className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>
                  {site.address.line}
                  <DraftFlag label="service area" />
                </span>
              </li>
              <li>
                {site.hours.label}
                <DraftFlag label="working hours" />
              </li>
              <li>
                Free estimates ·{" "}
                <a
                  href="#quote"
                  className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  send a photo
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-[0.8125rem] text-fg-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. Wade, North Carolina.
          </p>
          <p>
            {site.phone.display} · {site.address.city}, {site.address.state}{" "}
            {site.address.zip}
          </p>
        </div>

        <DraftPanel />
      </div>
    </footer>
  );
}