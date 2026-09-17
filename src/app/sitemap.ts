import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo";

/** One page, one entry — the marketing site is a single scrolling document. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl()}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}