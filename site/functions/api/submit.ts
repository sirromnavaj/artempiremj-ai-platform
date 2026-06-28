// POST /api/submit — artist submissions, any medium. Writes to D1. Optional portfolio images
// go to R2 when the UPLOADS bucket is bound; without it the submission still saves (text first).
interface Env { DB: D1Database; UPLOADS?: R2Bucket; RESEND_API_KEY?: string; NOTIFY_FROM?: string; NOTIFY_TO?: string }

const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { 'content-type': 'application/json' } });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const ct = request.headers.get('content-type') || '';
  let d: Record<string, string> = {};
  let files: File[] = [];
  try {
    if (ct.includes('application/json')) {
      d = (await request.json()) as Record<string, string>;
    } else {
      const form = await request.formData();
      for (const [k, v] of form.entries()) if (typeof v === 'string') d[k] = v;
      files = form.getAll('images').filter((x): x is File => x instanceof File && x.size > 0);
    }
  } catch { return json({ error: 'bad body' }, 400); }

  if (d['bot-field']) return json({ ok: true });                    // honeypot
  const name = (d.name || '').trim();
  const email = (d.email || '').trim().toLowerCase();
  const medium = (d.medium || '').trim();
  const story = (d.story || '').trim();
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !medium || story.length < 10)
    return json({ error: 'name, email, medium and a story (10+ chars) are required' }, 400);

  const keys: string[] = [];
  if (env.UPLOADS && files.length) {
    for (const file of files.slice(0, 6)) {
      if (file.size > 8_000_000 || !file.type.startsWith('image/')) continue;
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-60);
      const key = `submissions/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`;
      await env.UPLOADS.put(key, file.stream(), { httpMetadata: { contentType: file.type } });
      keys.push(key);
    }
  }

  await env.DB.prepare(
    'INSERT INTO submissions (name, email, medium, series, location, links, images, story, consent) ' +
    'VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9)'
  ).bind(
    name.slice(0, 120), email, medium.slice(0, 40),
    (d.series || 'general').slice(0, 40), (d.location || '').slice(0, 120),
    (d.links || '').slice(0, 500), keys.length ? JSON.stringify(keys) : null,
    story.slice(0, 5000), d.consent ? 1 : 0,
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
          text: `${name} <${email}> · ${medium} · ${d.series || 'general'}\n${d.location || ''}\n${d.links || ''}\nimages: ${keys.length}\n\n${story}`,
        }),
      });
    } catch { /* the submission is already safely in D1 */ }
  }
  return json({ ok: true, photos: keys.length });
};
