// Interaction counts for the learning gauge (and future dashboards). Aggregate only, no rows.
interface Env { DB?: D1Database }
const json = (o: unknown, status = 200) =>
  new Response(JSON.stringify(o), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' } });

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.DB) return json({ ok: true, total: 0, byType: {}, top: {} });
  try {
    const rows = await env.DB.prepare('SELECT type, COUNT(*) AS n FROM interactions GROUP BY type').all();
    const byType: Record<string, number> = {};
    for (const r of (rows.results as any[]) || []) byType[r.type] = Number(r.n);
    const total = Object.values(byType).reduce((a, b) => a + b, 0);
    // Top targets per type (which events get clicked, what is searched, which hosts booked).
    const tr = await env.DB.prepare(
      "SELECT type, target, COUNT(*) AS n FROM interactions WHERE target != '' GROUP BY type, target ORDER BY n DESC LIMIT 60"
    ).all();
    const top: Record<string, { target: string; n: number }[]> = {};
    for (const r of (tr.results as any[]) || []) (top[r.type] ||= []).push({ target: r.target, n: Number(r.n) });
    return json({ ok: true, total, byType, top });
  } catch {
    return json({ ok: true, total: 0, byType: {}, top: {} });
  }
};
