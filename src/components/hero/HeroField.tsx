"use client";

import { useEffect, useRef } from "react";

/**
 * The ambient motion layer behind the hero type: a field of nodes that breathes
 * between an ordered lattice and a chaotic scatter, with hairlines drawn
 * between near neighbours. It is the site's thesis — balance in chaos — as
 * motion rather than copy.
 *
 * Deliberately cheap and well-behaved:
 *  - decorative only, so it is `aria-hidden` and carries no information that is
 *    not also in the text around it;
 *  - the loop is suspended whenever the hero scrolls out of view or the tab is
 *    hidden, so a backgrounded page burns no CPU or battery;
 *  - `prefers-reduced-motion` gets one static ordered frame and no rAF at all;
 *  - node count scales with viewport area, so a phone draws roughly a third of
 *    what a desktop does;
 *  - devicePixelRatio is capped at 2 — past that the cost doubles for no
 *    visible gain on a low-contrast hairline drawing.
 */

type Node = {
  /** Lattice (ordered) position, normalised 0..1. */
  ox: number;
  oy: number;
  /** Scatter (chaotic) position, normalised 0..1. */
  cx: number;
  cy: number;
  /** Per-node drift, so the chaos never looks like one rigid shape. */
  phase: number;
  speed: number;
  amp: number;
};

const MAX_DPR = 2;
/** One node per this many CSS px² of stage, clamped by the bounds below. */
const AREA_PER_NODE = 7200;
const MIN_NODES = 24;
const MAX_NODES = 72;
/**
 * How far apart two nodes may be and still be linked, as a multiple of the
 * lattice's own spacing.
 *
 * Deriving it from the spacing rather than from the stage width is what makes
 * the field work at any aspect ratio: on a phone the stage is tall and narrow,
 * so the lattice ends up with few columns and many rows, and a width-relative
 * threshold left the rows too far apart to ever connect — the field rendered
 * as a handful of stray dots.
 */
const LINK_SPACING_FACTOR = 1.5;

export default function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* Parallax is a nicety for a real pointer. On touch the pointer coordinate
       is also a drag, so it would fight with scrolling. */
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    /* Resolved positions, allocated once per layout rather than per frame. */
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    /* Link threshold in CSS px, recomputed with the lattice. */
    let linkPx = 0;

    let frame = 0;
    let running = false;
    let onScreen = true;
    /* Animation clock in seconds, accumulated rather than derived from a start
       timestamp — so pausing for a hidden tab resumes where it left off
       instead of snapping the field back to its opening state. */
    let clock = 0;
    let last = 0;

    /* Pointer offset in CSS px, eased toward the real pointer each frame. */
    let pointerX = 0;
    let pointerY = 0;
    let easedX = 0;
    let easedY = 0;

    const buildNodes = () => {
      const target = Math.round((width * height) / AREA_PER_NODE);
      const count = Math.min(MAX_NODES, Math.max(MIN_NODES, target));
      /* A near-square lattice, so the ordered state reads as a grid at any
         aspect ratio rather than one long row on a wide screen. */
      const cols = Math.max(2, Math.round(Math.sqrt(count * (width / Math.max(height, 1)))));
      const rows = Math.max(2, Math.ceil(count / cols));

      nodes = [];
      for (let i = 0; i < count; i += 1) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        nodes.push({
          ox: (col + 0.5) / cols,
          oy: (row + 0.5) / rows,
          cx: Math.random(),
          cy: Math.random(),
          phase: Math.random() * Math.PI * 2,
          speed: 0.18 + Math.random() * 0.5,
          amp: 0.012 + Math.random() * 0.03,
        });
      }
      px = new Float32Array(count);
      py = new Float32Array(count);
      linkPx = LINK_SPACING_FACTOR * Math.max(width / cols, height / rows);
    };

    /**
     * `t` is the accumulated clock in seconds. `order` swings 0..1 on a slow
     * sine: 1 is the lattice, 0 is full scatter. The two never fully settle,
     * which is the point.
     */
    const draw = (t: number) => {
      const order = reduceMotion ? 1 : (Math.sin(t * 0.16) + 1) / 2;
      /* Ease the pointer so a fast flick glides instead of snapping. */
      easedX += (pointerX - easedX) * 0.045;
      easedY += (pointerY - easedY) * 0.045;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i];
        const wobble = reduceMotion ? 0 : Math.sin(t * n.speed + n.phase) * n.amp;
        const nx = n.ox * order + n.cx * (1 - order) + wobble;
        const ny = n.oy * order + n.cy * (1 - order) + wobble * 0.7;
        /* Depth: nodes lower in the field shift further with the pointer. */
        const depth = 0.4 + n.oy * 0.6;
        px[i] = nx * width + easedX * depth;
        py[i] = ny * height + easedY * depth;
      }

      /* Hairlines first, so the dots sit on top of their own connections. */
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = px[i] - px[j];
          const dy = py[i] - py[j];
          const dist = Math.hypot(dx, dy);
          if (dist > linkPx) continue;
          /* Fade with distance, and overall with how ordered the field is: the
             lattice should look calm, the scatter busy. */
          const alpha = (1 - dist / linkPx) * 0.17 * (0.45 + (1 - order) * 0.55);
          ctx.strokeStyle = `rgba(11, 11, 12, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(px[i], py[i]);
          ctx.lineTo(px[j], py[j]);
          ctx.stroke();
        }
      }

      /* One fill colour for every dot, so this is a single state change. */
      ctx.fillStyle = `rgba(11, 11, 12, ${(0.2 + order * 0.16).toFixed(3)})`;
      for (let i = 0; i < nodes.length; i += 1) {
        ctx.beginPath();
        ctx.arc(px[i], py[i], 1.35, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
      /* With no loop running, the single frame has to be drawn by hand. */
      if (reduceMotion || !running) draw(clock);
    };

    const tick = (now: number) => {
      if (!running) return;
      if (!last) last = now;
      clock += (now - last) / 1000;
      last = now;
      draw(clock);
      frame = requestAnimationFrame(tick);
    };

    const play = () => {
      if (running || reduceMotion) return;
      running = true;
      /* Drop the stale timestamp so the first frame after a pause measures a
         delta of zero rather than the whole pause. */
      last = 0;
      frame = requestAnimationFrame(tick);
    };

    const pause = () => {
      running = false;
      last = 0;
      cancelAnimationFrame(frame);
    };

    const syncPlayback = () => {
      if (onScreen && !document.hidden) play();
      else pause();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      /* ±14px of travel: enough to feel alive, not enough to distract. */
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 28;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 28;
    };

    resize();

    const layout = new ResizeObserver(resize);
    layout.observe(canvas);

    /* `rootMargin` keeps the field running just off-screen, so scrolling back
       up never catches it mid-restart. */
    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        syncPlayback();
      },
      { rootMargin: "120px" },
    );
    visibility.observe(canvas);

    document.addEventListener("visibilitychange", syncPlayback);
    if (finePointer) window.addEventListener("pointermove", onPointerMove, { passive: true });

    syncPlayback();

    return () => {
      pause();
      layout.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      if (finePointer) window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="hero-field" />;
}
