/**
 * Site-level values ported from core/views.py.
 */

// Public links surfaced in the recruiter-facing section of the home page.
// Both are optional: the matching buttons are only rendered when set.
// TODO: point RESUME_URL at the hosted resume and fill in LINKEDIN_URL.
export const RESUME_URL = "";
export const LINKEDIN_URL = "";

/**
 * How many essays the home page journal teaser shows.
 *
 * The teaser used to be a hand-written list of titles that did not exist, each
 * row linking to the archive index; it now renders the newest real articles so
 * every row links to the essay it names.
 */
export const HOME_ARTICLE_COUNT = 3;
