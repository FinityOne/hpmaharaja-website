from django.shortcuts import render


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

from django.http import Http404

# Simple in-memory "database" for now
ARTICLES = [
    {
        "slug": "hustle-mindset-balance-in-chaos",
        "title": "Pursuing Balance in Chaos",
        "subtitle": "How the #HustleMindset can be ruthless without burning you out.",
        "summary": "A deep dive into building a life where ambition and inner peace are not enemies, but co-architects.",
        "date": "Nov 10, 2024",
        "category": "Mindset",
        "reading_time": "8 min read",
        "image": "images/articles/hustle-balance.jpg",
        "is_featured": True,
        "is_breaking": True,
    },
    {
        "slug": "faith-politics-and-power",
        "title": "Faith, Politics, and Power",
        "subtitle": "Bringing conviction to the public square without losing your soul.",
        "summary": "What happens when faith, values, and political reality collide in the life of a first-generation kid?",
        "date": "Oct 28, 2024",
        "category": "Culture & Politics",
        "reading_time": "10 min read",
        "image": "images/articles/faith-politics.jpg",
        "is_featured": True,
        "is_breaking": False,
    },
    {
        "slug": "maharaja-code-rules-i-live-by",
        "title": "The Maharaja Code",
        "subtitle": "Rules for building an empire without losing your humanity.",
        "summary": "From Tempe to NYC, the principles that quietly guided every major decision I’ve made.",
        "date": "Oct 15, 2024",
        "category": "Personal",
        "reading_time": "7 min read",
        "image": "images/articles/maharaja-code.jpg",
        "is_featured": False,
        "is_breaking": False,
    },
    {
        "slug": "building-in-public-with-purpose",
        "title": "Building in Public with Purpose",
        "subtitle": "Why sharing the journey matters more than ever.",
        "summary": "How transparency, vulnerability, and storytelling can turn a personal brand into a community movement.",
        "date": "Sep 30, 2024",
        "category": "Strategy",
        "reading_time": "6 min read",
        "image": "images/articles/building-in-public.jpg",
        "is_featured": False,
        "is_breaking": False,
    },
]


def get_article_or_404(slug):
    for article in ARTICLES:
        if article["slug"] == slug:
            return article
    raise Http404("Article not found")

def article_list(request):
    # find breaking + featured
    breaking_article = next((a for a in ARTICLES if a.get("is_breaking")), None)
    featured = [a for a in ARTICLES if a.get("is_featured")]
    others = [a for a in ARTICLES if not a.get("is_featured")]

    context = {
        "current_page": "articles",
        "breaking_article": breaking_article,
        "featured_articles": featured,
        "other_articles": others,
    }
    return render(request, "articles/articles-index.html", context)


def article_detail(request, slug):
    article = get_article_or_404(slug)
    context = {
        "current_page": "articles",
        "article": article,
    }
    return render(request, "articles/detail.html", context)
