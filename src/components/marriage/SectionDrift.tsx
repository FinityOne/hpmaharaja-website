/**
 * A layer of soft shapes that drift as its section crosses the viewport.
 *
 * The motion is done entirely in CSS with a scroll-driven `view()` timeline,
 * so there is no scroll listener, no requestAnimationFrame loop and no
 * JavaScript on the page at all for this — the browser moves the shapes on
 * the compositor as it scrolls. Where `view()` is not supported the shapes
 * simply sit still at their resting position, which still reads as
 * deliberate texture rather than as something broken.
 *
 * Purely decorative: `aria-hidden`, no pointer events, and it sits behind the
 * section's own content. The shapes are rendered as plain spans styled in
 * CSS rather than SVG, because at this size and opacity the difference is
 * invisible and the markup stays almost free.
 *
 * `tone` picks a palette: "warm" for the cream and rose sections, "gold" for
 * the near-black ones where rose disappears.
 */
export default function SectionDrift({
  count = 6,
  tone = "warm",
}: {
  count?: number;
  tone?: "warm" | "gold";
}) {
  return (
    <div className={`mp-drift mp-drift-${tone}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={`mp-drift-shape mp-drift-${i + 1}`} />
      ))}
    </div>
  );
}
