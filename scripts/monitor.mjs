#!/usr/bin/env node
// Consistent SEO + AEO + ranking-readiness monitor. Runs on a schedule (cloud CI) so the site is
// always measured and improvable. It checks the SIGNALS that drive ranking + AI citation — the
// honest, automatable layer. TRUE positions need Google Search Console (connect it for real ranks);
// TRUE AI-citation needs spot-checks — but these readiness signals are what move both, and regress
// silently if unmonitored. Emits a score + the specific fixes.
//   node scripts/monitor.mjs [https://artempiremj.com]

const BASE = process.argv[2] || 'https://artempiremj.com';
const UA = 'Mozilla/5.0 (compatible; ArtempireMJ-Monitor/1.0; +https://artempiremj.com)';
const get = async (p) => { try { const r = await fetch(BASE + p, { headers: { 'User-Agent': UA } }); return { ok: r.ok, status: r.status, text: await r.text() }; } catch { return { ok: false, status: 'err', text: '' }; } };

const checks = [];
const add = (area, name, pass, detail) => checks.push({ area, name, pass, detail });

const main = async () => {
  const [sm, robots, llms, home, fest, city, story, faq] = await Promise.all([
    get('/sitemap.xml'), get('/robots.txt'), get('/llms.txt'), get('/'),
    get('/festival/blankets-and-wine-nairobi/'), get('/city/nairobi/'),
    get('/story/fnb-art-joburg-18th-edition/'), get('/faq/'),
  ]);

  // --- SEO / ranking-readiness ---
  const smCount = (sm.text.match(/<loc>/g) || []).length;
  add('SEO', 'sitemap complete', smCount > 150, `${smCount} URLs`);
  add('SEO', 'robots -> sitemap', /Sitemap:/i.test(robots.text), '');
  add('SEO', 'max-image-preview (Discover)', /max-image-preview:large/.test(home.text), '');
  add('SEO', 'og:image sized', /og:image:width/.test(home.text), '');
  add('SEO', 'festival page indexable', fest.ok && !/noindex/.test(fest.text), `${fest.status}`);
  add('SEO', 'city page indexable', city.ok && !/noindex/.test(city.text), `${city.status}`);
  // ranking-readiness proxy: do the moat pages actually carry the target long-tail terms?
  add('SEO', 'city page targets "Nairobi" intent', /art in nairobi|what is on in nairobi/i.test(city.text), '');
  add('SEO', 'festival page targets the event name', /blankets/i.test(fest.text), '');

  // --- AEO / AI-citation readiness ---
  add('AEO', 'llms.txt served', llms.ok && llms.text.length > 200, `${llms.status}, ${llms.text.length}b`);
  add('AEO', 'llms.txt lists festivals + calendar', /festival/i.test(llms.text) && /calendar/i.test(llms.text), '');
  add('AEO', 'Festival schema on event pages', /"@type":\s*"Festival"/.test(fest.text), '');
  add('AEO', 'NewsArticle schema on World stories', /"@type":\s*"NewsArticle"/.test(story.text), '');
  add('AEO', 'BreadcrumbList present', /BreadcrumbList/.test(fest.text), '');
  add('AEO', 'ItemList (calendar) schema', /ItemList/.test(home.text) || /ItemList/.test((await get('/festivals/')).text), '');
  add('AEO', 'FAQPage schema', /FAQPage/.test(faq.text), `${faq.status}`);

  const byArea = {};
  for (const c of checks) (byArea[c.area] ||= []).push(c);
  console.log(`\n  ArtempireMJ monitor — ${BASE}`);
  let pass = 0;
  for (const [area, list] of Object.entries(byArea)) {
    console.log(`\n  ${area}`);
    for (const c of list) { console.log(`   ${c.pass ? 'OK ' : 'XX '} ${c.name}${c.detail ? '  (' + c.detail + ')' : ''}`); if (c.pass) pass++; }
  }
  const score = Math.round((pass / checks.length) * 100);
  console.log(`\n  SCORE: ${pass}/${checks.length} (${score}%)`);
  const fails = checks.filter((c) => !c.pass);
  if (fails.length) console.log('  FIX: ' + fails.map((c) => `${c.area}/${c.name}`).join('; '));
  console.log('  NOTE: connect Google Search Console for true keyword positions + impressions/CTR.\n');
  process.exit(fails.length > 2 ? 1 : 0);
};
main().catch((e) => { console.error(e); process.exit(2); });
