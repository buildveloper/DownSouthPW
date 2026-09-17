import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Anton, Inter, Yellowtail } from "next/font/google";

import { MotionProvider } from "@/components/MotionProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StickyCTA } from "@/components/StickyCTA";
import { StructuredData } from "@/components/StructuredData";
import { logo } from "@/lib/media";
import { siteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

import "./globals.css";

/**
 * Type system.
 *
 * - Anton: one heavy condensed face for headlines, chosen because the owner's
 *   wordmark is heavy condensed caps. Headlines therefore sound like the logo.
 * - Inter: body, forms and UI.
 * - Yellowtail: the script from the logo's second line, used for before/after
 *   labels only.
 * All three are self-hosted by next/font, so there is no render-blocking font
 * request and no layout shift.
 */
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yellowtail",
  display: "swap",
});

const description =
  "Pressure washing and soft washing in Wade, NC — house washing, driveways and sidewalks, decks and patios, roof soft-washing, gutter brightening and commercial exterior cleaning. Free quotes from a photo, firm prices and before-and-after photos of every job.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${site.name} — Pressure Washing in Wade, NC`,
    template: `%s — ${site.name}`,
  },
  description,
  applicationName: site.name,
  category: "Home services",
  keywords: [
    "pressure washing Wade NC",
    "soft washing Wade NC",
    "house washing",
    "driveway cleaning",
    "sidewalk pressure washing",
    "roof soft washing",
    "gutter brightening",
    "commercial pressure washing",
    "fleet and equipment washing",
    "Cumberland County pressure washing",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: `${site.name} — Pressure Washing in Wade, NC`,
    description,
    images: [
      { url: logo.badge, width: 256, height: 256, alt: logo.alt },
      {
        url: "/BeforeAndAfterCollages/First-beforeandafter.jpg",
        width: 2048,
        height: 2048,
        alt: "Before and after of a completed house wash in Wade, NC.",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${site.name} — Pressure Washing in Wade, NC`,
    description,
    images: [logo.badge],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${yellowtail.variable}`}
    >
      <body className="min-h-screen bg-page font-sans text-fg antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2.5 focus:text-[0.875rem] focus:font-semibold focus:text-accent-ink"
        >
          Skip to content
        </a>

        <MotionProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <StickyCTA />
        </MotionProvider>

        <StructuredData />
      </body>
    </html>
  );
}