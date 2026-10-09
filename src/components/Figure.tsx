import SectionArt from "@/components/SectionArt";
import { artworkFor } from "@/lib/artwork";

const RATIOS = {
  wide: "aspect-[16/9]",
  band: "aspect-[21/9]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
} as const;

/**
 * One image slot. Renders the real photograph when src/lib/artwork.ts has a
 * `src` for this key, and the vector placeholder when it does not — so a page
 * looks finished either way and swapping in a photo is a one-line edit.
 *
 * `tone` picks which side of the palette the art sits on: `paper` for a light
 * band inside the page, `ink` for the inverted panels.
 */
export default function Figure({
  slot,
  ratio = "wide",
  tone = "paper",
  caption,
  className = "",
}: {
  slot: string;
  ratio?: keyof typeof RATIOS;
  tone?: "paper" | "ink";
  caption?: string;
  className?: string;
}) {
  const artwork = artworkFor(slot);

  const shell =
    tone === "ink"
      ? "bg-ink text-paper/80 border-paper/15"
      : "bg-paper_2 text-ink border-line";

  return (
    <figure className={className}>
      <div className={`relative overflow-hidden border ${shell} ${RATIOS[ratio]}`}>
        {artwork.src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={artwork.src}
            alt={artwork.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.08]"
          />
        ) : (
          <SectionArt variant={artwork.art} className="absolute inset-0 h-full w-full" />
        )}
      </div>
      {caption ? <figcaption className="label mt-3">{caption}</figcaption> : null}
    </figure>
  );
}
