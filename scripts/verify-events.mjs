#!/usr/bin/env node
// Self-verify + refresh check for the ArtempireMJ calendar. Reads the live events index, then for
// every item checks: (1) EXPIRY — a one-time event whose end date has passed (and has no recurring
// window) should be removed; (2) LIVENESS — the source URL still returns OK (dead link = stale =
// trust death); (3) UNCONFIRMED — verified:false items whose dates should be confirmed/upgraded.
// Outputs a report the operator (or the engine) acts on. Run nightly by the engine before deploy.
//
//   node scripts/verify-events.mjs            # checks the live site
//   node scripts/verify-events.mjs <url>      # checks a specific index URL
//
// This is the deterministic layer. FACT-verification (does our date match the official source?) is
// the model layer — see artempiremj-event-autoupdate.md for the full pipeline.

const INDEX = process.argv[2] || 'https://artempiremj.com/events-index.json';
const today = new Date().toISOString().slice(0, 10); // engine passes real date; CI uses build date

async function head(url, timeoutMs = 8000) {
  if (!url) return { ok: null, status: 'no-url' };
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    let r = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: ctrl.signal });
    if (r.status === 405 || r.status === 403) r = await fetch(url, { method: 'GET', redirect: 'follow', signal: ctrl.signal });
    return { ok: r.ok, status: r.status };
  } catch (e) {
    return { ok: false, status: String(e.name === 'AbortError' ? 'timeout' : e.message).slice(0, 40) };
  } finally { clearTimeout(t); }
}

const main = async () => {
  const res = await fetch(INDEX);
  if (!res.ok) { console.error(`Could not read index: ${INDEX} (${res.status})`); process.exit(2); }
  const { items } = await res.json();
  const expired = [], unconfirmed = [], dead = [];

  // Liveness in parallel (capped), expiry + confirmation are local checks.
  const live = await Promise.all(items.map((it) => head(it.url)));
  items.forEach((it, i) => {
    if (it.end && !it.window && it.end < today) expired.push(it);     // one-time, past, not recurring
    if (it.verified === false) unconfirmed.push(it);
    if (live[i].ok === false) dead.push({ ...it, status: live[i].status });
  });

  const line = (it) => `   - [${it.kind}] ${it.title} (${it.city}, ${it.country})`;
  console.log(`\nArtempireMJ calendar verification — ${today}`);
  console.log(`  total items: ${items.length}`);
  console.log(`\n  EXPIRED (remove/roll to next edition): ${expired.length}`);
  expired.forEach((it) => console.log(line(it)));
  console.log(`\n  DEAD/UNREACHABLE source links (re-check): ${dead.length}`);
  dead.forEach((it) => console.log(`${line(it)}  -> ${it.status}  ${it.url}`));
  console.log(`\n  UNCONFIRMED dates (try to confirm next edition): ${unconfirmed.length}`);
  unconfirmed.forEach((it) => console.log(line(it)));

  const issues = expired.length + dead.length;
  console.log(`\n  => ${issues} actionable issue(s); ${unconfirmed.length} to fact-confirm.\n`);
  // Non-zero only on hard issues (expired/dead), so the engine can gate a deploy/alert on it.
  process.exit(issues > 0 ? 1 : 0);
};

main().catch((e) => { console.error(e); process.exit(2); });
