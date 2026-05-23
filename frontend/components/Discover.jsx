// components/Discover.jsx — time-aware events surface
// Schema: Event_Date, End_Date, Event_Name, City, Country, Region, Venue,
//         Description, ImageUrl (path under assets/), Credit, SourceLink, Status, Visibility
// v1.0 launch content — refreshed 2026-05-23 from this week's shipped dispatches.
// v1.2 will pull from Supabase / Sheet live.

const DISCOVER_EVENTS = [
  {
    eventDate: "2026-10-17", endDate: "2026-12-18",
    eventName: "Lagos Biennial 2026 · The Museum of Things Unseen",
    city: "Lagos", country: "Nigeria", region: "Africa",
    venue: "Non-traditional sites across Lagos",
    description: "Fifth edition. Curators Chinyere Obieze, Furen Dai, Sam Hopkins. Rarely or never-exhibited works. The Àkéte Collection opens in Ikoyi in October — Africa's first public international contemporary art museum, designed by Tosin Oshinowo.",
    imageUrl: "work/lagos-biennial-2026.jpg",
    credit: "Courtesy Lagos Biennial · lagos-biennial.org",
    sourceLink: "https://lagos-biennial.org/"
  },
  {
    eventDate: "2026-04-22", endDate: "2026-05-29",
    eventName: "Brush Tu · Handle with Care · Evolution of a Collective",
    city: "Nairobi", country: "Kenya", region: "Africa",
    venue: "Circle Art Gallery One · Lavington",
    description: "Three artists started Brush Tu in a house in Buru-Buru in 2013. No donor support. No sign outside. Twelve members now. Closes Saturday 29 May — seven days left.",
    imageUrl: "work/brushtu-handle-with-care.jpg",
    credit: "Installation view · Courtesy Circle Art Agency, Nairobi",
    sourceLink: "https://circleartagency.com/exhibitions/81-brush-tu-handle-with-care-circle-art-gallery/"
  },
  {
    eventDate: "2026-05-23", endDate: "2026-12-31",
    eventName: "Gallery 1957 · Accra · Three Spaces",
    city: "Accra", country: "Ghana", region: "Africa",
    venue: "Kempinski Hotel Gold Coast + Galleria Mall",
    description: "Founded on Ghanaian Independence Day 2016 — the date was a choice. West African contemporary and diaspora artists. London outpost opened 2020. Open Tuesday to Saturday, 11am–7pm. Free entry.",
    imageUrl: "work/gallery-1957-unlimited.jpg",
    credit: "Courtesy Gallery 1957 · gallery1957.com",
    sourceLink: "https://gallery1957.com/"
  },
  {
    eventDate: "2026-05-23", endDate: "2026-12-31",
    eventName: "TAAT · The African Arts Trust · Nairobi",
    city: "Nairobi", country: "Kenya", region: "Africa",
    venue: "Victoria Square · Riara Road",
    description: "A gallery and a funding body. Grants for emerging artists and art organisations across 25+ African countries, from a single Nairobi base. Saturday hours 12pm–5pm.",
    imageUrl: "work/taat-kamunde-fabric.jpg",
    credit: "Installation view · April Kamunde · Fabric of Our Being · Courtesy TAAT",
    sourceLink: "https://www.theafricanartstrust.org/"
  },
  {
    eventDate: "2023-10-10", endDate: "2024-04-14",
    eventName: "El Anatsui · Behind the Red Moon · Hyundai Commission",
    city: "London", country: "UK", region: "Europe",
    venue: "Tate Modern · Turbine Hall",
    description: "Thousands of metal bottle tops, sourced in Nigeria, woven into the largest indoor work the artist has made. Built on histories of trade routes that go back further than anyone wants to say plainly.",
    imageUrl: "work/el-anatsui-behind-red-moon.jpg",
    credit: "Photo: Joe Humphrys · Courtesy the artist and Tate",
    sourceLink: "https://www.tate.org.uk/whats-on/tate-modern/el-anatsui"
  },
  {
    eventDate: "2026-09-11", endDate: "2026-09-13",
    eventName: "FNB Art Joburg 2026 · 18th edition",
    city: "Johannesburg", country: "South Africa", region: "Africa",
    venue: "Sandton Convention Centre",
    description: "South Africa's longest-running contemporary art fair. Coverage from the floor with our correspondent Khethiwe Tracy Gumede — returning after the 2025 edition.",
    imageUrl: "work/fnb-joburg-2025-aerial.jpg",
    credit: "Photo: Khethiwe Tracy Gumede · FNB Art Joburg 2025, 18th edition · Courtesy ArtempireMJ",
    sourceLink: "https://fnbartjoburg.com/"
  },
  {
    eventDate: "2026-02-20", endDate: "2026-02-22",
    eventName: "Investec Cape Town Art Fair 2026 · Listen",
    city: "Cape Town", country: "South Africa", region: "Africa",
    venue: "Cape Town International Convention Centre",
    description: "The 13th edition, themed Listen. Our correspondent Khethiwe Tracy Gumede was on the floor for VIP opening — full coverage in Spotlight.",
    imageUrl: "work/ictaf-2026-vip-opening.jpg",
    credit: "Photo: Khethiwe Tracy Gumede · Investec Cape Town Art Fair 2026 VIP Opening · Courtesy ArtempireMJ",
    sourceLink: "https://www.investeccapetownartfair.co.za/"
  },
  {
    eventDate: "2027-02-19", endDate: "2027-02-21",
    eventName: "Investec Cape Town Art Fair 2027",
    city: "Cape Town", country: "South Africa", region: "Africa",
    venue: "Cape Town International Convention Centre",
    description: "The 14th edition. Press accreditation requested. Returning with our correspondent on the floor.",
    imageUrl: "work/ictaf-cape-town-fair.jpg",
    credit: "Photo: Courtesy Investec Cape Town Art Fair · Press Pack 2026",
    sourceLink: "https://www.investeccapetownartfair.co.za/"
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
  if (start.getFullYear() === end.getFullYear()) {
    return `${startStr} – ${endStr} · ${start.getFullYear()}`;
  }
  return `${startStr} ${start.getFullYear()} – ${endStr} ${end.getFullYear()}`;
}

function statusBadge(status) {
  const map = {
    ongoing: { label: "Now showing", color: "var(--badge-orange)" },
    upcoming: { label: "Upcoming", color: "var(--master-teal)" },
    past: { label: "Closed", color: "var(--muted)" },
    unknown: { label: "Date TBC", color: "var(--muted)" },
  };
  return map[status] || map.unknown;
}

function Discover() {
  const [filter, setFilter] = React.useState("all");
  const [events, setEvents] = React.useState(DISCOVER_EVENTS);

  // Live pull from yaml-sourced JSON (scripts/sync_production_to_site.py).
  // Falls back to hardcoded DISCOVER_EVENTS if fetch fails.
  React.useEffect(() => {
    fetch("content/discover.json", { cache: "no-cache" })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data && Array.isArray(data.items) && data.items.length) {
          setEvents(data.items);
        }
      })
      .catch(() => {});
  }, []);

  const sorted = [...events].sort((a, b) => {
    const sa = computeTimeStatus(a.eventDate, a.endDate);
    const sb = computeTimeStatus(b.eventDate, b.endDate);
    const order = { ongoing: 0, upcoming: 1, past: 2 };
    if (order[sa] !== order[sb]) return order[sa] - order[sb];
    return new Date(a.eventDate) - new Date(b.eventDate);
  });

  const filtered = filter === "all"
    ? sorted
    : sorted.filter(e => computeTimeStatus(e.eventDate, e.endDate) === filter);

  const lastRefresh = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <section id="discover" className="section surface-cream" data-screen-label="Discover">
      <div className="container">
        <div className="discover-header">
          <div className="eyebrow dark">What's on</div>
          <h2 className="caps-fraunces discover-title">What's on. Where to go. Who to see.</h2>
          <p className="discover-deck italic-serif">Verified daily. The shows worth crossing a city for.</p>
          <p className="mono-label" style={{color:'var(--muted)', marginTop:'1em', fontSize:'12px'}}>
            Last refreshed: {lastRefresh}
          </p>
          <div className="discover-filters">
            <button onClick={()=>setFilter("all")} className={filter==="all"?"active":""}>All</button>
            <button onClick={()=>setFilter("ongoing")} className={filter==="ongoing"?"active":""}>Now showing</button>
            <button onClick={()=>setFilter("upcoming")} className={filter==="upcoming"?"active":""}>Upcoming</button>
            <button onClick={()=>setFilter("past")} className={filter==="past"?"active":""}>Closed</button>
          </div>
        </div>

        <div className="discover-grid">
          {filtered.map((e, i) => {
            const status = computeTimeStatus(e.eventDate, e.endDate);
            const badge = statusBadge(status);
            return (
              <article key={i} className="discover-card">
                <div className="discover-card-img">
                  <img src={`assets/${e.imageUrl}`} alt={e.eventName} loading="lazy" />
                </div>
                <div className="discover-card-meta">
                  <span className="mono-label" style={{color: badge.color}}>{badge.label}</span>
                  <span className="mono-label" style={{color:'var(--muted)'}}>{e.region}</span>
                </div>
                <h3 className="discover-card-title caps-fraunces">{e.eventName}</h3>
                <div className="discover-card-where">
                  <span>{e.venue}</span>
                  <span> · {e.city}, {e.country}</span>
                </div>
                <div className="discover-card-when mono-label">{formatDateRange(e.eventDate, e.endDate)}</div>
                <p className="discover-card-desc italic-serif">{e.description}</p>
                {e.credit && <p className="discover-card-credit mono-label" style={{color:'var(--muted)', fontSize:'11px', marginTop:'8px'}}>{e.credit}</p>}
                {e.sourceLink && e.sourceLink !== "#" && (
                  <a href={e.sourceLink} target="_blank" rel="noopener noreferrer" className="discover-card-link mono-label">
                    More info →
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

window.Discover = Discover;
