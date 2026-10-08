"use client";

import { useEffect, useState } from "react";

/**
 * The hero's live row: local time where Heran works, and a running countdown to
 * the next Rameelo tour date.
 *
 * Both values are genuinely live, which is the point — it is the one part of
 * the page that proves the site is current rather than a brochure someone left
 * up. It is also the cheapest possible motion: one state update per second, no
 * layout thrash, and it stops entirely while the tab is hidden.
 *
 * Hydration safety: the server cannot know the reader's clock, so the time
 * renders as a dash until the first client tick. The *dates* are server-safe
 * and arrive as props, so the countdown's label and target never differ
 * between server and client markup.
 */

type Props = {
  /** Next stop's first day, as `YYYY-MM-DD`. Null once the tour has wrapped. */
  nextDate: string | null;
  nextLabel: string | null;
  nextCity: string | null;
  /** Events still ahead, for the static fallback copy. */
  remaining: number;
};

/** Heran operates on New York time; show that rather than the reader's. */
const ZONE = "America/New_York";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: ZONE,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function formatCountdown(target: Date, now: Date): string | null {
  const ms = target.getTime() - now.getTime();
  if (ms <= 0) return null;
  const totalMinutes = Math.floor(ms / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`;
  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, "0")}m`;
  return `${minutes}m`;
}

export default function HeroLive({ nextDate, nextLabel, nextCity, remaining }: Props) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    /* Tick only while the tab is in the foreground: a background clock nobody
       can see is pure battery cost. Re-read the time on resume so returning to
       the tab never shows a stale second. */
    let timer = 0;

    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };

    const start = () => {
      if (timer) return;
      setNow(new Date());
      timer = window.setInterval(() => setNow(new Date()), 1000);
    };

    const sync = () => (document.hidden ? stop() : start());

    sync();
    document.addEventListener("visibilitychange", sync);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  /* Doors at 19:00 local is the house default for these events; it only needs
     to be close enough for a countdown measured in days. */
  const target = nextDate ? new Date(`${nextDate}T19:00:00-04:00`) : null;
  const countdown = target && now ? formatCountdown(target, now) : null;

  return (
    <div className="hero-live">
      <div className="hero-live-cell">
        {/* Dot and label share a row: the cell stacks into a column from the
            `sm` breakpoint up, which would otherwise strand the dot on a line
            of its own above the label. */}
        <span className="hero-live-head">
          <span className="hero-live-dot" aria-hidden="true" />
          <span className="label">Live · New York</span>
        </span>
        <span className="hero-live-value font-mono tabular-nums">
          {now ? timeFormatter.format(now) : "--:--:--"}
        </span>
      </div>

      <div className="hero-live-cell">
        <span className="label">{nextDate ? "Next tour stop" : "Tour 2026"}</span>
        <span className="hero-live-value font-mono">
          {nextDate ? (
            <>
              {nextLabel} · {nextCity}
              {/* The countdown is an enhancement on top of the date, so a
                  reader without JS still gets the useful part. */}
              {countdown ? <span className="hero-live-countdown"> in {countdown}</span> : null}
            </>
          ) : (
            "11 events · 5 cities · complete"
          )}
        </span>
      </div>

      <div className="hero-live-cell hero-live-cell-last">
        <span className="label">Events ahead</span>
        <span className="hero-live-value font-mono tabular-nums">
          {String(remaining).padStart(2, "0")} / 11
        </span>
      </div>
    </div>
  );
}
