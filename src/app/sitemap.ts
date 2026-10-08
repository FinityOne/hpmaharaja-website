import type { MetadataRoute } from "next";

import { articleImageSrc, loadAllArticles } from "@/lib/articles";
import { OG_IMAGE, SITE_URL } from "@/lib/seo";

/**
 * Served at /sitemap.xml.
 *
 * Entries carry their cover image too, so the essays are eligible for image
 * search rather than text results only.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = loadAllArticles();

  const newestArticleDate = articles.find((article) => article.date)?.date;

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}${OG_IMAGE}`],
    },
    {
      url: `${SITE_URL}/articles`,
      lastModified: newestArticleDate ? new Date(newestArticleDate) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articles.map((article) => {
      const image = article.image ? articleImageSrc(article.image) : null;
      return {
        url: `${SITE_URL}/articles/${article.slug}`,
        lastModified: article.date ? new Date(article.date) : undefined,
        changeFrequency: "yearly" as const,
        priority: 0.7,
        /* Relative paths are site-hosted and need the origin; an article may
           also point at an absolute URL on S3, which is already complete. */
        images: image
          ? [image.startsWith("http") ? image : `${SITE_URL}${image}`]
          : undefined,
      };
    }),
    {
      url: `${SITE_URL}/terms`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];
}
