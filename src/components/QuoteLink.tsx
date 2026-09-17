"use client";

/**
 * "Price this job" link used by the service cards.
 *
 * It is a plain anchor to #quote first and foremost — the jump works even if
 * JavaScript has not hydrated. The custom event is a progressive enhancement
 * that pre-selects the matching service in the form, so nobody has to pick the
 * same option twice.
 */
export const PRESELECT_EVENT = "downsouth:preselect-service";

export function QuoteLink({
  serviceId,
  children,
  className = "",
}: {
  serviceId: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href="#quote"
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent(PRESELECT_EVENT, { detail: serviceId }),
        );
      }}
      className={className}
    >
      {children}
    </a>
  );
}