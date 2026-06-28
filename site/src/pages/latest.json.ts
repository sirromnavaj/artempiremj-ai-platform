// /latest.json — the newest features, served as JSON for the newsletter worker.
import { ARTICLES } from '../data/articles.ts';

export async function GET() {
  const latest = [...ARTICLES]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5)
    .map((a) => ({
      title: a.title, dek: a.dek, series: a.series,
      url: `https://artempiremj.com/story/${a.slug}`,
      byline: a.byline ?? null, date: a.date,
    }));
  return new Response(JSON.stringify({ latest }), {
    headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=600' },
  });
}
