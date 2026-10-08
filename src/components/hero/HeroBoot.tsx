"use client";

import { useEffect, useRef, useState } from "react";

import type { HeroBootLine } from "@/lib/hero";

/**
 * The 0 → 100% boot sequence.
 *
 * The counter tracks real work rather than a decorative timer: web fonts
 * becoming available and the hero portrait finishing decode are each worth a
 * weighted share of the bar, with the remainder filled on a time curve so the
 * number always moves even while a signal is outstanding.
 *
 * Two guards keep it from ever being a gate:
 *  - FLOOR_MS stops a warm cache from flashing "100" for a single frame, so
 *    the count stays legible even when everything resolves instantly;
 *  - CEILING_MS force-completes regardless of outstanding signals, so a stalled
 *    image on a bad connection can never hold the hero hostage.
 *
 * While the number climbs it prints real facts about the site (see
 * `buildHeroBootLines`), so the wait is spent reading rather than watching a
 * spinner. On `prefers-reduced-motion` the sequence is skipped outright.
 *
 * The staged reveal of the hero itself is CSS, keyed off the `data-boot`
 * attribute this component writes onto the hero section. Driving it through one
 * DOM attribute — rather than lifting the whole hero into client state — keeps
 * the headline, copy and links as plain server-rendered markup.
 */

type Props = {
  /** `id` of the element whose `data-boot` attribute stages the reveal. */
  targetId: string;
  /** Selector for the image whose decode feeds the bar. */
  imageSelector: string;
  lines: HeroBootLine[];
};

/** Weights sum to 1: fonts, hero image, and the time-based remainder. */
const WEIGHT_FONTS = 0.3;
const WEIGHT_IMAGE = 0.4;
const WEIGHT_TIME = 0.3;
/** The time share fills over this long, easing out as it nears its cap. */
const TIME_SPAN_MS = 1500;
const FLOOR_MS = 950;
const CEILING_MS = 2800;
/** How long the full bar holds at 100% before the hero takes over. */
const HANDOFF_MS = 260;

export default function HeroBoot({ targetId, imageSelector, lines }: Props) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const frameRef = useRef(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let handoff = 0;

    const finish = () => {
      setPct(100);
      setDone(true);
      /* Hold the full bar for a beat, then hand the stage to the hero. */
      handoff = window.setTimeout(
        () => target?.setAttribute("data-boot", "live"),
        reduceMotion ? 0 : HANDOFF_MS,
      );
    };

    if (reduceMotion) {
      finish();
      return () => window.clearTimeout(handoff);
    }

    /* Re-assert the starting state rather than assuming it. The attribute is
       in the server markup, but this effect also runs again on a client-side
       return to the page and twice under React's development double-invoke,
       and in both cases a previous run will have set it to "live". */
    target?.setAttribute("data-boot", "booting");

    const started = performance.now();
    let fontsReady = 0;
    let imageReady = 0;
    let settled = false;

    /* Fonts: `document.fonts.ready` is widely supported, but treat a missing
       or rejected promise as "resolved" rather than stalling the bar. */
    const fontsPromise: Promise<unknown> = document.fonts?.ready ?? Promise.resolve();
    const markFonts = () => {
      fontsReady = 1;
    };
    fontsPromise.then(markFonts, markFonts);

    const image = document.querySelector<HTMLImageElement>(imageSelector);
    const markImage = () => {
      imageReady = 1;
    };
    if (!image) {
      markImage();
    } else if (image.complete && image.naturalWidth > 0) {
      markImage();
    } else if (typeof image.decode === "function") {
      /* `decode()` resolves once the bitmap is actually paintable, which is the
         moment that matters. A rejection (cancelled or cross-origin decode)
         still counts as done — the bar must not stall on it. */
      image.decode().then(markImage, markImage);
    } else {
      image.addEventListener("load", markImage, { once: true });
      image.addEventListener("error", markImage, { once: true });
    }

    const tick = (now: number) => {
      const elapsed = now - started;
      /* Ease the time share out, so the bar decelerates rather than hitting
         its cap and sitting still. */
      const timeShare = 1 - Math.pow(1 - Math.min(1, elapsed / TIME_SPAN_MS), 3);
      const signals =
        fontsReady * WEIGHT_FONTS + imageReady * WEIGHT_IMAGE + timeShare * WEIGHT_TIME;

      const allReady = fontsReady === 1 && imageReady === 1;

      if ((allReady && elapsed >= FLOOR_MS) || elapsed >= CEILING_MS) {
        settled = true;
        finish();
        return;
      }

      /* Hold just shy of 100 until the sequence is genuinely complete: a bar
         reading 100% while still working is the thing users learn to distrust.
         `Math.max` keeps it monotonic, and returning the previous value lets
         React skip the re-render on frames where the integer has not moved. */
      const ceiling = elapsed >= FLOOR_MS ? 99 : 96;
      setPct((prev) => Math.max(prev, Math.min(ceiling, Math.round(signals * 100))));
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.clearTimeout(handoff);
      /* Failsafe: if this unmounts mid-count, never leave the hero hidden. */
      if (!settled) target?.setAttribute("data-boot", "live");
    };
  }, [targetId, imageSelector]);

  /* Lines commit as the counter passes them, so copy and number stay in step. */
  const visible = lines.filter((line) => pct >= line.at);
  const current = visible[visible.length - 1];

  return (
    <div
      className="hero-boot"
      data-done={done ? "true" : "false"}
      /* Decorative scaffolding around content that is already in the DOM:
         announcing a counter ticking to 100 would only add noise. */
      aria-hidden="true"
    >
      {/* Inner wrapper so the panel can collapse its own height out of the
          card's flow on completion (grid-template-rows 1fr → 0fr). */}
      <div className="hero-boot-inner">
        <div className="hero-boot-head">
          <span className="label">{done ? "Ready" : "Loading"}</span>
          <span className="hero-boot-pct font-mono tabular-nums">
            {String(pct).padStart(3, "0")}
            <span className="hero-boot-pct-sign">%</span>
          </span>
        </div>

        <div className="hero-boot-rail">
          <span className="hero-boot-fill" style={{ transform: `scaleX(${pct / 100})` }} />
        </div>

        <div className="hero-boot-log">
          {/* Keyed on the label so each new fact remounts and replays its
              entry animation. The empty row reserves the space from the first
              frame, so nothing shifts when the first line arrives. */}
          {current ? (
            <p key={current.label} className="hero-boot-line">
              <span className="hero-boot-line-label">{current.label}</span>
              <span className="hero-boot-line-value">{current.value}</span>
            </p>
          ) : (
            <p className="hero-boot-line" />
          )}
        </div>
      </div>
    </div>
  );
}
