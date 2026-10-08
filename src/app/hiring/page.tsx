import type { Metadata } from "next";
import Link from "next/link";

import Figure from "@/components/Figure";
import JsonLd from "@/components/JsonLd";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/seo";
import { LINKEDIN_URL, RESUME_URL } from "@/lib/site";
import { VENTURES } from "@/lib/ventures";

export const metadata: Metadata = {
  title: "Hiring Heran Patel – The Professional Record",
  description:
    "The professional record for Heran Patel (HP Maharaja): founder and operator across software, real estate and live events, consulting on product management and engineering teams at scale in fintech and proptech. Open to leadership, advisory and board work.",
  alternates: { canonical: `${SITE_URL}/hiring` },
};

const STRENGTHS = [
  "Zero-to-one product definition and launch",
  "Full-stack build and ship — hands on keyboard",
  "Product management operating models at scale",
  "Engineering org design as headcount grows",
  "Event and program operations at venue scale",
  "P&L ownership, budgeting, vendor negotiation",
  "Team building and volunteer leadership",
];

const DOMAINS = [
  "Fintech — payments, ledgering, reconciliation",
  "Proptech — underwriting, portfolio and property ops",
  "Event-tech — ticketing and live operations",
  "Non-profit and community programs",
  "Media, content and brand",
];

const OPEN_TO = [
  {
    title: "Leadership roles",
    detail:
      "Head of Product, Director/VP of Engineering, or a founding-team seat where product and engineering are the same job.",
  },
  {
    title: "Advisory & fractional",
    detail:
      "Fractional product or engineering leadership for fintech and proptech teams scaling past their first forty people.",
  },
  {
    title: "Board seats",
    detail:
      "Boards that want a straight technical and operating read, not a nodding seat.",
  },
];

const PROOF = [
  {
    label: "Scale",
    claim: "Eleven ticketed events across five cities in a single 2026 run",
    detail:
      "Artist contracts, venues, vendors, ticketing and crowd flow — delivered against fixed dates nobody could move.",
    href: "/ventures/rameelo",
  },
  {
    label: "Build",
    claim: "A product studio shipping fintech, event-tech and proptech software",
    detail:
      "Roadmap, architecture and code, with the people using the product in the same room.",
    href: "/ventures/finityone",
  },
  {
    label: "Capital",
    claim: "A residential portfolio underwritten, renovated and held",
    detail:
      "Real money, real financing, real downside — the discipline that makes product trade-offs easy to make.",
    href: "/ventures/maharaja-estates",
  },
  {
    label: "Advisory",
    claim: "Consulting on PM and engineering teams at scale",
    detail:
      "Diagnosing why delivery slowed and changing the operating model, in fintech and proptech specifically.",
    href: "/ventures/consulting",
  },
];

export default function HiringPage() {
  return (
    <div className="bg-paper text-ink">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${SITE_URL}/hiring#profile`,
          name: "Hiring Heran Patel — The Professional Record",
          description: metadata.description as string,
          url: `${SITE_URL}/hiring`,
          inLanguage: "en",
          mainEntity: { "@id": `${SITE_URL}/#person` },
        }}
      />

      {/* ============================ HERO ============================ */}
      <section className="pt-28 lg:pt-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-8 lg:gap-x-10 items-end">
            <div className="lg:col-span-8">
              <p className="label mb-7">For recruiters & hiring managers</p>
              <h1 className="display text-[clamp(2.2rem,5.6vw,4.4rem)] max-w-[24ch]">
                A founder who builds it end to end.
              </h1>
              <p className="mt-7 text-lg lg:text-xl text-ink_2 max-w-[52ch] leading-relaxed">
                Four ventures across software, real estate, live events and the
                non-profit world — which has meant owning product, finance,
                hiring, vendors and delivery against real deadlines with real
                money on the line.
              </p>
            </div>
            <div className="lg:col-span-4 lg:pb-3">
              <Figure slot="hiring" ratio="wide" className="mb-8" />
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Opportunity%20for%20Heran%20Patel&body=Role%3A%0ACompany%3A%0AWhat%20you%20need%20built%3A%0ACompensation%20range%3A`}
                  className="btn btn-solid group"
                >
                  Send a role{" "}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                {RESUME_URL ? (
                  <a href={RESUME_URL} className="btn btn-ghost">
                    Resume
                  </a>
                ) : null}
                {LINKEDIN_URL ? (
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost"
                  >
                    LinkedIn
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          {/* Hairline fact strip */}
          <dl className="mt-14 grid grid-cols-2 lg:grid-cols-4 border-b border-line">
            <div className="border-t border-line py-7 pr-6 lg:border-r">
              <dt className="label mb-2">Ventures</dt>
              <dd className="text-xl sm:text-2xl font-semibold tracking-tight">
                {VENTURES.length}
              </dd>
            </div>
            <div className="border-t border-line py-7 pl-6 lg:pl-7 lg:pr-6 lg:border-r">
              <dt className="label mb-2">Based</dt>
              <dd className="text-xl sm:text-2xl font-semibold tracking-tight">
                Phoenix, Arizona
              </dd>
            </div>
            <div className="border-t border-line py-7 pr-6 lg:pl-7 lg:border-r">
              <dt className="label mb-2">Focus</dt>
              <dd className="text-xl sm:text-2xl font-semibold tracking-tight">
                Product &amp; Engineering
              </dd>
            </div>
            <div className="border-t border-line py-7 pl-6 lg:pl-7">
              <dt className="label mb-2">Sectors</dt>
              <dd className="text-xl sm:text-2xl font-semibold tracking-tight">
                Fintech · Proptech
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ======================= STRENGTHS / DOMAINS ======================= */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
            <div className="lg:col-span-4">
              <p className="label">01 — The shape of the work</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[26ch]">
                What I am actually good at.
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 border-t border-line">
            <div className="reveal lg:col-span-4 py-10 lg:pr-10 lg:border-r border-line">
              <p className="label mb-6">Operating strengths</p>
              <ul className="space-y-3 text-sm text-ink_3 leading-relaxed">
                {STRENGTHS.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-ink_3" aria-hidden="true">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal lg:col-span-4 py-10 border-t lg:border-t-0 lg:px-10 lg:border-r border-line">
              <p className="label mb-6">Domains</p>
              <ul className="space-y-3 text-sm text-ink_3 leading-relaxed">
                {DOMAINS.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-ink_3" aria-hidden="true">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal lg:col-span-4 py-10 border-t lg:border-t-0 lg:pl-10 border-line">
              <p className="label mb-6">Open to</p>
              <dl className="space-y-6">
                {OPEN_TO.map((item) => (
                  <div key={item.title}>
                    <dt className="text-base font-semibold tracking-tight mb-1.5">
                      {item.title}
                    </dt>
                    <dd className="text-sm text-ink_3 leading-relaxed">
                      {item.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ PROOF ============================ */}
      <section className="py-20 lg:py-28 bg-paper_2 border-y border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
            <div className="lg:col-span-4">
              <p className="label">02 — Evidence</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[28ch] mb-5">
                Four places the claims can be checked.
              </h2>
              <p className="text-base text-ink_2 max-w-xl leading-relaxed">
                Every line above traces back to something that shipped. Here is
                where each one came from.
              </p>
            </div>
          </div>

          <ol className="border-t border-line">
            {PROOF.map((item, index) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="group reveal grid lg:grid-cols-12 gap-y-3 lg:gap-x-10 py-8 border-b border-line"
                >
                  <p className="label lg:col-span-2">
                    {String(index + 1).padStart(2, "0")} · {item.label}
                  </p>
                  <div className="lg:col-span-9">
                    <h3 className="text-xl lg:text-2xl font-semibold tracking-tight mb-2 group-hover:opacity-60 transition">
                      {item.claim}
                    </h3>
                    <p className="text-sm text-ink_3 leading-relaxed max-w-2xl">
                      {item.detail}
                    </p>
                  </div>
                  <div className="lg:col-span-1 flex lg:justify-end">
                    <span
                      className="arrow text-ink_3 group-hover:text-ink transition"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <Link href="/achievements" className="btn btn-ghost">
              See the full record
            </Link>
          </div>
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-ink text-paper px-6 py-16 lg:px-14 lg:py-20">
            <p className="label !text-paper/55 mb-8">03 — Get in touch</p>
            <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-10">
              <div className="lg:col-span-7">
                <h2 className="display text-[clamp(1.9rem,4.2vw,3.2rem)] max-w-[22ch] mb-6">
                  Send the role, the team, and the problem.
                </h2>
                <p className="text-base text-paper/70 max-w-xl leading-relaxed">
                  You will get a straight answer on whether I am the right fit —
                  including when the answer is no. If there is someone better for
                  it in my network, I will say that too.
                </p>
              </div>
              <div className="lg:col-span-5 lg:pl-10 lg:border-l border-paper/15">
                <dl className="space-y-4 text-sm mb-9">
                  <div className="flex items-baseline justify-between gap-4 border-b border-paper/15 pb-3">
                    <dt className="label !text-paper/55">Based</dt>
                    <dd className="text-paper text-right">Phoenix, Arizona</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-paper/15 pb-3">
                    <dt className="label !text-paper/55">Email</dt>
                    <dd className="text-right">
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-paper hover:opacity-60 transition break-all"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="label !text-paper/55">Response</dt>
                    <dd className="text-paper text-right">Within a few days</dd>
                  </div>
                </dl>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Opportunity%20for%20Heran%20Patel&body=Role%3A%0ACompany%3A%0AWhat%20you%20need%20built%3A%0ACompensation%20range%3A`}
                  className="btn btn-invert w-full group"
                >
                  Send a role{" "}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
