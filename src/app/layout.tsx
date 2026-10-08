import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import Link from "next/link";

import "./globals.css";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  CONTACT_EMAIL,
  LOCATION,
  OG_IMAGE,
  OG_IMAGE_ALT,
  PERSON_ALTERNATE_NAME,
  PERSON_DESCRIPTION,
  PERSON_NAME,
  PHONE_NUMBER,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/seo";
import { VENTURES } from "@/lib/ventures";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const DESCRIPTION =
  "Heran Patel, also known as HP Maharaja, is a founder and creator building ventures across software, real estate, live events, and the non-profit world, and writing on ambition, identity, faith, and the pursuit of balance in chaos.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  /* Every child page's own title flows through the template, so each one leads
     with its subject and still carries both names a searcher might type. */
  title: {
    default: "Heran Patel (HP Maharaja) – Pursuing Balance in Chaos · #HustleMindset",
    template: "%s · Heran Patel (HP Maharaja)",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  /* Everything here is public and meant to be found, by search and by AI. */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  keywords: [
    "Heran Patel",
    "HP Maharaja",
    "Heran Patel HP Maharaja",
    "Hustle Mindset",
    "Pursuing Balance in Chaos",
    "hip hop creator",
    "motivational blogging",
    "vlogs",
    "mindset content",
    "Gujarati American",
    "immigrant hustle",
    "luxury creator brand",
  ],
  authors: [{ name: "Heran Patel" }],
  icons: { icon: "/images/hp-favicon.ico" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Heran Patel (HP Maharaja) – Pursuing Balance in Chaos",
    description:
      "Where ambition meets discipline. Rap, vlogs, and essays built on the #HustleMindset and the pursuit of balance in chaos.",
    url: `${SITE_URL}/`,
    images: [{ url: OG_IMAGE, alt: OG_IMAGE_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heran Patel (HP Maharaja) – Pursuing Balance in Chaos · #HustleMindset",
    description:
      "Rap. Vlogs. Essays. Faith. Culture. Ambition. Heran Patel, aka HP Maharaja, explores the grind with the #HustleMindset while pursuing balance in chaos.",
    images: [OG_IMAGE],
  },
  other: {
    title: "Heran Patel (HP Maharaja) – Pursuing Balance in Chaos · #HustleMindset",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F5F4F1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`}>
      <head>
        {/* Mark that JS is live, so reveal-on-scroll may hide content (see .js .reveal).
            Set from script rather than on <html> directly so a JS failure can never
            leave sections permanently hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
      </head>
      <body className="bg-paper text-ink font-sans min-h-screen flex flex-col antialiased">
        {/* Structured data: who the site is about, and what the site is. Lets
            search engines and AI assistants state the Heran Patel / HP Maharaja
            relationship as fact rather than inferring it from the copy. */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": `${SITE_URL}/#person`,
                name: PERSON_NAME,
                alternateName: PERSON_ALTERNATE_NAME,
                description: PERSON_DESCRIPTION,
                url: SITE_URL,
                image: `${SITE_URL}${OG_IMAGE}`,
                email: `mailto:${CONTACT_EMAIL}`,
                telephone: PHONE_NUMBER,
                jobTitle: "Founder, Operator, Creator",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: LOCATION.city,
                  addressRegion: LOCATION.region,
                  addressCountry: LOCATION.country,
                },
                /* The ventures are defined on the home page; named here by
                   @id so the person resolves to them from any page. */
                worksFor: VENTURES.map((venture) => ({
                  "@id": `${SITE_URL}/#${venture.slug}`,
                })),
                sameAs: SOCIAL_LINKS,
                knowsAbout: [
                  "Entrepreneurship",
                  "Software",
                  "Real estate",
                  "Live events",
                  "Gujarati culture",
                  "Raas Garba",
                  "Sanatan Dharma",
                  "Hip hop",
                ],
              },
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                url: SITE_URL,
                name: SITE_NAME,
                description: PERSON_DESCRIPTION,
                inLanguage: "en",
                publisher: { "@id": `${SITE_URL}/#person` },
                about: { "@id": `${SITE_URL}/#person` },
              },
            ],
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        {/* FOOTER */}
        <footer className="bg-paper border-t border-line">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="py-14 grid gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <Link href="/" className="inline-flex items-center gap-3">
                  <span className="h-9 w-9 bg-ink text-paper flex items-center justify-center font-mono text-[0.62rem] tracking-[0.1em]">
                    HP
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[0.8rem] font-semibold tracking-[0.2em] uppercase">
                      Heran Patel
                    </span>
                    <span className="block label text-[0.6rem] mt-0.5">Pursuing Balance in Chaos</span>
                  </span>
                </Link>
                <p className="mt-5 text-sm text-ink_3 max-w-sm leading-relaxed">
                  Founder, operator and consultant in Phoenix, Arizona — plus rap, vlogs and
                  long-form essays on ambition, faith, and building an empire without losing
                  your center.
                </p>
              </div>
              <div className="md:col-span-3">
                <p className="label mb-4">Explore</p>
                <ul className="space-y-2.5 text-sm text-ink_2">
                  <li>
                    <Link className="hover:text-ink transition" href="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-ink transition" href="/achievements">
                      Achievements
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-ink transition" href="/ventures">
                      Ventures
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-ink transition" href="/hiring">
                      Hiring
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-ink transition" href="/articles">
                      Articles
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-ink transition" href="/#media">
                      Media
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-4">
                <p className="label mb-4">Connect</p>
                <ul className="space-y-2.5 text-sm text-ink_2">
                  <li>
                    <a className="hover:text-ink transition" href="mailto:heran@finityone.com">
                      heran@finityone.com
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-ink transition"
                      href="https://www.youtube.com/channel/UClwSJMiNA__2Ua2pyB30OQg"
                      target="_blank"
                      rel="noreferrer"
                    >
                      YouTube
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-ink transition"
                      href="https://soundcloud.com/hpmaharaja"
                      target="_blank"
                      rel="noreferrer"
                    >
                      SoundCloud
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="hairline"></div>
            <div className="py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="label text-center sm:text-left">
                © {new Date().getFullYear()} Heran Patel · aka HP Maharaja · All rights reserved
              </p>
              <nav
                className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-end"
                aria-label="Legal"
              >
                <Link className="label hover:text-ink transition" href="/terms">
                  Terms
                </Link>
                <Link className="label hover:text-ink transition" href="/privacy">
                  Privacy
                </Link>
                <span className="label hidden md:inline">
                  Built with hustle, faith &amp; late-night sessions
                </span>
              </nav>
            </div>
          </div>
        </footer>
        <RevealOnScroll />
      </body>
    </html>
  );
}
