// components/Spotlight.jsx — archive / latest dispatches
// Refreshed 2026-05-23: replaced April seed data with this week's shipped dispatches.
// v1.2: pull from Supabase / Sheet live.

const DISPATCHES = [
  { issue:"030", day:"SAT", series:"ART OF MIND",
    headline:"El Anatsui collects bottle caps. Not as a statement. As material.",
    deck:"What money tells you about value. What the bottle cap tells you about what survives.",
    location:"Nsukka · Tate Modern · British Museum", date:"MAY 23 2026",
    img:"work/el-anatsui-mans-cloth.jpg",
    credit:"El Anatsui · Man's Cloth · British Museum · via Wikimedia Commons" },
  { issue:"029", day:"SAT", series:"DISCOVER RADAR · GHANA",
    headline:"Gallery 1957 opened on Ghanaian Independence Day.",
    deck:"Three spaces in Accra. West African contemporary art and diaspora. Free entry.",
    location:"Accra, Ghana", date:"MAY 23 2026",
    img:"work/gallery-1957-unlimited.jpg",
    credit:"UNLIMITED · Courtesy Gallery 1957" },
  { issue:"028", day:"SAT", series:"DISCOVER RADAR · KENYA",
    headline:"TAAT. A gallery and a funding body.",
    deck:"Twenty-five-plus African countries supported from a single Nairobi base.",
    location:"Nairobi, Kenya", date:"MAY 23 2026",
    img:"work/taat-kamunde-fabric.jpg",
    credit:"April Kamunde · Fabric of Our Being · Courtesy TAAT" },
  { issue:"027", day:"FRI", series:"DISCOVER RADAR · NIGERIA",
    headline:"Lagos names the theme. The Museum of Things Unseen.",
    deck:"Fifth edition Biennial. 17 October – 18 December 2026. The Àkéte Collection opens in Ikoyi.",
    location:"Lagos, Nigeria", date:"MAY 22 2026",
    img:"work/lagos-biennial-2026.jpg",
    credit:"Courtesy Lagos Biennial · lagos-biennial.org" },
  { issue:"026", day:"FRI", series:"DISCOVER RADAR · KENYA",
    headline:"Three artists. One house. No donor support. No sign outside.",
    deck:"Brush Tu, Buru-Buru, 2013. Handle with Care closes Saturday 29 May.",
    location:"Nairobi, Kenya", date:"MAY 22 2026",
    img:"work/brushtu-handle-with-care.jpg",
    credit:"Installation view · Courtesy Circle Art Agency, Nairobi" },
  { issue:"025", day:"FRI", series:"INTERSECTIONS",
    headline:"Artists moved into the warehouses on Fox Street, Johannesburg. 2009.",
    deck:"Maboneng. Place of light. The cycle is familiar. The record is still being written.",
    location:"Johannesburg, South Africa", date:"MAY 22 2026",
    img:"work/maboneng-arts-on-main.jpg",
    credit:"Arts on Main · 264 Fox Street · via Wallpaper*" },
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
          <a href="#editorial" className="btn btn-ghost-cream">Open the archive →</a>
        </div>

        <div className="spotlight-grid">
          <div className="spotlight-feature">
            <div className="spotlight-feature-media">
              <img src={`assets/${d.img}`} alt={d.headline} loading="lazy" />
              <div className="spotlight-feature-card">
                <div className="gold-rule-v" style={{width:4, height:60, background:'var(--editorial-gold-mist)', position:'absolute', left:0, top:20, bottom:20}} />
                <div style={{paddingLeft:20}}>
                  <div className="mono-label" style={{color:'var(--editorial-gold-mist)'}}>{d.location}</div>
                  <div className="italic-serif" style={{fontSize:22, color:'var(--ivory)', marginTop:8}}>{d.date}</div>
                </div>
              </div>
            </div>
            {d.credit && (
              <p className="mono-label" style={{color:'var(--muted)', fontSize:'11px', marginTop:'12px', paddingLeft:'4px'}}>
                {d.credit}
              </p>
            )}
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
