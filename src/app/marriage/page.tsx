import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import CountUp from "@/components/marriage/CountUp";
import CtaTitle from "@/components/marriage/CtaTitle";
import FactGrid from "@/components/marriage/FactGrid";
import HeroRotator from "@/components/marriage/HeroRotator";
import HobbyGrid from "@/components/marriage/HobbyGrid";
import MatchMeter from "@/components/marriage/MatchMeter";
import PhotoReel from "@/components/marriage/PhotoReel";
import ScrollProgress from "@/components/marriage/ScrollProgress";
import StickyCta from "@/components/marriage/StickyCta";
import WelcomeGate from "@/components/marriage/WelcomeGate";
import {
  ABOUT_GREETING,
  ABOUT_LETTER,
  ABOUT_SIGNOFF,
  APPROACH,
  BIRTH_TIME,
  CONTACT,
  CREDENTIALS,
  EDUCATION,
  FAMILIES_WELCOME,
  FAMILY,
  FAMILY_NOTE,
  FILTER_NOTE,
  GALLERY,
  GREEN_FLAGS,
  HERO_LINES,
  HERO_PHOTO,
  HOBBIES,
  JOURNEY,
  LOOKING_FOR_LEAD,
  MATCH_INTRO,
  MATCH_DEALBREAKER,
  MATCH_QUESTIONS,
  MATCH_VERDICTS,
  NOT_A_FIT,
  PROMISES,
  QUICK_FACTS,
  SIDE_NOTE,
  TIMELINE,
  TIMELINE_NOTE,
  ageOn,
} from "@/lib/marriage";

/* The one serif on the site, scoped to this page by the `.mp` wrapper. The
   rest of hpmaharaja.com is deliberately neutral and technical; this page is
   the one place that should read as warm rather than as a spec sheet. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marriage Biodata",
  description:
    "Heran Patel — born 1996, Gujarati, pure vegetarian, 6 ft, based in Phoenix, Arizona. Founder, engineer, and the long version of a marriage biodata: who I am, what I'm looking for, and who this isn't for.",
  alternates: { canonical: "/marriage" },
  openGraph: {
    type: "profile",
    title: "Heran Patel — Marriage Biodata",
    description:
      "The long version. Who I am, what I'm looking for in a partner, and the honest list of who this isn't for.",
    url: "/marriage",
    images: [{ url: HERO_PHOTO.src, alt: HERO_PHOTO.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heran Patel — Marriage Biodata",
    description: "The long version of a biodata. Scroll it.",
    images: [HERO_PHOTO.src],
  },
};

/* The hero prints his age, so the page is re-rendered daily rather than
   freezing whatever it was on the day of the last deploy. */
export const revalidate = 86400;

const CHAPTERS = [
  { id: "facts", label: "The short version" },
  { id: "letter", label: "In my words" },
  { id: "reel", label: "A few photos" },
  { id: "work", label: "What I do" },
  { id: "roots", label: "Where I'm from" },
  { id: "life", label: "Off the clock" },
  { id: "match", label: "Are we a match?" },
  { id: "honest", label: "Being honest" },
  { id: "promises", label: "What to expect" },
  { id: "timeline", label: "My pace" },
  { id: "start", label: "How this starts" },
  { id: "contact", label: "Say hello" },
];

export default function MarriagePage() {
  const age = ageOn();

  return (
    <div className={`mp ${cormorant.variable}`}>
      {/* Only ever appears for a personalized link (/marriage?for=Name), and
          only after mount — the server-rendered page is the full biodata. */}
      <WelcomeGate />
      <ScrollProgress chapters={CHAPTERS} />

      {/* ------------------------------------------------------------ HERO */}
      <section className="mp-hero">
        <div className="mp-hero-media">
          <Image
            src={HERO_PHOTO.src}
            alt={HERO_PHOTO.alt}
            fill
            priority
            sizes="100vw"
            className="mp-hero-img"
          />
          <span className="mp-hero-scrim" aria-hidden="true" />
        </div>

        {/* Petals drift across the hero. Decorative only, and stilled
            entirely under prefers-reduced-motion. */}
        <div className="mp-petals" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className={`mp-petal mp-petal-${i + 1}`} />
          ))}
        </div>

        <div className="mp-hero-body">
          <p className="mp-eyebrow">Marriage biodata · 2026</p>
          <h1 className="mp-hero-name">
            Heran
            <br />
            Patel
          </h1>
          <HeroRotator lines={HERO_LINES} />
          <ul className="mp-hero-chips">
            <li>{age}</li>
            <li>6 ft</li>
            <li>Pure veg</li>
            <li>Phoenix, AZ</li>
            <li>Gujarati · Patel</li>
          </ul>
          <p className="mp-hero-note">
            This isn&rsquo;t a PDF. Keep scrolling — there&rsquo;s a part near the bottom
            where you get to answer back.
          </p>
          <a className="mp-scrollcue" href="#facts">
            <span>Start here</span>
            <span className="mp-scrollcue-line" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* ------------------------------------------------- THE SHORT VERSION */}
      <section id="facts" className="mp-section">
        <div className="mp-wrap">
          <header className="mp-head reveal">
            <p className="mp-eyebrow">01 — The short version</p>
            <h2 className="mp-h2">Everything your aunty will ask, in one screen.</h2>
            <p className="mp-lede">Tap any of these for the real answer.</p>
          </header>
          <div className="reveal">
            <FactGrid facts={QUICK_FACTS} />
          </div>
          <p className="mp-footnote reveal">
            Born {BIRTH_TIME}, London — for anyone who wants to run the chart.
          </p>
        </div>
      </section>

      {/* --------------------------------------------------------- THE LETTER */}
      <section id="letter" className="mp-section mp-section-cream">
        <div className="mp-wrap mp-wrap-narrow">
          <header className="mp-head reveal">
            <p className="mp-eyebrow">02 — In my words</p>
            <h2 className="mp-h2">A letter, not a résumé.</h2>
          </header>
          <div className="mp-letter reveal">
            <p className="mp-letter-greeting">{ABOUT_GREETING}</p>
            {ABOUT_LETTER.map((para) => (
              <p key={para.slice(0, 24)} className="mp-letter-para">
                {para}
              </p>
            ))}
            <p className="mp-letter-sign">{ABOUT_SIGNOFF}</p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- THE REEL */}
      <section id="reel" className="mp-section">
        <div className="mp-wrap">
          <header className="mp-head reveal">
            <p className="mp-eyebrow">03 — A few photos</p>
            <h2 className="mp-h2">Same person, different nights.</h2>
            <p className="mp-lede">Swipe.</p>
          </header>
        </div>
        <div className="reveal">
          <PhotoReel shots={GALLERY} />
        </div>
      </section>

      {/* ---------------------------------------------------------- THE WORK */}
      <section id="work" className="mp-section mp-section-ink">
        <div className="mp-wrap">
          <header className="mp-head reveal">
            <p className="mp-eyebrow">04 — What I do</p>
            <h2 className="mp-h2">I build things. Some of them are companies.</h2>
          </header>
          <ul className="mp-cred-list">
            {CREDENTIALS.map((c) => (
              <li key={c.title} className="mp-cred reveal">
                <p className="mp-cred-figure">
                  <CountUp value={Number(c.figure)} unit={c.unit ?? ""} />
                </p>
                <h3 className="mp-cred-title">{c.title}</h3>
                <p className="mp-cred-detail">{c.detail}</p>
              </li>
            ))}
          </ul>
          <div className="mp-cred-foot reveal">
            <p>
              <strong>{EDUCATION.degree}</strong>
              <br />
              {EDUCATION.school}
            </p>
            <p>{SIDE_NOTE}</p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- THE ROOTS */}
      <section id="roots" className="mp-section">
        <div className="mp-wrap">
          <header className="mp-head reveal">
            <p className="mp-eyebrow">05 — Where I&rsquo;m from</p>
            <h2 className="mp-h2">London, then California, now Arizona.</h2>
          </header>

          <ol className="mp-journey">
            {JOURNEY.map((stop) => (
              <li key={stop.place} className="mp-journey-stop reveal">
                <span className="mp-journey-dot" aria-hidden="true" />
                <p className="mp-journey-period">{stop.period}</p>
                <h3 className="mp-journey-place">{stop.place}</h3>
                <p className="mp-journey-note">{stop.note}</p>
              </li>
            ))}
          </ol>

          <div className="mp-family reveal">
            <h3 className="mp-h3">My family</h3>
            <ul className="mp-family-list">
              {FAMILY.map((person) => (
                <li key={person.name}>
                  <p className="mp-family-role">{person.role}</p>
                  <p className="mp-family-name">{person.name}</p>
                  <p className="mp-family-note">{person.note}</p>
                </li>
              ))}
            </ul>
            <p className="mp-family-blurb">{FAMILY_NOTE}</p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- OFF THE CLOCK */}
      <section id="life" className="mp-section mp-section-cream">
        <div className="mp-wrap">
          <header className="mp-head reveal">
            <p className="mp-eyebrow">06 — Off the clock</p>
            <h2 className="mp-h2">What a Saturday actually looks like.</h2>
            <p className="mp-lede">Tap one.</p>
          </header>
          <div className="reveal">
            <HobbyGrid hobbies={HOBBIES} />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- THE METER */}
      <section id="match" className="mp-section mp-section-rose">
        <div className="mp-wrap mp-wrap-narrow">
          <header className="mp-head reveal">
            <p className="mp-eyebrow">07 — Your turn</p>
            <h2 className="mp-h2">The compatibility calculator.</h2>
            <p className="mp-lede">
              Nine honest questions. Watch the bar move.
            </p>
          </header>
          <div className="reveal">
            <MatchMeter
              questions={MATCH_QUESTIONS}
              verdicts={MATCH_VERDICTS}
              dealbreaker={MATCH_DEALBREAKER}
              intro={MATCH_INTRO}
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ BEING HONEST */}
      <section id="honest" className="mp-section">
        <div className="mp-wrap">
          <header className="mp-head reveal">
            <p className="mp-eyebrow">08 — Being honest</p>
            <h2 className="mp-h2">What I&rsquo;m looking for, said plainly.</h2>
          </header>

          <p className="mp-quote reveal">{LOOKING_FOR_LEAD}</p>

          <div className="mp-columns">
            <div className="mp-col mp-col-good reveal">
              <h3 className="mp-h3">What I&rsquo;ll bring</h3>
              <ul className="mp-list">
                {GREEN_FLAGS.map((line) => (
                  <li key={line.slice(0, 20)}>
                    <span className="mp-bullet mp-bullet-good" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mp-col mp-col-bad reveal">
              <h3 className="mp-h3">Not a fit if&hellip;</h3>
              <ul className="mp-list">
                {NOT_A_FIT.map((line) => (
                  <li key={line.slice(0, 20)}>
                    <span className="mp-bullet mp-bullet-bad" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mp-footnote reveal">{FILTER_NOTE}</p>
        </div>
      </section>

      {/* ----------------------------------------------------- WHAT TO EXPECT */}
      <section id="promises" className="mp-section mp-section-ink">
        <div className="mp-wrap">
          <header className="mp-head reveal">
            <p className="mp-eyebrow">09 — What to expect</p>
            <h2 className="mp-h2">If this becomes something, here&rsquo;s how I&rsquo;d show up.</h2>
          </header>
          <ul className="mp-promises">
            {PROMISES.map((p) => (
              <li key={p.title} className="reveal">
                <h3 className="mp-promise-title">{p.title}</h3>
                <p className="mp-promise-line">{p.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- THE TIMELINE */}
      <section id="timeline" className="mp-section">
        <div className="mp-wrap mp-wrap-narrow">
          <header className="mp-head reveal">
            <p className="mp-eyebrow">10 — My pace</p>
            <h2 className="mp-h2">I know what I want. I&rsquo;m not in a rush about it.</h2>
          </header>
          <ol className="mp-timeline">
            {TIMELINE.map((phase) => (
              <li key={phase.label} className="reveal">
                <p className="mp-timeline-window">{phase.window}</p>
                <h3 className="mp-timeline-label">{phase.label}</h3>
                <p className="mp-timeline-note">{phase.note}</p>
              </li>
            ))}
          </ol>
          <p className="mp-footnote reveal">{TIMELINE_NOTE}</p>
        </div>
      </section>

      {/* ------------------------------------------------------- THE APPROACH */}
      <section id="start" className="mp-section mp-section-cream">
        <div className="mp-wrap">
          <header className="mp-head reveal">
            <p className="mp-eyebrow">11 — How this starts</p>
            <h2 className="mp-h2">Two steps. That&rsquo;s the whole plan.</h2>
          </header>
          <ol className="mp-steps">
            {APPROACH.map((step) => (
              <li key={step.step} className="reveal">
                <p className="mp-step-num">{step.step}</p>
                <div>
                  <h3 className="mp-step-title">{step.title}</h3>
                  <p className="mp-step-line">{step.line}</p>
                </div>
              </li>
            ))}
          </ol>
          <figure className="mp-step-photo reveal">
            <Image
              src="/images/marriage/selfie-night.jpg"
              alt="Heran Patel smiling in a patterned shirt on a warm evening street lined with palm trees"
              width={900}
              height={1350}
              sizes="(max-width: 768px) 100vw, 420px"
            />
          </figure>
        </div>
      </section>

      {/* -------------------------------------------------------- THE CONTACT */}
      <section id="contact" className="mp-section mp-section-rose">
        <div className="mp-wrap mp-wrap-narrow">
          <div className="mp-cta reveal">
            <p className="mp-eyebrow">12 — Say hello</p>
            <CtaTitle />
            <p className="mp-cta-line">
              Pick whichever one feels easiest. There&rsquo;s no wrong way to start
              this.
            </p>

            <div className="mp-cta-actions">
              <a className="mp-btn mp-btn-solid" href={CONTACT.phoneHref}>
                Call {CONTACT.phone}
              </a>
              <a className="mp-btn mp-btn-ghost" href={CONTACT.smsHref}>
                Send a text
              </a>
            </div>

            <ul className="mp-cta-list">
              <li>
                <span className="mp-eyebrow">Email</span>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>
                <span className="mp-eyebrow">Instagram</span>
                <a href={CONTACT.instagramHref} target="_blank" rel="noreferrer">
                  {CONTACT.instagram}
                </a>
              </li>
            </ul>

            <p className="mp-cta-families">{FAMILIES_WELCOME}</p>

            <p className="mp-cta-more">
              Curious what I do all day?{" "}
              <Link href="/ventures">See the ventures</Link> or{" "}
              <Link href="/articles">read something I wrote</Link>.
            </p>
          </div>
        </div>
      </section>

      <StickyCta phoneHref={CONTACT.phoneHref} smsHref={CONTACT.smsHref} />
    </div>
  );
}
