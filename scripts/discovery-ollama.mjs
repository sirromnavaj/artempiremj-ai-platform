#!/usr/bin/env node
// LLM-powered discovery on a FREE Ollama model (no paid API). Re-checks the source-weighting
// EXPLOIT hosts (the proven event/exhibition pages), fetches each, and asks Ollama to extract the
// current/upcoming events with dates. Output is a REVIEW QUEUE (proposed-events.json) — NOTHING is
// auto-published; it still passes the fact-verify gate. Works locally (your gemma3:4b at
// localhost:11434) or in CI (a small model). Env: OLLAMA_HOST, OLLAMA_MODEL.
//   OLLAMA_MODEL=gemma3:4b node scripts/discovery-ollama.mjs
import fs from 'node:fs';

const OLLAMA = process.env.OLLAMA_HOST || 'http://localhost:11434';
const MODEL = process.env.OLLAMA_MODEL || 'gemma3:4b';
const INDEX = process.env.INDEX || 'https://artempiremj.com/events-index.json';
const OUT = new URL('../site/src/data/proposed-events.json', import.meta.url);
const UA = 'Mozilla/5.0 (compatible; ArtempireMJ-Discovery/1.0; +https://artempiremj.com)';
const MAX_HOSTS = Number(process.env.MAX_HOSTS || 8);

const strip = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim().slice(0, 7000);

async function ollama(prompt) {
  const r = await fetch(`${OLLAMA}/api/generate`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, prompt, stream: false, format: 'json', options: { temperature: 0.1 } }),
  });
  if (!r.ok) throw new Error(`ollama ${r.status}`);
  const { response } = await r.json();
  try { return JSON.parse(response); } catch { return null; }
}

const PROMPT = (host, text) => `You read a web page from ${host} and extract REAL art events shown on it.
Return strict JSON: {"events":[{"title","start_or_window","city","summary"}]}. Only events actually
present on the page. Use ISO dates (YYYY-MM-DD) if a specific date is shown, else a short window like
"Usually November". Do NOT invent events or dates. If none, return {"events":[]}.

PAGE TEXT:
${text}`;

const main = async () => {
  // proven hosts from the learned posteriors, with a representative source URL from the index
  const postFile = new URL('../site/src/data/source-posteriors.json', import.meta.url);
  const posteriors = fs.existsSync(postFile) ? JSON.parse(fs.readFileSync(postFile, 'utf8')).sources : {};
  const { items } = await (await fetch(INDEX, { headers: { 'User-Agent': UA } })).json();
  const urlForHost = {};
  for (const it of items) { try { const h = new URL(it.url).host.replace(/^www\./, ''); if (!urlForHost[h]) urlForHost[h] = it.url; } catch {} }
  const hosts = Object.entries(posteriors)
    .map(([h, s]) => ({ h, rel: s.alpha / (s.alpha + s.beta), n: s.alpha + s.beta - 2 }))
    .filter((x) => x.n > 0 && urlForHost[x.h]).sort((a, b) => b.rel - a.rel).slice(0, MAX_HOSTS);

  const proposed = [];
  for (const { h } of hosts) {
    try {
      const html = await (await fetch(urlForHost[h], { headers: { 'User-Agent': UA } })).text();
      const out = await ollama(PROMPT(h, strip(html)));
      for (const e of (out?.events || [])) if (e?.title) proposed.push({ ...e, host: h, source: urlForHost[h], status: 'proposed' });
      console.log(`  ${h}: ${(out?.events || []).length} candidate(s)`);
    } catch (e) { console.log(`  ${h}: skipped (${String(e.message).slice(0, 30)})`); }
  }

  fs.writeFileSync(OUT, JSON.stringify({ generated: new Date().toISOString().slice(0, 10), model: MODEL, count: proposed.length, proposed }, null, 2));
  console.log(`\n  ${proposed.length} proposed events -> proposed-events.json (REVIEW QUEUE — fact-verify before publishing).\n`);
};
main().catch((e) => { console.error(e); process.exit(2); });
