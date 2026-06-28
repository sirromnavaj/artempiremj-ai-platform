// POST /api/submit — artist submissions, any medium. Writes to D1.
// Submission CTAs are the engagement engine (skill cta-system), so this is a first-class path.
interface Env { DB: D1Database; RESEND_API_KEY?: string; NOTIFY_FROM?: string; NOTIFY_TO?: string }

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
  const d = await body(request).catch(() => null);
  if (!d) return json({ error: 'bad body' }, 400);
  if (d['bot-field']) return json({ ok: true });                    // honeypot
  const name = (d.name || '').trim();
  const email = (d.email || '').trim().toLowerCase();
  const medium = (d.medium || '').trim();
  const story = (d.story || '').trim();
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !medium || story.length < 10)
    return json({ error: 'name, email, medium and a story (10+ chars) are required' }, 400);

  await env.DB.prepare(
    'INSERT INTO submissions (name, email, medium, series, location, links, story, consent) ' +
    'VALUES (?1,?2,?3,?4,?5,?6,?7,?8)'
  ).bind(
    name.slice(0, 120), email, medium.slice(0, 40),
    (d.series || 'general').slice(0, 40), (d.location || '').slice(0, 120),
    (d.links || '').slice(0, 500), story.slice(0, 5000), d.consent ? 1 : 0,
  ).run();

  if (env.RESEND_API_KEY && env.NOTIFY_TO) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          from: env.NOTIFY_FROM || 'ArtempireMJ <hello@artempiremj.com>',
          to: env.NOTIFY_TO,
          subject: `New submission: ${name} (${medium})`,
          text: `${name} <${email}> · ${medium} · ${d.series || 'general'}\n${d.location || ''}\n${d.links || ''}\n\n${story}`,
        }),
      });
    } catch { /* the submission is already safely in D1 */ }
  }
  return json({ ok: true });
};
