import Link from "next/link";

/**
 * Shared shell for the Terms and Privacy pages, styled with the same paper/ink
 * tokens and `prose` treatment the article bodies use.
 */
export default function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-paper text-ink pt-28 lg:pt-36 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="mb-6 text-[0.7rem] uppercase tracking-[0.2em] text-slate-500 flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-ink transition">
            ← Home
          </Link>
          <span className="h-px w-6 bg-slate-300"></span>
          <span>{eyebrow}</span>
        </div>

        <header className="border-b border-line pb-6 mb-8">
          <h1 className="display text-[clamp(1.9rem,5vw,3rem)] mb-4">{title}</h1>
          <p className="label">Last updated · {updated}</p>
          <p className="mt-5 text-base text-ink_2 leading-relaxed">{intro}</p>
        </header>

        <div className="article-body prose prose-slate prose-sm md:prose-base max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-ink prose-h2:text-xl prose-h2:mt-10 prose-p:text-ink_2 prose-li:text-ink_2 prose-strong:text-ink prose-a:text-maharaja_gold prose-a:no-underline hover:prose-a:underline prose-a:break-words">
          {children}
        </div>
      </div>
    </div>
  );
}
