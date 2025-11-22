import fs from "fs";
import path from "path";

interface Article {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  image: string; // Added for image URL
}

async function getArticles(): Promise<Article[]> {
  const files = fs.readdirSync(path.join("src/content/articles"));

  const articles = files.map((filename) => {
    const slug = filename.replace(".html", "");
    const filepath = path.join("src/content/articles", filename);
    const content = fs.readFileSync(filepath, "utf-8");

    // Extract metadata from the beginning of the HTML file using comments
    const metadataMatch = content.match(/<!--\s*([\s\S]*?)\s*-->/);
    const metadata = metadataMatch ? JSON.parse(metadataMatch[1]) : {};

    return {
      slug,
      title: metadata.title || "Untitled",
      date: metadata.date || "Unknown",
      description: metadata.description || "",
      image: metadata.image || "/default-image.jpg", // Default image fallback
      content: content.replace(/<!--[\s\S]*?-->/, ""), // Remove metadata comment
    };
  });

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
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
        <div className="absolute inset-0 bg-black bg-opacity-75"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-3xl md:text-5xl font-bold">Maharaja Blog</h1>
        </div>
      </header>

      {/* Articles Section */}
      <section className="container mx-auto py-12 px-2">
        <h2 className="text-3xl text-black font-bold mb-6">Latest Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(({ slug, title, date, description, image }) => (
            <a
              key={slug}
              href={`/articles/${slug}`}
              className="block bg-white shadow-md rounded overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              {/* Image */}
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Content */}
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-black">{title}</h3>
                <p className="text-gray-600 text-xs mb-4">{date}</p>
                <p className="text-gray-600 text-sm">{description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
