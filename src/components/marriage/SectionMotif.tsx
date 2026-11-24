/**
 * Small line-art motifs that sit between paragraphs in the sections that are
 * pure prose.
 *
 * Not every break in a long read needs a photograph — a photo every screen
 * gets as numbing as the text did. These are quieter: a few strokes in
 * `currentColor` that give the eye somewhere to rest and signal "new thought"
 * without adding a single byte of image payload.
 *
 * Decorative, so they are hidden from assistive technology entirely; the
 * copy around them already carries the meaning.
 */

type Variant = "lotus" | "diya" | "path" | "dandiya" | "knot";

const PATHS: Record<Variant, React.ReactNode> = {
  /* An open lotus — the letter and the greeting that opens it. */
  lotus: (
    <>
      <path d="M32 26c0-7 -5-12 -5-12s-5 5 -5 12" />
      <path d="M32 26c0-7 5-12 5-12s5 5 5 12" />
      <path d="M32 26c-4-5 -11-7 -11-7s0 6 3 10" />
      <path d="M32 26c4-5 11-7 11-7s0 6 -3 10" />
      <path d="M18 24c-4 0 -8 2 -8 2s3 12 22 12 22-12 22-12 -4-2 -8-2" />
    </>
  ),
  /* A lit diya — the promises. */
  diya: (
    <>
      <path d="M32 10c3 5 5 8 5 11a5 5 0 01-10 0c0-3 2-6 5-11z" />
      <path d="M14 30h36c0 7-8 12-18 12s-18-5-18-12z" />
      <path d="M22 30c0-2 4-3 10-3s10 1 10 3" />
    </>
  ),
  /* A path with a marker at its end — the timeline. */
  path: (
    <>
      <path d="M6 34c8 0 8-10 16-10s8 10 16 10 8-10 16-10" />
      <circle cx="54" cy="24" r="3.5" />
    </>
  ),
  /* Crossed dandiya sticks — Navratri, and the honest section beside it. */
  dandiya: (
    <>
      <path d="M18 14l28 24" />
      <path d="M46 14L18 38" />
      <circle cx="18" cy="14" r="2.5" />
      <circle cx="46" cy="14" r="2.5" />
      <circle cx="18" cy="38" r="2.5" />
      <circle cx="46" cy="38" r="2.5" />
    </>
  ),
  /* Two loops tied together — the closing invitation. */
  knot: (
    <>
      <path d="M26 26a8 8 0 11-11 11c-5-5-2-14 6-20 6-5 14-5 20 1" />
      <path d="M38 26a8 8 0 1011 11c5-5 2-14-6-20-6-5-14-5-20 1" />
    </>
  ),
};

export default function SectionMotif({ variant }: { variant: Variant }) {
  return (
    <div className="mp-motif" aria-hidden="true">
      <span className="mp-motif-rule" />
      <svg
        viewBox="0 0 64 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {PATHS[variant]}
      </svg>
      <span className="mp-motif-rule" />
    </div>
  );
}
