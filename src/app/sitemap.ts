import type { MetadataRoute } from "next";

import { loadAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/seo";

/** Served at /sitemap.xml. */
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = loadAllArticles();

  const newestArticleDate = articles.find((article) => article.date)?.date;

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/articles`,
      lastModified: newestArticleDate ? new Date(newestArticleDate) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articles.map((article) => ({
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: article.date ? new Date(article.date) : undefined,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
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
