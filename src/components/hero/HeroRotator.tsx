"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import type { HeroFacet } from "@/lib/hero";

/**
 * The hero's rotating identity panel: one role at a time, each with the line
 * that explains it and the hard evidence behind it.
 *
 * This is the "something is always happening" beat of the hero, but it carries
 * information rather than decoration — a visitor who never scrolls still learns
 * the four things worth knowing.
 *
 * Every facet is in the DOM at all times, with the inactive ones hidden from
 * both the accessibility tree and the pointer. That keeps the full set in the
 * server-rendered HTML for crawlers, and for readers without JS the `html.js`
 * guard in globals.css leaves all four stacked and legible rather than
 * collapsed into one hidden panel.
 *
 * The overlay layout comes from that CSS guard rather than from the `enhanced`
 * state below, so it is correct on the very first paint. Driven by state it
 * only took effect after hydration, which briefly showed all four facets at
 * once behind the active one. `enhanced` still gates `aria-hidden`/`inert`,
 * which must stay off the server-rendered markup for the no-JS case.
 *
 * Rotation stops whenever it would be rude or wasteful: pointer hover, keyboard
 * focus inside the panel, the hero scrolled out of view, a hidden tab, or
 * `prefers-reduced-motion` — in which case the dots become the only way to
 * advance and the visitor drives.
 */

type Props = {
  facets: HeroFacet[];
  /** Milliseconds each facet holds. */
  interval?: number;
};

const DEFAULT_INTERVAL = 4600;

export default function HeroRotator({ facets, interval = DEFAULT_INTERVAL }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  /* Set once JS confirms it can drive the panel, so the stacked no-JS
     fallback is never replaced by a single hidden facet. */
  const [enhanced, setEnhanced] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef(0);
  /* rAF timestamp the current run began at, and the progress already banked
     before the last pause — so resuming continues through the current facet
     instead of restarting it. Both are refs rather than closure variables
     because `goTo` has to be able to reset them from outside the loop. */
  const startedAtRef = useRef(0);
  const bankedRef = useRef(0);

  /**
   * Write the facet's elapsed share to a CSS custom property instead of React
   * state. The progress rail then animates entirely in CSS, which keeps a
   * 60fps value out of the render path — re-rendering four facets every frame
   * to move one 2px bar is not a trade worth making.
   */
  const paint = useCallback((value: number) => {
    rootRef.current?.style.setProperty("--facet-progress", value.toFixed(4));
  }, []);

  const goTo = useCallback(
    (next: number) => {
      bankedRef.current = 0;
      startedAtRef.current = 0;
      paint(0);
      setIndex(next);
    },
    [paint],
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnhanced(true);
    paint(0);
    /* Reduced motion keeps the panel and its dots, but never auto-advances. */
    if (reduceMotion) return;

    const root = rootRef.current;
    let onScreen = true;
    let hovered = false;
    let focused = false;

    const tick = (now: number) => {
      if (!startedAtRef.current) startedAtRef.current = now;
      const value = bankedRef.current + (now - startedAtRef.current) / interval;
      if (value >= 1) {
        bankedRef.current = 0;
        startedAtRef.current = 0;
        paint(0);
        setIndex((prev) => (prev + 1) % facets.length);
      } else {
        paint(value);
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(frameRef.current);
      startedAtRef.current = 0;
      frameRef.current = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(frameRef.current);
      /* Bank whatever the rail had drawn, then freeze it there. */
      if (startedAtRef.current) {
        bankedRef.current = Math.min(
          0.999,
          bankedRef.current + (performance.now() - startedAtRef.current) / interval,
        );
        startedAtRef.current = 0;
      }
    };

    const sync = () => {
      const run = onScreen && !hovered && !focused && !document.hidden;
      setPaused(!run);
      if (run) start();
      else stop();
    };

    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    if (root) visibility.observe(root);

    const onEnter = () => {
      hovered = true;
      sync();
    };
    const onLeave = () => {
      hovered = false;
      sync();
    };
    const onFocusIn = () => {
      focused = true;
      sync();
    };
    const onFocusOut = () => {
      focused = false;
      sync();
    };

    root?.addEventListener("pointerenter", onEnter);
    root?.addEventListener("pointerleave", onLeave);
    root?.addEventListener("focusin", onFocusIn);
    root?.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", sync);

    sync();

    return () => {
      stop();
      visibility.disconnect();
      root?.removeEventListener("pointerenter", onEnter);
      root?.removeEventListener("pointerleave", onLeave);
      root?.removeEventListener("focusin", onFocusIn);
      root?.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [facets.length, interval, paint]);

  return (
    <div
      ref={rootRef}
      className="hero-rotator"
      data-paused={paused ? "true" : "false"}
    >
      <div className="hero-rotator-stack">
        {facets.map((facet, i) => {
          const active = i === index;
          const hidden = enhanced && !active;
          return (
            <article
              key={facet.word}
              className="hero-facet"
              data-active={active ? "true" : "false"}
              /* Inactive facets stay in the HTML for crawlers but leave the
                 accessibility tree and the tab order, so a screen reader and a
                 keyboard each meet exactly one at a time. */
              aria-hidden={hidden ? "true" : undefined}
              inert={hidden ? true : undefined}
            >
              <p className="hero-facet-word display">{facet.word}</p>
              <p className="hero-facet-line">{facet.line}</p>
              <dl className="hero-facet-proof">
                <dt className="label">{facet.proofLabel}</dt>
                <dd className="font-mono">{facet.proofValue}</dd>
              </dl>
              {/* Internal routes go through Link for client navigation; the
                  in-page anchors must stay plain. */}
              {facet.href.startsWith("/") ? (
                <Link href={facet.href} className="hero-facet-link group">
                  {facet.hrefLabel}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              ) : (
                <a href={facet.href} className="hero-facet-link group">
                  {facet.hrefLabel}
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              )}
            </article>
          );
        })}
      </div>

      {/* The dots are the manual control and the progress indicator at once,
          and stay operable whether or not auto-rotation is running. */}
      <div className="hero-rotator-nav" role="group" aria-label="What Heran does">
        {facets.map((facet, i) => (
          <button
            key={facet.word}
            type="button"
            /* A plain pressed toggle rather than a tablist: there is no
               separate panel element per button to point `aria-controls` at,
               and claiming the tab pattern without one would misrepresent how
               arrow keys behave. */
            aria-pressed={i === index}
            className="hero-rotator-dot"
            data-active={i === index ? "true" : "false"}
            onClick={() => goTo(i)}
          >
            <span className="hero-rotator-dot-rail">
              <span className="hero-rotator-dot-fill" />
            </span>
            <span className="hero-rotator-dot-word">{facet.word}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
