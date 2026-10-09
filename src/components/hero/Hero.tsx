import Link from "next/link";

import {
  HERO_FACTS,
  HERO_TICKER,
  buildHeroBootLines,
  buildHeroFacets,
  nextTourStop,
} from "@/lib/hero";
import { OG_IMAGE, OG_IMAGE_ALT } from "@/lib/seo";
import { buildTourDates, buildTourMeta } from "@/lib/tour";

import HeroBoot from "./HeroBoot";
import HeroField from "./HeroField";
import HeroLive from "./HeroLive";
import HeroRotator from "./HeroRotator";

/**
 * The home page hero.
 *
 * Structure, top to bottom:
 *  - a "stage" holding the type, with the ambient canvas field behind it. The
 *    canvas is scoped to this wrapper rather than the whole section: as the
 *    only positioned element it would otherwise paint its hairlines over the
 *    portrait and the fact strip below;
 *  - the name and thesis, revealed in sequence once the boot bar fills;
 *  - the boot sequence itself, counting real load progress to 100% while
 *    printing facts about the site;
 *  - a rotating identity panel — founder / operator / creator / writer — each
 *    with its evidence and its link;
 *  - a live row: Phoenix time and a running countdown to the next tour date;
 *  - a CSS marquee, the portrait band, then the static fact strip.
 *
 * All of it is server-rendered markup. The client components animate between
 * states that already exist in the HTML, so search engines and agents reading
 * the raw page get every word, and a reader whose JS never arrives gets a
 * static but complete hero (see the `html.js` guards in globals.css).
 */
export default function Hero() {
  const tourDates = buildTourDates();
  const tourMeta = buildTourMeta(tourDates);
  const next = nextTourStop(tourDates);
  const bootLines = buildHeroBootLines(tourDates, tourMeta);
  const facets = buildHeroFacets(tourMeta);

  return (
    <section
      id="hero"
      /* `data-boot` drives the staged reveal. CSS only acts on it under
         `html.js`, so without JS the hero renders plainly and in full. */
      data-boot="booting"
      className="hero"
    >
      <div className="hero-stage">
        <HeroField />

        <div className="hero-stage-inner max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-10">
            {/* ---- Name, thesis, primary actions ---- */}
            <div className="lg:col-span-7">
              {/* No leading number: the page below is no longer a numbered
                  run of sections, so "01 —" had nothing to belong to. */}
              <p className="label hero-seq" style={{ "--seq": 0 } as React.CSSProperties}>
                Founder · Operator · Consultant
              </p>

              <h1
                className="hero-name display text-ink hero-seq"
                style={{ "--seq": 1 } as React.CSSProperties}
              >
                Heran Patel
              </h1>

              <p
                className="hero-alias font-mono hero-seq"
                style={{ "--seq": 2 } as React.CSSProperties}
              >
                aka HP Maharaja
              </p>

              <p
                className="hero-thesis text-ink_2 hero-seq"
                style={{ "--seq": 3 } as React.CSSProperties}
              >
                Pursuing balance in chaos.
              </p>

              <p
                className="hero-blurb text-ink_2 hero-seq"
                style={{ "--seq": 4 } as React.CSSProperties}
              >
                I build software, hold real estate, and put Gujarati Raas Garba on
                stages across America. Four ventures, one national garba tour, and
                thirteen years of writing about what it costs.
              </p>

              <div className="hero-actions hero-seq" style={{ "--seq": 5 } as React.CSSProperties}>
                <Link href="/achievements" className="btn btn-solid group">
                  See what I&rsquo;ve built
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
                <Link href="/ventures" className="btn btn-ghost">
                  The ventures
                </Link>
                <Link href="/about" className="btn btn-ghost">
                  Who I am
                </Link>
              </div>
            </div>

            {/* ---- Boot sequence, then the rotating identity panel ---- */}
            <div className="lg:col-span-5">
              <div className="hero-panel">
                <HeroBoot targetId="hero" imageSelector="#hero-portrait" lines={bootLines} />
                <HeroRotator facets={facets} />
              </div>
            </div>
          </div>

          {/* ---- Live row ---- */}
          <div className="hero-seq" style={{ "--seq": 6 } as React.CSSProperties}>
            <HeroLive
              nextDate={next?.starts ?? null}
              nextLabel={next?.dateLabel ?? null}
              nextCity={next?.city ?? null}
              remaining={tourMeta.remaining}
            />
          </div>
        </div>
      </div>

      {/* ---- Marquee ---- */}
      <div className="hero-ticker hero-seq" style={{ "--seq": 7 } as React.CSSProperties}>
        <div className="hero-ticker-track">
          <ul className="hero-ticker-group">
            {HERO_TICKER.map((phrase) => (
              <li key={phrase} className="hero-ticker-item label">
                {phrase}
              </li>
            ))}
          </ul>
          {/* Duplicated for the seamless loop, and hidden from assistive tech
              so the phrases are not announced twice. */}
          <ul className="hero-ticker-group" aria-hidden="true">
            {HERO_TICKER.map((phrase) => (
              <li key={`${phrase}-dup`} className="hero-ticker-item label">
                {phrase}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---- Full-bleed portrait. Also the boot bar's load signal. ---- */}
      <div className="hero-portrait-band">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          id="hero-portrait"
          src={OG_IMAGE}
          alt={OG_IMAGE_ALT}
          width={2400}
          height={1350}
          /* High priority: this is the largest contentful paint, and the boot
             counter is waiting on its decode. */
          fetchPriority="high"
          decoding="async"
          className="hero-portrait"
        />
      </div>

      {/* ---- Static fact strip ---- */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <dl className="grid grid-cols-2 lg:grid-cols-4 border-b border-line">
          {HERO_FACTS.map((fact) => (
            <div key={fact.label} className="hero-fact border-t border-line py-7">
              <dt className="label mb-2">{fact.label}</dt>
              <dd className="text-xl sm:text-2xl font-semibold tracking-tight">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
