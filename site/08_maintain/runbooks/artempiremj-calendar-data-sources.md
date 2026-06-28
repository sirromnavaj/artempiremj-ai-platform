# ArtempireMJ Global Art Calendar — Data Sources Runbook

**Owner:** ArtempireMJ (DISCOVER radar)
**Seed file:** `site/src/data/opportunities-seed.ts` (exports `SEED: Opportunity[]`)
**Interface:** `site/src/data/calendar.ts`
**Research date:** 2026-06-27/28
**Honesty rule:** `verified: true` only where a specific 2026 date was confirmed from a
reliable source AND is still upcoming or ongoing as of the research date. Everything else is
`verified: false` with a recurring `window` and no invented date. The DISCOVER process
**re-verifies every entry** (dates, open/closed status, URL reachability) before any public
listing — this seed is research input, not the published calendar.

## At a glance

| Region | Entries | Verified (confirmed upcoming/ongoing 2026 date) | Window-only |
|---|---|---|---|
| Africa | 18 | 5 | 13 |
| Europe | 12 | 4 | 8 |
| Americas | 15 | 4 | 11 |
| Asia/Middle East | 13 | 3 | 10 |
| **Total** | **58** | **16** | **42** |

## Verified entries (specific 2026 date confirmed, upcoming or ongoing)

| id | What's confirmed | Source |
|---|---|---|
| `dakar-biennale-dakart` | 16th Dak'Art 19 Nov – 19 Dec 2026 | https://biennaledakar.org/ |
| `bamako-encounters` | 15th edition 26 Nov 2026 – 26 Jan 2027 | https://biennialfoundation.org/2026/06/bamako-encounters-african-biennale-of-photography-announces-open-call-for-applications/ |
| `lagos-biennial` | 5th edition 28 Nov – 20 Dec 2026 | https://lagos-biennial.org/ |
| `akaa-paris` | AKAA 23–25 Oct 2026 | https://akaafair.com/en/informations/ |
| `norval-sovereign-african-art-prize` | Exhibition 6 Nov 2026 – 26 Feb 2027 (nomination-only) | https://www.sovereignartfoundation.com/the-sovereign-african-art-prize/ |
| `venice-biennale-2026` | 61st Biennale 9 May – 22 Nov 2026 | https://www.labiennale.org/en/art/2026/information |
| `frieze-london-2026` | 14–18 Oct 2026 | https://www.royalparks.org.uk/events/frieze-london-frieze-masters |
| `manifesta-16-ruhr-2026` | 21 Jun – 4 Oct 2026 | https://www.biennialassociation.org/article/manifesta-16-ruhr-dates-and-key-approaches-announced/ |
| `turner-prize-2026` | Exhibition opens 26 Sep 2026; winner 10 Dec 2026 | https://www.tate.org.uk/press/press-releases/turner-prize-2026-shortlist-announced |
| `skowhegan-school-painting-sculpture` | 2027-programme deadline 16 Oct 2026 (opens 1 Sep) | https://skowheganart.org/ |
| `macdowell-fellowship` | Spring/Summer 2027 deadline 10 Sep 2026 (opens 15 Aug) | https://www.macdowell.org/apply/application-guidelines |
| `art-basel-miami-beach-2026` | Public days 4–6 Dec 2026 | https://www.artbasel.com/miami-beach |
| `whitney-biennial-2026` | 8 Mar – 23 Aug 2026 | https://whitney.org/press/2026-biennial |
| `gwangju-biennale` | 16th edition 5 Sep – 15 Nov 2026 | https://biennialfoundation.org/2026/03/16th-gwangju-biennale/ |
| `busan-biennale` | 2026 edition 29 Aug – 1 Nov 2026 | https://www.hapskorea.com/2026-busan-biennale-reveals-first-exhibition-venues-and-artist-lineup/ |
| `bangkok-art-biennale` | 5th edition 29 Oct 2026 – 28 Feb 2027 | https://universes.art/en/bangkok-art-biennale/2026 |

## Window-only entries (no upcoming-confirmed 2026 date) — why

Grouped by reason; all are real institutions with reachable official sites.

**Confirmed 2026 date but already PASSED as of research date** (window = recurring slot so the
radar rolls it forward): `investec-cape-town-art-fair` (Feb 2026), `1-54-marrakech` (Feb 2026),
`absa-latelier` (Apr–May 2026), `prince-claus-seed-award` (deadline 8 Jan 2026),
`art-basel-basel-2026` (18–21 Jun 2026), `rijksakademie-residency` (deadline 1 Feb 2026),
`creative-capital-award` (2 Apr 2026), `zona-maco` (Feb 2026), `sp-arte` (Apr 2026),
`casa-wabi` (partner-prize deadline 14 Jun 2026), `art-dubai` (14–17 May 2026),
`kochi-muziris-biennale` (closed Mar 2026), `taipei-biennial` (closed Mar 2026),
`thailand-biennale` (Phuket, closed Apr 2026), `khoj-international-residency` (deadline 7 Jun 2026).

**Rolling / year-round by design:** `iscp-international-studio-curatorial-program`,
`pollock-krasner-foundation-grant`, `nirox-residency`, `cite-internationale-des-arts`,
`delfina-foundation-residency`, `saf-production-programme`.

**Annual call whose next opening is not yet dated:** `fountainhead-residency-miami`,
`guggenheim-fellowship`, `jan-van-eyck-residency`, `daad-artists-in-berlin`,
`kunstlerhaus-bethanien-studio`, `raw-academie-dakar`, `thami-mnyele-residency`,
`32-east-residency`, `black-rock-senegal`, `fondation-h-residency`,
`bag-factory-david-koloane-award`, `pivo`, `beta-local`, `jameel-prize`, `mophradat-grants`.

**Off-cycle in 2026 (no edition this year) or only a 2027 date confirmed:**
`kampala-art-biennale`, `stellenbosch-triennale` (~2028), `akademie-schloss-solitude-fellowship`
(~2027 call), `bienal-de-sao-paulo` (2027), `sharjah-biennial` (SB17 confirmed 21 Jan – 13 Jun
2027), `dhaka-art-summit` (in flux; standard 2026 summit replaced by the open-ended "TONDRA"
initiative).

## Could-not-verify / caveats (carry into DISCOVER re-check)

- **Year not explicitly stated by source** — excluded from `verified` deliberately:
  Yaddo and Vermont Studio Center print recurring month/day deadlines without a year;
  Headlands' specific date came from its application portal, not the main site; SP-Arte 2026
  dates rest on secondary listings (Ocula/galleries) because the official homepage did not render
  dates. These were dropped or set window-only rather than asserted.
- **Sites that block automated fetch or use HTTP/self-signed certs** (domains cross-verified via
  Biennial Foundation / e-flux / press, but confirm manually): `artdubai.ae` (403),
  `kochimuzirisbiennale.org` (403), `busanbiennale.org` (HTTP/self-signed), `taipeibiennial.org`,
  `rencontres-bamako.com` (thin legacy page — live programme carried via Ministry + Biennial
  Foundation).
- **Lagos Biennial** aggregators showed conflicting dates (Oct 17 – Dec 18); the official site's
  28 Nov – 20 Dec 2026 was treated as authoritative.
- **Dhaka Art Summit** is the largest uncertainty — verify status before listing.
- **Geography flags:** `akaa-paris` (Paris), `prince-claus-seed-award` (Amsterdam),
  `thami-mnyele-residency` (Amsterdam), `mophradat-grants` (Brussels) sit physically outside their
  thematic region; region was set to the audience they serve (Africa / Arab world), not their host
  city. Revisit if the rotation should key on host geography instead.

## Best ongoing sources to keep the calendar fresh

Aggregators / radar feeds (scan these each DISCOVER cycle):
- Biennial Foundation — https://biennialfoundation.org/ (biennials worldwide, dates + open calls)
- e-flux announcements — https://www.e-flux.com/announcements/
- Res Artis — https://resartis.org/open-calls/ (residencies)
- TransArtists — https://www.transartists.org/ (residencies, Global South coverage)
- On the Move — https://on-the-move.org/news (mobility / open calls, Europe-heavy)
- ArtRabbit — https://www.artrabbit.com/ ; ArtConnect — https://www.artconnect.com/opportunities
- Universes in Universe — https://universes.art/ (biennials, esp. Asia/Latin America)
- ART AFRICA magazine — https://artafricamagazine.org/ (African calls)
- Contemporary And (C&) — https://contemporaryand.com/ (Africa + diaspora opportunities)

Authoritative primary sources (go direct for dates): each organiser's official site as listed in
the verified table above; for fairs check the fair's own "/tickets" or "what's on" page, which is
usually the first to carry confirmed dates.

## Refresh procedure (per DISCOVER cycle)

1. For each `verified: true` entry, re-open the source URL; if the date passed or changed, demote
   to `verified: false` with an updated `window`, or update the ISO date.
2. For each `window`-only entry, check whether a specific 2026/2027 date has since been published;
   if so and it is upcoming, promote to `verified: true` with `start`/`deadline`.
3. Sweep the aggregators above for new African and Asian/Middle-Eastern calls (priority regions).
4. Confirm every `url` still resolves; replace dead links before any public listing.
