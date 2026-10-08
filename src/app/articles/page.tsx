import type { Metadata } from "next";
import Link from "next/link";

import { articleImageSrc, loadAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Maharaja News – Articles by Heran Patel (HP Maharaja)",
};

export default function ArticlesPage() {
  const articles = loadAllArticles();

  const breakingArticle = articles.find((article) => article.isBreaking);
  const featured = articles.filter((article) => article.isFeatured);
  const others = articles.filter((article) => !article.isFeatured);

  const feature = featured[0];
  const sideFeatured = featured.slice(1);

  return (
    <div className="pt-28 lg:pt-36 pb-20 bg-paper text-ink">
      <div className="max-w-6xl mx-auto px-4">
        {/* TOP: NAMEPLATE / HEADING */}
        <header className="mb-8 md:mb-10 border-b border-slate-200 pb-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-3">
            <div>
              <p className="text-[0.65rem] tracking-[0.3em] uppercase text-slate-500 mb-1">
                Maharaja News · JOURNAL
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Articles · Pursuing Balance in Chaos
              </h1>
              <p className="text-sm md:text-base text-slate-600 mt-2 max-w-xl">
                A curated publication of articles on hustle, faith, politics, culture, and building an
                empire without losing your center.
              </p>
            </div>
            <div className="text-left md:text-right space-y-1 shrink-0">
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500 flex items-center md:justify-end gap-2">
                <span className="h-px w-8 bg-slate-300"></span>
                <span>Curated by Heran Patel</span>
              </p>
              <p className="text-[0.65rem] text-slate-400">
                Est. 2013 · Independent Editorial Perspective
              </p>
            </div>
          </div>
        </header>

        {/* BREAKING NEWS BANNER */}
        {breakingArticle ? (
          <section className="mb-8">
            <div className="rounded-xl border border-maharaja_gold/60 bg-gradient-to-r from-[#fff8e7] via-[#fdf5e9] to-[#f8f5f0] px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 shrink-0 rounded-full border border-maharaja_gold flex items-center justify-center bg-white">
                  <span className="text-[0.6rem] tracking-[0.18em] uppercase text-maharaja_gold">Live</span>
                </div>
                <div>
                  <p className="text-[0.65rem] tracking-[0.3em] uppercase text-maharaja_gold mb-0.5">
                    Breaking Perspective
                  </p>
                  <Link
                    href={`/articles/${breakingArticle.slug}`}
                    className="text-sm md:text-base font-medium text-slate-900 hover:text-maharaja_gold transition"
                  >
                    {breakingArticle.title}
                  </Link>
                  <p className="text-[0.7rem] text-slate-500 mt-0.5">
                    {breakingArticle.date} · {breakingArticle.category} · {breakingArticle.readingTime}
                  </p>
                </div>
              </div>
              <div className="text-[0.65rem] text-slate-500 md:text-right">
                <p className="uppercase tracking-[0.24em]">#HustleMindset · Balance in Chaos</p>
              </div>
            </div>
          </section>
        ) : null}

        {/* MAIN GRID: FEATURED + SECONDARY */}
        <section className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1.2fr] gap-6 md:gap-8">
            {/* Primary Featured Article */}
            {feature ? (
              <article className="group border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm">
                <div className="relative h-56 sm:h-64 md:h-80 overflow-hidden">
                  {feature.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={articleImageSrc(feature.image)}
                      alt={feature.title}
                      className="w-full h-full object-cover transform group-hover:scale-[1.03] transition duration-700 ease-out"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="inline-flex px-2 py-1 rounded-full bg-black/70 border border-slate-600 text-[0.65rem] uppercase tracking-[0.24em] text-slate-100 mb-2">
                      {feature.category} · {feature.readingTime}
                    </p>
                    <Link href={`/articles/${feature.slug}`}>
                      <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold leading-tight text-white group-hover:text-maharaja_gold_soft transition">
                        {feature.title}
                      </h2>
                    </Link>
                    <p className="hidden sm:block text-xs md:text-sm text-slate-100/80 mt-2">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
                <div className="px-5 py-4 border-t border-slate-200 bg-[#faf7f1]">
                  <div className="flex items-center justify-between text-[0.7rem] text-slate-600">
                    <span>{feature.date}</span>
                    <span className="uppercase tracking-[0.24em] text-slate-500">Feature Essay</span>
                  </div>
                </div>
              </article>
            ) : null}

            {/* Secondary / Side Column */}
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-2xl bg-white px-4 py-3 shadow-sm">
                <p className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-500 mb-1">
                  Today’s Editorial Line-Up
                </p>
                <p className="text-sm text-slate-700">
                  A daily snapshot of the ideas shaping how we think about hustle, identity, community,
                  and power through the lens of Heran Patel.
                </p>
              </div>
              {sideFeatured.map((article) => (
                <article
                  key={article.slug}
                  className="group border border-slate-200 rounded-2xl bg-white overflow-hidden flex flex-col sm:flex-row shadow-sm"
                >
                  <div className="sm:w-2/5 h-40 sm:h-auto shrink-0 relative">
                    {article.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={articleImageSrc(article.image)}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>
                  </div>
                  <div className="sm:w-3/5 p-4 flex flex-col">
                    <p className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-500 mb-1">
                      {article.category} · {article.date}
                    </p>
                    <Link href={`/articles/${article.slug}`}>
                      <h3 className="text-sm md:text-base font-semibold text-slate-900 group-hover:text-maharaja_gold transition">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-600 mt-1">{article.summary}</p>
                    <p className="text-[0.65rem] text-slate-500 mt-2">{article.readingTime}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* REST OF ARTICLES GRID */}
        <section className="border-t border-slate-200 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold">Older Articles</h2>
              <p className="text-xs text-slate-500 mt-1">
                Browse the full archive of perspectives from the Heran Patel Journal.
              </p>
            </div>
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-slate-500 hidden sm:block">
              Heran Patel · aka HP Maharaja
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {others.map((article) => (
              <article
                key={article.slug}
                className="group border border-slate-200 rounded-2xl bg-white overflow-hidden flex flex-col shadow-sm"
              >
                <div className="h-44 sm:h-40 overflow-hidden">
                  <Link href={`/articles/${article.slug}`}>
                    {article.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={articleImageSrc(article.image)}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700"
                      />
                    ) : null}
                  </Link>
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <p className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-500">
                    {article.category} · {article.date} · {article.readingTime}
                  </p>
                  <Link href={`/articles/${article.slug}`}>
                    <h3 className="text-base md:text-lg font-semibold text-slate-900 group-hover:text-maharaja_gold transition">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-600">{article.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
