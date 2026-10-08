import type { MetadataRoute } from "next";

import { AI_CRAWLERS, SITE_URL } from "@/lib/seo";

/**
 * Served at /robots.txt.
 *
 * Everything is public, so every crawler gets full access — including the AI
 * crawlers, which are named explicitly so their access does not depend on each
 * one's default behaviour. The /ai.txt companion states the same thing in
 * prose, and /llms.txt + /llms-full.txt are the machine-readable content maps.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
