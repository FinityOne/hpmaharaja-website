export interface Article {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
  };
}
