// components/Editorial.jsx — blog index, slug-routed articles
// Mirrors backend schema: Publish_Date, Title, Slug, Author, Summary, Body_HTML, Cover_Image_URL, Region, Tags, Status, Visibility

const BLOGS = [
  {
    publishDate: "2026-04-20",
    title: "Market Geography is in motion.",
    slug: "market-geography-in-motion",
    author: "MJ",
    summary: "TEFAF Maastricht 2026. London Art Fair 2026. Art Basel Qatar. Investec Cape Town Fair. Four fairs, one structural reading of where the center is moving.",
    bodyHtml: `
      <p>For the past decade, the map of the global art market had a defensible center: a Western European axis with a New York satellite and a Hong Kong auction room. That map is no longer accurate, and the four fairs listed in this piece are the proof.</p>
      <p>Begin with <em>Art Basel Qatar</em>. The inaugural Gulf edition is not a franchise; it is a repositioning. When Basel — the institution that defined the post-war fair as a category — crosses the Mediterranean, the question is no longer whether Gulf capital can attract Western art. It is whether Western institutions can still refuse to be peripheral to it.</p>
      <p>Then <em>Investec Cape Town Art Fair</em>. For twelve years the continent's flagship. What is different in 2027 is not the fair itself but the context: African collectors are no longer the audience; they are the market.</p>
      <p>The question is not whether Africa is becoming a creative capital engine. It already is. The question is what the existing institutions do with that fact.</p>
    `,
    coverImage: "painting",
    region: "Global",
    tags: ["Market Geography","TEFAF","Basel","Cape Town"]
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
          <img src={`assets/placeholder-${article.coverImage}.svg`} alt="" />
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
  const regions = ["all", ...new Set(BLOGS.map(b => b.region))];
  const filtered = regionFilter === "all" ? BLOGS : BLOGS.filter(b => b.region === regionFilter);

  // read hash for slug routing
  React.useEffect(() => {
    const checkHash = () => {
      const m = location.hash.match(/^#article\/(.+)$/);
      if (m) {
        const a = BLOGS.find(x => x.slug === m[1]);
        if (a) setActive(a);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

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
            <div className="eyebrow dark">Pillar 02 · Editorial</div>
            <h2 className="display-caslon editorial-title">
              Seven reads.<br/>
              <em style={{fontFamily:'var(--font-display-serif)', fontStyle:'italic', color:'var(--badge-orange)'}}>One structural week.</em>
            </h2>
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
                <img src={`assets/placeholder-${b.coverImage}.svg`} alt="" />
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
