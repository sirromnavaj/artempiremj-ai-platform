// Machine-readable export of every dated item, emitted at build. The auto-update/verification
// pipeline reads this (date expiry + URL liveness + fact re-check), and it doubles as a clean
// data feed for AEO/partners. One source of truth for what the calendar currently holds.
import { FESTIVALS } from '../data/festivals.ts';
import { OPPORTUNITIES } from '../data/calendar.ts';
import { EVENTS } from '../data/events.ts';

const site = 'https://artempiremj.com';

export async function GET() {
  const items = [
    ...FESTIVALS.map((f) => ({
      kind: 'festival', title: f.title, city: f.city, country: f.country,
      start: f.start ?? null, end: f.end ?? null, window: f.window ?? null,
      url: f.url, verified: f.verified, page: `${site}/festival/${f.slug}`,
    })),
    ...OPPORTUNITIES.map((o) => ({
      kind: o.kind, title: o.title, city: o.city, country: o.country,
      start: null, end: o.deadline ?? null, window: o.window ?? null,
      url: (o as any).url ?? null, verified: o.verified, page: `${site}/opportunity/${o.id}`,
    })),
    ...EVENTS.map((e) => ({
      kind: 'event', title: e.title, city: e.city, country: e.country,
      start: e.start ?? null, end: e.end ?? null, window: e.window ?? null,
      url: e.url, verified: e.verified, page: null,
    })),
  ];
  return new Response(JSON.stringify({ generated: 'build', count: items.length, items }, null, 2),
    { headers: { 'Content-Type': 'application/json' } });
}
