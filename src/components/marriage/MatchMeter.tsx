"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { MatchQuestion } from "@/lib/marriage";

type Verdict = { min: number; headline: string; line: string };

/**
 * The compatibility calculator — the interactive center of the page.
 *
 * Every question is about *her*, so answering is honest self-description
 * rather than scoring him. Each option carries Heran's own weight for it, and
 * the running percentage is just the mean of the answers given so far, so the
 * bar moves on the very first tap instead of sitting at zero until the end.
 *
 * Two deliberate decisions:
 *
 * - Nothing is transmitted. The answers live in this component's state and
 *   die with the tab. That is both the honest design and the reason she will
 *   answer the awkward ones truthfully.
 * - A dealbreaker answer does not get quietly averaged away. It replaces the
 *   verdict with a plain, kind "this isn't us". Filtering is the job.
 */
export default function MatchMeter({
  questions,
  verdicts,
  dealbreaker,
  intro,
}: {
  questions: MatchQuestion[];
  verdicts: Verdict[];
  dealbreaker: { headline: string; line: string };
  intro: string;
}) {
  /* question id -> chosen option index */
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const answered = Object.keys(answers).length;
  const total = questions.length;

  const { score, blocked } = useMemo(() => {
    let sum = 0;
    let n = 0;
    let hit = false;
    for (const q of questions) {
      const pick = answers[q.id];
      if (pick === undefined) continue;
      const option = q.options[pick];
      if (!option) continue;
      sum += option.score;
      n += 1;
      if (option.dealbreaker) hit = true;
    }
    return { score: n ? Math.round(sum / n) : 0, blocked: hit };
  }, [answers, questions]);

  const verdict = useMemo(
    () =>
      verdicts
        .filter((v) => score >= v.min)
        .reduce((best, v) => (v.min >= best.min ? v : best), verdicts[0]),
    [score, verdicts],
  );

  const display = useAnimatedNumber(answered ? score : 0);

  const complete = answered === total;
  const strong = complete && !blocked && score >= 87;

  const choose = (id: string, index: number) =>
    setAnswers((prev) => ({ ...prev, [id]: index }));

  return (
    <div className={`mp-calc${strong ? " is-strong" : ""}${blocked ? " is-blocked" : ""}`}>
      <p className="mp-calc-intro">{intro}</p>

      {/* ---- the readout, pinned so the bar stays in view while she answers */}
      <div className="mp-calc-readout" aria-live="polite">
        <div className="mp-calc-top">
          <p className="mp-calc-pct">
            <span className="mp-calc-num">{display}</span>
            <span className="mp-calc-sign">%</span>
          </p>
          <p className="mp-calc-count">
            {answered} of {total} answered
          </p>
        </div>

        <div className="mp-calc-bar">
          <span
            className="mp-calc-fill"
            style={{ transform: `scaleX(${(answered ? score : 0) / 100})` }}
          />
          {/* Ticks at the verdict thresholds, so the bar reads as a scale
              rather than a mystery meter. */}
          {verdicts
            .filter((v) => v.min > 0)
            .map((v) => (
              <span key={v.min} className="mp-calc-tick" style={{ left: `${v.min}%` }} />
            ))}
        </div>

        <p className="mp-calc-headline">
          {blocked ? dealbreaker.headline : verdict?.headline}
        </p>
        <p className="mp-calc-line">{blocked ? dealbreaker.line : verdict?.line}</p>

        {answered > 0 && (
          <button type="button" className="mp-calc-reset" onClick={() => setAnswers({})}>
            Start over
          </button>
        )}
      </div>

      {/* ---- the questions */}
      <ol className="mp-calc-questions">
        {questions.map((q, qi) => {
          const pick = answers[q.id];
          return (
            <li key={q.id} className={pick === undefined ? undefined : "is-answered"}>
              {/* A grouping div rather than fieldset/legend. A <legend> is
                  laid out in the fieldset's border box, not its padding box,
                  so it escaped the top of the card and took the card's top
                  padding with it. `role="group"` plus aria-labelledby gives
                  the same semantics to a screen reader — the group is
                  announced with its number, topic and question — while
                  laying out like ordinary content. */}
              <div
                className="mp-q"
                role="group"
                aria-labelledby={`${q.id}-topic ${q.id}-prompt`}
              >
                <div className="mp-q-legend">
                  <span className="mp-q-topic" id={`${q.id}-topic`}>
                    {String(qi + 1).padStart(2, "0")} · {q.topic}
                  </span>
                  <span className="mp-q-prompt" id={`${q.id}-prompt`}>
                    {q.prompt}
                  </span>
                </div>
                <div className="mp-q-options">
                  {q.options.map((option, oi) => {
                    const on = pick === oi;
                    return (
                      <button
                        key={option.label}
                        type="button"
                        className={`mp-opt${on ? " is-on" : ""}`}
                        aria-pressed={on}
                        onClick={() => choose(q.id, oi)}
                      >
                        <span className="mp-opt-mark" aria-hidden="true" />
                        <span className="mp-opt-text">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {complete && !blocked && (
        <p className="mp-calc-done">
          That&rsquo;s all nine. {score}% — now you know as much as I do.
        </p>
      )}
    </div>
  );
}

/**
 * Eases a number towards its target so the percentage rolls rather than
 * snapping. Jumps straight to the target under prefers-reduced-motion.
 */
function useAnimatedNumber(target: number) {
  const [value, setValue] = useState(target);
  const frame = useRef(0);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(target);
      return;
    }

    const step = () => {
      setValue((current) => {
        const gap = target - current;
        if (Math.abs(gap) < 0.6) return target;
        frame.current = requestAnimationFrame(step);
        return current + gap * 0.18;
      });
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, [target]);

  return Math.round(value);
}
