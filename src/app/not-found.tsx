import type { Metadata } from "next";
import Link from "next/link";

import LostAndFound from "@/components/LostAndFound";
import { loadAllArticles } from "@/lib/articles";

/**
 * Served for any unmatched route, and by notFound() on an unknown article slug.
 *
 * A dead end is the one page a visitor never meant to open, so it earns its
 * keep by being a way back in: the real essays, the main sections, and a
 * shuffle button.
 *
 * `robots` is set here to override the root layout's `index, follow`, which
 * would otherwise be emitted alongside Next's own `noindex` and contradict it.
 * `follow` stays on so crawlers still take the links back into the site.
 */
export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "That page is not part of the empire. Find the essays, ventures and music of Heran Patel (HP Maharaja) from here.",
  robots: { index: false, follow: true },
};

const DESTINATIONS = [
  { href: "/", label: "Home", note: "The whole story, top to bottom" },
  { href: "/articles", label: "Articles", note: "Essays from the throne" },
  { href: "/#ventures", label: "Ventures", note: "Four operating companies" },
  { href: "/#media", label: "Music & vlogs", note: "HP Maharaja on the mic" },
  { href: "/#tour", label: "Tour", note: "Rameelo Garba Tour 2026" },
  { href: "/#contact", label: "Contact", note: "Reach Heran directly" },
];

export default function NotFound() {
  const articles = loadAllArticles();
  const recent = articles.slice(0, 3);

  return (
    <div className="bg-paper text-ink">
      {/* ---------------- MASTHEAD ---------------- */}
      <section className="pt-28 lg:pt-44 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-10 items-end">
            <div className="lg:col-span-8">
              <p className="label mb-7">Error 404 — Off the map</p>
              <h1 className="error-code display text-ink text-[clamp(5rem,20vw,13rem)]">404</h1>
              <p className="mt-8 text-2xl lg:text-3xl tracking-tight text-ink max-w-[26ch]">
                This page never made it out of the chaos.
              </p>
              <div className="mt-7 max-w-xl">
                <LostAndFound slugs={articles.map((article) => article.slug)} />
              </div>
            </div>

            {/* Mono receipt, for character: what was asked for, what came back */}
            <div className="lg:col-span-4 lg:pb-3">
              <div className="border border-line_strong p-6">
                <p className="label mb-5">Status report</p>
                <dl className="space-y-3 font-mono text-[0.72rem] tracking-[0.06em]">
                  <div className="flex items-baseline justify-between gap-4 border-b border-line pb-2">
                    <dt className="text-ink_3 uppercase">Status</dt>
                    <dd className="text-ink">404</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-line pb-2">
                    <dt className="text-ink_3 uppercase">Page</dt>
                    <dd className="text-ink">Not found</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-line pb-2">
                    <dt className="text-ink_3 uppercase">Hustle</dt>
                    <dd className="text-ink">Unaffected</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-ink_3 uppercase">Balance</dt>
                    <dd className="text-ink">Still pursued</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- WHERE TO GO ---------------- */}
      <section className="py-16 lg:py-20 bg-paper_2 border-y border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-10">
            <div className="lg:col-span-4">
              <p className="label">Try one of these</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display text-[clamp(1.6rem,3.2vw,2.6rem)] max-w-[26ch]">
                Every door that actually opens.
              </h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-line">
            {DESTINATIONS.map((destination, index) => (
              <Link
                key={destination.href}
                href={destination.href}
                className="group border-b border-line py-7 sm:odd:pr-8 lg:pr-8 flex flex-col"
              >
                <div className="flex items-start justify-between gap-6 mb-4">
                  <p className="label">{String(index + 1).padStart(2, "0")}</p>
                  <span
                    className="arrow text-ink_3 group-hover:text-ink transition"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-2 group-hover:opacity-60 transition">
                  {destination.label}
                </h3>
                <p className="text-sm text-ink_3 leading-relaxed">{destination.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- RECENT READING ---------------- */}
      {recent.length > 0 ? (
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
              <h2 className="display text-[clamp(1.6rem,3.2vw,2.6rem)] max-w-[22ch]">
                Since you are here, read something.
              </h2>
              <Link
                href="/articles"
                className="label hover:text-ink transition inline-flex items-center gap-2 group"
              >
                All articles <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="border-t border-line">
              {recent.map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group block border-b border-line py-7"
                >
                  <div className="grid lg:grid-cols-12 gap-y-3 lg:gap-x-10 items-baseline">
                    <p className="label lg:col-span-2">{String(index + 1).padStart(2, "0")}</p>
                    <div className="lg:col-span-7">
                      <h3 className="text-lg lg:text-xl font-semibold tracking-tight mb-2 group-hover:opacity-60 transition">
                        {article.title}
                      </h3>
                      <p className="text-sm text-ink_3 leading-relaxed max-w-xl">
                        {article.summary ?? article.subtitle}
                      </p>
                    </div>
                    <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-6">
                      <p className="label">
                        {article.category} · {article.readingTime}
                      </p>
                      <span
                        className="arrow text-ink_3 group-hover:text-ink transition"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
