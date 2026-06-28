// Interaction tracking endpoint -> D1 interactions table. The data the learning layer trains on.
// No PII: only event type + surface + target (event slug / link host / query / cta id). Fails
// silently (never blocks the user). Uses sendBeacon-friendly POST.
interface Env { DB?: D1Database }

const TYPES = new Set(['impression', 'click', 'search', 'affiliate', 'subscribe']);
const json = (o: unknown, status = 200) =>
  new Response(JSON.stringify(o), { status, headers: { 'Content-Type': 'application/json' } });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body: any = await request.json().catch(() => ({}));
    const type = String(body?.type || '');
    if (!TYPES.has(type)) return json({ ok: false, error: 'bad type' }, 400);
    const surface = String(body?.surface || '').slice(0, 40);
    const target = String(body?.target || '').slice(0, 200);
    const meta = body?.meta ? JSON.stringify(body.meta).slice(0, 500) : null;
    if (env.DB) {
      await env.DB.prepare('INSERT INTO interactions (type, surface, target, meta) VALUES (?, ?, ?, ?)')
        .bind(type, surface, target, meta).run();
    }
    return json({ ok: true });
  } catch {
    return json({ ok: false }, 200); // never error toward the client; tracking is best-effort
  }
};
