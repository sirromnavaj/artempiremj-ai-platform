// POST /api/list — anyone can submit an event/opportunity listing with photos. Lands as
// 'pending' in D1; a review step verifies and publishes it into the calendar. Photos go to R2
// when the UPLOADS bucket is bound; without it, the listing still saves (text first).
interface Env { DB: D1Database; UPLOADS?: R2Bucket; RESEND_API_KEY?: string; FROM?: string }

const ok = (b: object) => Response.json(b);
const bad = (m: string) => new Response(m, { status: 400 });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let form: FormData;
  try { form = await request.formData(); } catch { return bad('expected form data'); }
  if ((form.get('bot-field') || '').toString()) return ok({ ok: true }); // honeypot
  const f = (k: string) => (form.get(k) || '').toString().trim();
  const title = f('title'), email = f('email'), summary = f('summary');
  if (!title || !summary || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return bad('title, a valid email, and a description are required');

  // Photos to R2 (only if the bucket is bound).
  const keys: string[] = [];
  if (env.UPLOADS) {
    const files = form.getAll('images').filter((x): x is File => x instanceof File && x.size > 0);
    for (const file of files.slice(0, 6)) {
      if (file.size > 8_000_000 || !file.type.startsWith('image/')) continue;
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-60);
      const key = `listings/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`;
      await env.UPLOADS.put(key, file.stream(), { httpMetadata: { contentType: file.type } });
      keys.push(key);
    }
  }

  await env.DB.prepare(
    `INSERT INTO listings (title, kind, organizer, email, city, country, start, deadline, url, summary, images, status)
     VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,'pending')`
  ).bind(title, f('kind') || null, f('organizer') || null, email, f('city') || null, f('country') || null,
    f('start') || null, f('deadline') || null, f('url') || null, summary, keys.length ? JSON.stringify(keys) : null).run();

  return ok({ ok: true, photos: keys.length });
};
