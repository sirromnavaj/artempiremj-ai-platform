# ArtempireMJ — code & site

This repo holds the public-facing site (`frontend/`) for **artempiremj.com** plus dormant infrastructure that will activate as the brand grows. Founded 2023 in Nairobi by Morris Javan Andanje.

## Status (2026-05-23)

| Component | State | What it does |
|---|---|---|
| `frontend/` | LIVE on Netlify | React + Babel-in-browser static site. 11 components (Hero, Discover, Editorial, Series, Spotlight, Divisions, Commission, Develop, Sustain, Sections, App). Replaces the previous GoDaddy coming-soon page. |
| `frontend-v2-future/` | Dormant Next.js scaffold | Next.js 15 + React 19 + TypeScript. When operator capacity allows, the v1 frontend ports to this stack. |
| `backend/` | Dormant FastAPI placeholder | Reserved for future API endpoints (analytics relay, sync jobs, etc.). Not deployed. |
| `docker-compose.yml` | Dormant | Reserved for full-stack local dev once backend is built. |

## How to run the site locally

```bash
cd frontend
# any static server works
python -m http.server 8000
# OR
npx serve .
```

Open http://localhost:8000.

## Deploy

Netlify auto-deploys from `main` branch via `netlify.toml`. Custom domain `artempiremj.com` points here once GoDaddy DNS is repointed.

## Architecture + voice

- Full architecture doc: `frontend/ARCHITECTURE.md` (mirrored from `04_infrastructure/artempiremj-site-v0/ARCHITECTURE.md` in the Nohvara Continuum repo)
- Voice + brand discipline gated by the `artempiremj-complete-system` skill (Nohvara `03_sandboxes/artempire/artempiremj-skill-v2.5-rev1/`)
- Launch press release draft: `frontend/LAUNCH-PRESS-RELEASE.md`

## Key rules

- All content voice-gated through the skill's 13 hard stops before publish
- No AI-generated copy on the public surface
- No stock photography — operator + correspondents + properly credited press only
- Forms route to Netlify Forms (commission, contributor, feedback, newsletter)
- The site IS the canonical home; social posts link back here (backlink farming)

## Roadmap

1. **v1 (THIS WEEK):** site live at artempiremj.com replacing coming-soon. v0 React-CDN. Forms wired. SEO meta + JSON-LD + sitemap + robots in place.
2. **v1.1 (next 2 weeks):** migrate to Next.js (`frontend-v2-future/` → `frontend/`). Add proper build pipeline. Performance optimization.
3. **v1.2 (month 2):** Supabase wiring for events / editorial / spotlight content. Sheet → Supabase sync.
4. **v2 (month 3):** Beehiiv newsletter integration. Selar.co digital products. YouTube channel kickoff.
5. **v3 (months 4-6):** Multilingual (per skill Phase 2). AI Itineraries personalization layer. Backend activation.

License: All rights reserved. Editorial content © ArtempireMJ. Photography credits per image.
