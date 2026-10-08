/**
 * Rameelo Garba Tour 2026 — across America, one garba community.
 *
 * 12 events across 6 cities, Aug 29 – Oct 17. There are 11 stops below
 * because the Austin date (Oct 16 & 17) is a two-night event.
 *
 * Ported from core/views.py. Dates are plain ISO `YYYY-MM-DD` strings and are
 * compared as strings, which keeps "has this played yet?" free of any
 * timezone drift between the build machine and the reader.
 */

export type TourStop = {
  starts: string;
  /** Last day of the stop; defaults to `starts` for single-night events. */
  ends?: string;
  dateLabel: string;
  artist: string;
  city: string;
  organizer: string;
  /** Number of ticketed events this stop represents (default 1). */
  events?: number;
};

export const RAMEELO_TOUR_2026: TourStop[] = [
  {
    starts: "2026-08-29",
    dateLabel: "Aug 29",
    artist: "Jigardan Gadhavi",
    city: "Los Angeles, CA",
    organizer: "VOI",
  },
  {
    starts: "2026-09-12",
    dateLabel: "Sep 12",
    artist: "Kirtidan Gadhvi",
    city: "Bensalem, PA",
    organizer: "ICAP USA",
  },
  {
    starts: "2026-09-13",
    dateLabel: "Sep 13",
    artist: "Aishwarya Majmudar",
    city: "Boston, MA",
    organizer: "VUF",
  },
  {
    starts: "2026-09-18",
    dateLabel: "Sep 18",
    artist: "Jigardan Gadhavi",
    city: "Boston, MA",
    organizer: "Nexstar",
  },
  {
    starts: "2026-09-19",
    dateLabel: "Sep 19",
    artist: "Geeta Rabari",
    city: "Bensalem, PA",
    organizer: "ICAP USA",
  },
  {
    starts: "2026-09-20",
    dateLabel: "Sep 20",
    artist: "Atul Purohit",
    city: "Greenville, SC",
    organizer: "Barn Entertainment",
  },
  {
    starts: "2026-09-25",
    dateLabel: "Sep 25",
    artist: "Jignesh Barot",
    city: "Boston, MA",
    organizer: "1 Culture Entertainment",
  },
  {
    starts: "2026-09-26",
    dateLabel: "Sep 26",
    artist: "Geeta Rabari",
    city: "Boston, MA",
    organizer: "Mahadev Entertainment",
  },
  {
    starts: "2026-10-02",
    dateLabel: "Oct 2",
    artist: "Kirtidan Gadhvi",
    city: "Orlando, FL",
    organizer: "Rameelo",
  },
  {
    starts: "2026-10-03",
    dateLabel: "Oct 3",
    artist: "Jigardan Gadhavi",
    city: "Bensalem, PA",
    organizer: "ICAP USA",
  },
  {
    starts: "2026-10-16",
    ends: "2026-10-17",
    dateLabel: "Oct 16 & 17",
    artist: "Bollywood Dandiya by DJ G2",
    city: "Austin, TX",
    organizer: "G2 Entertainment",
    events: 2,
  },
];

export type TourDate = TourStop & {
  position: number;
  ends: string;
  isPast: boolean;
};

export type TourMeta = {
  events: number;
  cities: number;
  window: string;
  remaining: number;
};

/** Today as `YYYY-MM-DD`. */
export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Annotate each tour stop with its position and whether it has happened. */
export function buildTourDates(today: string = todayISO()): TourDate[] {
  return RAMEELO_TOUR_2026.map((stop, index) => {
    const ends = stop.ends ?? stop.starts;
    return { ...stop, position: index + 1, ends, isPast: ends < today };
  });
}

export function buildTourMeta(tourDates: TourDate[]): TourMeta {
  return {
    events: RAMEELO_TOUR_2026.reduce((total, stop) => total + (stop.events ?? 1), 0),
    cities: new Set(RAMEELO_TOUR_2026.map((stop) => stop.city)).size,
    window: "Aug 29 – Oct 17, 2026",
    remaining: tourDates.filter((stop) => !stop.isPast).length,
  };
}
