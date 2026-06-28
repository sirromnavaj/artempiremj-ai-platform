#!/usr/bin/env node
// The READINESS GAUGE. For each learnable decision, shows how much data it has vs the threshold it
// needs before it may ACT. Below threshold => OBSERVE (return control, keep accumulating); at/above
// => ACT (Thompson-sample to drive the site). This is the honest gate made visible: we never act on
// noise. Reads live interaction counts (/api/stats) + the source posteriors + the learner config.
//   node scripts/learning-gauge.mjs
import fs from 'node:fs';

const BASE = process.argv[2] || 'https://artempiremj.com';
const learners = JSON.parse(fs.readFileSync(new URL('../site/src/data/learners.json', import.meta.url), 'utf8')).learners;
const postFile = new URL('../site/src/data/source-posteriors.json', import.meta.url);

const bar = (frac) => { const n = 20, f = Math.max(0, Math.min(1, frac)); const k = Math.round(f * n); return '[' + '#'.repeat(k) + '.'.repeat(n - k) + ']'; };

const main = async () => {
  let stats = { total: 0, byType: {} };
  try { stats = await (await fetch(`${BASE}/api/stats`)).json(); } catch {}
  let srcObs = 0;
  if (fs.existsSync(postFile)) {
    const p = JSON.parse(fs.readFileSync(postFile, 'utf8')).sources || {};
    srcObs = Object.values(p).reduce((a, s) => a + (s.alpha + s.beta - 2), 0); // observations beyond the prior
  }
  const obsFor = (m) => (m === 'source-obs' ? srcObs : (stats.byType?.[m] || 0));

  console.log(`\n  ArtempireMJ — learning readiness gauge`);
  console.log(`  interactions logged so far: ${stats.total} (${Object.entries(stats.byType || {}).map(([k, v]) => `${k}:${v}`).join(', ') || 'none yet'})\n`);
  for (const L of learners) {
    const obs = obsFor(L.metric), frac = obs / L.threshold, mode = frac >= 1 ? 'ACT ' : 'OBS ';
    console.log(`  ${mode} ${bar(frac)} ${String(Math.min(100, Math.round(frac * 100))).padStart(3)}%  ${L.name}  (${obs}/${L.threshold} ${L.metric})`);
  }
  console.log(`\n  ACT = enough data, Thompson-sample live.  OBS = still accumulating, serving control.`);
  console.log(`  Source-weighting fills from verification (run learn-sources.mjs); the rest fill from real traffic.\n`);
};
main().catch((e) => { console.error(e); process.exit(2); });
