from pathlib import Path
from typing import List, Dict, Any

import markdown
import yaml
from django.conf import settings
from django.http import Http404

ARTICLES_DIR = Path(settings.BASE_DIR) / "content" / "articles"


def _parse_frontmatter(raw: str) -> (Dict[str, Any], str):
    """
    Split a markdown string into (frontmatter_dict, body_markdown).
    Frontmatter is YAML between the first two '---' lines.
    """
    if raw.startswith("---"):
        parts = raw.split("---", 2)
        if len(parts) >= 3:
            _, fm_text, body = parts
            meta = yaml.safe_load(fm_text) or {}
            return meta, body.lstrip("\n")
    return {}, raw

def _markdown_to_html(md_text: str) -> str:
    return markdown.markdown(
        md_text,
        extensions=["fenced_code", "tables", "toc"],
    )

def _build_article_object(meta: Dict[str, Any], body_md: str, slug_from_file: str) -> Dict[str, Any]:
    slug = meta.get("slug") or slug_from_file

    body_html = _markdown_to_html(body_md)

    return {
        "slug": slug,
        "title": meta.get("title", slug.replace("-", " ").title()),
        "subtitle": meta.get("subtitle"),
        "summary": meta.get("summary"),
        "date": meta.get("date"),
        "category": meta.get("category", "Essay"),
        "reading_time": meta.get("reading_time", "5 min read"),
        "image": meta.get("image"),
        "is_featured": bool(meta.get("is_featured", False)),
        "is_breaking": bool(meta.get("is_breaking", False)),
        "body_html": body_html,
    }

def load_all_articles() -> List[Dict[str, Any]]:
    """Scan content/articles for .md files and return a list of article dicts."""
    articles: List[Dict[str, Any]] = []

    if not ARTICLES_DIR.exists():
        return articles

    for path in sorted(ARTICLES_DIR.glob("*.md")):
        raw = path.read_text(encoding="utf-8")
        meta, body_md = _parse_frontmatter(raw)
        article = _build_article_object(meta, body_md, slug_from_file=path.stem)
        articles.append(article)

    # Sort newest first if 'date' exists (string sort is fine for YYYY-MM-DD)
    articles.sort(key=lambda a: a.get("date") or "", reverse=True)
    return articles


def get_article_by_slug(slug: str) -> Dict[str, Any]:
    for article in load_all_articles():
        if article["slug"] == slug:
            return article
    raise Http404("Article not found")
