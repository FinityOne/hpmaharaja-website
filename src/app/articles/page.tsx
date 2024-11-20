import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";

interface Frontmatter {
  title: string;
  date: string;
  description: string;
  image: string;
}

interface Article {
  slug: string;
  frontmatter: Frontmatter;
}

async function getArticles(): Promise<Article[]> {
  const files = fs.readdirSync(path.join("src/content/articles"));

  const articles = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("src/content/articles", filename),
      "utf-8"
    );

    // Parse frontmatter using gray-matter
    const { data } = matter(markdownWithMeta);

    // Validate and type-cast the frontmatter
    const frontmatter = {
      title: data.title as string,
      date: data.date as string,
      description: data.description as string,
      image: data.image as string,
    };

    return { slug, frontmatter };
  });

  return articles;
}

function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options)
    .format(new Date(date))
    .toUpperCase(); // Convert to uppercase for the "FULL MONTH IN CAPS"
  return formattedDate;
}

export default async function Articles() {
  const articles = await getArticles();

  return (
    <main>
      {/* Header Section */}
      <header
        className="relative h-[20vh] md:h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/home/header-bg.jpg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-75"></div>

        {/* Text Content */}
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-3xl md:text-5xl font-bold">Maharaja Blog</h1>
        </div>
      </header>

      {/* Articles Section */}
      <section className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-6">Latest Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles
            .sort(
              (a, b) =>
                new Date(b.frontmatter.date).getTime() -
                new Date(a.frontmatter.date).getTime()
            )
            .map(({ slug, frontmatter }) => (
              <Link
                key={slug}
                href={`/articles/${slug}`}
                className="block bg-white shadow-md rounded overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div>
                  <Image
                    src={frontmatter.image}
                    width={1000} // Adjusted for better resolution
                    height={500} // Adjusted for better resolution
                    alt={frontmatter.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">
                      {frontmatter.title}
                    </h3>
                    <p className="text-gray-600 text-xs mb-4">
                      {formatDate(frontmatter.date)}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {frontmatter.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
