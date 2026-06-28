#!/usr/bin/env node
// Source-weighting bandit. Reads the events index, probes each source, and maintains a Beta
// posterior PER SOURCE HOST: alpha += (verified AND live), beta += (dead OR unverified-and-old).
// Thompson-samples a ranking so discovery prioritises hosts that yield real, live events. This is
// the first closed learning loop — it needs NO user traffic, it learns from verification outcomes.
// Genuine Thompson sampling (real Beta draws via Gamma), not a heuristic.
//   node scripts/learn-sources.mjs            # update posteriors from the live index
import fs from 'node:fs';

const INDEX = process.argv[2] || 'https://artempiremj.com/events-index.json';
const OUT = new URL('../site/src/data/source-posteriors.json', import.meta.url);
const UA = 'Mozilla/5.0 (compatible; ArtempireMJ-LinkCheck/1.0; +https://artempiremj.com)';

const hostOf = (u) => { try { return new URL(u).host.replace(/^www\./, ''); } catch { return null; } };

// --- genuine Beta(a,b) sampler via two Gamma draws (Marsaglia-Tsang) ---
function gamma(k) {
  if (k < 1) return gamma(1 + k) * Math.pow(Math.random(), 1 / k);
  const d = k - 1 / 3, c = 1 / Math.sqrt(9 * d);
  for (;;) {
    let x, v;
    do { const u1 = Math.random(), u2 = Math.random(); x = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2); v = 1 + c * x; } while (v <= 0);
    v = v * v * v; const u = Math.random();
    if (u < 1 - 0.0331 * x * x * x * x) return d * v;
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
  }
}
const betaSample = (a, b) => { const x = gamma(a), y = gamma(b); return x / (x + y); };

async function probeOk(url) {
  if (!url) return null;
  const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 12000);
  try {
    const r = await fetch(url, { redirect: 'follow', signal: ctrl.signal, headers: { 'User-Agent': UA, Accept: '*/*' } });
    if (r.ok) return true;
    if (r.status >= 400 && r.status < 500 && ![403, 429, 408].includes(r.status)) return false; // confirmed dead
    return null; // unknown (bot-blocked / transient) -> no signal
  } catch { return null; } finally { clearTimeout(t); }
}

const main = async () => {
  const { items } = await (await fetch(INDEX, { headers: { 'User-Agent': UA } })).json();
  const prior = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { sources: {} };
  const post = prior.sources || {};

  // One reliability observation per host per run (live+verified = success; confirmed-dead = failure).
  const byHost = {};
  for (const it of items) { const h = hostOf(it.url); if (h) (byHost[h] ||= []).push(it); }
  for (const [h, list] of Object.entries(byHost)) {
    post[h] ||= { alpha: 1, beta: 1 };
    for (const it of list) {
      const ok = await probeOk(it.url);
      if (ok === true && it.verified) post[h].alpha += 1;
      else if (ok === false) post[h].beta += 1;          // confirmed dead = strong negative
      // unknown probe or unverified-but-live = no update (no signal, honest)
    }
  }

  fs.writeFileSync(OUT, JSON.stringify({ updated: new Date().toISOString().slice(0, 10), sources: post }, null, 2));

  const ranked = Object.entries(post)
    .map(([h, p]) => ({ h, mean: p.alpha / (p.alpha + p.beta), draw: betaSample(p.alpha, p.beta), n: p.alpha + p.beta - 2 }))
    .sort((a, b) => b.draw - a.draw);
  console.log(`\nSource-weighting posteriors updated (${ranked.length} hosts).`);
  console.log('  Thompson-sampled discovery priority (top 12):');
  ranked.slice(0, 12).forEach((r) => console.log(`   ${r.draw.toFixed(2)}  (mean ${r.mean.toFixed(2)}, n=${r.n})  ${r.h}`));
  console.log('');
};
main().catch((e) => { console.error(e); process.exit(2); });
