"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  GATE_ENTER,
  GATE_EYEBROW,
  GATE_FALLBACK_GREETING,
  GATE_LINES,
  GATE_SKIP,
} from "@/lib/marriage";
import useGuestName from "./useGuestName";

/**
 * The door in front of the biodata.
 *
 * Heran shares a personalized link — /marriage?for=Priya — and this is the
 * first thing she sees: her name, one rotating line about what this could
 * be, and a single button. One decision, no scrolling, then the page opens.
 *
 * Three things make it safe to put a full-screen overlay in front of a page
 * that SEO is load-bearing for:
 *
 * - It only exists after mount, so the server-rendered HTML is the whole
 *   biodata. Crawlers and anyone without JS never meet the gate.
 * - It only appears when the link actually carries a name. A bare
 *   /marriage behaves exactly as it did before.
 * - It is dismissible by button, by Escape, and it remembers the choice for
 *   the session, so a reload mid-read does not put the door back.
 */
export default function WelcomeGate() {
  const name = useGuestName();
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [line, setLine] = useState(0);
  const enterRef = useRef<HTMLButtonElement>(null);

  /* Open once a name has been read — and only if she hasn't already come
     through it in this tab. */
  useEffect(() => {
    if (!name) return;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem("mp-gate") === "done";
    } catch {
      /* Private mode or blocked storage: just show the gate. */
    }
    if (!seen) setOpen(true);
  }, [name]);

  /* Hold the page still behind the overlay. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* Rotate the line. */
  useEffect(() => {
    if (!open) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setLine((i) => (i + 1) % GATE_LINES.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, [open]);

  /* Send focus to the one control, so a keyboard or screen reader lands on
     the way out rather than at the top of a page it cannot reach. */
  useEffect(() => {
    if (open) enterRef.current?.focus();
  }, [open]);

  const dismiss = useCallback((target?: string) => {
    try {
      window.sessionStorage.setItem("mp-gate", "done");
    } catch {
      /* Not being able to remember is survivable. */
    }
    setLeaving(true);
    /* Let the curtain finish before it leaves the tree. */
    window.setTimeout(() => {
      setOpen(false);
      if (target) document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    }, 620);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div
      className={`mp-gate${leaving ? " is-leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={name ? `A welcome for ${name}` : "Welcome"}
    >
      <div className="mp-gate-petals" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={`mp-petal mp-petal-${(i % 9) + 1}`} />
        ))}
      </div>

      <div className="mp-gate-body">
        <p className="mp-gate-eyebrow">{GATE_EYEBROW}</p>

        <h2 className="mp-gate-greeting">
          {name ? (
            <>
              Hello,
              <br />
              <span className="mp-gate-name">{name}</span>.
            </>
          ) : (
            GATE_FALLBACK_GREETING
          )}
        </h2>

        <p className="mp-gate-sub">
          You&rsquo;ve been sent something a little more honest than a biodata.
        </p>

        {/* Re-keying replays the fade, so each line arrives rather than
            swapping in place. */}
        <p className="mp-gate-line" aria-live="polite">
          <span key={line} className="mp-fade-in">
            {GATE_LINES[line]}
          </span>
        </p>

        <div className="mp-gate-dots" aria-hidden="true">
          {GATE_LINES.map((text, i) => (
            <span key={text} className={`mp-gate-dot${i === line ? " is-active" : ""}`} />
          ))}
        </div>

        <button
          ref={enterRef}
          type="button"
          className="mp-btn mp-btn-solid mp-gate-enter"
          onClick={() => dismiss()}
        >
          {GATE_ENTER}
        </button>

        <button type="button" className="mp-gate-skip" onClick={() => dismiss("match")}>
          {GATE_SKIP}
        </button>
      </div>
    </div>
  );
}
