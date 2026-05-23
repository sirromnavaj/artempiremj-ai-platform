// components/Spotlight.jsx — archive / latest dispatches

const DISPATCHES = [
  { issue:"005", day:"MON", series:"GLOBAL ART SPOTLIGHT",
    headline:"Market Geography is in motion.",
    deck:"TEFAF Maastricht 2026. London Art Fair 2026. Art Basel Qatar. Investec Cape Town Fair.",
    location:"Nairobi → Global", date:"APR 20 2026",
    art:"painting" },
  { issue:"004", day:"SUN", series:"CIVIC ART",
    headline:"Houston Graffiti Park demolished.",
    deck:"The wall was the archive. What the city erased, and who keeps the record now.",
    location:"Houston, TX", date:"APR 19 2026",
    art:"gallery" },
  { issue:"003", day:"SAT", series:"ART OF MIND",
    headline:"The studio is a room for thinking with the hands.",
    deck:"Notes from the table. Tools, pauses, and the small geometry of practice.",
    location:"Nairobi, KE", date:"APR 18 2026",
    art:"portrait" },
  { issue:"002", day:"FRI", series:"INTERSECTIONS",
    headline:"Where textile meets code meets the pension fund.",
    deck:"Anne Mwiti's weave. The provenance database. The allocation board.",
    location:"Lagos · Nairobi · London", date:"APR 17 2026",
    art:"painting" },
];

function Spotlight() {
  const [active, setActive] = React.useState(0);
  const d = DISPATCHES[active];
  return (
    <section id="spotlight" className="section surface-cream" data-screen-label="Spotlight">
      <div className="container">
        <div className="spotlight-head">
          <div>
            <div className="eyebrow dark">This week's spotlight · Editorial archive</div>
            <h2 className="display-caslon spotlight-title">
              The week, <em style={{fontFamily:'var(--font-display-serif)', fontStyle:'italic', color:'var(--badge-orange)'}}>read back.</em>
            </h2>
          </div>
          <a href="#" className="btn btn-ghost-cream">Open the archive →</a>
        </div>

        <div className="spotlight-grid">
          <div className="spotlight-feature">
            <div className="spotlight-feature-media" data-art={d.art}>
              <img src={`assets/placeholder-${d.art === 'portrait' ? 'portrait' : d.art === 'gallery' ? 'gallery' : 'painting'}.svg`} alt="" />
              <div className="spotlight-feature-card">
                <div className="gold-rule-v" style={{width:4, height:60, background:'var(--editorial-gold-mist)', position:'absolute', left:0, top:20, bottom:20}} />
                <div style={{paddingLeft:20}}>
                  <div className="mono-label" style={{color:'var(--editorial-gold-mist)'}}>{d.location}</div>
                  <div className="italic-serif" style={{fontSize:22, color:'var(--ivory)', marginTop:8}}>{d.date}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="spotlight-body">
            <div className="mono-label" style={{color:'var(--badge-orange)'}}>{d.series} · ISSUE {d.issue}</div>
            <h3 className="display-caslon spotlight-headline">{d.headline}</h3>
            <p className="italic-serif spotlight-deck">{d.deck}</p>

            <div className="spotlight-list">
              {DISPATCHES.map((x, i) => (
                <button key={i}
                  onClick={() => setActive(i)}
                  className={"spotlight-list-row " + (i === active ? "active" : "")}>
                  <span className="mono-label spotlight-list-issue">{x.issue}</span>
                  <span className="caps-fraunces spotlight-list-day">{x.day}</span>
                  <span className="spotlight-list-head display-caslon">{x.headline}</span>
                  <span className="mono-label spotlight-list-date">{x.date.split(' ').slice(0,2).join(' ')}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Spotlight = Spotlight;
