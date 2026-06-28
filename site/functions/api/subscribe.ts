// POST /api/subscribe — our own newsletter signup. Writes the subscriber to OUR D1.
// We own the list. Optional Resend send is just delivery, never the owner of the audience.
interface Env { DB: D1Database; RESEND_API_KEY?: string; NOTIFY_FROM?: string }

const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { 'content-type': 'application/json' } });

async function body(req: Request): Promise<Record<string, string>> {
  const ct = req.headers.get('content-type') || '';
  if (ct.includes('application/json')) return (await req.json()) as Record<string, string>;
  const f = await req.formData();
  const o: Record<string, string> = {};
  for (const [k, v] of f.entries()) o[k] = String(v);
  return o;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const data = await body(request).catch(() => null);
  if (!data) return json({ error: 'bad body' }, 400);
  if (data['bot-field']) return json({ ok: true });                 // honeypot
  const email = (data.email || '').trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: 'invalid email' }, 400);

  await env.DB.prepare(
    'INSERT INTO subscribers (email, source) VALUES (?1, ?2) ' +
    "ON CONFLICT(email) DO UPDATE SET status='active'"
  ).bind(email, (data.source || 'site').slice(0, 40)).run();

  // Delivery is optional + best-effort; the list is already safely ours in D1.
  if (env.RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          from: env.NOTIFY_FROM || 'ArtempireMJ <hello@artempiremj.com>',
          to: email,
          subject: 'You are in',
          text: 'You are on the ArtempireMJ list. The week in world art, told through the makers who carry it. Look for the first one this week.',
        }),
      });
    } catch { /* delivery can fail without losing the subscriber */ }
  }
  return json({ ok: true });
};
