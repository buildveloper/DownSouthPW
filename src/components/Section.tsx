import type { ReactNode } from "react";

type Tone = "dark" | "light";

/**
 * Section shell.
 *
 * The site alternates between two grounds only — the logo's black and the
 * logo's silver-white — which is what keeps a long page feeling like one
 * document instead of a stack of unrelated panels.
 */
export function Section({
  id,
  tone = "dark",
  texture = true,
  className = "",
  innerClassName = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  /** Adds the ~3% grit overlay. Off for very short bands. */
  texture?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  const toneClasses =
    tone === "light"
      ? "scheme-light on-light bg-surface-light text-fg-on-light"
      : "bg-page text-fg";

  return (
    <section
      id={id}
      className={`relative scroll-mt-24 ${toneClasses} ${
        texture ? "grit" : ""
      } ${className}`}
    >
      <div className={`shell relative z-10 py-16 md:py-24 ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}

/** Small caps label with a short rule — the site's one recurring graphic device. */
export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-eyebrow font-semibold uppercase ${
        tone === "light" ? "text-spray-700" : "text-accent"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-px w-7 ${
          tone === "light" ? "bg-spray-700/50" : "bg-accent/50"
        }`}
      />
      {children}
    </p>
  );
}

/**
 * Section heading. `action` takes the right-hand slot on desktop, which is where
 * carousel controls live — controls sit with the content they drive rather than
 * floating at the page edge.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "dark",
  action,
  className = "",
  as: As = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: Tone;
  action?: ReactNode;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <div
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}
    >
      <div className="max-w-2xl">
        {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
        <As
          className={`text-h2 mt-4 ${
            tone === "light" ? "text-ink-900" : "text-fg-strong"
          }`}
        >
          {title}
        </As>
        {lede ? (
          <p
            className={`mt-4 text-[1.0625rem] leading-relaxed ${
              tone === "light" ? "text-fg-on-light-muted" : "text-fg-muted"
            }`}
          >
            {lede}
          </p>
        ) : null}
      </div>

      {action ? (
        <div className="flex shrink-0 items-center gap-3">{action}</div>
      ) : null}
    </div>
  );
}