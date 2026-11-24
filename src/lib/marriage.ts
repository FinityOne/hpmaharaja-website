/**
 * Content for /marriage — the interactive biodata.
 *
 * EDITING NOTE
 * ------------
 * Everything the page says lives in this file. The page and its components
 * render these lists and need no changes to add, remove or reword an entry.
 *
 * The source of truth is Heran's 2026 biodata
 * ("Heran Patel 1996 Biodata 2026.png"). Facts here — family names,
 * cho-gaam, citizenship, the 50K figure — came from that document. Do not
 * invent new facts about his family, career or history: ask Heran.
 *
 * Tone, by contrast, is deliberate. The reader is almost always a woman
 * reading on a phone, often with her parents reading over her shoulder
 * afterwards. Copy is written to be warm, specific and honest — and the
 * "not a fit" list is meant to genuinely filter, not to hedge.
 */

/* ---------------------------------------------------------------- identity */

/** ISO birth date. Age is derived from it so the page never goes stale. */
export const BIRTH_DATE = "1996-04-25";

export const BIRTH_TIME = "10:28 AM";

/**
 * Age in whole years at `on` (defaults to today). The page sets
 * `revalidate = 86400`, so the rendered number turns over within a day of
 * his birthday rather than being hard-coded and quietly going wrong.
 */
export function ageOn(on: Date = new Date()): number {
  const [year, month, day] = BIRTH_DATE.split("-").map(Number);
  let age = on.getFullYear() - year;
  const hadBirthday =
    on.getMonth() + 1 > month || (on.getMonth() + 1 === month && on.getDate() >= day);
  if (!hadBirthday) age -= 1;
  return age;
}

export const CONTACT = {
  phone: "(949) 903-9366",
  phoneHref: "tel:+19499039366",
  smsHref: "sms:+19499039366",
  email: "heran1008@gmail.com",
  instagram: "@heran.patel",
  instagramHref: "https://instagram.com/heran.patel",
} as const;

/* ------------------------------------------------------------------- hero */

/** Rotated under his name in the hero, one line at a time. */
export const HERO_LINES = [
  "Founder. Builder. Adventurer.",
  "Gujarati, grounded, and still curious.",
  "Looking for my Radha.",
  "Pure veg. Six feet. One phone call away.",
];

export const HERO_PHOTO = {
  src: "/images/marriage/portrait-garden.jpg",
  alt: "Heran Patel in a charcoal suit and pink tie, standing in a garden under a blue hydrangea arch at golden hour",
};

/* ------------------------------------------------------------ quick facts */

export type QuickFact = {
  label: string;
  value: string;
  /** Revealed when the card is tapped. Keep it to one warm sentence. */
  detail: string;
};

export const QUICK_FACTS: QuickFact[] = [
  {
    label: "Born",
    value: `April 25, 1996`,
    detail: `${BIRTH_TIME} in London, U.K. — my mum still tells the story better than I do.`,
  },
  {
    label: "Height",
    value: "6 ft",
    detail: "Tall enough that heels are never a problem. Wear them.",
  },
  {
    label: "Based in",
    value: "Phoenix, AZ",
    detail: "Sunshine, space, and a thirty-minute drive to a trailhead. I'd show you around.",
  },
  {
    label: "Diet",
    value: "Pure veg",
    detail: "Vegetarian, no eggs — always have been. A veg kitchen is home to me, not a rule.",
  },
  {
    label: "Status",
    value: "British citizen",
    detail: "British citizen (U.K.) with a U.S. Green Card. Paperwork is sorted, both sides.",
  },
  {
    label: "Community",
    value: "Gujarati · Patel",
    detail: "Raised in it, still living it — not just at weddings and Navratri.",
  },
];

/* ------------------------------------------------------------------ about */

export const ABOUT_GREETING = "Jai Shree Krishna.";

/**
 * Rendered as a letter rather than a bio block. Each string is a paragraph.
 */
export const ABOUT_LETTER = [
  "I'm a modern, ambitious, culturally grounded Gujarati who believes in living with purpose. I love building meaningful things, bringing people together, exploring new places, and making memories with family and friends.",
  "Whether it's a spontaneous adventure or a cozy night in with good food, I think life's best moments are the shared ones. I've built a life I'm proud of — now I'd like someone to build the rest of it with.",
  "I'm not looking for a résumé match. I'm looking for my best friend.",
];

export const ABOUT_SIGNOFF = "— Heran";

/* ---------------------------------------------------------------- gallery */

export type Shot = {
  src: string;
  alt: string;
  caption: string;
  /** Small mono tag printed over the photo. */
  tag: string;
};

export const GALLERY: Shot[] = [
  {
    src: "/images/marriage/golf-casual.jpg",
    alt: "Heran Patel in a white shirt on a sunlit golf course lined with palm trees",
    caption: "Off the clock. Arizona mornings are undefeated.",
    tag: "Weekend",
  },
  {
    src: "/images/marriage/stage-conference.jpg",
    alt: "Heran Patel in a blue suit holding a microphone on a conference stage",
    caption: "On stage talking about building things. Still get nervous. Still go up.",
    tag: "Work",
  },
  {
    src: "/images/marriage/garba-arena.jpg",
    alt: "Heran Patel in a navy kurta and printed jacket on stage at a packed Garba night at UC Irvine, arms open to the crowd",
    caption: "A full arena at Navratri. This is the night I work all year for.",
    tag: "Navratri",
  },
  {
    src: "/images/marriage/pier-sunset.jpg",
    alt: "Heran Patel in a magenta kurta and printed scarf on a beach at sunset with a pier behind him",
    caption: "Sunset, kurta, no agenda. I take the quiet seriously too.",
    tag: "Stillness",
  },
  {
    src: "/images/marriage/city-street.jpg",
    alt: "Heran Patel in sunglasses and a white knit polo on a sunlit street in downtown New York",
    caption: "New city, no itinerary. My favorite kind of weekend.",
    tag: "Wandering",
  },
  {
    src: "/images/marriage/stage-garba.jpg",
    alt: "Heran Patel in a pink kurta and black jacket singing into a microphone on a colorful festival stage",
    caption: "Hosting. If you've been to a Rameelo night, you've heard this voice.",
    tag: "On the mic",
  },
  {
    src: "/images/marriage/arena-smile.jpg",
    alt: "Heran Patel smiling in a navy blazer and jeans at a packed arena concert",
    caption: "Somewhere in a crowd of thousands, grinning like it's the first one.",
    tag: "Live",
  },
];

/* ----------------------------------------------------------------- career */

export type Credential = {
  /** Rendered as a counting number when numeric. */
  figure: string;
  unit?: string;
  title: string;
  detail: string;
};

export const CREDENTIALS: Credential[] = [
  {
    figure: "50000",
    unit: "+",
    title: "People brought together",
    detail:
      "Across Garba and Raas nights in the USA through Rameelo, the ticketing platform I founded and run. Nine nights a year, a few thousand people at a time.",
  },
  {
    figure: "2",
    title: "Companies I run",
    detail:
      "Founder & CEO of Rameelo, and a real estate portfolio in Arizona that I built and manage myself.",
  },
  {
    figure: "1",
    title: "Day job I actually like",
    detail:
      "Director of Product Engineering at a fintech firm. I ship software for a living and I'm good at it.",
  },
];

export const EDUCATION = {
  degree: "B.S. Computer Science & Electrical Engineering",
  school: "University of California, Irvine",
};

export const SIDE_NOTE =
  "Part-time YouTuber and motivational creator, too — I write and speak about ambition, faith, and keeping your head straight while you chase things.";

/* ----------------------------------------------------------------- roots */

export type Stop = { place: string; period: string; note: string };

export const JOURNEY: Stop[] = [
  {
    place: "London, U.K.",
    period: "Born",
    note: "Where it started, and where half my accent went missing.",
  },
  {
    place: "Orange County, California",
    period: "Grew up",
    note: "Suburbs, a tight Gujarati community, and UC Irvine down the road.",
  },
  {
    place: "Phoenix, Arizona",
    period: "Now",
    note: "Built a life here on purpose. Happy to build the next one wherever it makes sense.",
  },
];

export type Relative = { role: string; name: string; note: string };

export const FAMILY: Relative[] = [
  {
    role: "Father",
    name: "Kamlesh Chimanbhai Patel",
    note: "Cho-gaam: Nadiad, Gujarat",
  },
  {
    role: "Mother",
    name: "Meena Shashikant Patel",
    note: "Cho-gaam: Karamsad, Gujarat",
  },
  {
    role: "Brother",
    name: "Arjun Patel",
    note: "Younger, and the funnier one",
  },
];

export const FAMILY_NOTE =
  "We're close. Sunday calls, loud dinners, everybody in everybody's business in the best way. You wouldn't be marrying into a quiet family — you'd be marrying into a warm one.";

/* --------------------------------------------------------------- hobbies */

export type Hobby = { name: string; icon: string; line: string };

export const HOBBIES: Hobby[] = [
  {
    name: "Fitness",
    icon: "dumbbell",
    line: "Gym most mornings. The ask isn't that you join me — it's a walk together after dinner.",
  },
  {
    name: "Travel",
    icon: "plane",
    line: "Passport stays ready. There's a list of places I've been saving to see with someone.",
  },
  {
    name: "Garba",
    icon: "sparkle",
    line: "Nine nights a year I live for. If you know your three-taali, we're going to be fine.",
  },
  {
    name: "Food",
    icon: "bowl",
    line: "Gujarati, pure veg, no eggs. Undhiyu in winter, khichdi after a long day.",
  },
  {
    name: "Outdoors",
    icon: "mountain",
    line: "Arizona sunrises from a trailhead, before the heat wakes up.",
  },
  {
    name: "Building",
    icon: "tools",
    line: "Real estate and construction. I like making things I can put my hand on.",
  },
];

/* ----------------------------------------------- compatibility calculator */

export const MATCH_INTRO =
  "Nine questions about you. The bar moves as you answer. Nothing is sent anywhere — this runs on your phone and vanishes when you close the tab.";

export type MatchOption = {
  label: string;
  /**
   * 0–100, how well this answer lines up with what Heran is actually looking
   * for. These are his weights, stated honestly rather than flattering every
   * answer: a 40 means "we'd have to talk about it", not "wrong".
   */
  score: number;
  /**
   * A hard line for him. Picking one doesn't lower the score so much as
   * change the verdict — the calculator says so plainly instead of quietly
   * averaging it away.
   */
  dealbreaker?: boolean;
};

export type MatchQuestion = {
  id: string;
  /** Short mono tag above the question. */
  topic: string;
  prompt: string;
  options: MatchOption[];
};

/**
 * Written as questions about *her*, not ratings of him, so every tap is an
 * honest answer. Order matters: the two hard ones come first, because if
 * they are dealbreakers she should find out in fifteen seconds.
 */
export const MATCH_QUESTIONS: MatchQuestion[] = [
  {
    id: "diet",
    topic: "The kitchen",
    prompt: "What does food look like in your home?",
    options: [
      { label: "I'm vegetarian myself", score: 100 },
      { label: "Not veg, but happy to keep a veg home", score: 85 },
      { label: "I eat meat but could keep it out of the house", score: 55 },
      { label: "I'd want meat cooked at home", score: 0, dealbreaker: true },
    ],
  },
  {
    id: "kids",
    topic: "Family of our own",
    prompt: "How do you feel about children?",
    options: [
      { label: "Yes — and fairly soon after marriage", score: 100 },
      { label: "Yes, in a few years", score: 70 },
      { label: "Probably, I'd want to see how we are first", score: 50 },
      { label: "I don't want children", score: 0, dealbreaker: true },
    ],
  },
  {
    id: "family",
    topic: "Parents",
    prompt: "How close do you want to be to both sets of parents?",
    options: [
      { label: "Very — family is the center of it all", score: 100 },
      { label: "Close, with our own space too", score: 85 },
      { label: "Warm but independent", score: 55 },
      { label: "I'd want real distance from them", score: 15, dealbreaker: true },
    ],
  },
  {
    id: "faith",
    topic: "Faith",
    prompt: "Where does spirituality sit in your life?",
    options: [
      { label: "It's part of my everyday", score: 100 },
      { label: "Important to me, quietly", score: 90 },
      { label: "Cultural more than spiritual", score: 65 },
      { label: "Not something I practice", score: 35 },
    ],
  },
  {
    id: "place",
    topic: "The map",
    prompt: "Where could you see us living?",
    options: [
      { label: "Phoenix works for me", score: 100 },
      { label: "I'd relocate for the right person", score: 90 },
      { label: "Somewhere in the middle — let's talk", score: 65 },
      { label: "He'd have to move to me, full stop", score: 30 },
    ],
  },
  {
    id: "ambition",
    topic: "The work",
    prompt: "How do you feel about an ambitious partner?",
    options: [
      { label: "Love it — I'm building something too", score: 100 },
      { label: "Great, as long as he comes home", score: 90 },
      { label: "I'd worry about being second to the work", score: 55 },
      { label: "I want a predictable nine-to-five husband", score: 30 },
    ],
  },
  {
    id: "conflict",
    topic: "Hard conversations",
    prompt: "When something's wrong between you two, what do you do?",
    options: [
      { label: "Say it that day, kindly", score: 100 },
      { label: "Take a night, then talk properly", score: 90 },
      { label: "Wait for him to notice and ask", score: 45 },
      { label: "Let it go and move on", score: 30 },
    ],
  },
  {
    id: "garba",
    topic: "Navratri",
    prompt: "It's the ninth night of Garba and he's running the event. You're…",
    options: [
      { label: "On the floor, three-taali, front row", score: 100 },
      { label: "Backstage helping him pull it off", score: 95 },
      { label: "There for an hour, then home happy", score: 75 },
      { label: "Honestly, not my scene at all", score: 40 },
    ],
  },
  {
    id: "weekend",
    topic: "A free Saturday",
    prompt: "Best version of a Saturday with no plans?",
    options: [
      { label: "Dinner with both families", score: 100 },
      { label: "Trail at sunrise, then nothing", score: 95 },
      { label: "Home, good food, a long film", score: 90 },
      { label: "Out with a big crowd until late", score: 60 },
    ],
  },
];

/** Verdict by compatibility percentage. Highest `min` at or below wins. */
export const MATCH_VERDICTS = [
  {
    min: 0,
    headline: "Let's find out",
    line: "Answer a few and watch it move.",
  },
  {
    min: 40,
    headline: "Probably not us",
    line: "There's real distance here — and knowing that now is worth something. No hard feelings at all.",
  },
  {
    min: 60,
    headline: "Worth a conversation",
    line: "Some genuine overlap and a few gaps. I'd rather talk through the gaps than guess at them.",
  },
  {
    min: 75,
    headline: "This is promising",
    line: "We line up on most of what I'd struggle to compromise on. I'd take this call gladly.",
  },
  {
    min: 87,
    headline: "Strong match",
    line: "This is close to exactly what I've been hoping to read. Please call me.",
  },
  {
    min: 96,
    headline: "Okay, wow",
    line: "I didn't really expect a score like this. Don't overthink it — scroll down and call.",
  },
];

/**
 * Shown instead of the usual verdict when she picks something that is a hard
 * line for him. Kindness is the point: the page should not pretend.
 */
export const MATCH_DEALBREAKER = {
  headline: "Here's where we'd part ways",
  line: "One of your answers is a hard line for me, and I'd rather say so now than six months in. I genuinely hope you find exactly what you're looking for — it just isn't going to be me.",
};

/* ------------------------------------------------------------ the filter */

export const LOOKING_FOR_LEAD =
  "I'm looking for the Radha to my Krishna — kind, vegetarian, family-oriented, and honest. Someone who values communication and spiritual growth, who's supportive and down to earth, and who's genuinely excited to start a family soon after marriage.";

export const GREEN_FLAGS = [
  "I'm home for dinner. Ambition has a shut-off valve and I know where mine is.",
  "You'll never have to guess where you stand with me. I say things plainly.",
  "My family will treat you like a daughter, not a guest.",
  "I take the stressful stuff — the paperwork, the logistics, the hard phone calls.",
  "I'll still be planning adventures for us at forty.",
  "Faith is a practice in my house, not a performance for other people.",
];

export const NOT_A_FIT = [
  "You'd want meat cooked at home. I'm pure veg, no eggs, and that part isn't changing.",
  "You don't want children, or you'd want to wait many years.",
  "You need a husband with a nine-to-five calendar. Some seasons of my year are loud.",
  "Navratri season is off-limits to you. September and October are sacred to me.",
  "You'd want me at a distance from my parents and brother.",
  "Phoenix — or meeting somewhere in the middle — is completely off the table.",
];

export const FILTER_NOTE =
  "None of that is a test. If one of them is a dealbreaker for you, that's genuinely good news for both of us — found out in two minutes instead of six months.";

/* --------------------------------------------------------------- promises */

export const PROMISES = [
  { title: "A partner, not a project", line: "You won't be managing me, and I won't be managing you." },
  { title: "Your work matters too", line: "Whatever you're building, it gets the same room mine does." },
  { title: "Open books", line: "Money, plans, worries — all on the table from early on." },
  { title: "Your people become mine", line: "I'll learn your family's names, stories and birthdays like my own." },
  { title: "I protect your peace", line: "The noise of my work stays my job to carry, not yours." },
  { title: "I keep choosing you", line: "The wedding is the start of the effort, not the end of it." },
];

/* --------------------------------------------------------------- timeline */

export type Phase = { label: string; window: string; note: string };

export const TIMELINE: Phase[] = [
  {
    label: "Get to know each other",
    window: "1–3 months",
    note: "Calls, visits, meeting the people who matter. No pressure, no performance.",
  },
  {
    label: "Engagement, if it feels right",
    window: "3–6 months",
    note: "Only if we both know. I'd never push someone into a yes.",
  },
  {
    label: "Marriage",
    window: "6–12 months",
    note: "Big, loud, Gujarati, and exactly as much of it as you want.",
  },
  {
    label: "Family",
    window: "When it feels right",
    note: "Ideally within a year or so of the wedding — but together, not on a schedule.",
  },
];

export const TIMELINE_NOTE =
  "That's my honest pace, not a contract. If yours is different, say so — I'd rather hear it than guess.";

/* --------------------------------------------------------------- approach */

export const APPROACH = [
  {
    step: "01",
    title: "Let's start with a phone call",
    line: "Not texting for three weeks. A real conversation — the best stories start there.",
  },
  {
    step: "02",
    title: "Then let's meet in person",
    line: "Coffee, dinner, or a small adventure. Distance isn't a dealbreaker — I'll make the trip.",
  },
];

export const FAMILIES_WELCOME =
  "Parents and family are welcome to reach out directly. I'd be glad to speak with them.";

/* ------------------------------------------------------- the welcome gate */

/**
 * Query parameters that carry her name, so Heran can send a personalized
 * link: /marriage?for=Priya. Both spellings work; `for` is the one to share.
 */
export const GUEST_PARAMS = ["for", "name"] as const;

/**
 * Cleans a name out of the URL before it is ever rendered.
 *
 * The value is attacker-controlled in the sense that anyone can edit the link
 * before forwarding it, so this is deliberately strict: letters (including
 * accented ones), spaces, hyphens and apostrophes, nothing else, capped at a
 * length a real first name fits in. React escapes markup on its own — the
 * risk being handled here is a shared link rewritten to put ugly text in
 * Heran's mouth, not script injection.
 *
 * Returns "" when nothing usable survives, which the page treats as "no name
 * given" and falls back to the ordinary, ungreeted version.
 */
export function sanitizeGuestName(raw: string | null | undefined): string {
  if (!raw) return "";

  const cleaned = raw
    /* \p{M} keeps combining marks, without which Devanagari and Gujarati
       names lose their matras — "प्रिया" would arrive as "परय". */
    .replace(/[^\p{L}\p{M}\s'’-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    /* At most two words. A first name, or a first and last — never a
       sentence someone has smuggled into a forwarded link. */
    .split(" ")
    .slice(0, 2)
    .join(" ")
    .slice(0, 24)
    .trim();

  if (cleaned.replace(/[^\p{L}]/gu, "").length < 2) return "";

  /* Title-case it, so "priya" and "PRIYA" both read as a name rather than
     as a database row. Hyphenated and apostrophed names keep their shape. */
  return cleaned
    .split(" ")
    .map((word) =>
      word
        .split(/([-'’])/)
        .map((part) =>
          /[-'’]/.test(part)
            ? part
            : part.charAt(0).toLocaleUpperCase() + part.slice(1).toLocaleLowerCase(),
        )
        .join(""),
    )
    .join(" ");
}

/** The small line above the greeting. */
export const GATE_EYEBROW = "A private introduction";

/**
 * Rotated one at a time on the gate. The first half are gracious about her
 * — about her time and her curiosity, never her looks, because he hasn't met
 * her and a compliment about a face he hasn't seen is worth nothing. The
 * rest are about what the two of them could actually be, which is the thing
 * worth enticing her with.
 */
export const GATE_LINES = [
  "Whoever thought of introducing us has good taste.",
  "You didn't have to open this. Thank you for being curious.",
  "Somewhere past this page is a Sunday morning, two cups of chai, and nowhere to be.",
  "A house that's loud at Diwali and completely quiet on a Tuesday night.",
  "Someone in your corner at every family wedding for the next fifty years.",
  "A man who answers the phone, and who comes home for dinner.",
  "Nine nights of Garba every year, and someone to find you in the crowd.",
  "Most of these pages are a list of facts. This one is an actual person.",
];

export const GATE_ENTER = "Come in";
export const GATE_SKIP = "Skip to the compatibility calculator";

/** Shown in place of her name when the link carries no name at all. */
export const GATE_FALLBACK_GREETING = "Hello there.";
