// ArtempireMJ — on-brand email templates (all scenarios). Email-safe HTML:
// table layout + inline styles (email clients ignore <style>/external CSS, no fl/grid).
// Palette: cream #EFE7D6, ink #0D0D0D, warm #9A7E4A, ember #C45E24. Warm voice, no em-dashes.
// Used by the Worker/Function that sends. Keep every promise: a real send, a real unsubscribe.

const C = { cream: '#EFE7D6', paper: '#FBF7EF', ink: '#0D0D0D', soft: '#1A1310',
  warm: '#9A7E4A', ember: '#C45E24', line: '#E2D8C2', muted: '#6B5F4C' };
const SITE = 'https://artempiremj.com';
const serif = "'Iowan Old Style', Palatino, Georgia, serif";
const sans = "Inter, -apple-system, 'Segoe UI', Roboto, sans-serif";

function shell(title: string, inner: string, preheader = ''): string {
  return `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title></head>
<body style="margin:0;padding:0;background:${C.paper};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.paper};">
<tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
    <tr><td style="padding:8px 8px 18px;border-bottom:1px solid ${C.line};">
      <a href="${SITE}" style="font-family:${serif};font-size:22px;font-weight:600;color:${C.ink};text-decoration:none;letter-spacing:-0.5px;">ArtempireMJ</a>
      <div style="font-family:${sans};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.warm};margin-top:4px;">The world, told through artists</div>
    </td></tr>
    <tr><td style="padding:26px 8px;font-family:${serif};font-size:17px;line-height:1.6;color:${C.ink};">
      ${inner}
    </td></tr>
    <tr><td style="padding:18px 8px;border-top:1px solid ${C.line};font-family:${sans};font-size:12px;color:${C.muted};">
      ArtempireMJ. The world, told through artists.<br>
      <a href="${SITE}" style="color:${C.warm};">artempiremj.com</a>
      &nbsp;·&nbsp; <a href="${SITE}/submit" style="color:${C.warm};">Submit your story</a>
      &nbsp;·&nbsp; <a href="{{unsubscribe_url}}" style="color:${C.muted};">Unsubscribe</a>
    </td></tr>
  </table>
</td></tr></table></body></html>`;
}

function button(label: string, href: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:18px 0;"><tr>
  <td style="background:${C.ink};border-radius:2px;">
    <a href="${href}" style="display:inline-block;padding:12px 22px;font-family:${sans};font-size:14px;font-weight:600;color:${C.cream};text-decoration:none;">${label}</a>
  </td></tr></table>`;
}

// 1) Welcome — new subscriber
export function welcome(): string {
  return shell('You are in', `
    <h1 style="font-family:${serif};font-size:26px;margin:0 0 14px;color:${C.ink};">You are in.</h1>
    <p style="margin:0 0 14px;">Once a week, the world in art lands here. The open doors before they close,
    the makers worth knowing, the trips worth taking. Told warm, told through the artists who live it.</p>
    <p style="margin:0 0 6px;">Start with what is open right now.</p>
    ${button('See the Global Art Calendar', SITE)}
    <p style="margin:14px 0 0;color:${C.muted};font-size:15px;">You make art? Tell us what you are working on. Any medium.
    <a href="${SITE}/submit" style="color:${C.ember};">Submit your story.</a></p>
  `, 'The world in art, once a week. Start with what is open now.');
}

// 2) Weekly digest — the engine. items = the closing-soon + new opportunities.
export interface DigestItem { title: string; meta: string; summary: string; url: string; }
export function weeklyDigest(intro: string, closingSoon: DigestItem[], fresh: DigestItem[]): string {
  const row = (it: DigestItem) => `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 14px;border:1px solid ${C.line};border-radius:3px;background:${C.cream};">
    <tr><td style="padding:14px 16px;font-family:${serif};">
      <a href="${it.url}" style="font-size:18px;font-weight:600;color:${C.ink};text-decoration:none;">${it.title}</a>
      <div style="font-family:${sans};font-size:12px;color:${C.warm};margin:3px 0 6px;">${it.meta}</div>
      <div style="font-size:15px;color:${C.soft};">${it.summary}</div>
    </td></tr></table>`;
  const section = (label: string, items: DigestItem[]) => items.length ? `
    <div style="font-family:${sans};font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${C.ember};margin:18px 0 10px;">${label}</div>
    ${items.map(row).join('')}` : '';
  return shell('The week in world art', `
    <h1 style="font-family:${serif};font-size:24px;margin:0 0 12px;color:${C.ink};">This week</h1>
    <p style="margin:0 0 8px;">${intro}</p>
    ${section('Closing soon', closingSoon)}
    ${section('New on the radar', fresh)}
    ${button('Open the full calendar', SITE)}
  `, intro);
}

// 3) Submission received — to the artist
export function submissionReceived(name: string): string {
  return shell('We have your story', `
    <h1 style="font-family:${serif};font-size:24px;margin:0 0 12px;color:${C.ink};">Got it, ${name}.</h1>
    <p style="margin:0 0 14px;">Your story is with us. We read every one. If it is right for what we are
    making, we will write back. Either way, thank you for trusting us with it.</p>
    ${button('See what is on', SITE)}
  `, 'Your submission is with ArtempireMJ. We read every one.');
}

// 4) For partners (payer reply) — warm-with-advantage register
export function partnerReply(): string {
  return shell('Let us talk', `
    <h1 style="font-family:${serif};font-size:24px;margin:0 0 12px;color:${C.ink};">Let us find the fit.</h1>
    <p style="margin:0 0 14px;">Thank you for reaching out. Tell us who you want to reach, the artists,
    the travellers, or the collectors, and we will show you exactly where you fit in the work and what it does.</p>
    ${button('How partners reach our audience', SITE + '/sponsor')}
  `, 'Reach artists, travellers, and collectors through ArtempireMJ.');
}

// 5) Feature reach report — to a featured artist. The real value exchange: we tell them the
// audience their story reached. Fed by the sends table (recipients per feature). Sent when a
// featured submitter's story has been distributed, never before there is a real number.
export function featureReach(name: string, featureTitle: string, featureUrl: string, reach: number): string {
  return shell('Your story travelled', `
    <h1 style="font-family:${serif};font-size:24px;margin:0 0 12px;color:${C.ink};">${name}, your story travelled.</h1>
    <p style="margin:0 0 14px;">We carried <a href="${featureUrl}" style="color:${C.ember};">${featureTitle}</a> to the
    people who read us, and it reached ${reach.toLocaleString()} of them. They came here to find work like
    yours, and now they have found it.</p>
    <p style="margin:0 0 6px;color:${C.muted};font-size:15px;">The page stays up, and people keep arriving at it.</p>
    ${button('See your feature', featureUrl)}
  `, `${featureTitle} reached ${reach.toLocaleString()} readers.`);
}
