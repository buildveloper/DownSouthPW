import { draftFlags } from "@/lib/site";

/**
 * Editorial-style footnote marker for anything still to be confirmed.
 *
 * Kept deliberately small and set in the draft amber (never a brand colour), so
 * a visitor reads past it while the owner can see exactly what is outstanding.
 * Remove the `flag` prop at the call site and the marker disappears — nothing
 * else needs to change.
 */
export function DraftFlag({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <sup
      className={`ml-0.5 align-super text-[0.6875rem] font-semibold text-draft/90 ${className}`}
      title={`Placeholder — ${label}. To be confirmed before launch.`}
    >
      <span aria-hidden="true">†</span>
      <span className="sr-only">
        {` (placeholder — ${label}: to be confirmed before launch)`}
      </span>
    </sup>
  );
}

/**
 * The one place the whole outstanding list is written down, in the footer.
 * A native <details> element: accessible, keyboard-operable, zero JavaScript.
 */
export function DraftPanel() {
  return (
    <details className="group mt-10 border-t border-line pt-4 text-left">
      <summary className="flex cursor-pointer list-none items-center gap-2 text-[0.8125rem] font-medium text-fg-faint transition-colors hover:text-draft">
        <span
          aria-hidden="true"
          className="inline-block size-1.5 rounded-full bg-draft/80"
        />
        Before you launch — {draftFlags.length} items to confirm
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className="size-3 transition-transform duration-200 group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="m2 4 4 4 4-4" />
        </svg>
      </summary>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {draftFlags.map((flag) => (
          <li key={flag.label} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-1.5 text-draft/80">
              †
            </span>
            <span className="text-[0.8125rem] leading-relaxed">
              <span className="font-semibold text-fg">{flag.label}.</span>{" "}
              <span className="text-fg-faint">{flag.note}</span>
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[0.75rem] leading-relaxed text-fg-faint">
        Draft content is isolated in{" "}
        <code className="rounded-xs bg-veil px-1 py-0.5 text-fg">
          src/lib/site.ts
        </code>{" "}
        and{" "}
        <code className="rounded-xs bg-veil px-1 py-0.5 text-fg">
          src/lib/media.ts
        </code>{" "}
        — no other file needs touching.
      </p>
    </details>
  );
}
