import type { Metadata } from "next";
import Link from "next/link";

import Figure from "@/components/Figure";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/seo";
import { VENTURES } from "@/lib/ventures";

export const metadata: Metadata = {
  title: "Ventures – Heran Patel (HP Maharaja)",
  description:
    "The four ventures Heran Patel (HP Maharaja) runs: Rameelo, FinityOne, Maharaja Estates, and a consulting practice for product management and engineering teams at scale in fintech and proptech.",
  alternates: { canonical: `${SITE_URL}/ventures` },
};

export default function VenturesPage() {
  return (
    <div className="bg-paper text-ink">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/ventures#collection`,
          name: "Ventures — Heran Patel (HP Maharaja)",
          description: metadata.description as string,
          url: `${SITE_URL}/ventures`,
          inLanguage: "en",
          about: { "@id": `${SITE_URL}/#person` },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: VENTURES.length,
            itemListElement: VENTURES.map((venture, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: venture.name,
              description: venture.summary,
              url: `${SITE_URL}/ventures/${venture.slug}`,
            })),
          },
        }}
      />

      {/* ============================ HERO ============================ */}
      <section className="pt-28 lg:pt-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-8 lg:gap-x-10 items-end">
            <div className="lg:col-span-8">
              <p className="label mb-7">The portfolio</p>
              <h1 className="display text-[clamp(2.4rem,6.4vw,5rem)] max-w-[20ch]">
                Ventures
              </h1>
              <p className="mt-7 text-xl lg:text-2xl tracking-tight text-ink_2 max-w-[34ch]">
                Culture, software, real estate, and the advisory work that ties
                them together.
              </p>
            </div>
            <div className="lg:col-span-4 lg:pb-3">
              <p className="text-base text-ink_2 leading-relaxed">
                Four operating concerns, each with its own page. No portfolio
                theatre — these are the ones I run.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ GRID ============================ */}
      <section className="pt-16 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 border-t border-line">
            {VENTURES.map((venture, index) => {
              const isLeft = index % 2 === 0;
              const isLastRow = index >= VENTURES.length - (VENTURES.length % 2 === 0 ? 2 : 1);
              return (
                <Link
                  key={venture.slug}
                  href={`/ventures/${venture.slug}`}
                  className={`group reveal py-10 flex flex-col border-line ${
                    isLeft ? "md:pr-12 md:border-r" : "md:pl-12"
                  } border-b ${isLastRow ? "md:border-b-0" : ""}`}
                >
                  <Figure slot={venture.slug} ratio="wide" className="mb-7" />
                  <div className="flex items-start justify-between gap-6 mb-5">
                    <p className="label">{String(index + 1).padStart(2, "0")}</p>
                    <span
                      className="arrow text-ink_3 group-hover:text-ink transition"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3 group-hover:opacity-60 transition">
                    {venture.name}
                  </h2>
                  <p className="text-sm text-ink_3 leading-relaxed mb-7 max-w-md">
                    {venture.summary}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1">
                    <p className="label">{venture.category}</p>
                    <p className="label">{venture.role}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <a
              href="mailto:heran@finityone.com?subject=Founder%20Intro&body=Company%3A%0AWhat%20you%27re%20building%3A%0AWhere%20we%20overlap%3A"
              className="btn btn-solid group"
            >
              Founder intro <span className="arrow" aria-hidden="true">→</span>
            </a>
            <Link href="/achievements" className="btn btn-ghost">
              See the achievements
            </Link>
            <Link href="/hiring" className="btn btn-ghost">
              Hiring me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
