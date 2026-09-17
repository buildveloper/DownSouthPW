/** Absolute site origin, used by metadata, robots and sitemap. */
export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/+$/, "");
  // Falls back to localhost so `npm run build` works before a domain exists.
  return "http://localhost:3000";
}

export function isSiteUrlConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim());
}