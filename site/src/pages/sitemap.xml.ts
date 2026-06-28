// Complete sitemap, generated from the data so every page (festivals, opportunities, stories,
// cities, countries) is submitted to search engines. This is the SEO moat: per-event pages must
// be crawlable. Was an 8-URL hardcoded stub; now ~190 URLs.
import { FESTIVALS } from '../data/festivals.ts';
import { OPPORTUNITIES } from '../data/calendar.ts';
import { EVENTS } from '../data/events.ts';
import { ARTICLES } from '../data/articles.ts';

const site = 'https://artempiremj.com';
const slug = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const staticPaths = [
  '/', '/world', '/spotlight', '/discover', '/festivals', '/itineraries', '/artists', '/submit',
  '/list', '/travel', '/calendar', '/worldwide', '/correspondents', '/faq', '/about', '/studio',
  '/sponsor', '/folio-review',
];

export async function GET() {
  const cities = new Set<string>();
  const countries = new Set<string>();
  for (const x of [...OPPORTUNITIES, ...EVENTS, ...FESTIVALS]) { cities.add(slug(x.city)); countries.add(slug(x.country)); }

  const paths = [
    ...staticPaths,
    ...FESTIVALS.map((f) => `/festival/${f.slug}`),
    ...OPPORTUNITIES.map((o) => `/opportunity/${o.id}`),
    ...ARTICLES.map((a) => `/story/${a.slug}`),
    ...[...cities].map((c) => `/city/${c}`),
    ...[...countries].map((c) => `/country/${c}`),
  ];

  const urls = paths.map((p) => `  <url><loc>${site}${p === '/' ? '' : p}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
