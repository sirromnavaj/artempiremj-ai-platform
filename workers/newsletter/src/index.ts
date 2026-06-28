// artempiremj-newsletter — our owned weekly send. Reads OUR D1 (subscribers + the
// verified calendar), renders the on-brand digest, sends via Resend with a real
// per-subscriber unsubscribe link. Cron weekly; POST /send (with SEND_TOKEN) to test.
interface Env {
  DB: D1Database;
  RESEND_API_KEY: string;
  UNSUB_SECRET: string;
  SEND_TOKEN?: string;
  FROM: string;
  SITE: string;
}
interface Sub { email: string }
interface Opp { id: string; title: string; kind: string; organizer: string; city: string; country: string; deadline: string | null; window: string | null; verified: number }

const C = { cream: '#EFE7D6', paper: '#FBF7EF', ink: '#0D0D0D', warm: '#9A7E4A', ember: '#C45E24', line: '#E2D8C2', muted: '#6B5F4C' };
const serif = "'Iowan Old Style',Palatino,Georgia,serif";
const sans = 'Inter,-apple-system,Segoe UI,Roboto,sans-serif';

async function unsubToken(email: string, secret: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(email + secret));
  return [...new Uint8Array(buf)].slice(0, 12).map((b) => b.toString(16).padStart(2, '0')).join('');
}

interface Feature { title: string; dek: string; series: string; url: string }

function featureBlock(f: Feature | null): string {
  if (!f) return '';
  return `
    <div style="font-family:${sans};font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${C.ember};margin:18px 0 8px;">From the floor</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 14px;border:1px solid ${C.line};border-radius:3px;background:${C.cream};">
    <tr><td style="padding:14px 16px;font-family:${serif};">
      <div style="font-family:${sans};font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${C.warm};">${f.series}</div>
      <a href="${f.url}" style="font-size:19px;font-weight:600;color:${C.ink};text-decoration:none;">${f.title}</a>
      <div style="font-size:15px;color:${C.ink};margin-top:5px;">${f.dek}</div>
    </td></tr></table>`;
}

function digest(site: string, opps: Opp[], unsubUrl: string, feature: Feature | null): string {
  const item = (o: Opp) => `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 12px;border:1px solid ${C.line};border-radius:3px;background:${C.cream};">
    <tr><td style="padding:13px 15px;font-family:${serif};">
      <a href="${site}/opportunity/${o.id}" style="font-size:18px;font-weight:600;color:${C.ink};text-decoration:none;">${o.title}</a>
      <div style="font-family:${sans};font-size:12px;color:${C.warm};margin:3px 0 0;">${o.organizer} &middot; ${o.city}, ${o.country} &middot; ${o.verified && o.deadline ? 'Deadline ' + o.deadline : (o.window || '')}</div>
    </td></tr></table>`;
  return `<!doctype html><html><body style="margin:0;background:${C.paper};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" width="600" style="max-width:600px;width:100%;">
      <tr><td style="padding:8px 8px 16px;border-bottom:1px solid ${C.line};">
        <a href="${site}" style="font-family:${serif};font-size:22px;font-weight:600;color:${C.ink};text-decoration:none;">ArtempireMJ</a>
        <div style="font-family:${sans};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.warm};margin-top:4px;">The week in world art</div>
      </td></tr>
      <tr><td style="padding:22px 8px;font-family:${serif};font-size:17px;line-height:1.6;color:${C.ink};">
        <h1 style="font-size:23px;margin:0 0 12px;">This week, what is open.</h1>
        <p style="margin:0 0 14px;">The doors worth knowing about, gathered for you. Act on the ones that are yours.</p>
        ${opps.map(item).join('') || '<p>The radar is rotating. New doors land next week.</p>'}
        ${featureBlock(feature)}
        <table role="presentation" style="margin:16px 0;"><tr><td style="background:${C.ink};border-radius:2px;">
          <a href="${site}" style="display:inline-block;padding:12px 22px;font-family:${sans};font-size:14px;font-weight:600;color:${C.cream};text-decoration:none;">Open the full calendar</a>
        </td></tr></table>
      </td></tr>
      <tr><td style="padding:16px 8px;border-top:1px solid ${C.line};font-family:${sans};font-size:12px;color:${C.muted};">
        ArtempireMJ &middot; <a href="${site}/submit" style="color:${C.warm};">Submit your story</a> &middot;
        <a href="${unsubUrl}" style="color:${C.muted};">Unsubscribe</a>
      </td></tr>
    </table></td></tr></table></body></html>`;
}

async function send(env: Env): Promise<{ sent: number; failed: number; feature: string | null }> {
  const subs = (await env.DB.prepare("SELECT email FROM subscribers WHERE status='active'").all<Sub>()).results || [];
  const opps = (await env.DB.prepare(
    "SELECT * FROM opportunities WHERE verified=1 AND deadline IS NOT NULL ORDER BY deadline ASC LIMIT 6"
  ).all<Opp>()).results || [];

  // Distribute the latest feature, not just opportunities (the stage must reach the audience).
  let feature: Feature | null = null;
  try {
    const res = await fetch(`${env.SITE}/latest.json`, { cf: { cacheTtl: 300 } } as RequestInit);
    if (res.ok) { const j = await res.json() as { latest: Feature[] }; feature = j.latest?.[0] ?? null; }
  } catch { /* a missing feature must not block the send */ }

  let sent = 0, failed = 0;
  for (const s of subs) {
    const tok = await unsubToken(s.email, env.UNSUB_SECRET);
    const unsubUrl = `${env.SITE}/api/unsubscribe?e=${encodeURIComponent(s.email)}&t=${tok}`;
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
        body: JSON.stringify({ from: env.FROM, to: s.email, subject: 'This week in world art', html: digest(env.SITE, opps, unsubUrl, feature) }),
      });
      r.ok ? sent++ : failed++;
    } catch { failed++; }
  }

  // Record the reach (the seating-capacity number; the basis for reporting back to artists).
  try {
    await env.DB.prepare(
      'INSERT INTO sends (subject, recipients, feature_url, sent_at) VALUES (?1,?2,?3,?4)'
    ).bind('This week in world art', sent, feature?.url ?? null, new Date().toISOString()).run();
  } catch { /* sends table may not exist yet; the send itself still happened */ }

  return { sent, failed, feature: feature?.url ?? null };
}

export default {
  async scheduled(_e: ScheduledController, env: Env) { await send(env); },
  async fetch(req: Request, env: Env): Promise<Response> {
    const u = new URL(req.url);
    if (req.method === 'POST' && u.pathname === '/send') {
      if (env.SEND_TOKEN && req.headers.get('x-send-token') !== env.SEND_TOKEN)
        return new Response('forbidden', { status: 403 });
      const out = await send(env);
      return Response.json(out);
    }
    return new Response('artempiremj-newsletter', { status: 200 });
  },
};
