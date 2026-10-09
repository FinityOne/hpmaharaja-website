import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Figure from "@/components/Figure";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/seo";
import { VENTURES, findVenture } from "@/lib/ventures";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return VENTURES.map((venture) => ({ slug: venture.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venture = findVenture(slug);
  if (!venture) return {};

  return {
    title: `${venture.name} – ${venture.category} · Heran Patel (HP Maharaja)`,
    description: venture.summary,
    alternates: { canonical: `${SITE_URL}/ventures/${venture.slug}` },
    openGraph: {
      type: "website",
      title: `${venture.name} — ${venture.headline}`,
      description: venture.summary,
      url: `${SITE_URL}/ventures/${venture.slug}`,
    },
  };
}

export default async function VenturePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const venture = findVenture(slug);
  if (!venture) notFound();

  const others = VENTURES.filter((item) => item.slug !== venture.slug);

  return (
    <div className="bg-paper text-ink">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": `${SITE_URL}/ventures/${venture.slug}#organization`,
          name: venture.name,
          description: venture.summary,
          url: `${SITE_URL}/ventures/${venture.slug}`,
          founder: { "@id": `${SITE_URL}/#person` },
          areaServed: venture.based,
        }}
      />

      {/* ============================ HERO ============================ */}
      <section className="pt-28 lg:pt-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="mb-10">
            <Link href="/ventures" className="label hover:text-ink transition">
              ← All ventures
            </Link>
          </nav>

          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-10 items-end">
            <div className="lg:col-span-7">
              <p className="label mb-7">
                {venture.category} · {venture.status}
              </p>
              <h1 className="display text-[clamp(2.2rem,5.6vw,4.4rem)] max-w-[22ch]">
                {venture.name}
              </h1>
              <p className="mt-7 text-xl lg:text-2xl tracking-tight text-ink_2 max-w-[30ch]">
                {venture.headline}
              </p>
              <p className="mt-6 text-base text-ink_3 leading-relaxed max-w-[48ch]">
                {venture.summary}
              </p>
            </div>
            <div className="lg:col-span-5">
              <Figure slot={venture.slug} ratio="wide" />
            </div>
          </div>

          {/* Hairline fact strip */}
          <dl className="mt-14 grid grid-cols-2 lg:grid-cols-4 border-b border-line">
            {venture.facts.map((fact, index) => (
              <div
                key={fact.label}
                className={`border-t border-line py-7 ${
                  index % 2 === 0 ? "pr-6" : "pl-6 lg:pl-7 lg:pr-6"
                } lg:border-r last:lg:border-r-0`}
              >
                <dt className="label mb-2">{fact.label}</dt>
                <dd className="text-lg sm:text-xl font-semibold tracking-tight">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============================ BODY ============================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <p className="label mb-7">01 — What it is</p>
              <p className="text-lg lg:text-xl text-ink leading-relaxed mb-7">
                {venture.lead}
              </p>
              {venture.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-base text-ink_2 leading-relaxed mb-5"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="lg:col-span-5 lg:pl-10 lg:border-l border-line">
              <p className="label mb-7">02 — The work</p>
              <ul className="space-y-3 text-sm text-ink_3 leading-relaxed mb-12">
                {venture.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="text-ink_3" aria-hidden="true">
                      ·
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <p className="label mb-5">03 — Who should reach out</p>
              <p className="text-sm text-ink_3 leading-relaxed mb-9">
                {venture.whoShouldReachOut}
              </p>

              <div className="flex flex-wrap gap-3">
                <a href={venture.cta.href} className="btn btn-solid group">
                  {venture.cta.label}{" "}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                {venture.related?.map((link) => (
                  <Link key={link.href} href={link.href} className="btn btn-ghost">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ OTHERS ============================ */}
      <section className="py-20 lg:py-28 bg-paper_2 border-t border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="label mb-12">The rest of the portfolio</p>
          <div className="grid md:grid-cols-3 border-t border-line">
            {others.map((other, index) => (
              <Link
                key={other.slug}
                href={`/ventures/${other.slug}`}
                className={`group reveal py-10 flex flex-col border-line border-b md:border-b-0 ${
                  index === 0
                    ? "md:pr-10 md:border-r"
                    : index === others.length - 1
                      ? "md:pl-10"
                      : "md:px-10 md:border-r"
                }`}
              >
                <div className="flex items-start justify-between gap-6 mb-6">
                  <p className="label">{other.category}</p>
                  <span
                    className="arrow text-ink_3 group-hover:text-ink transition"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
                <h2 className="text-xl font-semibold tracking-tight mb-3">
                  {other.name}
                </h2>
                <p className="text-sm text-ink_3 leading-relaxed">{other.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
