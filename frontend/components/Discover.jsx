// components/Discover.jsx — time-aware events surface
// Mirrors backend schema: Event_Date, End_Date, Event_Name, City, Country, Region, Venue, Description, Image_URL, Source_Link, Status, Visibility
// computeTimeStatus_ logic replicated client-side.

const DISCOVER_EVENTS = [
  {
    eventDate: "2026-03-07", endDate: "2026-03-15",
    eventName: "TEFAF Maastricht 2026",
    city: "Maastricht", country: "Netherlands", region: "Europe",
    venue: "MECC Maastricht",
    description: "The old-master standard, tested. Seven thousand years of objects under one roof; the provenance questions it refuses to ask in public.",
    imageUrl: "painting",
    sourceLink: "#"
  },
  {
    eventDate: "2026-04-17", endDate: "2026-04-26",
    eventName: "London Art Fair 2026",
    city: "London", country: "UK", region: "Europe",
    venue: "Business Design Centre, Islington",
    description: "A mid-market read of Britain right now. Who the galleries are quietly repositioning. What \"emerging\" costs in 2026.",
    imageUrl: "gallery",
    sourceLink: "#"
  },
  {
    eventDate: "2026-02-05", endDate: "2026-02-09",
    eventName: "Art Basel Qatar · Inaugural Edition",
    city: "Doha", country: "Qatar", region: "Gulf / MENA",
    venue: "M7 & Doha Design District",
    description: "The first Basel in the Gulf. What it means when the capital follows the art, and what it means when the art follows the capital.",
    imageUrl: "portrait",
    sourceLink: "#"
  },
  {
    eventDate: "2027-02-18", endDate: "2027-02-21",
    eventName: "Investec Cape Town Art Fair",
    city: "Cape Town", country: "South Africa", region: "Africa",
    venue: "Cape Town International Convention Centre",
    description: "Africa's flagship fair, reframing. The continent is no longer the answer to a question Europe asked — it's asking its own.",
    imageUrl: "gallery",
    sourceLink: "#"
  },
  {
    eventDate: "2026-05-22", endDate: "2026-11-23",
    eventName: "60th Venice Biennale · Foreigners Everywhere",
    city: "Venice", country: "Italy", region: "Europe",
    venue: "Giardini · Arsenale",
    description: "A long read. Six months, ninety pavilions, one question: who gets to be a foreigner, and who decides.",
    imageUrl: "painting",
    sourceLink: "#"
  },
  {
    eventDate: "2025-10-17", endDate: "2025-10-19",
    eventName: "Frieze London 2025",
    city: "London", country: "UK", region: "Europe",
    venue: "Regent's Park",
    description: "The October fair that still sets the season's temperature. A record of what did — and did not — move.",
    imageUrl: "gallery",
    sourceLink: "#"
  },
];

function computeTimeStatus(startISO, endISO) {
  if (!startISO) return "unknown";
  const today = new Date(); today.setHours(0,0,0,0);
  const start = new Date(startISO); start.setHours(0,0,0,0);
  const end = endISO ? new Date(endISO) : start; end.setHours(0,0,0,0);
  if (today < start) return "upcoming";
  if (today > end) return "past";
  return "ongoing";
}

function formatDateRange(startISO, endISO) {
  const opts = { month: "short", day: "numeric" };
  const start = new Date(startISO);
  const startStr = start.toLocaleDateString("en-US", opts).toUpperCase();
  if (!endISO || endISO === startISO) {
    return `${startStr} · ${start.getFullYear()}`;
  }
  const end = new Date(endISO);
  const endStr = end.toLocaleDateString("en-US", opts).toUpperCase();
  const sameYear = start.getFullYear() === end.getFullYear();
  return sameYear
    ? `${startStr} – ${endStr} · ${start.getFullYear()}`
    : `${startStr} ${start.getFullYear()} – ${endStr} ${end.getFullYear()}`;
}

function Discover() {
  const [filter, setFilter] = React.useState("all"); // all | upcoming | ongoing | past
  const events = DISCOVER_EVENTS
    .map(e => ({ ...e, timeStatus: computeTimeStatus(e.eventDate, e.endDate) }))
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

  const filtered = filter === "all" ? events : events.filter(e => e.timeStatus === filter);
  const counts = {
    all: events.length,
    upcoming: events.filter(e => e.timeStatus === "upcoming").length,
    ongoing: events.filter(e => e.timeStatus === "ongoing").length,
    past: events.filter(e => e.timeStatus === "past").length,
  };

  return (
    <section id="discover" className="section surface-dark" data-screen-label="Discover">
      <div className="container">
        <div className="discover-head">
          <div>
            <div className="eyebrow">Pillar 01 · Discover</div>
            <h2 className="caps-fraunces discover-title">
              The market,<br/>on a map.
            </h2>
            <p className="italic-serif discover-deck">
              Fairs, biennales, and the institutional calendar — read by geography
              and time. Not a listings page. A position in the global art economy.
            </p>
          </div>
          <div className="discover-filters">
            {[
              { k: "all", label: "All" },
              { k: "upcoming", label: "Upcoming" },
              { k: "ongoing", label: "Ongoing" },
              { k: "past", label: "Archive" },
            ].map(f => (
              <button key={f.k}
                className={"discover-filter " + (filter === f.k ? "active" : "")}
                onClick={() => setFilter(f.k)}>
                <span>{f.label}</span>
                <span className="discover-filter-count">{counts[f.k]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="discover-grid">
          {filtered.map((e, i) => (
            <article key={i} className={"discover-card status-" + e.timeStatus}>
              <div className="discover-card-media">
                <img src={`assets/placeholder-${e.imageUrl}.svg`} alt="" />
                <div className="discover-status-pill">
                  <span className="dot" />
                  {e.timeStatus}
                </div>
              </div>
              <div className="discover-card-body">
                <div className="mono-label discover-card-loc">
                  {e.city} · {e.country} <span style={{opacity:0.5}}>/</span> {e.region}
                </div>
                <h3 className="display-caslon discover-card-title">{e.eventName}</h3>
                <div className="mono-label discover-card-date">
                  {formatDateRange(e.eventDate, e.endDate)}
                </div>
                <p className="italic-serif discover-card-desc">{e.description}</p>
                <div className="discover-card-foot">
                  <span className="mono-label" style={{color:'var(--editorial-gold-mist)'}}>{e.venue}</span>
                  <a href={e.sourceLink} className="discover-card-source">Source →</a>
                </div>
              </div>
            </article>
          ))}
          {!filtered.length && (
            <div className="discover-empty italic-serif">
              Nothing in this time window. Try another filter.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

window.Discover = Discover;
