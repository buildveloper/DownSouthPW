"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

import { SPRING_SNAP } from "@/lib/motion";

type Variant = "primary" | "outline" | "outlineLight" | "quiet";
type Size = "sm" | "md" | "lg";

/**
 * One button scale for the whole site.
 *
 * `primary` is always the sampled brand blue with near-black type on it
 * (#81B5CC on #06212E measures 9.4:1, so the same button works on the black
 * chrome and on the light sections without a second colour being invented).
 */
export function ctaClasses({
  variant = "primary",
  size = "md",
  full = false,
  className = "",
}: {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  className?: string;
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-md font-sans font-semibold tracking-[0.01em] whitespace-nowrap transition-colors duration-200 select-none disabled:cursor-not-allowed disabled:opacity-55";

  const sizes: Record<Size, string> = {
    sm: "h-10 px-3.5 text-[0.8125rem]",
    md: "h-12 px-5 text-[0.9375rem]",
    lg: "h-14 px-6 text-[1rem]",
  };

  const variants: Record<Variant, string> = {
    primary:
      "bg-accent text-accent-ink hover:bg-spray-300 active:bg-spray-500 shadow-[0_10px_30px_-16px_rgba(129,181,204,0.9)]",
    outline:
      "border border-line-strong bg-white/[0.02] text-fg hover:border-accent/70 hover:text-accent hover:bg-white/[0.05]",
    outlineLight:
      "border border-ink-900/20 bg-transparent text-fg-on-light hover:border-accent-strong hover:text-accent-strong",
    quiet: "text-fg-muted hover:text-accent underline-offset-4 hover:underline",
  };

  return [
    base,
    sizes[size],
    variants[variant],
    full ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

/** Press + hover feedback lives here so every CTA on the site feels identical. */
function usePressMotion() {
  const reduce = useReducedMotion();
  if (reduce) return {};
  return {
    whileHover: { y: -2 },
    whileTap: { scale: 0.972, y: 0 },
    transition: SPRING_SNAP,
  };
}

type LinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  full?: boolean;
  className?: string;
  /** Renders a "↗" affordance for off-site links. */
  external?: boolean;
} & Omit<HTMLMotionProps<"a">, "href" | "children" | "className">;

export function CtaLink({
  href,
  children,
  variant,
  size,
  full,
  className = "",
  external,
  ...rest
}: LinkProps) {
  const press = usePressMotion();
  const offsite = external ?? /^https?:/.test(href);

  return (
    <motion.a
      href={href}
      className={ctaClasses({ variant, size, full, className })}
      {...(offsite ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...press}
      {...rest}
    >
      <span>{children}</span>
      {offsite ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="size-3.5 opacity-70 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="square"
        >
          <path d="M5 11 11 5M6 5h5v5" />
        </svg>
      ) : null}
    </motion.a>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  full?: boolean;
  className?: string;
} & Omit<HTMLMotionProps<"button">, "children" | "className">;

export function CtaButton({
  children,
  variant,
  size,
  full,
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  const press = usePressMotion();

  return (
    <motion.button
      type={type}
      className={ctaClasses({ variant, size, full, className })}
      {...press}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
