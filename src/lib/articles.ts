import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { marked } from "marked";

/**
 * Ported from core/articles_repo.py. Articles stay as markdown files with YAML
 * frontmatter under content/articles/ and are rendered at build time.
 */

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type Article = {
  slug: string;
  title: string;
  subtitle: string | null;
  summary: string | null;
  date: string | null;
  category: string;
  readingTime: string;
  image: string | null;
  isFeatured: boolean;
  isBreaking: boolean;
  bodyHtml: string;
};

/** GitHub-flavoured markdown, matching python-markdown's fenced_code + tables. */
marked.setOptions({ gfm: true, breaks: false });

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    // Drop entities before slugifying, so "A &amp; B" does not become "a-amp-b".
    .replace(/&[a-z]+;|&#\d+;/g, " ")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * python-markdown's `toc` extension gave every heading an id so in-page
 * anchors work. marked does not, so add them back on the rendered HTML.
 */
function addHeadingIds(html: string): string {
  return html.replace(
    /<h([1-6])>([\s\S]*?)<\/h\1>/g,
    (_match, level: string, inner: string) => {
      const id = slugifyHeading(inner);
      return `<h${level}${id ? ` id="${id}"` : ""}>${inner}</h${level}>`;
    },
  );
}

function markdownToHtml(md: string): string {
  return addHeadingIds(marked.parse(md, { async: false }) as string);
}

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function buildArticle(data: Record<string, unknown>, bodyMd: string, slugFromFile: string): Article {
  const slug = (data.slug as string) || slugFromFile;
  return {
    slug,
    title: (data.title as string) ?? titleFromSlug(slug),
    subtitle: (data.subtitle as string) ?? null,
    summary: (data.summary as string) ?? null,
    date: (data.date as string) ?? null,
    category: (data.category as string) ?? "Essay",
    readingTime: (data.reading_time as string) ?? "5 min read",
    image: (data.image as string) ?? null,
    isFeatured: Boolean(data.is_featured),
    isBreaking: Boolean(data.is_breaking),
    bodyHtml: markdownToHtml(bodyMd),
  };
}

/** Scan content/articles for .md files, newest first. */
export function loadAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const articles = fs
    .readdirSync(ARTICLES_DIR)
    .filter((name) => name.endsWith(".md"))
    .sort()
    .map((name) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, name), "utf8");
      const { data, content } = matter(raw);
      return buildArticle(data, content, path.basename(name, ".md"));
    });

  // Newest first; ISO date strings sort correctly as strings.
  return articles.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return loadAllArticles().find((article) => article.slug === slug);
}

/**
 * Ported from the `article_image_src` template filter: absolute URLs pass
 * through, anything else is a file served out of public/.
 */
export function articleImageSrc(imagePath: string): string {
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  return `/${imagePath.replace(/^\/+/, "")}`;
}
