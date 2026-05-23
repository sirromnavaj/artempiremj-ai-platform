// components/Editorial.jsx — blog index, slug-routed articles
// Mirrors backend schema: Publish_Date, Title, Slug, Author, Summary, Body_HTML, Cover_Image_URL, Region, Tags, Status, Visibility

const BLOGS = [
  {
    publishDate: "2026-05-05",
    title: "The auction room is no longer discovering prices.",
    slug: "auction-guarantees-discovery",
    author: "MJ",
    summary: "Guarantees backed 36% of New York Evening Sale value in 2016. By 2025: 78%. The room isn't finding the price anymore — it's confirming what was agreed in private.",
    bodyHtml: `
      <p>In 2016, guarantees backed 36% of the value of New York's Evening Sales. By 2025, that figure was 78%.</p>
      <p>What a guarantee means: before the auction opens, the seller is protected against the work failing to sell. The auction house — or a third-party guarantor — has agreed to pay a minimum price regardless of what happens in the room. The hammer falls. The room bids. But the floor was already set.</p>
      <p>When 78% of an evening sale's value is guaranteed, you are not watching a market discover what something is worth. You are watching it confirm what was agreed in private beforehand.</p>
      <p>This is not corruption. It is the rational response of sellers and auction houses to a market that has cooled at the top end. Sellers want certainty. Auction houses want consignments. Guarantees give both.</p>
      <p>Meanwhile, at the other end of the market, something different is happening. In 2025, artworks under $50,000 made up 61% of total lots sold, significantly higher than the pre-pandemic average of 48%. More artists. More accessible prices. New collectors entering from the bottom. The number of artists represented at US auctions widened from 2,717 in 2015 to 3,315 in 2025.</p>
      <p>The market is splitting. The top is pre-negotiated. The bottom is wider than it has been in a decade. The middle is being hollowed out — which is where most emerging artists and mid-career galleries live.</p>
      <p>This is the structure to watch through Frieze Week New York and the spring marquee auctions. Not the hammer prices. The guarantee floors beneath them.</p>
    `,
    coverImage: "gallery",
    region: "Americas",
    tags: ["Art + Finance","Auctions","Market"]
  },
  {
    publishDate: "2026-04-20",
    title: "Where the centre of the art market is moving.",
    slug: "market-geography-in-motion",
    author: "MJ",
    summary: "TEFAF Maastricht. London Art Fair. Art Basel Qatar. Investec Cape Town. Four fairs, one reading of where the centre is moving — and what the old institutions do next.",
    bodyHtml: `
      <p>For the past decade, the map of the global art market had a defensible centre: a Western European axis with a New York satellite and a Hong Kong auction room. That map is no longer accurate, and four fairs prove it.</p>
      <p>Begin with <em>Art Basel Qatar</em>. The inaugural Gulf edition is not a franchise; it is a repositioning. When Basel — the institution that defined the post-war fair as a category — crosses the Mediterranean, the question is no longer whether Gulf capital can attract Western art. It is whether Western institutions can still refuse to be peripheral to it.</p>
      <p>Then <em>Investec Cape Town Art Fair</em>. Twelve years as the continent's flagship. What is different now is not the fair itself but the context: African collectors are no longer the audience. They are the market.</p>
      <p>The question is not whether Africa is becoming a creative capital engine. It already is. The question is what the existing institutions do with that.</p>
    `,
    coverImage: "painting",
    region: "Global",
    tags: ["Art + Finance","Market Geography","Fairs"]
  },
  {
    publishDate: "2026-04-19",
    title: "Houston Graffiti Park demolished.",
    slug: "houston-graffiti-park-demolished",
    author: "MJ",
    summary: "The wall was the archive. What the city erased, and who keeps the record now.",
    bodyHtml: `
      <p>Civic art is tested at the moment of its erasure, not its creation. A commission tells you what a city wants to be. A demolition tells you what it is.</p>
      <p>The Houston Graffiti Park was demolished this week. The wall was, for twenty years, the densest public archive of Houston's visual subcultures. There was no master registry. No municipal scan. What the city erased, it erased completely.</p>
      <p>Who keeps the record now? A handful of Instagram accounts, one zine, the memory of the artists who painted there. That is not an archive. That is a rumor.</p>
    `,
    coverImage: "gallery",
    region: "Americas",
    tags: ["Civic Art","Houston","Preservation"]
  },
  {
    publishDate: "2026-04-18",
    title: "The studio is a room for thinking with the hands.",
    slug: "studio-thinking-with-hands",
    author: "MJ",
    summary: "Notes from the table. Tools, pauses, and the small geometry of practice.",
    bodyHtml: `
      <p>The studio is not a workshop. A workshop implies output. The studio implies inquiry.</p>
      <p>There is a pencil, a board, a light, a chair, and a question. The question is usually the same one: what is this face doing, and why does it matter that a stranger see it?</p>
      <p>The answer is not in the portrait. It is in the three hours before the portrait.</p>
    `,
    coverImage: "portrait",
    region: "East Africa",
    tags: ["Art of Mind","Studio","Practice"]
  },
  {
    publishDate: "2026-04-17",
    title: "Where textile meets code meets the pension fund.",
    slug: "textile-code-pension-fund",
    author: "MJ",
    summary: "Anne Mwiti's weave. The provenance database. The allocation board.",
    bodyHtml: `
      <p>Three objects share a table this week. Anne Mwiti's woven panel. A provenance database running on a laptop. The quarterly allocation document of a mid-size European pension fund.</p>
      <p>They do not obviously belong together. But the panel's next sale depends on the database's verification, and the database's next funding round depends on the pension fund's alternative-assets committee deciding that African contemporary is now a category, not a curiosity.</p>
      <p>Intersections is not a theme. It is a description of how decisions actually get made.</p>
    `,
    coverImage: "painting",
    region: "Africa · Europe",
    tags: ["Intersections","Textile","Provenance"]
  },
  {
    publishDate: "2026-04-16",
    title: "An artist's spotlight is a small economic event.",
    slug: "artist-spotlight-as-economic-event",
    author: "MJ",
    summary: "What happens to an artist's price sheet when the weekly read lands — and what doesn't.",
    bodyHtml: `
      <p>Every Thursday, one artist gets 800 words and a fixed set of images. The piece is read by roughly 4,000 people. Half of them are other artists. A quarter are curators. The remaining quarter includes a small number of collectors and a smaller number of dealers.</p>
      <p>The measurable effect on the artist's primary-market price sheet in the seven days after publication is, on average, zero. The measurable effect on their gallery conversations in the thirty days after is, on average, substantial.</p>
      <p>Spotlight is not marketing. It is slower than marketing. It is closer to citation.</p>
    `,
    coverImage: "portrait",
    region: "East Africa",
    tags: ["Artist Spotlight","Market"]
  },
  {
    publishDate: "2026-04-15",
    title: "What $3.2B in annual auction sales buys.",
    slug: "auction-sales-buy",
    author: "MJ",
    summary: "Money Stories, read as structural facts. Where the hammer actually falls.",
    bodyHtml: `
      <p>Three point two billion dollars is the rounded figure for 2025 global public auction sales at the three major houses. That number is usually reported as performance. It should be reported as composition.</p>
      <p>Composition: which artists, which estates, which regions, which price bands. The answer in 2025 is almost identical to the answer in 2015, which is almost identical to the answer in 2005.</p>
      <p>The market does not concentrate by accident. It concentrates by design.</p>
    `,
    coverImage: "gallery",
    region: "Global",
    tags: ["Money Stories","Auctions"]
  },
];

function formatPubDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase();
}

function ArticleView({ article, onClose }) {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="article-view" onClick={(e) => { if (e.target.classList.contains('article-view')) onClose(); }}>
      <div className="article-sheet">
        <button className="article-close" onClick={onClose} aria-label="Close">×</button>
        <div className="article-cover" data-art={article.coverImage}>
          <img src={`assets/work/${article.coverImage === 'portrait' ? 'el-anatsui-mans-cloth.jpg' : article.coverImage === 'gallery' ? 'gallery-1957-unlimited.jpg' : 'lagos-biennial-2026.jpg'}`} alt={article.title} />
          <div className="article-cover-meta">
            <div className="mono-label" style={{color:'var(--editorial-gold-mist)'}}>
              {article.region} · {formatPubDate(article.publishDate)} · {article.author}
            </div>
          </div>
        </div>
        <div className="article-body-wrap">
          <div className="mono-label" style={{color:'var(--badge-orange)'}}>
            {article.tags.join(" · ")}
          </div>
          <h1 className="display-caslon article-h1">{article.title}</h1>
          <p className="italic-serif article-deck">{article.summary}</p>
          <div className="article-rule" />
          <div className="article-body" dangerouslySetInnerHTML={{__html: article.bodyHtml}} />
          <div className="article-foot">
            <span className="mono-label">— {article.author} · Nairobi</span>
            <button className="btn btn-ghost-dark" onClick={onClose}>Close ←</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Editorial() {
  const [active, setActive] = React.useState(null);
  const [regionFilter, setRegion] = React.useState("all");
  const [blogs, setBlogs] = React.useState(BLOGS);

  // Pull live content from production -> site sync (scripts/sync_production_to_site.py)
  // Falls back to hardcoded BLOGS array if fetch fails.
  React.useEffect(() => {
    fetch("content/editorial.json", { cache: "no-cache" })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data && Array.isArray(data.items) && data.items.length) {
          // Merge: production items first, hardcoded fallbacks for older.
          const liveSlugs = new Set(data.items.map(x => x.slug));
          const merged = [...data.items, ...BLOGS.filter(b => !liveSlugs.has(b.slug))];
          setBlogs(merged);
        }
      })
      .catch(() => {});
  }, []);

  const regions = ["all", ...new Set(blogs.map(b => b.region))];
  const filtered = regionFilter === "all" ? blogs : blogs.filter(b => b.region === regionFilter);

  // read hash for slug routing
  React.useEffect(() => {
    const checkHash = () => {
      const m = location.hash.match(/^#article\/(.+)$/);
      if (m) {
        const a = blogs.find(x => x.slug === m[1]);
        if (a) setActive(a);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [blogs]);

  const openArticle = (a) => {
    setActive(a);
    history.pushState(null, "", "#article/" + a.slug);
  };
  const closeArticle = () => {
    setActive(null);
    history.pushState(null, "", "#editorial");
  };

  return (
    <section id="editorial" className="section surface-cream" data-screen-label="Editorial">
      <div className="container">
        <div className="editorial-head">
          <div>
            <div className="eyebrow dark">Read</div>
            <h2 className="display-caslon editorial-title">
              The week's <em style={{fontFamily:'var(--font-display-serif)', fontStyle:'italic', color:'var(--badge-orange)'}}>longer reads.</em>
            </h2>
            <p className="italic-serif" style={{maxWidth:'58ch', color:'var(--muted)', marginTop:'0.5rem', fontSize:'15px'}}>
              Art + Finance on Tuesdays. Money Stories on Wednesdays. Profiles, intersections, mind. Coverage rotates each week — Americas, Europe, Africa, Asia &amp; the Middle East — so wherever you live, your part of the world comes around.
            </p>
          </div>
          <div className="editorial-regions">
            {regions.map(r => (
              <button key={r}
                className={"region-chip " + (regionFilter === r ? "active" : "")}
                onClick={() => setRegion(r)}>
                {r === "all" ? "Everywhere" : r}
              </button>
            ))}
          </div>
        </div>

        <div className="editorial-grid">
          {filtered.map((b, i) => (
            <article key={b.slug} className={"edit-card edit-card-" + (i === 0 ? "feat" : "std")}
                     onClick={() => openArticle(b)}>
              <div className="edit-card-media">
                <img src={`assets/work/${b.coverImage === 'portrait' ? 'el-anatsui-mans-cloth.jpg' : b.coverImage === 'gallery' ? 'gallery-1957-unlimited.jpg' : 'maboneng-arts-on-main.jpg'}`} alt={b.title} loading="lazy" />
              </div>
              <div className="edit-card-body">
                <div className="mono-label edit-card-meta">
                  {formatPubDate(b.publishDate)} · {b.region} · {b.author}
                </div>
                <h3 className="display-caslon edit-card-title">{b.title}</h3>
                <p className="italic-serif edit-card-deck">{b.summary}</p>
                <div className="edit-card-tags">
                  {b.tags.slice(0,3).map(t => <span key={t} className="edit-tag">{t}</span>)}
                </div>
                <div className="edit-card-read">Read →</div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {active && <ArticleView article={active} onClose={closeArticle} />}
    </section>
  );
}

window.Editorial = Editorial;
