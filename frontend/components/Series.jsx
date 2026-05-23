// components/Series.jsx — the weekly registers as editorial index
// Refreshed 2026-05-23: 9 series + Sunday three-way rotation + DISCOVER daily
// Source: skill v2.5 series/all-series.md + ops/discover-rotation.md

const SERIES_DATA = [
  { day: "MON", name: "Global Art Spotlight",
    headline: "The week's anchor signal from the global art world.",
    kicker: "Wide-angle, weekly anchor",
    read: "Who funds it. Who profits. Who controls access. Who builds infrastructure.",
    accent: "var(--spotlight-crimson)" },
  { day: "TUE", name: "Art + Finance",
    headline: "What money reveals about value, who captures it, who never sees it.",
    kicker: "Analytical · LinkedIn lead",
    read: "The read at accessible depth. Where ArtTactic charges five hundred a month, this is free.",
    accent: "var(--master-teal)" },
  { day: "WED", name: "Money Stories",
    headline: "The human financial reality behind making, selling, owning, losing art.",
    kicker: "Co-authored with Kathleen Mureithi",
    read: "Uncomfortable. Honest. Names the gap between success and sustainability.",
    accent: "var(--badge-orange)" },
  { day: "WED·alt", name: "The World Through Art",
    headline: "World news through the lens of art. Not art world news.",
    kicker: "Responsive · runs when the news has a specific art lens",
    read: "What artists in the country were already making before the headlines moved.",
    accent: "var(--ai-teal)" },
  { day: "THU", name: "Artist Spotlight",
    headline: "Profiles of working artists, with direct contact named.",
    kicker: "Featured artist gets visible CTA per skill rule",
    read: "The hand, the studio, the market position — read as one system.",
    accent: "var(--studio-orange-deep)" },
  { day: "FRI", name: "Intersections",
    headline: "Art read through the disciplines it quietly depends on.",
    kicker: "Cross-disciplinary",
    read: "Where textile meets code meets the pension fund. Where art meets the city.",
    accent: "var(--ai-teal)" },
  { day: "SAT", name: "Art of Mind",
    headline: "What does this specific work reveal about the human condition it came from?",
    kicker: "Contemplative · philosophical",
    read: "Not art criticism. Not biography. What a person feels, looking at this, and why.",
    accent: "var(--master-teal)" },
  { day: "SUN·1", name: "Civic Art",
    headline: "Art in public and civic space — what artists see in systems.",
    kicker: "Sunday rotation · slot 1 of 3",
    read: "What gets commissioned. What gets erased. Who keeps the record now.",
    accent: "var(--badge-orange)" },
  { day: "SUN·2", name: "Nude Art",
    headline: "The fine art tradition of the unclothed human body — history, geography, culture.",
    kicker: "Sunday rotation · slot 2 of 3",
    read: "Not erotic content. Not nude photography of individuals. The body as art's most contested subject.",
    accent: "var(--spotlight-crimson)" },
  { day: "SUN·3", name: "Ink Division",
    headline: "Where skin meets story. The body as archive.",
    kicker: "Sunday rotation · slot 3 of 3",
    read: "Worldwide research across all traditions. Witnessed, not studied.",
    accent: "var(--ink-forest)" },
  { day: "DAILY", name: "DISCOVER RADAR · 12:00 EAT",
    headline: "The global art calendar, built entry by entry.",
    kicker: "Four-week regional rotation + Kenya standing signal",
    read: "Verified daily. Every fair, biennale, open call, deadline. Built so the door isn't already closed by the time you find it.",
    accent: "var(--badge-orange)" },
];

function Series() {
  return (
    <section id="series" className="section surface-cream" data-screen-label="Series">
      <div className="container">
        <div className="series-head">
          <div className="eyebrow dark">The week</div>
          <h2 className="display-caslon series-title">
            What lands when, <em style={{fontFamily:'var(--font-display-serif)', fontStyle:'italic', color:'var(--badge-orange)'}}>and why.</em>
          </h2>
          <p className="series-deck italic-serif">
            A read at 09:00. A signal at 12:00. Every day.
          </p>
        </div>

        <div className="series-grid">
          {SERIES_DATA.map((s, i) => (
            <article key={i} className="series-card" style={{borderLeftColor: s.accent, borderLeftWidth:'4px', borderLeftStyle:'solid', paddingLeft:'20px'}}>
              <div className="series-card-head">
                <span className="mono-label series-day">{s.day}</span>
                <span className="caps-fraunces series-name">{s.name}</span>
              </div>
              <h3 className="series-headline display-caslon">{s.headline}</h3>
              <div className="series-kicker mono-label">{s.kicker}</div>
              <p className="series-read italic-serif">{s.read}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Series = Series;
