"use client";

import { IconMoon, IconSun } from "@/components/Icons";

export const THEME_KEY = "downsouth-theme";
export const THEME_ATTR = "data-theme";

/**
 * Light / dark toggle.
 *
 * Deliberately holds no state. The current theme lives on
 * `document.documentElement[data-theme]`, which the inline script in
 * `layout.tsx` sets before first paint, so:
 *
 *   - there is no theme flash on load
 *   - there is no hydration mismatch, because the server and the first client
 *     render produce identical markup
 *   - the icon and the accessible label are chosen by CSS off the html
 *     attribute (see `.theme-*` rules in globals.css), so they are correct
 *     immediately rather than one effect later
 *
 * Default is dark: the owner's logo is a white badge on a black ground, so dark
 * is the brand's native presentation. A stored choice always wins.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`grid size-11 place-items-center rounded-md border border-line-strong text-fg-muted transition-colors duration-200 hover:border-accent/70 hover:text-accent ${className}`}
    >
      <IconSun className="theme-icon-sun size-[1.15rem]" />
      <IconMoon className="theme-icon-moon size-[1.15rem]" />
      <span className="sr-only theme-label-dark">
        Switch to the light theme
      </span>
      <span className="sr-only theme-label-light">
        Switch to the dark theme
      </span>
    </button>
  );
}

/**
 * Reads the current theme off the html element, flips it, and remembers it.
 * Kept outside the component so it can also be called from anywhere else.
 */
export function toggleTheme() {
  const root = document.documentElement;
  const next = root.getAttribute(THEME_ATTR) === "light" ? "dark" : "light";
  root.setAttribute(THEME_ATTR, next);
  try {
    window.localStorage.setItem(THEME_KEY, next);
  } catch {
    // Private browsing or storage disabled: the toggle still works for this
    // page view, it just will not be remembered.
  }
}

/** Runs before first paint, so the stored theme is applied without a flash. */
export const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem(${JSON.stringify(THEME_KEY)});
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute(${JSON.stringify(THEME_ATTR)}, stored);
    }
  } catch (e) {}
})();
`;