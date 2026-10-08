"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Ported from templates/partials/navbar.html. The active-link state that Django
 * passed in as `current_page` is derived from the pathname here.
 */
export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isArticles = pathname.startsWith("/articles");

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Add the frosted/hairline treatment once the page leaves the top */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close on Escape, and when the viewport crosses into the lg layout where
     CSS hides the overlay — otherwise the body stays scroll-locked behind it. */
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  /* Lock the page behind the overlay while it is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { href: "/", label: "Home", active: isHome },
    { href: "/achievements", label: "Achievements", active: pathname.startsWith("/achievements") },
    { href: "/ventures", label: "Ventures", active: pathname.startsWith("/ventures") },
    { href: "/hiring", label: "Hiring", active: pathname.startsWith("/hiring") },
    { href: "/articles", label: "Articles", active: isArticles },
    { href: "/#tour", label: "Tour" },
    { href: "/#media", label: "Media" },
  ];

  return (
    <>
      <header
        id="site-nav"
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300${scrolled ? " is-scrolled" : ""}`}
      >
        {/* Thin top meta strip */}
        <div
          id="nav-strip"
          className="hidden lg:block border-b border-line/70 transition-all duration-300"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 h-8 flex items-center justify-between">
            <p className="label text-[0.6rem]">Heran Patel · aka HP Maharaja · Est. 2013</p>
            <div className="flex items-center gap-6">
              <a
                href="https://soundcloud.com/hpmaharaja"
                target="_blank"
                rel="noreferrer"
                className="label text-[0.6rem] hover:text-ink transition"
              >
                SoundCloud
              </a>
              <a
                href="https://www.youtube.com/channel/UClwSJMiNA__2Ua2pyB30OQg"
                target="_blank"
                rel="noreferrer"
                className="label text-[0.6rem] hover:text-ink transition"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
        {/* Main bar */}
        <div id="nav-bar" className="border-b border-transparent transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="h-16 lg:h-[72px] flex items-center justify-between gap-8">
              {/* BRAND */}
              <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Heran Patel — home">
                <span className="h-9 w-9 bg-ink text-paper flex items-center justify-center font-mono text-[0.62rem] tracking-[0.1em]">
                  HP
                </span>
                <span className="leading-tight">
                  <span className="block text-[0.8rem] font-semibold tracking-[0.2em] uppercase text-ink">
                    Heran Patel
                  </span>
                  <span className="hidden sm:block label text-[0.58rem] mt-0.5">aka HP Maharaja</span>
                </span>
              </Link>
              {/* DESKTOP NAV */}
              <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`nav-link${link.active ? " is-active" : ""}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              {/* CTA + MOBILE TOGGLE */}
              <div className="flex items-center gap-3">
                <Link href="/#contact" className="btn btn-solid hidden lg:inline-flex !py-3 !px-5">
                  Get in touch
                </Link>
                <button
                  id="nav-toggle"
                  type="button"
                  aria-expanded={menuOpen}
                  aria-controls="nav-menu"
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  onClick={() => setMenuOpen((open) => !open)}
                  className={`lg:hidden h-10 w-10 inline-flex flex-col items-center justify-center gap-[5px] border border-line_strong hover:border-ink transition${
                    menuOpen ? " is-open" : ""
                  }`}
                >
                  <span className="nav-bar-line"></span>
                  <span className="nav-bar-line"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* MOBILE OVERLAY MENU */}
      <div
        id="nav-menu"
        className={`fixed inset-0 z-40 bg-paper lg:hidden opacity-0 pointer-events-none transition-opacity duration-300${
          menuOpen ? " is-open" : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="h-16 shrink-0"></div>
        <div className="h-[calc(100%-4rem)] overflow-y-auto px-6 pt-6 pb-10 flex flex-col">
          <p className="label mb-5">Menu</p>
          <nav className="flex flex-col" aria-label="Mobile">
            {navLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                className="mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                <span>{link.label}</span>
                <span className="label">{String(index + 1).padStart(2, "0")}</span>
              </Link>
            ))}
          </nav>
          <Link href="/#contact" className="btn btn-solid w-full mt-8" onClick={() => setMenuOpen(false)}>
            Get in touch
          </Link>
          {/* min-h-11 keeps these at the ~44px tap target; as bare `.label`
              text they were only 17px tall, too small to hit reliably. */}
          <div className="mt-auto pt-6 flex items-center gap-2">
            <a
              href="https://soundcloud.com/hpmaharaja"
              target="_blank"
              rel="noreferrer"
              className="label hover:text-ink transition inline-flex items-center min-h-11 px-3 -ml-3"
            >
              SoundCloud
            </a>
            <a
              href="https://www.youtube.com/channel/UClwSJMiNA__2Ua2pyB30OQg"
              target="_blank"
              rel="noreferrer"
              className="label hover:text-ink transition inline-flex items-center min-h-11 px-3"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
