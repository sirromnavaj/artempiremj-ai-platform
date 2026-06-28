#!/usr/bin/env node
// Wires source-weighting INTO discovery. Reads the Beta posteriors, Thompson-samples them, and emits
// a prompt-ready brief the discovery agent runs each cycle: EXPLOIT the proven sources (re-check the
// hosts that reliably yield live, verified events) + EXPLORE new angles (Kenya-first) to widen the
// net. This is the first ACT-ready learner actually steering behaviour: which sources we mine is now
// learned, not fixed. Balanced explore/exploit is intrinsic to Thompson sampling.
//   node scripts/discovery-brief.mjs            # print the brief for this cycle
import fs from 'node:fs';

const postFile = new URL('../site/src/data/source-posteriors.json', import.meta.url);

function gamma(k) {
  if (k < 1) return gamma(1 + k) * Math.pow(Math.random(), 1 / k);
  const d = k - 1 / 3, c = 1 / Math.sqrt(9 * d);
  for (;;) {
    let x, v;
    do { const u1 = Math.random(), u2 = Math.random(); x = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2); v = 1 + c * x; } while (v <= 0);
    v = v * v * v; const u = Math.random();
    if (u < 1 - 0.0331 * x * x * x * x || Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
  }
}
const betaSample = (a, b) => { const x = gamma(a), y = gamma(b); return x / (x + y); };

// Explore set: Kenya-first angles to surface NEW events and NEW sources (not yet in our posteriors).
const EXPLORE = [
  'new art exhibitions opening in Nairobi this month and next',
  'Kenya art fair / festival / biennale 2026 and 2027 (confirmed dates)',
  'East Africa contemporary art events (Tanzania, Uganda, Rwanda, Ethiopia)',
  'Kenyan galleries\' current exhibition pages not yet tracked',
  'aggregators to scan: afrikta.com, artrabbit.com (Nairobi), artconnect.com (Africa), allevents.in (Nairobi art)',
];

const main = () => {
  if (!fs.existsSync(postFile)) { console.error('No posteriors yet — run scripts/learn-sources.mjs first.'); process.exit(2); }
  const sources = JSON.parse(fs.readFileSync(postFile, 'utf8')).sources || {};
  const ranked = Object.entries(sources)
    .map(([h, s]) => ({ h, draw: betaSample(s.alpha, s.beta), n: s.alpha + s.beta - 2, mean: s.alpha / (s.alpha + s.beta) }))
    .filter((r) => r.n > 0)                 // only sources with real signal
    .sort((a, b) => b.draw - a.draw);
  const exploit = ranked.slice(0, 12);

  console.log('=== ArtempireMJ discovery brief (source-weighting steered) ===\n');
  console.log('EXPLOIT — re-check these proven sources for new / updated / next-edition events');
  console.log('(Thompson-sampled from reliability posteriors; mean = live-and-verified rate):');
  exploit.forEach((r) => console.log(`  - ${r.h}   [reliability ${r.mean.toFixed(2)}, n=${r.n}]`));
  console.log('\nEXPLORE — widen the net, Kenya first (find new events AND new sources):');
  EXPLORE.forEach((e) => console.log(`  - ${e}`));
  console.log('\nFor every candidate: confirm the date against the OFFICIAL source (>=2 sources for');
  console.log('verified:true; else a window + verified:false). Reject scams/dupes/dead. Return JSON');
  console.log('(title, kind, organizer, city, country, start/end OR window, summary, url, region,');
  console.log('verified, source). Kenya-exhaustive. This brief IS the discovery agent\'s instructions.\n');
};
main();
