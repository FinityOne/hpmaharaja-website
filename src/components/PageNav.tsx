import Link from "next/link";

export type PageNavItem = {
  label: string;
  title: string;
  blurb: string;
  href: string;
};

/**
 * The "where to go next" row that closes every page.
 *
 * The home page used to carry every section at once; now that each lives on
 * its own page, this is what keeps them connected.
 */
export default function PageNav({
  items,
  heading = "Keep going.",
  kicker = "Next",
}: {
  items: PageNavItem[];
  heading?: string;
  kicker?: string;
}) {
  return (
    <section className="py-20 lg:py-28 border-t border-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-y-6 lg:gap-x-10 mb-14">
          <div className="lg:col-span-4">
            <p className="label">{kicker}</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] max-w-[26ch]">{heading}</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 border-t border-line">
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group reveal py-10 flex flex-col border-line border-b md:border-b-0 ${
                index === 0
                  ? "md:pr-10 md:border-r"
                  : index === items.length - 1
                    ? "md:pl-10"
                    : "md:px-10 md:border-r"
              }`}
            >
              <div className="flex items-start justify-between gap-6 mb-6">
                <p className="label">{item.label}</p>
                <span
                  className="arrow text-ink_3 group-hover:text-ink transition shrink-0"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3">{item.title}</h3>
              <p className="text-sm text-ink_3 leading-relaxed">{item.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
