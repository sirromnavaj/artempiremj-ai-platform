# Changelog

All notable changes to artempiremj.com follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [v1.0.0] — 2026-05-23 — Launch

### Added
- **Public site** at `artempiremj.com` (React-CDN static, 11 components in `frontend/`)
- Editorial surfaces: Hero (3 variants) · Discover · Editorial · Series · Spotlight · Divisions · Commission · Develop · Sustain · About · Newsletter · Footer
- Netlify Forms: commission · contributor · feedback · newsletter
- SEO + AEO/GEO baseline: voice-led meta description · Open Graph · Twitter cards · JSON-LD Organization with `sameAs` to all four social channels · sitemap.xml · robots.txt · favicon
- On-brand 404 page (cream + Fraunces + orange stripe)
- Netlify config (`netlify.toml`) with SPA fallback, security headers, asset cache
- Architecture doc + launch press release draft mirrored into `frontend/`
- `.gitignore` for Python venv / node_modules / build outputs / secrets

### Preserved
- `frontend-v2-future/` — Next.js 15 + React 19 scaffold (v1.1 migration target)
- `backend/` — FastAPI placeholder (dormant, future API)
- `docker-compose.yml` — full-stack local dev (dormant)

### Voice-gate
- Title + description + OG copy rewritten through the caption-gate ("what artists noticed before the news did" — connects with what the audience values, not features)
- Zero AI-generated copy on public surfaces (skill rule)
- No stock photography (skill rule)

### Known gaps (tracked for next versions)
- Forms have no relational layer yet (auto-reply + 24h follow-up) — v1.1
- No Supabase wiring for events / editorial data (content is hardcoded in JSX arrays) — v1.2
- No Beehiiv newsletter embed (newsletter form posts to Netlify Forms only) — v2.0
- No Selar.co integration for digital products — v2.0
- Google Business Profile not linked / not publicly indexed — operator-side action
- LinkedIn / Instagram / TikTok / Facebook URLs in JSON-LD `sameAs` need verification

[v1.0.0]: https://github.com/sirromnavaj/artempiremj-ai-platform/releases/tag/v1.0.0
