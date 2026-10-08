import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import Link from "next/link";

import "./globals.css";
import Navbar from "@/components/Navbar";
import RevealOnScroll from "@/components/RevealOnScroll";

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
  metadataBase: new URL("https://hpmaharaja.com"),
  title: "Heran Patel (HP Maharaja) – Pursuing Balance in Chaos · #HustleMindset",
  description: DESCRIPTION,
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
    title: "Heran Patel (HP Maharaja) – Pursuing Balance in Chaos",
    description:
      "Where ambition meets discipline. Rap, vlogs, and essays built on the #HustleMindset and the pursuit of balance in chaos.",
    url: "https://hpmaharaja.com/",
    images: [
      {
        url: "/images/base/header-bg.jpg",
        alt: "Heran Patel (HP Maharaja) – Pursuing Balance in Chaos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heran Patel (HP Maharaja) – Pursuing Balance in Chaos · #HustleMindset",
    description:
      "Rap. Vlogs. Essays. Faith. Culture. Ambition. Heran Patel, aka HP Maharaja, explores the grind with the #HustleMindset while pursuing balance in chaos.",
    images: ["/images/base/header-bg.jpg"],
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
                  Rap, vlogs, and long-form essays on ambition, faith, and building an empire without
                  losing your center.
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
                    <Link className="hover:text-ink transition" href="/articles">
                      Articles
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-ink transition" href="/#ventures">
                      Ventures
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
            <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="label">
                © {new Date().getFullYear()} Heran Patel · aka HP Maharaja · All rights reserved
              </p>
              <p className="label">Built with hustle, faith &amp; late-night sessions</p>
            </div>
          </div>
        </footer>
        <RevealOnScroll />
      </body>
    </html>
  );
}
