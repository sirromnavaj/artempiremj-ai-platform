// components/Series.jsx — the seven weekly series as editorial index

const SERIES_DATA = [
  { day: "MON", name: "Global Art Spotlight",
    headline: "Market Geography is in motion.",
    kicker: "Anchor for the week",
    read: "How art capital relocates through institutions and platforms.",
    accent: "var(--spotlight-crimson)" },
  { day: "TUE", name: "Art + Finance",
    headline: "The painting sold for $4.2M. The artist received nothing on resale.",
    kicker: "Analytical, cold",
    read: "Resale rights, royalties, and the economic afterlife of an object.",
    accent: "var(--master-teal)" },
  { day: "WED", name: "Money Stories",
    headline: "She sold the painting. She still owes the gallery.",
    kicker: "With Kathleen Mureithi",
    read: "Human tension, uncomfortable. What money does to the work.",
    accent: "var(--badge-orange)" },
  { day: "THU", name: "Artist Spotlight",
    headline: "Anne Mwiti, b. 1962. Lagos-Nairobi. Textile on canvas.",
    kicker: "Structural profile",
    read: "The hand, the studio, the market position — read as one system.",
    accent: "var(--studio-orange-deep)" },
  { day: "FRI", name: "Intersections",
    headline: "Where textile meets code meets the pension fund.",
    kicker: "Cross-disciplinary",
    read: "Art read through the disciplines it quietly depends on.",
    accent: "var(--ai-teal)" },
  { day: "SAT", name: "Art of Mind",
    headline: "The studio is a room for thinking with the hands.",
    kicker: "Contemplative",
    read: "Process, practice, and the quiet interior of making.",
    accent: "var(--community-violet)" },
  { day: "SUN", name: "Civic Art",
    headline: "Houston Graffiti Park demolished. The wall was the archive.",
    kicker: "Grounded, deadline-driven",
    read: "Art in public life — infrastructure, demolition, defence.",
    accent: "var(--badge-orange)" },
];

function SeriesIndex() {
  return (
    <section id="series" className="section surface-cream" data-screen-label="Series">
      <div className="container">
        <div className="series-head">
          <div>
            <div className="eyebrow dark">Seven editorial series · One week</div>
            <h2 className="display-caslon series-title">
              A week is a <em style={{fontFamily:'var(--font-display-serif)', fontStyle:'italic', color:'var(--badge-orange)'}}>structural</em> unit.
            </h2>
            <p className="series-deck italic-serif">
              Each day reads a different mechanism of the art economy.
              Monday anchors. Tuesday measures. Wednesday testifies.
              Thursday profiles. Friday crosses. Saturday pauses. Sunday grounds.
            </p>
          </div>
          <div className="series-meta">
            <div className="mono-label" style={{color:'var(--muted)'}}>WEEK 17 · APR 20 — APR 26</div>
            <div className="series-today">
              <span className="mono-label" style={{color:'var(--badge-orange)'}}>● LIVE TODAY</span>
              <div className="italic-serif series-today-name">Global Art Spotlight</div>
            </div>
          </div>
        </div>

        <ol className="series-list">
          {SERIES_DATA.map((s, i) => (
            <SeriesRow key={s.day} s={s} idx={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function SeriesRow({ s, idx }) {
  const [hover, setHover] = React.useState(false);
  return (
    <li
      className="series-row"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ['--accent']: s.accent }}
    >
      <div className="series-row-num mono-label">
        {String(idx + 1).padStart(2, "0")}
      </div>
      <div className="series-row-day">
        <div className="caps-fraunces series-day">{s.day}</div>
        <div className="mono-label series-day-kicker">{s.kicker}</div>
      </div>
      <div className="series-row-body">
        <div className="series-name italic-serif">{s.name}</div>
        <div className="series-headline display-caslon">{s.headline}</div>
        <div className="series-read">{s.read}</div>
      </div>
      <div className="series-row-cta">
        <span className="mono-label" style={{color:'var(--accent)'}}>Read →</span>
      </div>
      <div className="series-row-bar" style={{background: s.accent}} />
    </li>
  );
}

window.SeriesIndex = SeriesIndex;
