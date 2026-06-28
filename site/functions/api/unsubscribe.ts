// GET /api/unsubscribe?e=email[&t=token] — a working unsubscribe (a promise we keep).
// The weekly-send worker fills {{unsubscribe_url}} with e + a token = sha256(email+SECRET).
// If UNSUB_SECRET is set we verify the token; without it we accept the email (dev/simple).
interface Env { DB: D1Database; UNSUB_SECRET?: string }

const page = (msg: string) =>
  new Response(
    `<!doctype html><meta charset="utf-8"><title>ArtempireMJ</title>
     <body style="font-family:Georgia,serif;background:#FBF7EF;color:#0D0D0D;padding:48px;max-width:560px;margin:auto;">
     <h1 style="font-weight:600;">ArtempireMJ</h1><p style="font-size:18px;line-height:1.6;">${msg}</p>
     <p><a href="https://artempiremj.com" style="color:#C45E24;">Back to the calendar</a></p></body>`,
    { headers: { 'content-type': 'text/html;charset=utf-8' } },
  );

async function token(email: string, secret: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(email + secret));
  return [...new Uint8Array(buf)].slice(0, 12).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const u = new URL(request.url);
  const email = (u.searchParams.get('e') || '').trim().toLowerCase();
  const t = u.searchParams.get('t') || '';
  if (!email) return page('That link is missing an address. Nothing changed.');
  if (env.UNSUB_SECRET && t !== (await token(email, env.UNSUB_SECRET)))
    return page('That link did not check out. Nothing changed.');
  await env.DB.prepare("UPDATE subscribers SET status='unsubscribed' WHERE email=?1").bind(email).run();
  return page('Done. You are off the list. The door stays open if you want back in.');
};
