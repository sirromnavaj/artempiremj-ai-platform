// The Global Art Calendar data model.
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

// The live dataset: 58 real, sourced opportunities across the four regions
// (research-gathered; the DISCOVER radar re-verifies before public listing).
// See opportunities-seed.ts and the calendar-data-sources runbook for provenance.
import { SEED } from './opportunities-seed';
export const OPPORTUNITIES: Opportunity[] = SEED;

export function byRegion(region: Region): Opportunity[] {
  return OPPORTUNITIES.filter((o) => o.region === region);
}

/** JSON-LD Event for an opportunity. Only emits dates when verified. */
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
