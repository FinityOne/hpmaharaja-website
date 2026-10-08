/**
 * Editorial artwork for section and page headers.
 *
 * These are vector placeholders, not clip-art: each variant is a geometric
 * composition drawn in the site's own hairline-and-ink language, so a page
 * with no photograph still reads as designed rather than unfinished. They are
 * inline SVG, which means no network request, no layout shift, and colour that
 * follows the surrounding text via `currentColor`.
 *
 * To replace one with a real photograph, give the matching slot in
 * src/lib/artwork.ts a `src` — `Figure` then renders the image instead and
 * this art is never drawn. Nothing else needs to change.
 */

export type ArtVariant =
  | "portrait"
  | "achievements"
  | "ventures"
  | "culture"
  | "studio"
  | "estate"
  | "advisory"
  | "tour"
  | "music"
  | "vlogs"
  | "journal"
  | "merch"
  | "community"
  | "contact";

/** Deterministic pseudo-random in [0,1) so every render draws the same art. */
function rand(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Hairline backdrop grid shared by every variant. */
function Grid({ step = 40 }: { step?: number }) {
  const lines = [];
  for (let x = step; x < 800; x += step) {
    lines.push(<line key={`v${x}`} x1={x} y1="0" x2={x} y2="450" />);
  }
  for (let y = step; y < 450; y += step) {
    lines.push(<line key={`h${y}`} x1="0" y1={y} x2="800" y2={y} />);
  }
  return (
    <g stroke="currentColor" strokeWidth="1" opacity="0.08">
      {lines}
    </g>
  );
}

function Portrait() {
  /* A figure in a frame, built from stacked hairlines — a portrait reduced to
     contour lines, the way a halftone print would carry it. */
  const bands = Array.from({ length: 26 }, (_, i) => {
    const y = 110 + i * 11;
    const t = i / 25;
    const w = 150 * Math.sin(Math.PI * (0.18 + t * 0.78));
    return <line key={i} x1={400 - w} y1={y} x2={400 + w} y2={y} />;
  });
  return (
    <>
      <Grid />
      <g stroke="currentColor" strokeWidth="3" opacity="0.55">
        {bands}
      </g>
      {/* head */}
      <circle cx="400" cy="92" r="46" fill="currentColor" opacity="0.9" />
      <rect
        x="210"
        y="48"
        width="380"
        height="402"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.5"
      />
    </>
  );
}

function Achievements() {
  /* An ascending bar run: the record, climbing. */
  const bars = Array.from({ length: 11 }, (_, i) => {
    const h = 48 + i * 30 + rand(i + 3) * 26;
    return (
      <rect
        key={i}
        x={78 + i * 58}
        y={400 - h}
        width="30"
        height={h}
        fill="currentColor"
        opacity={0.2 + (i / 10) * 0.75}
      />
    );
  });
  return (
    <>
      <Grid />
      <line x1="60" y1="400" x2="740" y2="400" stroke="currentColor" strokeWidth="2" />
      {bars}
    </>
  );
}

function Ventures() {
  /* Four quadrants, one per operating concern, joined at the centre. */
  const cells = [
    { x: 150, y: 70 },
    { x: 430, y: 70 },
    { x: 150, y: 250 },
    { x: 430, y: 250 },
  ];
  return (
    <>
      <Grid />
      {cells.map((cell, i) => (
        <g key={i}>
          <rect
            x={cell.x}
            y={cell.y}
            width="220"
            height="130"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.45"
          />
          <rect
            x={cell.x}
            y={cell.y}
            width="220"
            height="130"
            fill="currentColor"
            opacity={0.06 + i * 0.05}
          />
          <circle cx={cell.x + 26} cy={cell.y + 26} r="7" fill="currentColor" />
        </g>
      ))}
      <circle cx="400" cy="225" r="13" fill="currentColor" />
    </>
  );
}

function Culture() {
  /* Concentric rings of dancers — a garba circle, seen from above. */
  const rings = [70, 118, 166].map((r, ri) => {
    const count = 8 + ri * 6;
    return Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2 + ri * 0.22;
      return (
        <circle
          key={`${ri}-${i}`}
          cx={400 + Math.cos(a) * r}
          cy={225 + Math.sin(a) * r * 0.82}
          r={ri === 0 ? 10 : 7}
          fill="currentColor"
          opacity={0.85 - ri * 0.2}
        />
      );
    });
  });
  return (
    <>
      <Grid />
      {[70, 118, 166].map((r) => (
        <ellipse
          key={r}
          cx="400"
          cy="225"
          rx={r}
          ry={r * 0.82}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.3"
        />
      ))}
      {rings}
      <circle cx="400" cy="225" r="17" fill="currentColor" />
    </>
  );
}

function Studio() {
  /* A product being assembled: stacked panels and a ledger column. */
  return (
    <>
      <Grid />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={110 + i * 22}
          y={110 + i * 46}
          width="300"
          height="150"
          fill="currentColor"
          opacity={0.1 + i * 0.1}
          stroke="currentColor"
          strokeWidth="2"
        />
      ))}
      <g stroke="currentColor" strokeWidth="6" opacity="0.8">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1="500" y1={110 + i * 26} x2={500 + 60 + rand(i) * 150} y2={110 + i * 26} />
        ))}
      </g>
    </>
  );
}

function Estate() {
  /* A row of held doors — the long-hold portfolio as elevation. */
  return (
    <>
      <Grid />
      {Array.from({ length: 5 }, (_, i) => {
        const x = 70 + i * 140;
        const h = 150 + rand(i + 9) * 90;
        return (
          <g key={i}>
            <rect
              x={x}
              y={390 - h}
              width="104"
              height={h}
              fill="currentColor"
              opacity={0.12 + i * 0.06}
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d={`M${x - 10} ${390 - h} L${x + 52} ${390 - h - 44} L${x + 114} ${390 - h} Z`}
              fill="currentColor"
              opacity="0.75"
            />
            <rect x={x + 38} y={330} width="28" height="60" fill="currentColor" opacity="0.9" />
          </g>
        );
      })}
      <line x1="40" y1="390" x2="760" y2="390" stroke="currentColor" strokeWidth="2" />
    </>
  );
}

function Advisory() {
  /* An org chart that branches — team topology as headcount grows. */
  const nodes = [
    { x: 400, y: 80 },
    { x: 240, y: 210 },
    { x: 560, y: 210 },
    { x: 150, y: 350 },
    { x: 330, y: 350 },
    { x: 470, y: 350 },
    { x: 650, y: 350 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [2, 6],
  ];
  return (
    <>
      <Grid />
      <g stroke="currentColor" strokeWidth="2" opacity="0.5">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
        ))}
      </g>
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 0 ? 26 : 18}
          fill="currentColor"
          opacity={i === 0 ? 1 : 0.65}
        />
      ))}
    </>
  );
}

function Tour() {
  /* A routed line across stops, the way a tour actually moves. */
  const stops = [
    { x: 90, y: 300 },
    { x: 210, y: 210 },
    { x: 330, y: 330 },
    { x: 430, y: 150 },
    { x: 560, y: 260 },
    { x: 700, y: 130 },
  ];
  return (
    <>
      <Grid />
      <polyline
        points={stops.map((s) => `${s.x},${s.y}`).join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="10 8"
        opacity="0.55"
      />
      {stops.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r={i === stops.length - 1 ? 20 : 13} fill="currentColor" />
          <circle
            cx={s.x}
            cy={s.y}
            r={i === stops.length - 1 ? 34 : 24}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.35"
          />
        </g>
      ))}
    </>
  );
}

function Music() {
  /* A waveform, mirrored around the centre line. */
  const bars = Array.from({ length: 46 }, (_, i) => {
    const h = 20 + Math.abs(Math.sin(i * 0.5)) * 110 + rand(i) * 55;
    return (
      <rect
        key={i}
        x={46 + i * 16}
        y={225 - h / 2}
        width="8"
        height={h}
        fill="currentColor"
        opacity={0.45 + Math.abs(Math.sin(i * 0.5)) * 0.5}
      />
    );
  });
  return (
    <>
      <Grid />
      <line x1="30" y1="225" x2="770" y2="225" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      {bars}
    </>
  );
}

function Vlogs() {
  /* A strip of film frames with a play mark. */
  return (
    <>
      <Grid />
      {Array.from({ length: 4 }, (_, i) => (
        <rect
          key={i}
          x={60 + i * 180}
          y="130"
          width="150"
          height="190"
          fill="currentColor"
          opacity={0.1 + i * 0.07}
          stroke="currentColor"
          strokeWidth="2"
        />
      ))}
      {/* sprocket holes */}
      <g fill="currentColor" opacity="0.6">
        {Array.from({ length: 16 }, (_, i) => (
          <rect key={`t${i}`} x={54 + i * 46} y="96" width="20" height="14" />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <rect key={`b${i}`} x={54 + i * 46} y="340" width="20" height="14" />
        ))}
      </g>
      <path d="M372 185 L372 265 L446 225 Z" fill="currentColor" />
    </>
  );
}

function Journal() {
  /* A page of set text, with a drop cap. */
  return (
    <>
      <Grid />
      <rect x="150" y="60" width="500" height="330" fill="currentColor" opacity="0.05" stroke="currentColor" strokeWidth="2" />
      <rect x="190" y="100" width="86" height="86" fill="currentColor" opacity="0.85" />
      <g stroke="currentColor" strokeWidth="7" opacity="0.4">
        {Array.from({ length: 4 }, (_, i) => (
          <line key={`a${i}`} x1="296" y1={112 + i * 24} x2={296 + 120 + rand(i) * 90} y2={112 + i * 24} />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`b${i}`} x1="190" y1={218 + i * 24} x2={190 + 300 + rand(i + 20) * 130} y2={218 + i * 24} />
        ))}
      </g>
    </>
  );
}

function Merch() {
  /* A folded garment, flat-lay. */
  return (
    <>
      <Grid />
      <path
        d="M300 120 L360 96 L440 96 L500 120 L534 196 L486 216 L486 360 L314 360 L314 216 L266 196 Z"
        fill="currentColor"
        opacity="0.16"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path d="M360 96 Q400 142 440 96" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.7" />
      <rect x="372" y="236" width="56" height="56" fill="currentColor" opacity="0.9" />
      <g stroke="currentColor" strokeWidth="2" opacity="0.35">
        <line x1="314" y1="300" x2="486" y2="300" />
        <line x1="314" y1="330" x2="486" y2="330" />
      </g>
    </>
  );
}

function Community() {
  /* A mesh of people, connected. */
  const nodes = Array.from({ length: 16 }, (_, i) => ({
    x: 110 + (i % 4) * 190 + (Math.floor(i / 4) % 2) * 40,
    y: 100 + Math.floor(i / 4) * 86,
  }));
  return (
    <>
      <Grid />
      <g stroke="currentColor" strokeWidth="1.5" opacity="0.3">
        {nodes.map((n, i) =>
          nodes
            .slice(i + 1)
            .map((m, j) =>
              Math.hypot(n.x - m.x, n.y - m.y) < 210 ? (
                <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} />
              ) : null,
            ),
        )}
      </g>
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={11} fill="currentColor" opacity={0.5 + rand(i) * 0.5} />
      ))}
    </>
  );
}

function Contact() {
  /* An envelope, opened, with a signal arc. */
  return (
    <>
      <Grid />
      <rect x="230" y="150" width="340" height="210" fill="currentColor" opacity="0.14" stroke="currentColor" strokeWidth="3" />
      <path d="M230 150 L400 272 L570 150" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.8" />
      {[46, 76, 106].map((r, i) => (
        <path
          key={r}
          d={`M${600} ${150 - r * 0.2} a${r} ${r} 0 0 1 ${r * 0.72} ${r * 0.88}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          opacity={0.6 - i * 0.16}
        />
      ))}
      <circle cx="600" cy="150" r="10" fill="currentColor" />
    </>
  );
}

const VARIANTS: Record<ArtVariant, () => React.ReactElement> = {
  portrait: Portrait,
  achievements: Achievements,
  ventures: Ventures,
  culture: Culture,
  studio: Studio,
  estate: Estate,
  advisory: Advisory,
  tour: Tour,
  music: Music,
  vlogs: Vlogs,
  journal: Journal,
  merch: Merch,
  community: Community,
  contact: Contact,
};

export default function SectionArt({
  variant,
  className = "",
}: {
  variant: ArtVariant;
  className?: string;
}) {
  const Draw = VARIANTS[variant];
  return (
    <svg
      viewBox="0 0 800 450"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      /* Decorative: the surrounding copy already carries the meaning. */
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <Draw />
    </svg>
  );
}
