// GET /api/submissions?token=... — the review desk. "We read every one" needs a way to
// actually read them. Token-gated. Lists newest-first; ?status=new to filter the queue.
// Promoting one to a feature is a curatorial step (status -> featured) that surfaces on /artists.
interface Env { DB: D1Database; ADMIN_TOKEN?: string }

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const u = new URL(request.url);
  if (!env.ADMIN_TOKEN || u.searchParams.get('token') !== env.ADMIN_TOKEN)
    return new Response('forbidden', { status: 403 });
  const status = u.searchParams.get('status');
  const q = status
    ? env.DB.prepare('SELECT * FROM submissions WHERE status=?1 ORDER BY created_at DESC').bind(status)
    : env.DB.prepare('SELECT * FROM submissions ORDER BY created_at DESC LIMIT 200');
  const rows = (await q.all()).results || [];
  return Response.json({ count: rows.length, submissions: rows });
};

// POST /api/submissions  { id, status }  — move a submission through the desk
//   new -> reviewing -> featured | archived. Featured ones appear on /artists.
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const u = new URL(request.url);
  if (!env.ADMIN_TOKEN || u.searchParams.get('token') !== env.ADMIN_TOKEN)
    return new Response('forbidden', { status: 403 });
  const d = await request.json().catch(() => null) as { id?: number; status?: string } | null;
  if (!d?.id || !['new', 'reviewing', 'featured', 'archived'].includes(d.status || ''))
    return new Response('bad request', { status: 400 });
  await env.DB.prepare('UPDATE submissions SET status=?1 WHERE id=?2').bind(d.status, d.id).run();
  return Response.json({ ok: true });
};
