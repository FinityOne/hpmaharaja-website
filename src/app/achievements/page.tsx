import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import { ACHIEVEMENT_TRACKS, ALL_ACHIEVEMENTS } from "@/lib/achievements";
import { loadAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/seo";
import { buildTourDates, buildTourMeta } from "@/lib/tour";
import { VENTURES } from "@/lib/ventures";

export const metadata: Metadata = {
  title: "Achievements – Heran Patel (HP Maharaja)",
  description:
    "The record: four ventures built from nothing, the Rameelo Garba Tour across five American cities, and over a decade of independent writing and music by Heran Patel (HP Maharaja).",
  alternates: { canonical: `${SITE_URL}/achievements` },
};

/** The tour counters label themselves against today's date. */
export const revalidate = 86400;

export default function AchievementsPage() {
  const tourMeta = buildTourMeta(buildTourDates());
  const articleCount = loadAllArticles().length;

  const stats = [
    { label: "Ventures built", value: String(VENTURES.length) },
    { label: "Tour events, 2026", value: String(tourMeta.events) },
    { label: "Cities on the run", value: String(tourMeta.cities) },
    { label: "Publishing since", value: "2013" },
  ];

  return (
    <div className="bg-paper text-ink">
      {/* Structured data: the record as a list an assistant can enumerate
          without scraping the layout. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": `${SITE_URL}/achievements#list`,
          name: "Achievements — Heran Patel (HP Maharaja)",
          description: metadata.description as string,
          url: `${SITE_URL}/achievements`,
          inLanguage: "en",
          numberOfItems: ALL_ACHIEVEMENTS.length,
          itemListElement: ALL_ACHIEVEMENTS.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.title,
            description: item.detail,
          })),
        }}
      />

      {/* ============================ HERO ============================ */}
      <section className="pt-28 lg:pt-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-8 lg:gap-x-10 items-end">
            <div className="lg:col-span-8">
              <p className="label mb-7">The record</p>
              <h1 className="display text-[clamp(2.4rem,6.4vw,5rem)] max-w-[20ch]">
                Achievements
              </h1>
              <p className="mt-7 text-xl lg:text-2xl tracking-tight text-ink_2 max-w-[34ch]">
                Built, booked, shipped and published.
              </p>
            </div>
            <div className="lg:col-span-4 lg:pb-3">
              <p className="text-base text-ink_2 leading-relaxed">
                Three tracks run in parallel — the ventures, the stage, and the
                writing. This is what each of them has actually produced, with
                nothing padded out.
              </p>
            </div>
          </div>

          {/* Hairline fact strip */}
          <dl className="mt-14 grid grid-cols-2 lg:grid-cols-4 border-b border-line">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`border-t border-line py-7 ${
                  index % 2 === 0 ? "pr-6" : "pl-6 lg:pl-7 lg:pr-6"
                } lg:border-r last:lg:border-r-0`}
              >
                <dt className="label mb-2">{stat.label}</dt>
                <dd className="text-xl sm:text-2xl font-semibold tracking-tight">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 label">
            Journal · {articleCount} {articleCount === 1 ? "essay" : "essays"} published
          </p>
        </div>
      </section>

      {/* ============================ TRACKS ============================ */}
      {ACHIEVEMENT_TRACKS.map((track, trackIndex) => (
        <section
          key={track.id}
          id={track.id}
          className={`py-20 lg:py-28 ${
            trackIndex % 2 === 1 ? "bg-paper_2 border-y border-line" : ""
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
              <div className="lg:col-span-4">
                <p className="label">
                  {String(trackIndex + 1).padStart(2, "0")} — {track.label}
                </p>
              </div>
              <div className="lg:col-span-8">
                <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[28ch] mb-5">
                  {track.headline}
                </h2>
                <p className="text-base text-ink_2 max-w-xl leading-relaxed">
                  {track.blurb}
                </p>
              </div>
            </div>

            <ol className="border-t border-line">
              {track.items.map((item, index) => {
                const row = (
                  <>
                    <p className="label lg:col-span-1">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <div className="lg:col-span-8">
                      <h3 className="text-xl lg:text-2xl font-semibold tracking-tight mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-ink_3 leading-relaxed max-w-2xl">
                        {item.detail}
                      </p>
                    </div>
                    <div className="lg:col-span-3 flex items-start lg:justify-end gap-4">
                      {item.year ? (
                        <span className="label !text-ink shrink-0">{item.year}</span>
                      ) : null}
                      {item.tag ? (
                        <span className="label shrink-0">{item.tag}</span>
                      ) : null}
                      {item.href ? (
                        <span
                          className="arrow text-ink_3 group-hover:text-ink transition shrink-0"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      ) : null}
                    </div>
                  </>
                );

                const shell =
                  "reveal grid lg:grid-cols-12 gap-y-3 lg:gap-x-10 py-8 border-b border-line";

                return (
                  <li key={item.title}>
                    {item.href ? (
                      <Link href={item.href} className={`group ${shell}`}>
                        {row}
                      </Link>
                    ) : (
                      <div className={shell}>{row}</div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      ))}

      {/* ====================== WHERE TO GO NEXT ====================== */}
      <section className="py-20 lg:py-28 border-t border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
            <div className="lg:col-span-4">
              <p className="label">Next</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[26ch] mb-5">
                Depends on why you came.
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 border-t border-line">
            <Link
              href="/hiring"
              className="group reveal py-10 flex flex-col border-b border-line md:border-b-0 md:pr-10 md:border-r"
            >
              <div className="flex items-start justify-between gap-6 mb-6">
                <p className="label">Hiring</p>
                <span
                  className="arrow text-ink_3 group-hover:text-ink transition"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3">
                The professional record
              </h3>
              <p className="text-sm text-ink_3 leading-relaxed">
                Strengths, domains, what I am open to, and how to send a role.
              </p>
            </Link>

            <Link
              href="/ventures"
              className="group reveal py-10 flex flex-col border-b border-line md:border-b-0 md:px-10 md:border-r"
            >
              <div className="flex items-start justify-between gap-6 mb-6">
                <p className="label">Ventures</p>
                <span
                  className="arrow text-ink_3 group-hover:text-ink transition"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3">
                What I actually run
              </h3>
              <p className="text-sm text-ink_3 leading-relaxed">
                Rameelo, FinityOne, Maharaja Estates and the consulting practice.
              </p>
            </Link>

            <Link
              href="/articles"
              className="group reveal py-10 flex flex-col md:pl-10"
            >
              <div className="flex items-start justify-between gap-6 mb-6">
                <p className="label">Journal</p>
                <span
                  className="arrow text-ink_3 group-hover:text-ink transition"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3">
                The writing
              </h3>
              <p className="text-sm text-ink_3 leading-relaxed">
                Essays on hustle, faith, politics, culture and dharma.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
