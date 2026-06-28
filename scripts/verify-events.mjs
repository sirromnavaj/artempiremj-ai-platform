#!/usr/bin/env node
// Self-verify + refresh check for the ArtempireMJ calendar. Reads the live events index, then for
// every item checks: (1) EXPIRY — a one-time event whose end date has passed (and has no recurring
// window) should be removed; (2) LIVENESS — the source URL still resolves; (3) UNCONFIRMED —
// verified:false items whose dates should be confirmed/upgraded.
//
//   node scripts/verify-events.mjs            # checks the live site
//   node scripts/verify-events.mjs <url>      # checks a specific index URL
//
// Liveness is CONSERVATIVE on purpose: only a confirmed 4xx (404/410/451...) counts as DEAD. A
// timeout, 403, 429, or 5xx is reported as UNKNOWN (slow / bot-blocked / transient), NOT dead — so
// the report never cries wolf. Ground-truth discipline: a "dead link" must be actually dead.
// FACT-verification (does our date match the official source?) is the model layer — see
// artempiremj-event-autoupdate.md.

const INDEX = process.argv[2] || 'https://artempiremj.com/events-index.json';
const today = new Date().toISOString().slice(0, 10);
const UA = 'Mozilla/5.0 (compatible; ArtempireMJ-LinkCheck/1.0; +https://artempiremj.com)';
const CONCURRENCY = 5;

async function probe(url, attempt = 0) {
  if (!url) return { kind: 'no-url' };
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 12000);
  try {
    let r = await fetch(url, { method: 'GET', redirect: 'follow', signal: ctrl.signal, headers: { 'User-Agent': UA, Accept: '*/*' } });
    if (r.ok) return { kind: 'ok', status: r.status };
    if (r.status >= 400 && r.status < 500 && ![403, 429, 408].includes(r.status)) return { kind: 'dead', status: r.status };
    return { kind: 'unknown', status: r.status };           // 403/429/5xx -> bot-blocked or transient
  } catch (e) {
    if (attempt < 1) return probe(url, attempt + 1);        // one retry on network/timeout
    return { kind: 'unknown', status: e.name === 'AbortError' ? 'timeout' : 'neterr' };
  } finally { clearTimeout(t); }
}

async function mapLimited(arr, n, fn) {
  const out = new Array(arr.length); let i = 0;
  const workers = Array.from({ length: n }, async () => { while (i < arr.length) { const idx = i++; out[idx] = await fn(arr[idx], idx); } });
  await Promise.all(workers);
  return out;
}

const main = async () => {
  const res = await fetch(INDEX, { headers: { 'User-Agent': UA } });
  if (!res.ok) { console.error(`Could not read index: ${INDEX} (${res.status})`); process.exit(2); }
  const { items } = await res.json();

  const expired = items.filter((it) => it.end && !it.window && it.end < today);
  const unconfirmed = items.filter((it) => it.verified === false);
  const probes = await mapLimited(items, CONCURRENCY, (it) => probe(it.url));
  const dead = items.map((it, i) => ({ it, p: probes[i] })).filter((x) => x.p.kind === 'dead');
  const unknown = probes.filter((p) => p.kind === 'unknown').length;

  const line = (it) => `   - [${it.kind}] ${it.title} (${it.city}, ${it.country})`;
  console.log(`\nArtempireMJ calendar verification — ${today}`);
  console.log(`  total items: ${items.length}`);
  console.log(`\n  EXPIRED (remove/roll to next edition): ${expired.length}`);
  expired.forEach((it) => console.log(line(it)));
  console.log(`\n  DEAD source links — confirmed 4xx (fix): ${dead.length}`);
  dead.forEach(({ it, p }) => console.log(`${line(it)}  -> ${p.status}  ${it.url}`));
  console.log(`\n  UNCONFIRMED dates (try to confirm next edition): ${unconfirmed.length}`);
  console.log(`\n  (unknown/slow/bot-blocked links, not flagged dead: ${unknown})`);

  const issues = expired.length + dead.length;
  console.log(`\n  => ${issues} hard issue(s); ${unconfirmed.length} to fact-confirm.\n`);
  process.exit(issues > 0 ? 1 : 0);
};

main().catch((e) => { console.error(e); process.exit(2); });
