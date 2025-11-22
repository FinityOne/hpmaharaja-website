from django.shortcuts import render
from django.http import Http404
from django.conf import settings
from pathlib import Path
import markdown


from .articles_repo import load_all_articles, get_article_by_slug


def home(request):
    upcoming_events = [
        {
            "date": "Dec 11 – 15, 2024",
            "title": "Phoenix & Arizona Trip",
            "accent": "border-blue-500",
        },
        {
            "date": "February 2025",
            "title": "NYC Move (yes, HP has moved to NYC)",
            "accent": "border-sky-500",
        },
        {
            "date": "April 2025",
            "title": "Chadha + Plaha Take On NYC",
            "accent": "border-red-500",
        },
        {
            "date": "May 2025",
            "title": "Miami Rameelo + Maharaja Estates Trip",
            "accent": "border-yellow-500",
        },
        {
            "date": "September 2025",
            "title": "Rameelo (Orange County, CA)",
            "accent": "border-purple-500",
        },
    ]

    featured_articles = [
        {
            "title": "Hustle Mindset: Building Calm in Chaos",
            "slug": "hustle-mindset-calm-in-chaos",
            "category": "Motivation",
            "summary": "How to chase big visions without burning out your soul.",
            "reading_time": "7 min read",
        },
        {
            "title": "Faith, Politics, and Power: Why Values Matter",
            "slug": "faith-politics-power-values",
            "category": "Politics",
            "summary": "A personal take on building influence without losing integrity.",
            "reading_time": "6 min read",
        },
        {
            "title": "Maharaja Code: Rules I Live By",
            "slug": "maharaja-code-rules",
            "category": "Personal",
            "summary": "From Tempe to NYC, these are the principles that never changed.",
            "reading_time": "5 min read",
        },
    ]

    context = {
        "current_page": "home",
        "upcoming_events": upcoming_events,
        "featured_articles": featured_articles,
    }
    return render(request, "core/index.html", context)



CONTENT_DIR = Path(settings.BASE_DIR) / "content" / "articles"

def article_list(request):
    articles = load_all_articles()

    breaking_article = next((a for a in articles if a.get("is_breaking")), None)
    featured = [a for a in articles if a.get("is_featured")]
    others = [a for a in articles if not a.get("is_featured")]

    context = {
        "current_page": "articles",
        "breaking_article": breaking_article,
        "featured_articles": featured,
        "other_articles": others,
    }
    return render(request, "articles/articles-index.html", context)

def article_detail(request, slug):
    article = get_article_by_slug(slug)

    context = {
        "current_page": "articles",
        "article": article,
    }
    return render(request, "articles/detail.html", context)