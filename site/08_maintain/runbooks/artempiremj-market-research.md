# ArtempireMJ Global Art Calendar — Market Research → Market-Ready

> Purpose: make the ArtempireMJ Global Art Calendar (Astro, static, crawlable) market-ready by learning from the real
> product landscape, then layering it onto our skill. Front door + AEO authority engine + departments (Spotlight,
> Art Itineraries) + owned newsletter → paid-tier funnel. Brand: warm, one masthead, audience-as-hero, engine hidden.
>
> Date: 2026-06-28 · Status: research complete, ready to feed build.

---

## 1. THE LANDSCAPE

What the leading art-opportunity / calendar / listings products actually do, and where each leaves a gap ArtempireMJ exploits.

| Product | What it does | How entries are structured | Strength | Gap (our opening) |
|---|---|---|---|---|
| **e-flux** (announcements / agenda) | Press-release distribution + permanent archive for the contemporary-art elite; email blasts to influential art professionals since 1998 | Each announcement = its own archived URL with image + press text; "Agenda" is a date-driven event stream | Authority + permanence + tastemaker network; URLs persist and get cited | Cold, institutional, art-theory register; pay-to-post (premium) excludes most of the world; thin on Africa/Global South; not warm, not artist-voiced |
| **ArtRabbit** | International contemporary exhibitions/events + curated "Artist Opportunities"; weekly email to ~23.5k–35k practitioners | Open-submission events; opportunities tagged by **type** (Residency, Exhibition, Prize/Award, Fellowship, Grant, Job, Studio Space, Writing, Competition, Curator-in-Residence) and **region** | Clear opportunity taxonomy; real distribution; explicit ad/listing products (see §4) | UK/Berlin/LA/NY-centric; utilitarian listing feel; no narrative/editorial warmth; Global South sparse |
| **Artsy (events / fairs)** | Marketplace-first; hosts 60+ art fairs online; news desk | Fair pages + gallery/artwork inventory; events are an adjunct to the marketplace | SEO/domain authority, fair coverage, collector reach | Events are secondary to selling artworks; not an opportunities calendar for artists; transactional not warm |
| **Contemporary Art Daily** | Daily photo-documentation of exhibitions worldwide | Each post = one show: large install photos + checklist (artist, venue, dates, press release), minimal prose | Authority through **consistency + image quality + restraint**; heavily cited reference for "what shows happened" | Pure documentation, no opportunities/calendar-forward, no traveller/newcomer audience, near-zero Global South |
| **ArtConnect** (open calls) | Curated open calls, residencies, grants, competitions + artist profiles | Opportunity entries filterable by **deadline, location, fully-funded, accommodation, discipline**; deadline alerts; "without fees" view | Best-in-class opportunity filtering + alerts + free-to-join; has Africa content (e.g. residency roundups) | Functional/database feel; engine visible; warmth and story thin; not a destination you read |
| **Res Artis** | Worldwide residency network — 700 centres in 80+ countries | Map-based discovery; member profiles carry residency deadlines + program info | Global reach + map IA + trusted membership body | Members-only supply (only listed orgs); residencies only; dated UX; not editorial |
| **TransArtists** | Searchable artist-in-residence knowledge base | Filters by **country, discipline, theme**; strict inclusion rules (recurring, non-profit-motive, open application) | Curatorial trust via inclusion criteria; knowledge resource | Residencies only; reference-desk feel, not warm or calendar-forward |
| **Biennial Foundation** | Authoritative directory of biennials worldwide | Geographic directory + biennial map + magazine | The canonical biennial reference; genuinely global incl. Lagos/Dakar | Biennials only; directory is static reference, not a living calendar or funnel |
| **CaFÉ / CallForEntry** | Open-call **application management** SaaS for orgs (juried shows) | Org-created calls; artists apply + pay entry fees through the platform | Workflow depth; trusted by agencies/universities/arts councils | It's submission plumbing, not a discovery/editorial destination for artists or travellers |
| **ArtCall** | Lighter open-call hosting; entry fees → organiser's Stripe directly; no setup/annual fee | Per-call hosted pages | Cheap, organiser-friendly, no platform lock-in | Same: tooling, not a read-it audience or AEO authority |
| **Ocula** | Discovery of contemporary art/exhibitions/fairs/biennials + magazine + map; gallery partnerships | Exhibitions, fairs, events as browsable + map view; "My Ocula" membership | Polished editorial+commercial blend; map discovery; magazine authority | Gallery/collector-facing; not an opportunities engine for working artists; premium/Western tilt |
| **See Saw / Colossal / Bubblegum Club** (editorial roundups) | Monthly "open calls, residencies, grants" editorial roundups | Human-curated lists inside articles, chronological by deadline | Warm editorial voice + trust + shareability (the model closest to our tone) | Roundups are periodic + unstructured (not filterable/structured data); poor for AEO; not a standing calendar |

### The synthesis — where ArtempireMJ wins
The market splits into two camps that never merge:
1. **Structured-but-cold tools** (ArtConnect, CaFÉ, Res Artis, TransArtists, Biennial Foundation) — filterable, authoritative, but database-feeling and engine-visible.
2. **Warm-but-unstructured editorial** (Colossal/See Saw roundups, Bubblegum Club) — lovely voice, shareable, but periodic, unstructured, AEO-invisible, not a destination.

**No one is both warm *and* structured *and* genuinely global (Africa/Global South first-class), told through artists, with one masthead.** That is the ArtempireMJ position: the editorial warmth of Colossal + the structured filterability/alerts of ArtConnect + the global reach of Res Artis/Biennial Foundation + Africa/Global-South coverage that all of them under-serve — packaged as a destination you *read*, not a database you *query*, with the engine hidden.

Secondary gaps to exploit: (a) **travellers + newcomers + collectors** are never first-class audiences in opportunity products (they're artist-only or collector-only); our audience-as-hero spans all four. (b) **Africa/Global-South coverage** is thin-to-absent everywhere except sporadic editorial roundups — owning it is both a moral and an SEO/AEO moat (low-competition, high-intent queries).

---

## 2. MARKET-READY UX / DESIGN PATTERNS TO ADOPT

Patterns drawn from current calendar/editorial UX practice (2026) plus what the landscape leaders do well.

### Information architecture (the spine)
- **Three intersecting axes** every opportunity/event is filed under, mirroring ArtRabbit + ArtConnect: **Type** (Open Call · Residency · Grant/Award · Fair · Biennial · Festival), **Region/City**, **Deadline/Date**. Every entry must be reachable from all three.
- **Faceted filtering** as the core interaction: Region, Type, Deadline window, "Fully funded / no-fee", Discipline. ArtConnect's filter set (deadline, location, fully-funded, accommodation, discipline) is the proven baseline — copy it, then add **"Africa / Global South"** as a first-class facet no competitor offers.
- **City pages** as durable landing pages ("Open calls & art events in Lagos / Nairobi / Dakar / Venice"). These are SEO/AEO goldmines (high-intent, low-competition for African cities) and the natural bridge into **Art Itineraries**. Each city page = standing hub that aggregates its events + a Spotlight + an itinerary tease.
- **Individual event/opportunity pages are the atomic unit** — one entity per URL (this is *mandatory* for schema, see §3). Never trap an opportunity inside a roundup-only article.

### Calendar / list patterns
- **Default to list/agenda, not grid.** Opportunity discovery is deadline-driven, not month-grid-driven. Mobile especially: agenda (chronological list) beats month grid; month grid only as a compact navigator on top.
- **"Closing soon" rail** — a sorted-by-deadline strip ("Deadlines this week", "Closing in 7 days"). This is the single highest-urgency, highest-CTR module and the strongest newsletter hook. None of the cold tools surface urgency warmly; we make it the hero of the homepage.
- **Card vs list:** use **cards for editorial/Spotlight/itinerary** (image-forward, warm) and **dense list rows for the calendar** (scannable: title · type tag · city · deadline · funded?). Mixed-density is correct — don't force one.
- **Overflow handling:** when a date/city has many entries, show 2–3 + "+N more" expander (standard 2026 pattern) rather than dumping.
- **Status chips** on every entry: `Open` · `Closing soon` · `Closed` · `Fully funded` · `No fee`. Visual differentiation of today/selected/active is a baseline calendar expectation.

### Homepage arrangement (warm front door)
1. **Masthead + one-line promise** (audience-as-hero, not "we are a database").
2. **"Closing soon" rail** (urgency, above the fold).
3. **Spotlight feature** (one artist/opportunity told as story — the warmth).
4. **Browse-by-axis** entry points (Type / Region / City tiles).
5. **An Art Itinerary tease** (travel/newcomer/collector hook).
6. **Newsletter capture** woven in-content (not just a popup) — the funnel entry.

### Mobile + craft
- Bottom-sheet date/filter pickers over modals; swipe between months expected.
- Fast, static (Astro fits): perceived speed is a trust/authority signal and an AEO crawlability signal.
- Restraint as authority: Contemporary Art Daily proves consistency + image quality + minimal chrome reads as authoritative. One masthead, disciplined type, generous image space.

---

## 3. AEO / SEO BLUEPRINT (concrete, implementable)

Goal: be the **cited AI answer** ("what art residencies in Africa are open now?", "open calls closing this week in Lagos") and rank in event rich results. Astro static output is an advantage — fully crawlable, no JS-blocked content.

### 3.1 Structured data (JSON-LD, Google's recommended format)

**Every individual opportunity/event page** — one entity per URL (Google only surfaces single-event pages):
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "<opportunity title>",
  "startDate": "2026-07-01T09:00:00+03:00",
  "endDate": "2026-09-30T23:59:00+03:00",   // application window or event run
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "<venue / org>",
    "address": { "@type": "PostalAddress", "addressLocality": "Lagos", "addressCountry": "NG" }
  },
  "image": ["https://.../1x1.jpg","https://.../16x9.jpg"],
  "description": "<answer-first 1-2 sentence summary>",
  "organizer": { "@type": "Organization", "name": "<host>", "url": "<host url>" },
  "offers": {                                 // model the application/entry fee
    "@type": "Offer",
    "price": "0",                             // 0 for no-fee; surfaces "free to apply"
    "priceCurrency": "USD",
    "url": "<apply url>",
    "availability": "https://schema.org/InStock",
    "validThrough": "2026-09-30"              // deadline = freshness + "closing soon"
  }
}
```
- **Required props** (Google): `name`, `startDate`, `location`. Always include them. Add `endDate`/`validThrough` so AI knows when it closes.
- Use new v29.4 subtypes where they fit (`PerformingArtsEvent`, etc.) for precision, but base `Event` is the workhorse.

**Calendar / city / type listing pages** — wrap the list in **`ItemList`** so AI can extract the set as a structured collection:
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "url": "https://.../opportunity/<slug>" },
    { "@type": "ListItem", "position": 2, "url": "https://.../opportunity/<slug-2>" }
  ]
}
```
Reality check: Google's *visual carousel* rich result officially supports only Recipe/Course/Movie/Restaurant — **Events in ItemList won't render as a carousel.** We use ItemList anyway because **AI answer engines (AI Overviews, ChatGPT Search, Perplexity) read it to extract and cite the list** even when Google won't draw a carousel. That AEO benefit is the point, not the carousel.

**Every page:** `BreadcrumbList` (Home › Region › City › Opportunity) for hierarchy legibility. **FAQ-style pages** (e.g. "Artist residencies in Africa: how to apply"): `FAQPage` schema — strong for AI extraction and "People Also Ask".

### 3.2 Freshness (decisive in AEO)
- AEO has a hard recency bias: citations **decay after ~13 weeks** without updates; AI-surfaced URLs run ~26% fresher than classic search results; freshness ≈ 10% of citation weight but is the cheapest to win.
- Tactics: expose **`dateModified`** on every page; re-stamp city/type hub pages whenever a member entry changes; auto-archive/flip `eventStatus` to `EventCancelled`/past and visibly mark `Closed` (don't 404 — keep the URL for authority, update status). A standing "closing this week" page that genuinely changes weekly is a freshness engine.
- Publish a **sitemap with `lastmod`** and ping on change (Astro can generate this at build).

### 3.3 Extractability (so AI lifts our text verbatim)
- **Answer-first**: each opportunity page opens with a 1–2 sentence extractable summary (what · who-can-apply · where · deadline · funded?). Then detail.
- Clear `<h2>` questions, short paragraphs, bullets, one fact per line. AI favours clean structure over prose density.
- Distinct, unique `description` per entity (no boilerplate) — it often becomes the cited snippet.

### 3.4 Crawl + machine-readability
- **Don't block crawlers** — the #1 AEO failure. Allow GPTBot/PerplexityBot/Google-Extended unless there's a reason not to. Static Astro = no JS-render wall (the #2 failure).
- Ship **`/llms.txt`** at root: a machine-readable map of the site's structure + key hubs (city pages, type pages, "closing soon"). Pair each hub with a real HTML page.
- Internal linking density: city ↔ type ↔ individual entry ↔ Spotlight ↔ itinerary. Referring-domain diversity (~30% of citation weight) is the bigger lever long-term — pursue via partnerships/being-the-source others cite (see §4).

### 3.5 Common AEO failures to pre-empt
1. Blocked/JS-walled content (Astro static defuses this). 2. Multi-event-per-URL (kills Event schema) — enforce one-entity-per-URL. 3. No freshness maintenance — automate `dateModified`/status flips. 4. Boilerplate descriptions — unique summary per entity. 5. "Set and forget" — AEO rewards the maintained calendar, which is our structural advantage over editorial-roundup competitors.

---

## 4. MONETIZATION MODEL (keeps earning after the newsletter)

The funnel: free calendar (audience + authority) → newsletter (owned audience) → **then** these revenue layers. Benchmarks are real-world anchors, not our prices.

### Layer A — Supply-side listing & promotion (opportunity-givers pay)
The clearest revenue: orgs, residencies, festivals, fairs pay to be seen by our high-intent audience. Benchmarks:
- **ArtRabbit** charges **£150** for an organisation listing, **£350** "amplified" (org + artists + exhibitions), plus time-based **paid placements for open calls/opportunities** reaching 70k users, and à-la-carte newsletter/social/digital ads (rates on request).
- **CaFÉ** monetises orgs two ways: **pay-per-application** (low base fee + per-applicant) or **fixed-cost** plan (agencies/universities) — a tiered model we can mirror for premium/featured calls.
- **ArtCall**: per-call hosted pages, no setup/annual fee, entry fees → organiser's Stripe — the low-friction end.
- Our play: **free basic listing** (volume + authority + AEO mass) → **paid "Featured"** (homepage/closing-soon rail placement, Spotlight write-up, newsletter inclusion). Sell the *warmth + story + Africa reach* premium that cold tools can't.

### Layer B — Newsletter sponsorship (owned audience → ad inventory)
Once the list exists, it's CPM/placement inventory:
- Newsletter ads run **$15–$30 CPM per 1,000 opens** for primary sponsorship; CPC commonly **$1–$5**; total deals span **$50 → $50,000+** by list size.
- Tiered placement: **primary (above fold)** > secondary (mid) > classified. Large lists book months out and sell **quarterly packages** (some from $25k).
- Art-specific proof: **FASO** monetises by promoting workshops/artists across newsletters to 10k–55k segmented art audiences — i.e. the audience *is* the product.
- Our edge: a warm, trusted, niche-but-global art audience commands premium CPM vs generic lists; segment by region/discipline for targeted (higher-value) sends.

### Layer C — Paid membership / intelligence (demand-side recurring)
Recurring subscriptions for power users (artists tracking deadlines; collectors/travellers wanting curation). Benchmarks:
- **MutualArt**: Essentials **$29/mo (~$279/yr)**, premium tiers up to **~$39/mo** — gated price-database/intelligence.
- **Submittable**: org plans from **~$84/yr base**; CLMP-discounted **$29/mo / $299/yr**.
- **Artsy (gallery side)**: **$385 / $600 / $1,000 per month** tiers (+ setup + commission) — shows willingness-to-pay at the supply end.
- Our play: **"Pro" tier** — deadline alerts, saved searches, full archive, early access to itineraries, no-fee filter, "closing soon" digests. Price modestly (**~$5–$12/mo** band, well under MutualArt) since our audience skews working-artist; volume + warmth over high ARPU.

### Layer D — Travel affiliate (Art Itineraries → experiences/hotels)
Art Itineraries monetise travel intent (fairs, biennials, residency towns):
- **Tours/experiences**: affiliate commissions **~8% of booking value** (Viator ~30-day cookie; GetYourGuide ~8% baseline + tiers, ~31-day cookie). Operators themselves pay OTAs 20–30%, so margins exist for partner deals.
- **Hotels**: affiliate **~3–7%**.
- Aggregators like **Stay22** can monetise location/itinerary pages with minimal lift.
- Our play: every city page + itinerary carries contextual, *tasteful* affiliate links (stay near the biennial, book the gallery tour). Warm-curation framing converts better than generic OTA widgets.

### Layer E — Partnerships / sponsorship of departments
- Spotlight + Art Itineraries are **brandable inventory**: a residency funder or tourism board sponsors a city itinerary or a Spotlight series. Higher-value, relationship-led, and reinforces authority (and referring-domain diversity for AEO).
- Africa/Global-South focus opens **institutional/grant/NGO co-funding** angles competitors can't credibly claim.

### Funnel shape (money after the newsletter)
`Free calendar (AEO authority + audience)` → `Newsletter (owned audience)` → **A** featured listings (supply pays) · **B** newsletter sponsorship (ads) · **C** Pro membership (recurring) · **D** travel affiliate (itineraries) · **E** department sponsorship/partnerships. Five layers, three payer types (opportunity-givers, advertisers, audience), so revenue continues past the newsletter and compounds with audience size and authority.

---

## TOP MARKET-READY MOVES (ranked)

1. **One-entity-per-URL + full Event/ItemList/Breadcrumb JSON-LD from day one.** The non-negotiable AEO foundation; everything else compounds on it. Astro static makes it cheap.
2. **"Closing soon" deadline rail as the homepage hero.** Highest-urgency, highest-CTR module; the warmth+urgency combo no cold tool delivers; the strongest newsletter hook.
3. **Own Africa / Global-South as a first-class facet + city pages.** Low-competition, high-intent AEO queries + genuine differentiation + partnership/grant angle. The moat.
4. **Three-axis faceted filtering (Type · Region · City · Deadline · Funded/No-fee)** — copy ArtConnect's proven filter set, add the Africa facet. Structured where editorial competitors are not.
5. **Newsletter capture woven in-content** (not just popups) — the funnel's owned-audience gate; everything downstream needs it.
6. **City pages → Art Itineraries bridge with tasteful travel affiliate.** Turns SEO landing pages into revenue + serves traveller/newcomer/collector audiences nobody else treats as first-class.
7. **Freshness automation** (`dateModified`, status flips Open→Closing→Closed, weekly-changing hub) — cheap, and decisive for staying the *cited* answer (citations decay ~13 weeks).
8. **Tiered supply-side "Featured" product** (free basic → paid featured + Spotlight + newsletter) — the first dollar, benchmarked to ArtRabbit £150/£350 + CaFÉ tiering.
9. **`/llms.txt` + answer-first summaries + unique descriptions** — directly optimises for AI extraction/citation; almost free to ship.
10. **Restraint as authority** (one masthead, image-forward, disciplined type) — Contemporary Art Daily's lesson; warmth doesn't mean clutter.

---

## WHERE THIS IS UNCERTAIN / CONTRARIAN

- **e-flux pricing is unconfirmed.** Widely understood to be premium pay-to-post (historically several hundred USD per announcement) but I could not verify a current public rate — treat as "premium, contact-for-rate," not a hard benchmark.
- **ArtConnect org-side pricing not public.** Free for artists confirmed; cost for orgs to post/feature was not exposed in search — likely freemium + paid featured, but unverified. Validate before pricing our own tiers off it.
- **ItemList for events won't trigger Google's carousel** (only Recipe/Course/Movie/Restaurant officially). The AEO/AI-citation benefit is real; the *Google rich-result* benefit for events is mainly the per-event Event card, not a list carousel. Don't over-promise SERP carousels.
- **AEO citation-weight figures** (referring-domain 30% / brand 25% / community 20% / depth 15% / freshness 10%; 13-week decay) come from vendor/agency blogs, not Google/OpenAI primary sources. Directionally consistent across multiple sources but treat as heuristics, not laws.
- **Newsletter CPM benchmarks ($15–30/1k opens)** are general-market; a niche art audience may price higher (premium niche) *or* lower (small list) — our actual rate must be tested, not assumed.
- **Travel affiliate ~8%** is the *referrer* rate; actual earnings depend on volume + cookie windows + whether we negotiate direct operator deals. Itinerary affiliate revenue is real but slow to ramp; don't model it as early income.
- **Survivorship bias:** the landscape leaders we studied are the survivors. Many warm-editorial art calendars died from the exact maintenance burden (freshness, listing volume) we're proposing to take on. The structural risk is **operational sustainability of keeping the calendar fresh and global** — the moat (freshness + Africa coverage) is also the hardest ongoing cost. Automation of ingestion/freshness is therefore a survival requirement, not a nicety.
- **Audience-as-hero across four segments (artists/travellers/newcomers/collectors)** is differentiating but risks diffusion — no competitor serves all four because focus sells. Validate that one masthead can hold all four without the warm promise going generic.

---

## SOURCES

Landscape: [ArtRabbit Artist Opportunities](https://www.artrabbit.com/artist-opportunities) · [ArtRabbit Advertise](https://www.artrabbit.com/what-you-can-do/advertise) · [e-flux About](https://www.e-flux.com/about) · [e-flux Announcements](https://www.e-flux.com/announcements) · [Artsy Art Fairs](https://www.artsy.net/art-fairs) · [ArtConnect](https://www.artconnect.com/) · [ArtConnect Opportunities](https://www.artconnect.com/opportunities) · [ArtConnect — no fees](https://www.artconnect.com/opportunities/without-fees) · [Res Artis](https://resartis.org/) · [Res Artis Listings](https://resartis.org/listings/) · [TransArtists database](https://www.transartists.org/en/transartists-database) · [Biennial Foundation map](https://biennialfoundation.org/network/biennial-map/) · [Ocula](https://ocula.com/) · [Ocula exhibitions map](https://ocula.com/art-exhibitions/map/) · [CaFÉ pricing](https://www.callforentry.org/how-it-works/pricing/) · [ArtCall vs CaFÉ comparison](https://www.entrythingy.com/blog/5-best-call-for-entry-cafe-alternatives-2026) · [Colossal opportunities roundup](https://www.thisiscolossal.com/2026/03/april-2026-opportunities-for-artists/) · [ArtConnect — Africa residencies](https://www.magazine.artconnect.com/artist-opportunities/art-residencies-africa)

UX/Design: [Calendar UI examples + UX tips (Eleken)](https://www.eleken.co/blog-posts/calendar-ui) · [Calendar View pattern (UX Patterns for Devs)](https://uxpatterns.dev/patterns/data-display/calendar) · [Muzli calendar inspiration](https://muz.li/inspiration/calendar/) · [Product design trends 2026 (UX Pilot)](https://uxpilot.ai/blogs/product-design-trends)

AEO/SEO: [Google Event structured data docs](https://developers.google.com/search/docs/appearance/structured-data/event) · [schema.org/Event](https://schema.org/Event) · [ItemList schema guide 2026 (Greadme)](https://www.greadme.com/blog/schemas/what-is-itemlist-schema-complete-guide) · [Event schema guide 2026 (Greadme)](https://www.greadme.com/blog/schemas/what-is-event-schema-complete-guide) · [Schema cheat sheet after I/O 2026 (DigitalApplied)](https://www.digitalapplied.com/blog/structured-data-after-io-2026-schema-updates) · [AEO 2026 playbook (Cubitrek)](https://cubitrek.com/blog/aeo-101-answer-engine-optimization-guide) · [Get cited by AI 2026 (Frase)](https://www.frase.io/blog/what-is-answer-engine-optimization-the-complete-guide-to-getting-cited-by-ai) · [AEO complete guide (LLMrefs)](https://llmrefs.com/answer-engine-optimization)

Monetization: [Newsletter sponsorship cost (beehiiv)](https://www.beehiiv.com/blog/newsletter-sponsorship-cost) · [Newsletter advertising cost (Paved)](https://www.paved.com/blog/how-much-does-newsletter-advertising-cost/) · [Newsletter rate-card 2026 (InfluencersKit)](https://www.influencerskit.com/blog/newsletter-sponsorship-pricing-rate-card-guide-2026) · [FASO pricing](https://www.faso.com/pricing.html) · [MutualArt plans](https://www.mutualart.com/plans) · [Submittable pricing](https://www.submittable.com/pricing) · [Artsy for galleries](https://partners.artsy.net/gallery-partnerships) · [OTA commission rates 2026 (Samba)](https://www.sambahq.com/ota-supplier-guide/ota-commission-rates) · [Travel affiliate programs 2026 (Track360)](https://track360.io/blog/best-travel-affiliate-programs-2026-operator-rate-card-benchmark) · [Stay22 travel affiliate roundup](https://blog.stay22.com/top-10-travel-affiliate-programs-to-join)
