import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import {
  articleImageAlt,
  articleImageSrc,
  getArticleBySlug,
  loadAllArticles,
} from "@/lib/articles";
import {
  NAME_KEYWORDS,
  OG_IMAGE,
  OG_IMAGE_ALT,
  PERSON_ALTERNATE_NAME,
  PERSON_NAME,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return loadAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  /* The layout's title template appends the name, so the title here is just
     the headline. Falls back to the site-wide share image when an essay has no
     cover of its own, so the link never unfurls bare. */
  const shareImage = article.image ? articleImageSrc(article.image) : OG_IMAGE;
  const shareImageAlt = article.image ? articleImageAlt(article) : OG_IMAGE_ALT;
  const description = article.summary ?? article.subtitle ?? undefined;

  return {
    title: article.title,
    description,
    keywords: [...NAME_KEYWORDS, article.category],
    alternates: { canonical: `${SITE_URL}/articles/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description,
      url: `${SITE_URL}/articles/${article.slug}`,
      publishedTime: article.date ?? undefined,
      modifiedTime: article.date ?? undefined,
      authors: [PERSON_NAME],
      section: article.category,
      images: [{ url: shareImage, alt: shareImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [shareImage],
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const url = `${SITE_URL}/articles/${article.slug}`;

  return (
    <div className="bg-paper pt-28 lg:pt-36 pb-20 text-ink">
      {/* Structured data so the essay is citable as an article with an author
          and a date, rather than an unattributed page of text. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              "@id": `${url}#article`,
              headline: article.title,
              alternativeHeadline: article.subtitle ?? undefined,
              description: article.summary ?? undefined,
              articleSection: article.category,
              datePublished: article.date ?? undefined,
              dateModified: article.date ?? undefined,
              inLanguage: "en",
              url,
              mainEntityOfPage: { "@type": "WebPage", "@id": url },
              image: article.image ? articleImageSrc(article.image) : undefined,
              author: {
                "@type": "Person",
                "@id": `${SITE_URL}/#person`,
                name: PERSON_NAME,
                alternateName: PERSON_ALTERNATE_NAME,
                url: SITE_URL,
              },
              publisher: { "@id": `${SITE_URL}/#person` },
              isPartOf: { "@id": `${SITE_URL}/#website` },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Articles", item: `${SITE_URL}/articles` },
                { "@type": "ListItem", position: 3, name: article.title, item: url },
              ],
            },
          ],
        }}
      />
      <div className="max-w-5xl mx-auto px-4">
        {/* Breadcrumb / Back */}
        <div className="mb-5 text-[0.7rem] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-slate-500 flex flex-wrap items-center gap-2">
          <Link href="/articles" className="hover:text-maharaja_gold transition">
            ← All Articles
          </Link>
          <span className="h-px w-6 bg-slate-300"></span>
          <span>Maharaja News</span>
        </div>

        {/* Hero Image */}
        {article.image ? (
          <div className="mb-8">
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-md border border-slate-200 bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={articleImageSrc(article.image)}
                alt={articleImageAlt(article)}
                className="w-full h-48 sm:h-64 md:h-80 object-cover"
              />
            </div>
          </div>
        ) : null}

        {/* Header */}
        <header className="mb-6">
          <p className="text-[0.7rem] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-slate-500 mb-2">
            {article.category || "Editorial"}
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3 leading-tight">
            {article.title}
          </h1>
          {article.subtitle ? (
            <p className="text-sm md:text-base text-slate-600 mb-3 max-w-2xl">{article.subtitle}</p>
          ) : null}
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 text-[0.8rem] text-slate-500">
            {/* Circle Icon / Author Badge */}
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 shrink-0 rounded-full bg-slate-900 text-white flex items-center justify-center text-[0.6rem] font-semibold tracking-[0.18em]">
                HP
              </div>
              <div className="flex flex-col">
                <span className="uppercase tracking-[0.18em] text-[0.65rem]">Heran Patel</span>
                <span className="text-[0.7rem] text-slate-500">
                  aka HP Maharaja · Founder, FinityOne, Vaihom, Maharaja Estates, &amp; Rameelo
                </span>
              </div>
            </div>
            {/* Meta Divider */}
            <span className="hidden sm:inline-block h-px w-6 bg-slate-300"></span>
            {/* Date / Reading Time */}
            <div className="flex flex-wrap items-center gap-2 text-[0.75rem]">
              <span>{article.date}</span>
              <span className="text-slate-400">·</span>
              <span>{article.readingTime}</span>
              <span className="text-slate-400">·</span>
              <span className="uppercase tracking-[0.16em] text-[0.7rem] text-slate-500">
                #HustleMindset
              </span>
            </div>
          </div>
        </header>

        {/* Body */}
        <article className="mt-6 bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-sm px-4 py-5 sm:px-5 sm:py-6 md:px-8 md:py-8">
          {/* Rendered from trusted local markdown in content/articles/ at build time. */}
          <div
            className="article-body prose prose-slate prose-sm md:prose-base max-w-none prose-headings:font-semibold prose-h1:text-slate-900 prose-h2:text-slate-900 prose-h3:text-slate-900 prose-p:text-slate-700 prose-strong:text-slate-900 prose-em:text-slate-700 prose-a:text-maharaja_gold prose-a:no-underline hover:prose-a:underline prose-a:break-words prose-img:rounded-2xl prose-img:shadow-sm"
            dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
          />
        </article>
      </div>
    </div>
  );
}
