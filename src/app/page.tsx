import type { Metadata } from "next";
import Link from "next/link";

import { FEATURED_ARTICLES, LINKEDIN_URL, RESUME_URL } from "@/lib/site";
import { buildTourDates, buildTourMeta } from "@/lib/tour";

export const metadata: Metadata = {
  title: "Heran Patel (HP Maharaja) – Founder, Builder, Creator",
};

/**
 * Tour rows label themselves played/upcoming against the current date, so the
 * static render is refreshed daily instead of being frozen at build time.
 */
export const revalidate = 86400;

export default function HomePage() {
  const tourDates = buildTourDates();
  const tourMeta = buildTourMeta(tourDates);

  return (
    <>
      {/* ============================ HERO ============================ */}
        <section id="hero" className="pt-28 lg:pt-44">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-10 items-end">
              <div className="lg:col-span-9">
                <p className="label mb-7">01 — Founder · Operator · Creator</p>
                <h1 className="display text-ink text-[clamp(2.75rem,8.2vw,7rem)] max-w-[18ch]">
                  Heran Patel
                </h1>
                <p className="mt-6 font-mono text-[0.78rem] tracking-[0.18em] uppercase text-ink_2">
                  aka HP Maharaja
                </p>
                <p className="mt-7 text-xl lg:text-2xl tracking-tight text-ink_2 max-w-[28ch]">
                  Pursuing balance in chaos.
                </p>
              </div>
              <div className="lg:col-span-3 lg:pb-3">
                <p className="text-base text-ink_2 leading-relaxed">
                  Rap, vlogs, and long-form essays on ambition, faith, and identity — built
                  on discipline and the pursuit of a Maharaja-level life.
                </p>
              </div>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <Link href="/articles" className="btn btn-solid">
                Read the journal
                <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <a href="#media" className="btn btn-ghost">Watch & listen</a>
            </div>
          </div>
          {/* Full-bleed image band */}
          <div className="mt-16 lg:mt-20">
            <div className="relative overflow-hidden bg-paper_2">
              <img src="/images/base/header-bg.jpg"
                   alt="Heran Patel, aka HP Maharaja"
                   className="w-full h-[42vh] md:h-[58vh] lg:h-[66vh] object-cover grayscale contrast-[1.08]" />
            </div>
          </div>
          {/* Hairline fact strip */}
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <dl className="grid grid-cols-2 lg:grid-cols-4 border-b border-line">
              <div className="border-t border-line py-7 pr-6 lg:border-r">
                <dt className="label mb-2">Ventures</dt>
                <dd className="text-xl sm:text-2xl font-semibold tracking-tight">Four</dd>
              </div>
              <div className="border-t border-line py-7 pl-6 lg:pl-7 lg:pr-6 lg:border-r">
                <dt className="label mb-2">Based</dt>
                <dd className="text-xl sm:text-2xl font-semibold tracking-tight">New York City</dd>
              </div>
              <div className="border-t border-line py-7 pr-6 lg:pl-7 lg:border-r">
                <dt className="label mb-2">Writing since</dt>
                <dd className="text-xl sm:text-2xl font-semibold tracking-tight">2013</dd>
              </div>
              <div className="border-t border-line py-7 pl-6 lg:pl-7">
                <dt className="label mb-2">Operating thesis</dt>
                <dd className="text-xl sm:text-2xl font-semibold tracking-tight">Discipline</dd>
              </div>
            </dl>
          </div>
        </section>
        {/* ========================= START HERE ========================= */}
        <section id="start-here" className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
              <div className="lg:col-span-4">
                <p className="label">02 — Start here</p>
              </div>
              <div className="lg:col-span-8">
                <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[26ch] mb-5">
                  One person, a few reasons you might be here.
                </h2>
                <p className="text-base text-ink_2 max-w-xl leading-relaxed">
                  Recruiter, founder, longtime supporter, or first-time reader — pick the
                  lane that fits and go straight to what matters.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 border-t border-line">
              <a href="#for-recruiters" className="group reveal py-10 flex flex-col border-line md:pr-12 md:border-r border-b">
                <div className="flex items-start justify-between gap-6 mb-6">
                  <p className="label">Recruiters & hiring managers</p>
                  <span className="arrow text-ink_3 group-hover:text-ink transition" aria-hidden="true">→</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3">The professional record</h3>
                <p className="text-sm text-ink_3 leading-relaxed mb-7 max-w-md">
                  What I build, how I operate, and how to reach me about a role.
                </p>
                <p className="label mt-auto">Resume & contact</p>
              </a>
              <a href="#ventures" className="group reveal py-10 flex flex-col border-line md:pl-12 border-b">
                <div className="flex items-start justify-between gap-6 mb-6">
                  <p className="label">Founders & operators</p>
                  <span className="arrow text-ink_3 group-hover:text-ink transition" aria-hidden="true">→</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3">The venture portfolio</h3>
                <p className="text-sm text-ink_3 leading-relaxed mb-7 max-w-md">
                  Four operating companies, and where a partnership actually makes sense.
                </p>
                <p className="label mt-auto">Build together</p>
              </a>
              <a href="#media" className="group reveal py-10 flex flex-col border-line md:pr-12 md:border-r border-b md:border-b-0">
                <div className="flex items-start justify-between gap-6 mb-6">
                  <p className="label">The Maharaja family</p>
                  <span className="arrow text-ink_3 group-hover:text-ink transition" aria-hidden="true">→</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3">Music, vlogs & merch</h3>
                <p className="text-sm text-ink_3 leading-relaxed mb-7 max-w-md">
                  The HP Maharaja side of the house, plus the community behind it.
                </p>
                <p className="label mt-auto">Enter the court</p>
              </a>
              <a href="#articles" className="group reveal py-10 flex flex-col border-line md:pl-12 border-b md:border-b-0">
                <div className="flex items-start justify-between gap-6 mb-6">
                  <p className="label">Readers & seekers</p>
                  <span className="arrow text-ink_3 group-hover:text-ink transition" aria-hidden="true">→</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3">Essays from the throne</h3>
                <p className="text-sm text-ink_3 leading-relaxed mb-7 max-w-md">
                  Long-form writing on faith, politics, dharma, and ambition.
                </p>
                <p className="label mt-auto">Read the journal</p>
              </a>
            </div>
          </div>
        </section>
        {/* ============================ PILLARS ============================ */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
              <div className="lg:col-span-4">
                <p className="label">03 — What this is</p>
              </div>
              <div className="lg:col-span-8">
                <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[26ch]">
                  Three threads, one body of work.
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-3 border-t border-line">
              <div className="reveal py-10 md:pr-10 md:border-r border-line">
                <p className="label mb-6">01 / Mindset</p>
                <h3 className="text-xl font-semibold tracking-tight mb-3">The Hustle</h3>
                <p className="text-sm text-ink_3 leading-relaxed">
                  Stories, scars, and systems for staying locked in on the bigger dream
                  without burning out the person chasing it.
                </p>
              </div>
              <div className="reveal py-10 border-t md:border-t-0 border-line md:px-10 md:border-r">
                <p className="label mb-6">02 / Spirit</p>
                <h3 className="text-xl font-semibold tracking-tight mb-3">Faith & Values</h3>
                <p className="text-sm text-ink_3 leading-relaxed">
                  Politics, religion, and philosophy from a grounded, son-of-immigrants
                  lens — written without flinching.
                </p>
              </div>
              <div className="reveal py-10 border-t md:border-t-0 border-line md:pl-10">
                <p className="label mb-6">03 / Empire</p>
                <h3 className="text-xl font-semibold tracking-tight mb-3">Brands & Moves</h3>
                <p className="text-sm text-ink_3 leading-relaxed">
                  Rameelo, FinityOne, Maharaja Estates, Melux — and whatever
                  venture comes next.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* ============================ VENTURES ============================ */}
        <section id="ventures" className="py-20 lg:py-28 bg-paper_2 border-y border-line">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
              <div className="lg:col-span-4">
                <p className="label">04 — Ventures</p>
              </div>
              <div className="lg:col-span-8">
                <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[30ch] mb-5">
                  An ecosystem building culture, community, and real-world equity.
                </h2>
                <p className="text-base text-ink_2 max-w-xl leading-relaxed">
                  Not just bars and blogs. Four operating companies across culture,
                  software, real estate, and design.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 border-t border-line">
              <a href="#"
                 className="group reveal py-10 md:pr-12 border-b md:border-r border-line flex flex-col">
                <div className="flex items-start justify-between gap-6 mb-6">
                  <p className="label">01</p>
                  <span className="arrow text-ink_3 group-hover:text-ink transition" aria-hidden="true">→</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3">Rameelo</h3>
                <p className="text-sm text-ink_3 leading-relaxed mb-7 max-w-md">
                  Non-profit reimagining Gujarati Raas Garba as large-scale cultural
                  experiences.
                </p>
                <p className="label mt-auto">Cultural Empire</p>
              </a>
              <a href="#"
                 className="group reveal py-10 md:pl-12 border-b border-line flex flex-col">
                <div className="flex items-start justify-between gap-6 mb-6">
                  <p className="label">02</p>
                  <span className="arrow text-ink_3 group-hover:text-ink transition" aria-hidden="true">→</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3">FinityOne</h3>
                <p className="text-sm text-ink_3 leading-relaxed mb-7 max-w-md">
                  Tech studio building digital products at the edges of fintech,
                  event-tech, and proptech.
                </p>
                <p className="label mt-auto">Product Lab</p>
              </a>
              <a href="#"
                 className="group reveal py-10 md:pr-12 border-b md:border-b-0 md:border-r border-line flex flex-col">
                <div className="flex items-start justify-between gap-6 mb-6">
                  <p className="label">03</p>
                  <span className="arrow text-ink_3 group-hover:text-ink transition" aria-hidden="true">→</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3">Maharaja Estates</h3>
                <p className="text-sm text-ink_3 leading-relaxed mb-7 max-w-md">
                  Arizona-based portfolio of rentals and long-term holds powered by
                  hands-on renovations.
                </p>
                <p className="label mt-auto">Real Estate</p>
              </a>
              <a href="#" className="group reveal py-10 md:pl-12 flex flex-col">
                <div className="flex items-start justify-between gap-6 mb-6">
                  <p className="label">04</p>
                  <span className="arrow text-ink_3 group-hover:text-ink transition" aria-hidden="true">→</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3">Melux Events</h3>
                <p className="text-sm text-ink_3 leading-relaxed mb-7 max-w-md">
                  Design-first event decor and experience studio born from Rameelo's
                  production DNA.
                </p>
                <p className="label mt-auto">Aesthetic Ops</p>
              </a>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <a href="mailto:heran@finityone.com?subject=Founder%20Intro&body=Company%3A%0AWhat%20you%27re%20building%3A%0AWhere%20we%20overlap%3A"
                 className="btn btn-solid group">
                Founder intro <span className="arrow" aria-hidden="true">→</span>
              </a>
              <a href="#for-recruiters" className="btn btn-ghost">See the professional record</a>
            </div>
          </div>
        </section>
        {/* ===================== PROFESSIONAL RECORD ===================== */}
        <section id="for-recruiters" className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
              <div className="lg:col-span-4">
                <p className="label">05 — Professional record</p>
              </div>
              <div className="lg:col-span-8">
                <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[28ch] mb-5">
                  A founder who builds it end to end.
                </h2>
                <p className="text-base text-ink_2 max-w-xl leading-relaxed">
                  Four ventures across software, real estate, live events, and the
                  non-profit world — which has meant owning product, finance, hiring,
                  vendors, and delivery against real deadlines with real money on the line.
                </p>
              </div>
            </div>
            <div className="grid lg:grid-cols-12 border-t border-line">
              <div className="reveal lg:col-span-4 py-10 lg:pr-10 lg:border-r border-line">
                <p className="label mb-6">Operating strengths</p>
                <ul className="space-y-3 text-sm text-ink_3 leading-relaxed">
                  <li className="flex gap-3"><span className="text-ink_3" aria-hidden="true">·</span><span>Zero-to-one product and launch</span></li>
                  <li className="flex gap-3"><span className="text-ink_3" aria-hidden="true">·</span><span>Full-stack build and ship</span></li>
                  <li className="flex gap-3"><span className="text-ink_3" aria-hidden="true">·</span><span>Event and program operations at scale</span></li>
                  <li className="flex gap-3"><span className="text-ink_3" aria-hidden="true">·</span><span>P&L, budgeting, vendor negotiation</span></li>
                  <li className="flex gap-3"><span className="text-ink_3" aria-hidden="true">·</span><span>Team building and volunteer leadership</span></li>
                </ul>
              </div>
              <div className="reveal lg:col-span-4 py-10 border-t lg:border-t-0 lg:px-10 lg:border-r border-line">
                <p className="label mb-6">Domains</p>
                <ul className="space-y-3 text-sm text-ink_3 leading-relaxed">
                  <li className="flex gap-3"><span className="text-ink_3" aria-hidden="true">·</span><span>Fintech and event-tech</span></li>
                  <li className="flex gap-3"><span className="text-ink_3" aria-hidden="true">·</span><span>Proptech and real estate operations</span></li>
                  <li className="flex gap-3"><span className="text-ink_3" aria-hidden="true">·</span><span>Non-profit and community programs</span></li>
                  <li className="flex gap-3"><span className="text-ink_3" aria-hidden="true">·</span><span>Media, content, and brand</span></li>
                </ul>
              </div>
              <div className="reveal lg:col-span-4 py-10 border-t lg:border-t-0 lg:pl-10 border-line flex flex-col">
                <p className="label mb-6">Open to</p>
                <p className="text-sm text-ink_3 leading-relaxed mb-8">
                  Leadership roles, advisory work, and board seats. Send the role, the
                  team, and the problem you need solved — you will get a straight answer
                  on whether I am the right fit.
                </p>
                <dl className="space-y-4 text-sm mb-9">
                  <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                    <dt className="label">Based</dt>
                    <dd className="text-ink text-right">New York City</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="label">Email</dt>
                    <dd className="text-right">
                      <a href="mailto:heran@finityone.com"
                         className="text-ink hover:opacity-60 transition break-all">heran@finityone.com</a>
                    </dd>
                  </div>
                </dl>
                <div className="flex flex-wrap gap-3 mt-auto">
                  <a href="mailto:heran@finityone.com?subject=Opportunity%20for%20Heran%20Patel&body=Role%3A%0ACompany%3A%0AWhat%20you%20need%20built%3A"
                     className="btn btn-solid group">
                    Send a role <span className="arrow" aria-hidden="true">→</span>
                  </a>
                  {RESUME_URL ? (
                    <a href={RESUME_URL} className="btn btn-ghost">Resume</a>
                  ) : null}
                  {LINKEDIN_URL ? (
                    <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="btn btn-ghost">LinkedIn</a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ============================ JOURNAL ============================ */}
        <section id="articles" className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
              <div className="lg:col-span-4">
                <p className="label">06 — Journal</p>
              </div>
              <div className="lg:col-span-8 flex flex-wrap items-end justify-between gap-6">
                <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[22ch]">
                  Essays from the throne.
                </h2>
                <Link href="/articles" className="label hover:text-ink transition inline-flex items-center gap-2 group">
                  All articles <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="border-t border-line">
              {FEATURED_ARTICLES.map((article, index) => (
                <Link
                  key={article.slug}
                  href="/articles"
                  className="group reveal block border-b border-line py-8 lg:py-9"
                >
                  <div className="grid lg:grid-cols-12 gap-y-3 lg:gap-x-10 items-baseline">
                    <p className="label lg:col-span-2">{String(index + 1).padStart(2, "0")}</p>
                    <div className="lg:col-span-7">
                      <h3 className="text-xl lg:text-2xl font-semibold tracking-tight mb-2 group-hover:opacity-60 transition">
                        {article.title}
                      </h3>
                      <p className="text-sm text-ink_3 leading-relaxed max-w-xl">{article.summary}</p>
                    </div>
                    <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-6">
                      <p className="label">{article.category} · {article.readingTime}</p>
                      <span className="arrow text-ink_3 group-hover:text-ink transition" aria-hidden="true">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        {/* ============================ MEDIA ============================ */}
        <section id="media" className="pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid md:grid-cols-2 gap-px bg-line">
              {/* Music */}
              <div id="music" className="bg-ink text-paper p-6 sm:p-10 lg:p-14 flex flex-col min-h-[22rem]">
                <p className="label !text-paper/55 mb-8">07 — Music</p>
                <h3 className="display text-[clamp(1.6rem,2.8vw,2.4rem)] mb-4 max-w-[18ch]">
                  HP Maharaja on the mic.
                </h3>
                <p className="text-sm text-paper/65 leading-relaxed mb-10 max-w-sm">
                  Rap tracks about hustle, heartbreak, faith, and building something
                  bigger than yourself.
                </p>
                <div className="mt-auto">
                  <a href="https://soundcloud.com/hpmaharaja"
                     target="_blank"
                     rel="noreferrer"
                     className="btn btn-invert group">
                    Open SoundCloud <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
              {/* Vlogs */}
              <div id="vlogs" className="bg-surface p-6 sm:p-10 lg:p-14 flex flex-col min-h-[22rem]">
                <p className="label mb-8">08 — Vlogs</p>
                <h3 className="display text-[clamp(1.6rem,2.8vw,2.4rem)] mb-4 max-w-[18ch]">
                  Life in motion.
                </h3>
                <p className="text-sm text-ink_3 leading-relaxed mb-10 max-w-sm">
                  Trips, events, late-night sessions, and behind-the-scenes of building
                  the empire.
                </p>
                <div className="mt-auto">
                  <a href="https://www.youtube.com/channel/UClwSJMiNA__2Ua2pyB30OQg"
                     target="_blank"
                     rel="noreferrer"
                     className="btn btn-ghost group">
                    Watch on YouTube <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ============================ TOUR ============================ */}
        <section id="tour" className="py-20 lg:py-28 bg-paper_2 border-y border-line">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-12">
              <div className="lg:col-span-4">
                <p className="label">09 — Tour</p>
              </div>
              <div className="lg:col-span-8">
                <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[24ch] mb-5">
                  Rameelo Garba Tour 2026.
                </h2>
                <p className="text-base text-ink_2 max-w-xl leading-relaxed mb-7">
                  Across America, one garba community — joined on tour by Suchit &
                  Bhrugesh, supporting Rameelo organizers at their events.
                </p>
                <a href="https://rameelo.com"
                   target="_blank"
                   rel="noreferrer"
                   className="btn btn-solid group">
                  Tickets at rameelo.com <span className="arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            {/* Tour fact strip */}
            <dl className="grid grid-cols-2 lg:grid-cols-4 border-t border-line mb-2">
              <div className="py-6 pr-6 lg:border-r border-line">
                <dt className="label mb-2">Events</dt>
                <dd className="text-xl font-semibold tracking-tight">{tourMeta.events}</dd>
              </div>
              <div className="py-6 pl-6 lg:pl-7 lg:pr-6 lg:border-r border-line">
                <dt className="label mb-2">Cities</dt>
                <dd className="text-xl font-semibold tracking-tight">{tourMeta.cities}</dd>
              </div>
              <div className="py-6 pr-6 lg:pl-7 lg:border-r border-line">
                <dt className="label mb-2">Run</dt>
                <dd className="text-xl font-semibold tracking-tight">{tourMeta.window}</dd>
              </div>
              <div className="py-6 pl-6 lg:pl-7">
                <dt className="label mb-2">Still to come</dt>
                <dd className="text-xl font-semibold tracking-tight">
                  {tourMeta.remaining > 0
                    ? `${tourMeta.remaining} date${tourMeta.remaining === 1 ? "" : "s"}`
                    : "Tour wrapped"}
                </dd>
              </div>
            </dl>
            {/* Tour dates */}
            <div className="border-t border-line">
              {tourDates.map((stop) => (
                <div
                  key={`${stop.starts}-${stop.city}`}
                  className="reveal grid lg:grid-cols-12 gap-y-2 lg:gap-x-10 items-baseline border-b border-line py-6"
                >
                  <p className="label lg:col-span-1">{String(stop.position).padStart(2, "0")}</p>
                  <p className={`label lg:col-span-2 ${stop.isPast ? "!text-ink_3" : "!text-ink"}`}>
                    {stop.dateLabel}
                  </p>
                  <div className="lg:col-span-6">
                    <p className={`text-base lg:text-lg font-medium tracking-tight ${stop.isPast ? "text-ink_2" : "text-ink"}`}>
                      {stop.artist}
                    </p>
                    <p className="text-sm text-ink_3 mt-0.5">{stop.city}</p>
                  </div>
                  <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-4">
                    <p className="label">{stop.organizer}</p>
                    {stop.isPast ? (
                      <span className="label shrink-0">Played</span>
                    ) : (
                      <span className="label !text-ink shrink-0 inline-flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-ink inline-block" aria-hidden="true"></span>
                        Upcoming
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* ============================ MERCH ============================ */}
        <section id="merch" className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-y-8 lg:gap-x-10 items-end">
              <div className="lg:col-span-7">
                <p className="label mb-7">10 — Merch · Coming soon</p>
                <h2 className="display text-[clamp(2rem,4.6vw,3.6rem)] max-w-[20ch] mb-6">
                  Wear the crown before the world knows the name.
                </h2>
                <p className="text-base text-ink_2 max-w-xl leading-relaxed">
                  Limited-drop hoodies, tees, and pieces inspired by royal Indian
                  aesthetics, NYC grit, and West Coast hustle. Early supporters get
                  first dibs.
                </p>
              </div>
              <div className="lg:col-span-5 lg:pl-10 lg:border-l border-line">
                <p className="label mb-3">Drop 001</p>
                <p className="text-lg font-medium tracking-tight mb-7">HP Maharaja Essentials</p>
                <a href="mailto:heran@finityone.com?subject=Merch%20Drop%20List&body=Add%20me%20to%20the%20Maharaja%20merch%20list."
                   className="btn btn-solid group w-full sm:w-auto">
                  Join the list <span className="arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* ============================ COMMUNITY ============================ */}
        <section id="community" className="py-20 lg:py-28 border-t border-line">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
              <div className="lg:col-span-4">
                <p className="label">11 — Community</p>
              </div>
              <div className="lg:col-span-8">
                <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[28ch] mb-5">
                  For the grinders trying to hold faith, family, and ambition at once.
                </h2>
                <p className="text-base text-ink_2 max-w-xl leading-relaxed">
                  Built for the kids of immigrants — the ones who refuse to lose
                  themselves on the way up.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 border-t border-line">
              <div className="reveal py-10 md:pr-10 md:border-r border-line">
                <p className="label mb-6">01</p>
                <h3 className="text-lg font-semibold tracking-tight mb-3">Share your story</h3>
                <p className="text-sm text-ink_3 leading-relaxed">
                  Send your journey. Some stories get featured in future articles and vlogs.
                </p>
              </div>
              <div className="reveal py-10 border-t md:border-t-0 border-line md:px-10 md:border-r">
                <p className="label mb-6">02</p>
                <h3 className="text-lg font-semibold tracking-tight mb-3">Collab on content</h3>
                <p className="text-sm text-ink_3 leading-relaxed">
                  Producers, videographers, writers — if the mission resonates, reach out.
                </p>
              </div>
              <div className="reveal py-10 border-t md:border-t-0 border-line md:pl-10">
                <p className="label mb-6">03</p>
                <h3 className="text-lg font-semibold tracking-tight mb-3">Pull up in real life</h3>
                <p className="text-sm text-ink_3 leading-relaxed">
                  Rameelo, NYC linkups, and future Maharaja pop-ups tied to trips and shows.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* ============================ CONTACT ============================ */}
        <section id="contact" className="pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="bg-ink text-paper p-6 sm:p-10 lg:p-20">
              <p className="label !text-paper/55 mb-8">12 — Contact</p>
              <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-10 items-end">
                <div className="lg:col-span-7">
                  <h2 className="display text-[clamp(2rem,4.6vw,3.6rem)] max-w-[20ch] mb-6">
                    Let's build something majestic.
                  </h2>
                  <p className="text-base text-paper/65 max-w-xl leading-relaxed">
                    For collaborations, speaking, partnerships, or a real conversation
                    about hustle and purpose — reach out directly.
                  </p>
                </div>
                <div className="lg:col-span-5 lg:pl-10 lg:border-l border-paper/15">
                  <p className="label !text-paper/55 mb-3">Direct</p>
                  <a href="mailto:heran@finityone.com"
                     className="block text-lg lg:text-xl font-medium tracking-tight mb-8 hover:opacity-60 transition break-all">
                    heran@finityone.com
                  </a>
                  <div className="flex flex-wrap gap-3">
                    <a href="tel:+19499039366" className="btn btn-invert">Call Heran</a>
                    <a href="mailto:heran@finityone.com" className="btn btn-invert group">
                      Email Heran <span className="arrow" aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
