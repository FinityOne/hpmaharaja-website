import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";

// interface ArticlePageProps {
//   params: { slug: string };
// }

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("src/content/articles"));

  return files.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}

function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options)
    .format(new Date(date))
    .toUpperCase();
  return formattedDate;
}

export default async function ArticlePage({ params }: any) {
  const { slug } = await params;
  // const { params } = await props; // Await the props to resolve

  // if (!params || !params.slug) {
  //   throw new Error("Slug parameter is missing!");

  const filePath = path.join("src/content/articles", `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Article file not found for slug: ${slug}`);
  }

  const markdownWithMeta = fs.readFileSync(filePath, "utf-8");
  const { data: frontmatter, content } = matter(markdownWithMeta);

  return (
    <main>
      {/* Header Section */}
      <header
        className="relative h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url('${frontmatter.image}')` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-75"></div>

        {/* Text Content */}
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            {frontmatter.title}
          </h1>
        </div>
      </header>

      {/* Article Content */}
      <section className="container mx-auto py-12 px-6">
        <p className="text-gray-600 text-sm mb-4">
          Published on {formatDate(frontmatter.date)}
        </p>
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href="/articles"
            className="text-blue-600 hover:underline font-medium"
          >
            ← Back to All Articles
          </Link>
        </div>
      </section>
    </main>
  );
}
