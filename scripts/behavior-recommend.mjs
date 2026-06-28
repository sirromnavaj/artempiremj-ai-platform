#!/usr/bin/env node
// User-behavior -> improvement recommendations. Reads the live interaction stats and turns them into
// concrete, ranked suggestions: which events to feature (most clicked), what people search for that
// we should cover (esp. zero-result), where travel intent is (affiliate clicks), and how the list +
// engagement are trending. Honest about data sufficiency — says so when there isn't enough yet.
//   node scripts/behavior-recommend.mjs [https://artempiremj.com]
const BASE = process.argv[2] || 'https://artempiremj.com';

const main = async () => {
  let s = { total: 0, byType: {}, top: {} };
  try { s = await (await fetch(`${BASE}/api/stats`)).json(); } catch {}
  const t = s.byType || {}, top = s.top || {};
  console.log(`\n  ArtempireMJ — behavior recommendations`);
  console.log(`  signal so far: ${s.total} events (impr:${t.impression || 0} click:${t.click || 0} affiliate:${t.affiliate || 0} search:${t.search || 0} subscribe:${t.subscribe || 0})`);

  if (s.total < 200) {
    console.log(`\n  NOT ENOUGH DATA YET (<200 events). Recommendations would be noise. Keep accumulating;`);
    console.log(`  the priority remains TRAFFIC (the discovery/ranking plan), not micro-optimisation.\n`);
    return;
  }
  const recs = [];
  const clicks = top.click || [];
  if (clicks.length) recs.push(`FEATURE the most-clicked: ${clicks.slice(0, 5).map((x) => x.target).join(', ')} (real demand — give them hero/worth-a-trip slots).`);
  const searches = top.search || [];
  if (searches.length) recs.push(`COVER the top searches: ${searches.slice(0, 6).map((x) => x.target).join(', ')} (add/strengthen events for these queries).`);
  const aff = top.affiliate || [];
  if (aff.length) recs.push(`TRAVEL intent is on: ${aff.slice(0, 4).map((x) => x.target).join(', ')} (push the Getting-There + /travel here; seasonal Dec/Mar/May).`);
  const clickRate = (t.click || 0) / Math.max(1, t.impression || 1);
  recs.push(`Engagement: click-rate ${(clickRate * 100).toFixed(1)}%, subscribe ${t.subscribe || 0}. ${clickRate < 0.08 ? 'Low click-rate -> sharpen hero relevance.' : 'Healthy click-rate.'}`);

  console.log('\n  RECOMMENDATIONS (ranked):');
  recs.forEach((r, i) => console.log(`   ${i + 1}. ${r}`));
  console.log('\n  These map to the feature-selection bandit (let it act once its gauge is green).\n');
};
main().catch((e) => { console.error(e); process.exit(2); });
