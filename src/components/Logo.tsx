import Image from "next/image";

import { logo } from "@/lib/media";

/**
 * The owner's real logo, unmodified.
 *
 * The supplied file is a square JPEG: a white circular badge sitting on a black
 * ground. Rather than editing the artwork (which never survives re-compression
 * well), it is always presented inside a circular clip on a black plate. The
 * black plate matches the file's own black ground exactly, so the seam is
 * invisible — and the badge therefore sits correctly on the dark chrome and on
 * the light sections alike.
 */
export function LogoBadge({
  size = 48,
  priority = false,
  className = "",
}: {
  size?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-black ring-1 ring-plate-ring ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        priority={priority}
        sizes={`${size * 2}px`}
        className="h-full w-full object-cover"
      />
    </span>
  );
}

/**
 * Badge plus a typeset wordmark.
 *
 * The logo's own lettering is unreadable below roughly 120px, so the header and
 * footer pair the real badge with live text set in the display face. The second
 * line reuses the script face from the logo's "Pressure Washing" line and the
 * sampled brand blue, which keeps the lockup recognisably the same brand.
 */
export function LogoLockup({
  size = 44,
  priority = false,
  className = "",
  wordmarkClassName = "",
}: {
  size?: number;
  priority?: boolean;
  className?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoBadge size={size} priority={priority} />
      <span className={`flex flex-col leading-none ${wordmarkClassName}`}>
        <span className="font-display text-[1.0625rem] uppercase tracking-[0.06em] text-fg-strong">
          Down South
        </span>
        <span className="script mt-0.5 text-[0.95rem] leading-none text-accent">
          Pressure Washing
        </span>
      </span>
    </span>
  );
}
