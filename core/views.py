from django.shortcuts import render
from django.http import Http404
from django.conf import settings
from django.utils import timezone
from datetime import date
from pathlib import Path
import markdown


from .articles_repo import load_all_articles, get_article_by_slug


# Public links surfaced in the recruiter-facing section of the home page.
# Both are optional: the matching buttons are only rendered when set.
# TODO: point RESUME_URL at the hosted resume and fill in LINKEDIN_URL.
RESUME_URL = ""
LINKEDIN_URL = ""


# Rameelo Garba Tour 2026 — across America, one garba community.
# 11 events across 5 cities, Aug 29 – Oct 17. There are 10 stops below
# because the Austin date (Oct 16 & 17) is a two-night event.
RAMEELO_TOUR_2026 = [
    {
        "starts": date(2026, 8, 29),
        "date_label": "Aug 29",
        "artist": "Jigardan Gadhavi",
        "city": "Los Angeles, CA",
        "organizer": "VOI",
    },
    {
        "starts": date(2026, 9, 12),
        "date_label": "Sep 12",
        "artist": "Kirtidan Gadhvi",
        "city": "Bensalem, PA",
        "organizer": "ICAP USA",
    },
    {
        "starts": date(2026, 9, 13),
        "date_label": "Sep 13",
        "artist": "Aishwarya Majmudar",
        "city": "Boston, MA",
        "organizer": "VUF",
    },
    {
        "starts": date(2026, 9, 18),
        "date_label": "Sep 18",
        "artist": "Jigardan Gadhavi",
        "city": "Boston, MA",
        "organizer": "Nexstar",
    },
    {
        "starts": date(2026, 9, 19),
        "date_label": "Sep 19",
        "artist": "Geeta Rabari",
        "city": "Bensalem, PA",
        "organizer": "ICAP USA",
    },
    {
        "starts": date(2026, 9, 20),
        "date_label": "Sep 20",
        "artist": "Atul Purohit",
        "city": "Greenville, SC",
        "organizer": "Barn Entertainment",
    },
    {
        "starts": date(2026, 9, 25),
        "date_label": "Sep 25",
        "artist": "Jignesh Barot",
        "city": "Boston, MA",
        "organizer": "1 Culture Entertainment",
    },
    {
        "starts": date(2026, 9, 26),
        "date_label": "Sep 26",
        "artist": "Geeta Rabari",
        "city": "Boston, MA",
        "organizer": "Mahadev Entertainment",
    },
    {
        "starts": date(2026, 10, 3),
        "date_label": "Oct 3",
        "artist": "Jigardan Gadhavi",
        "city": "Bensalem, PA",
        "organizer": "ICAP USA",
    },
    {
        "starts": date(2026, 10, 16),
        "ends": date(2026, 10, 17),
        "date_label": "Oct 16 & 17",
        "artist": "Bollywood Dandiya by DJ G2",
        "city": "Austin, TX",
        "organizer": "G2 Entertainment",
        "events": 2,
    },
]


def build_tour_dates(today):
    """Annotate each tour stop with its position and whether it has happened."""
    rows = []
    for position, stop in enumerate(RAMEELO_TOUR_2026, start=1):
        ends = stop.get("ends", stop["starts"])
        rows.append({**stop, "position": position, "ends": ends, "is_past": ends < today})
    return rows


def home(request):
    today = timezone.localdate()
    tour_dates = build_tour_dates(today)

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
        "tour_dates": tour_dates,
        "tour_meta": {
            "events": sum(stop.get("events", 1) for stop in RAMEELO_TOUR_2026),
            "cities": len({stop["city"] for stop in RAMEELO_TOUR_2026}),
            "window": "Aug 29 – Oct 17, 2026",
            "remaining": sum(1 for stop in tour_dates if not stop["is_past"]),
        },
        "featured_articles": featured_articles,
        "resume_url": RESUME_URL,
        "linkedin_url": LINKEDIN_URL,
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