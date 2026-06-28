// The Global Art Calendar — the front door and the AEO engine (skill v3.17 #13/#14).
// DISCOVER is the opportunity radar: open calls, fairs, residencies, grants, the doors.
// It serves artists (access). The payers are the opportunity-givers, never the artists.
//
// HONESTY RULE (brand-voice: "if you're not sure it's true, verify it, then state it"):
// entries here carry `verified`. Only verified entries assert specific dates. The live
// calendar is populated by the DISCOVER radar process (four-week geographic rotation):
//   Week 1 Americas · Week 2 Europe · Week 3 Africa · Week 4 Asia/Middle East/Global.

export type Region = 'Americas' | 'Europe' | 'Africa' | 'Asia/Middle East';
export type Kind = 'open-call' | 'residency' | 'grant' | 'fair' | 'biennial' | 'prize';

export interface Opportunity {
  id: string;
  title: string;
  kind: Kind;
  organizer: string;
  city: string;
  country: string;
  region: Region;
  /** ISO date the call/event opens or starts. Set only when verified. */
  start?: string;
  /** ISO deadline (open calls/grants) or end date (fairs/biennials). Verified only. */
  deadline?: string;
  /** When dates are not yet verified, a plain-language window instead of a fake date. */
  window?: string;
  url: string;
  summary: string;
  verified: boolean;
}

export const REGION_ROTATION: Record<number, Region> = {
  1: 'Americas',
  2: 'Europe',
  3: 'Africa',
  4: 'Asia/Middle East',
};

// Seed set: real institutions and their real cities (facts). Specific 2026 dates are
// left to the DISCOVER radar to verify, so nothing here asserts a date we cannot stand
// behind. These render as the structure; the radar fills verified entries.
export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'rawmaterial-dakar-residency',
    title: 'RAW Académie residency',
    kind: 'residency',
    organizer: 'RAW Material Company',
    city: 'Dakar', country: 'Senegal', region: 'Africa',
    window: 'Annual session, applications open ahead of each cohort',
    url: 'https://www.rawmaterialcompany.org/',
    summary: 'A residency and study programme in Dakar for artists and curators working across the continent and its diaspora.',
    verified: false,
  },
  {
    id: 'norval-sovereign-prize',
    title: 'Sovereign African Art Prize',
    kind: 'prize',
    organizer: 'Norval Foundation',
    city: 'Cape Town', country: 'South Africa', region: 'Africa',
    window: 'Annual call',
    url: 'https://www.norvalfoundation.org/',
    summary: 'A continental prize recognising painting and works on paper by African artists.',
    verified: false,
  },
  {
    id: 'delfina-london-residency',
    title: 'Delfina Foundation residency',
    kind: 'residency',
    organizer: 'Delfina Foundation',
    city: 'London', country: 'United Kingdom', region: 'Europe',
    window: 'Rolling thematic seasons',
    url: 'https://www.delfinafoundation.com/',
    summary: 'A London residency built around themed seasons, hosting artists, curators and writers from everywhere.',
    verified: false,
  },
  {
    id: 'skowhegan-residency',
    title: 'Skowhegan summer residency',
    kind: 'residency',
    organizer: 'Skowhegan School of Painting & Sculpture',
    city: 'Madison, Maine', country: 'United States', region: 'Americas',
    window: 'Annual, applications in the new year',
    url: 'https://www.skowheganart.org/',
    summary: 'A long-running summer residency that brings together emerging artists from around the world.',
    verified: false,
  },
  {
    id: 'sharjah-biennial',
    title: 'Sharjah Biennial',
    kind: 'biennial',
    organizer: 'Sharjah Art Foundation',
    city: 'Sharjah', country: 'United Arab Emirates', region: 'Asia/Middle East',
    window: 'Biennial cycle',
    url: 'https://www.sharjahart.org/',
    summary: 'One of the most significant biennials in the region, with open research and production strands.',
    verified: false,
  },
  {
    id: 'lagos-biennial',
    title: 'Lagos Biennial',
    kind: 'biennial',
    organizer: 'Akete Art Foundation',
    city: 'Lagos', country: 'Nigeria', region: 'Africa',
    window: 'Biennial cycle, open call ahead of each edition',
    url: 'https://www.lagosbiennial.org/',
    summary: 'A West African biennial with an open call for artists and collectives working on its edition theme.',
    verified: false,
  },
];

export function byRegion(region: Region): Opportunity[] {
  return OPPORTUNITIES.filter((o) => o.region === region);
}

/** JSON-LD Event for an opportunity, for AEO. Only emits dates when verified. */
export function eventSchema(o: Opportunity) {
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: o.title,
    description: o.summary,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: o.organizer,
      address: { '@type': 'PostalAddress', addressLocality: o.city, addressCountry: o.country },
    },
    organizer: { '@type': 'Organization', name: o.organizer, url: o.url },
    url: o.url,
  };
  if (o.verified && o.start) node.startDate = o.start;
  if (o.verified && o.deadline) node.endDate = o.deadline;
  return node;
}
