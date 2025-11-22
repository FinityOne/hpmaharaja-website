import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  const directory = path.join("src/content/articles");
  const files = fs.readdirSync(directory);

  const params = files.map((file) => ({
    slug: file.replace(".html", ""),
  }));

  return params;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Destructure slug directly from params
  const { slug } = await params;

  if (!slug) {
    throw new Error("Slug parameter is missing!");
  }

  // Construct the file path for the article
  const filePath = path.join("src/content/articles", `${slug}.html`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Article file not found for slug: ${slug}`);
  }

  // Read the HTML file content
  const htmlWithMeta = fs.readFileSync(filePath, "utf-8");

  // Extract metadata from the HTML comments
  const metadataMatch = htmlWithMeta.match(/<!--\s*([\s\S]*?)\s*-->/);
  const metadata = metadataMatch ? JSON.parse(metadataMatch[1]) : {};
  const content = htmlWithMeta.replace(/<!--[\s\S]*?-->/, ""); // Remove metadata from content

  return (
    <main>
      {/* Header Section */}
      <header
        className="relative h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage: `url('${metadata.image || "/default-image.jpg"}')`,
        }}
      ></header>

      {/* Article Content */}
      <section className="container mx-auto max-w-screen-lg py-12 px-6">
        {metadata.date && (
          <p className="text-gray-600 text-sm mb-4">
            Published on {new Date(metadata.date).toLocaleDateString()}
          </p>
        )}

        <h1 className="text-4xl font-bold mb-2 py-2 text-black">
          {metadata.title || "Untitled"}
        </h1>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>

        {/* Back Link */}
        <div className="mt-8">
          <a
            href="/articles"
            className="text-blue-600 hover:underline font-medium"
          >
            ← Back to All Articles
          </a>
        </div>
      </section>
    </main>
  );
}
