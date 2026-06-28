# ArtempireMJ Global Art Calendar — Auto-Update Architecture Runbook

**Owner:** ArtempireMJ (DISCOVER radar)
**Companion doc:** `artempiremj-calendar-data-sources.md` (the current 58-entry seed + source list)
**Stack:** static Astro on Cloudflare Pages · D1 (`opportunities` table) · Pages Functions · Workers cron
**Date:** 2026-06-28
**North-star constraint:** the FULL calendar is always browsable AND it refreshes without manual rebuilds, while **never publishing an unverified date** (brand honesty rule from `calendar.ts`: "if you're not sure it's true, verify it, then state it").

---

## 0. The one-paragraph answer

Make **D1 the source of truth**, not the TypeScript seed. Everything lands in `opportunities` as `verified = 0` (pending). A **verify gate** — date present + source URL resolves + deadline not past + DISCOVER/operator confirm — flips it to `verified = 1` (published). A nightly **Worker cron** runs auto-expiry (past-deadline → demote) and, on any change, calls a **Pages Deploy Hook** to rebuild the static site so the bulk calendar stays fully crawlable for AEO. A small **client island** reads live-from-D1 only for the "what's new / closing soon" strip so freshness never waits on a build. The realistic source mix is **self-submit first, curated/AI-assisted extraction second, feeds where they exist third, scraping last** — because the real-world platforms we benchmarked are overwhelmingly submit-plus-curation, not API-fed.

---

## 1. How real art/event calendars actually stay fresh (researched)

The important finding: **none of the art-world calendars run on clean public APIs.** The realistic mix is human curation on top of self-submission, with newsletters/aggregators as the discovery layer.

| Platform | How listings get in | Feed/API? |
|---|---|---|
| **ArtRabbit** | Self-submit via a dedicated link; team **curates weekly** "from a selection of submissions, newsletters, magazines and blogs," then emails ~19,000 practitioners. ([artrabbit.uservoice.com](https://artrabbit.uservoice.com/knowledgebase/articles/1999072-how-can-i-submit-an-open-call-or-artist-opportunit), [artrabbit.com](https://www.artrabbit.com/artist-opportunities)) | No public listings API; curation-led. |
| **Res Artis** | Members (residency orgs) **self-post** open calls into a searchable directory. ([resartis.org](https://resartis.org/open-calls/)) | Membership-gated submission, no open API. |
| **e-flux** | Institutions **pay to post** "announcements" (emailed press releases). Discovery via email + an **RSS feed** on the journal/announcements. ([e-flux.com](https://www.e-flux.com/announcements/176476/open-call-for-submissions)) | RSS yes (journal/announcements); paid submission is the real pipe. |
| **ArtConnect** | Organisations submit; "published daily" by leading orgs. ([artconnect.com](https://www.artconnect.com/opportunities)) | Submission-led. |
| **CaFÉ / CallForEntry** | 800+ arts orgs **self-administer** their own calls; calls **auto-close at the deadline date/time**. ~175k artists apply. Has a public **call-listings feed**. ([callforentry.org](https://www.callforentry.org/), [cafe.callforentry.org/feed](https://cafe.callforentry.org/feed/)) | Listings feed yes; it is itself a submission platform. |
| **Biennial Foundation / Universes in Universe** | **Editorial directory** — researchers maintain biennial dates + open calls by hand from primary sources. ([biennialfoundation.org](https://biennialfoundation.org/)) | No API; authoritative human-kept directory. |
| **General event aggregators** | Import via **ICS/iCal, Google Calendar, CSV** feeds, plus targeted scrapers (Eventbrite/Meetup/Lu.ma → .ics). ([theeventscalendar.com](https://theeventscalendar.com/knowledgebase/event-aggregator-importing-events-from-a-feed-or-url/), [apify.com](https://apify.com/webdatalabs/event-scraper-pro)) | ICS/iCal is the lingua franca outside art-specific sites. |

**Takeaway for us:** the on-brand model (the one the payers already use elsewhere) is **self-submission + light curation**. Feeds (RSS/ICS/structured JSON-LD) exist only at the margins of art sources. Scraping is a fallback, never the spine. This matches the brand frame in `schema.sql`: "the payers are the opportunity-givers" — so we want them **submitting to us**.

---

## 2. The architecture in words (sources → published → expired)

```
                         ┌─────────────────────────── SOURCES ───────────────────────────┐
  (A) Submit intake      (B) Feed ingest          (C) AI-assisted          (D) Manual
  /list-an-opportunity   RSS (e-flux)             extraction (DISCOVER     operator entry
  form  ──POST──►        ICS/JSON-LD where        agent reads aggregator   (admin)
                         present                  pages, proposes rows)
        │                      │                        │                       │
        └──────────────┬───────┴───────────────┬────────┴───────────────────────┘
                       ▼                        ▼
            ┌──────────────────────────────────────────────┐
            │  D1  opportunities   (verified = 0  PENDING)  │  ← everything lands here first
            │  + source, confidence, submitted_by, hash     │
            └──────────────────────────────────────────────┘
                       │
                       ▼   VERIFY GATE  (Worker / Function)
        has start|deadline? ──no──► stays PENDING (window-only, never asserts a date)
        url resolves 200? ─────no──► flag-for-review
        deadline >= today? ───no──► auto-expire (verified→0, status=closed)
        dedupe hash unique? ──no──► merge, keep highest confidence
        operator/DISCOVER confirm (high-value) ─► set verified = 1  PUBLISHED
                       │
        ┌──────────────┴───────────────┐
        ▼                              ▼
  STATIC BUILD (bulk, crawlable)   LIVE ISLAND (freshness)
  Astro reads a D1 JSON export →   /api/opportunities Pages Function
  prerendered region/itinerary/    reads D1 at request time → hydrates
  opportunity pages (AEO)          a "new / closing soon" strip only
                       │
                       ▼
  Worker CRON (nightly 02:00):
   1. run auto-expiry sweep        →  if any row changed status…
   2. POST Pages Deploy Hook URL   →  static site rebuilds with fresh published set
```

Two clocks, on purpose:
- **Slow clock (build):** the whole calendar, rebuilt nightly (or on-change), fully static and crawlable. This is the AEO surface and survives Worker outages.
- **Fast clock (island):** a single client-side fetch to a Function for the "what's new / closing in 7 days" strip, so a freshly-verified entry shows up immediately without waiting for a rebuild. The island is **additive**: if the fetch fails, the static page is still complete.

This hybrid is necessary because **the D1 binding is `undefined` at Pages build time** — you cannot query D1 inside `npm run build` ([Cloudflare community](https://community.cloudflare.com/t/use-d1-binding-at-pages-build-time/761943)). So the build reads a **JSON snapshot exported from D1** (the cron or deploy step dumps `verified=1` rows to `src/data/opportunities.published.json`), and only the runtime island talks to D1 live.

---

## 3. The realistic source mix (priority order for a solo operator)

| Tier | Mechanism | Maintenance | On-brand? | Verdict |
|---|---|---|---|---|
| **1 — spine** | **(A) Self-submit** `/list-an-opportunity` → D1 pending | Near-zero ongoing; just review | Highest — payers come to us | **Build first.** |
| **2 — radar** | **(C) AI-assisted extraction**: DISCOVER agent reads the aggregator list (Biennial Foundation, e-flux, Res Artis, TransArtists, Universes) and proposes pending rows with `source` + `confidence` | Low — agent drafts, human confirms | Yes — this is the existing DISCOVER process, automated | **Build second.** |
| **3 — feeds** | **(B) RSS** (e-flux announcements) and **JSON-LD `schema.org/Event`** parsing where present; **ICS** only if a source offers it | Low once wired, but few art sources offer clean feeds | Neutral | **Opportunistic — wire e-flux RSS only.** |
| **4 — fallback** | **(D) Structured scraping** of named organiser pages (fair "/tickets", residency portals) | High & brittle; 403s/HTTP/self-signed already logged in data-sources runbook | Risky | **Last resort, per-source, always behind the verify gate.** |

Realism note from our own data: the data-sources runbook already records that `artdubai.ae`, `kochimuzirisbiennale.org`, `busanbiennale.org`, `taipeibiennial.org` block or break automated fetch. Scraping at scale will fight this constantly — which is exactly why Tier 1+2 carry the load and scraping stays a narrow, opt-in fallback.

For feed/JSON-LD parsing, prefer the schema.org `Event` type (`startDate`, `endDate`, `url`) extracted from `<script type="application/ld+json">` blocks — this is the standard structured-event format aggregators rely on ([schema.org/Event](https://schema.org/Event), [theeventscalendar.com](https://theeventscalendar.com/knowledgebase/optimizing-ea-imports/)).

---

## 4. Cloudflare mechanics (exact)

### 4.1 D1 as source of truth — schema additions
The current `opportunities` table already has `verified` and `updated_at`. Add the columns the gate needs (additive migration, non-breaking):

```sql
ALTER TABLE opportunities ADD COLUMN status        TEXT NOT NULL DEFAULT 'pending'; -- pending|open|closing-soon|closed
ALTER TABLE opportunities ADD COLUMN source        TEXT;     -- submit | rss:eflux | discover-ai | scrape:<host> | manual
ALTER TABLE opportunities ADD COLUMN confidence    REAL NOT NULL DEFAULT 0;        -- 0..1, AI/feed self-rated
ALTER TABLE opportunities ADD COLUMN submitted_by  TEXT;     -- email for self-submit intake
ALTER TABLE opportunities ADD COLUMN dedupe_hash   TEXT;     -- sha256(normalized title+organizer+url)
ALTER TABLE opportunities ADD COLUMN flagged       INTEGER NOT NULL DEFAULT 0;     -- needs human look
CREATE INDEX IF NOT EXISTS idx_opp_status ON opportunities(status);
CREATE UNIQUE INDEX IF NOT EXISTS idx_opp_dedupe ON opportunities(dedupe_hash);
```

`verified` stays the publish flag; `status` carries the lifecycle (`pending → open → closing-soon → closed`). Only `verified=1 AND status IN ('open','closing-soon')` ever appears on the published static surface.

### 4.2 The submit intake (Pages Function) — clone of the existing pattern
We already have `functions/api/submit.ts` (artist submissions → D1, honeypot, Resend notify). Build `functions/api/list-an-opportunity.ts` the same way:
- `onRequestPost`, parse form/JSON, `bot-field` honeypot.
- Validate: title, organizer, url (must be `https`), region, and **either** a parseable ISO `start`/`deadline` **or** a plain-language `window`.
- Compute `dedupe_hash`; `INSERT … ON CONFLICT(dedupe_hash) DO NOTHING`.
- Always insert as `verified=0, status='pending', source='submit', submitted_by=<email>`.
- Resend-notify the operator (reuse `RESEND_API_KEY`/`NOTIFY_TO`).
A submitter never gets to set a published date — they propose, the gate disposes.

### 4.3 The verify gate + auto-expiry (Worker cron)
A scheduled Worker (`workers/calendar-cron`) with a `scheduled()` handler and a cron trigger (Cron Triggers map a cron expression to a Worker — [Cloudflare docs](https://developers.cloudflare.com/workers/configuration/cron-triggers/)). Nightly at 02:00:

```
1. EXPIRE:   UPDATE opportunities SET status='closed', verified=0
             WHERE deadline IS NOT NULL AND date(deadline) < date('now') AND status!='closed';
2. WARN:     UPDATE … SET status='closing-soon'
             WHERE verified=1 AND date(deadline) BETWEEN date('now') AND date('now','+7 days');
3. (optional) URL liveness sample on a rotating slice → set flagged=1 on non-200.
4. EXPORT:   SELECT published rows → write src/data/opportunities.published.json (commit or R2/KV).
5. REBUILD:  if any row changed, POST the Pages Deploy Hook URL.
```

Auto-expiry is the honesty rule made mechanical: a past deadline cannot stay "open". This mirrors CaFÉ, where "calls automatically close at designated deadline dates" ([callforentry.org](https://www.callforentry.org/)).

### 4.4 The rebuild trigger (Deploy Hook)
Create a **Pages Deploy Hook**: Pages project → Settings → Builds → *Add deploy hook* (name + branch); every POST to its URL triggers a fresh build ([Cloudflare Pages docs](https://developers.cloudflare.com/pages/configuration/deploy-hooks/), [intro blog](https://blog.cloudflare.com/introducing-deploy-hooks-for-cloudflare-pages/)). The cron Worker POSTs to it — the documented "Worker + Cron Trigger rebuilds your Pages project on a schedule" pattern, no external cron service needed ([codemzy.com](https://www.codemzy.com/blog/scheduling-builds-cloudflare)). Rate limits: 10 builds/min/Worker, 100/min/account — irrelevant at our nightly cadence. Store the hook URL as a Worker secret, never in the repo.

Trigger policy:
- **On-change** (operator verifies a high-value entry in admin) → immediate single POST.
- **Nightly** → one POST after the expiry sweep if anything changed.
- Debounce: coalesce multiple verifies within a window into one build.

### 4.5 The live island (freshness without a build)
A `functions/api/opportunities.ts` `onRequestGet` returns `verified=1 AND status IN('open','closing-soon')` ordered by deadline, cached at the edge (`Cache-Control: max-age=300`). A tiny client component on the homepage/region pages fetches it to render only the **"New & closing soon"** strip. The bulk region/`opportunity/[id]`/itinerary pages stay **prerendered** from the JSON snapshot so crawlers and AEO see complete, static content — Cloudflare's own "static sites dynamic with D1" pattern ([blog.cloudflare.com](https://blog.cloudflare.com/making-static-sites-dynamic-with-cloudflare-d1/)). Astro Cloudflare adapter prerenders by default and lets specific routes opt into server rendering ([Astro docs](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)).

### 4.6 Keeping it crawlable (AEO) AND fresh
- Bulk pages: 100% static HTML from the snapshot → fully indexable, fast, survives any runtime failure.
- Each `opportunity/[id]` page emits `schema.org/Event` JSON-LD (`startDate`/`endDate`/`url`) so our own listings are machine-readable the way we read others.
- The island adds recency without removing crawlable content (progressive enhancement). If JS is off or the Function is down, the static page is still correct.
- Nightly rebuild guarantees the static surface is never more than ~24h stale; the island closes the intra-day gap.

---

## 5. The VERIFY GATE — honesty rule, automated

The rule "never publish an unverified date" becomes four hard, mechanical checks. A row reaches `verified=1` only when **all** pass:

1. **Date integrity** — has a parseable ISO `start` or `deadline`, OR it has only a `window` and therefore is published *without asserting any specific date* (window-only entries are allowed live, dates are not invented). This preserves the existing `calendar.ts` contract: "When dates are not yet verified, a plain-language window instead of a fake date."
2. **Not-expired** — `deadline >= today`. Auto-expiry (4.3) enforces this continuously, so nothing can rot into a lie.
3. **Source resolves** — `url` returns 200 (checked at submit and sampled by cron). Non-200 → `flagged=1`, held in pending.
4. **Human/AI confirm tier** — by `source` + `confidence`:
   - `source='submit'` from a recognised institution **or** `source='discover-ai'/'scrape'` → **operator confirms** before publish (one click in admin).
   - High-confidence feed (`rss:eflux`, `confidence>=0.8`) with a future date and live URL → may auto-publish but is **sampled** weekly.
   - Anything `confidence<0.5` or `flagged=1` → stays pending until a human looks.

Supporting fields: `confidence` (feed/AI self-rating), `source` (provenance for audit), `flagged` (review queue). The admin view is simply `SELECT * WHERE verified=0 OR flagged=1 ORDER BY confidence DESC` — the operator's daily 5-minute triage. This keeps the DISCOVER 4-week regional rotation as the **curation/quality** layer on top of an always-fresh, always-honest pending pipeline.

---

## 6. Phased build plan (cheap now → richer later)

**Phase 0 — flip the source of truth (½ day, cheap).**
Migrate the seed into D1 (`opportunities` already exists; run §4.1 ALTERs). Add a build step that exports `verified=1` rows to `opportunities.published.json`; point `calendar.ts` at the JSON. Now the site reads D1-derived data, not a hardcoded array. No new surfaces yet.

**Phase 1 — auto-expiry + nightly rebuild (½ day, cheap, biggest honesty win).**
Stand up `workers/calendar-cron` with the expiry sweep (§4.3 steps 1–2,4) + Pages Deploy Hook POST (§4.4). This alone makes the calendar self-maintaining and guarantees no expired date is ever shown. **Do this first if forced to pick one thing.**

**Phase 2 — the submit intake (1 day, on-brand spine).**
Build `/list-an-opportunity` page + `functions/api/list-an-opportunity.ts` (§4.2) + the admin triage view (§5). This is the payer-facing front door — the cleanest, most on-brand source.

**Phase 3 — the live island (½ day, freshness).**
Add `functions/api/opportunities.ts` + the "New & closing soon" strip (§4.5). Closes the intra-day staleness gap.

**Phase 4 — AI-assisted DISCOVER ingestion (1–2 days, leverage).**
Wire the DISCOVER agent to read the aggregator list and INSERT `source='discover-ai'` pending rows with `confidence`. Operator confirms in the same triage view. Automates the existing manual radar.

**Phase 5 — feed ingest, opportunistic (later).**
Parse e-flux announcements RSS and any `schema.org/Event` JSON-LD on watched organiser pages into pending rows. Wire **one** source end-to-end first (e-flux RSS) and prove the gate before adding more.

**Phase 6 — narrow scraping, only if a key source has no feed (last).**
Per-source extractors for high-value organiser pages that block nothing, always landing as pending behind the full verify gate. Expect breakage; keep each isolated.

Cheap-now = Phases 0–2 (self-maintaining + honest + payer intake) in ~2 days. Everything after is leverage, not survival.

---

## 7. Where this is uncertain

- **Build-time D1 access** is confirmed *unavailable* (binding undefined in `npm run build`) ([Cloudflare community](https://community.cloudflare.com/t/use-d1-binding-at-pages-build-time/761943)); the JSON-snapshot workaround is the accepted pattern but adds an export step that must run *before* each build. If the snapshot and the deploy hook race, a build could ship a stale snapshot — sequence them (export → then POST hook), or have the build step itself query D1 via the **REST API + API token** (works at build time because it is not a binding) instead of a snapshot file. Validate which is simpler in practice.
- **CaFÉ feed** (`cafe.callforentry.org/feed/`) is referenced but its format/terms are unconfirmed; treat as "investigate," not a wired source. Same for whether ArtRabbit/ArtConnect expose any feed — search returned none.
- **e-flux RSS** is confirmed for the journal/announcements but it is press-release prose, not structured open-call data; extraction quality (date parsing) is unproven and will need the AI step + verify gate, not naive ingest.
- **Auto-publish tier** (feed entries skipping human confirm) is a calculated risk against the honesty rule. Conservative default: **nothing auto-publishes except window-only entries; every dated entry waits for confirm** until the feed's precision is measured. Loosen only with evidence.
- **Scraping durability:** the data-sources runbook already logs 403/HTTP/self-signed failures on multiple organiser sites; assume scraped sources will break silently and need the `flagged` + URL-liveness sweep to catch rot.
- **Solo-operator load:** the model assumes a daily ~5-min triage actually happens. If it lapses, pending entries accumulate but — by design — nothing false publishes; the failure mode is *staleness*, not *dishonesty*, which is the correct way to fail for this brand.

---

## Sources

- ArtRabbit — how to submit an open call: https://artrabbit.uservoice.com/knowledgebase/articles/1999072-how-can-i-submit-an-open-call-or-artist-opportunit · what the opportunities are: https://artrabbit.uservoice.com/knowledgebase/articles/1999024-what-are-artrabbit-s-artist-opportunities · listings: https://www.artrabbit.com/artist-opportunities
- Res Artis open calls (member self-post): https://resartis.org/open-calls/
- e-flux announcements (paid submission + RSS): https://www.e-flux.com/announcements/176476/open-call-for-submissions
- ArtConnect opportunities: https://www.artconnect.com/opportunities
- CaFÉ / CallForEntry (auto-close at deadline, 800+ orgs): https://www.callforentry.org/ · listings feed: https://cafe.callforentry.org/feed/
- Biennial Foundation (editorial directory): https://biennialfoundation.org/
- Event aggregator ICS/iCal import: https://theeventscalendar.com/knowledgebase/event-aggregator-importing-events-from-a-feed-or-url/ · optimizing imports: https://theeventscalendar.com/knowledgebase/optimizing-ea-imports/ · event scraper: https://apify.com/webdatalabs/event-scraper-pro
- schema.org Event type: https://schema.org/Event
- Cloudflare Pages Deploy Hooks: https://developers.cloudflare.com/pages/configuration/deploy-hooks/ · intro: https://blog.cloudflare.com/introducing-deploy-hooks-for-cloudflare-pages/
- Cloudflare Workers Cron Triggers: https://developers.cloudflare.com/workers/configuration/cron-triggers/
- Scheduling Pages builds with a cron Worker: https://www.codemzy.com/blog/scheduling-builds-cloudflare
- D1 binding undefined at Pages build time: https://community.cloudflare.com/t/use-d1-binding-at-pages-build-time/761943
- Making static sites dynamic with D1: https://blog.cloudflare.com/making-static-sites-dynamic-with-cloudflare-d1/
- Astro Cloudflare adapter (prerender + per-route SSR): https://docs.astro.build/en/guides/integrations-guide/cloudflare/
