// components/Editorial.jsx — blog index, slug-routed articles
// Mirrors backend schema: Publish_Date, Title, Slug, Author, Summary, Body_HTML, Cover_Image_URL, Region, Tags, Status, Visibility

const BLOGS = [
  {
    publishDate: "2026-05-05",
    title: "The auction room is no longer discovering prices.",
    slug: "auction-guarantees-discovery",
    author: "Morris Javan",
    summary: "Guarantees backed 36% of New York Evening Sale value in 2016. By 2025: 78%. The auction room is doing something different now — and the bottom of the market is doing something different too.",
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
    publishDate: "2026-05-23",
    title: "She was planting trees while the world called her dangerous.",
    slug: "money-stories-01-wangari-unbowed",
    author: "By Kathleen Mureithi · Financial Adviser · Portrait by Morris Javan",
    summary: "Before the Nobel Prize, there was a woman planting trees alone. Money Stories begins with Wangari Maathai — and the long years before the world caught up.",
    bodyHtml: `
      <p><em>Before the Nobel Prize, there was a woman planting trees alone.</em></p>
      <p>Before the standing ovations in Oslo, there were police batons. Before the honorary doctorates and the UN podiums and the streets renamed in her honour, there was a government that called her work subversive, a husband who left her because she was too strong-minded for a woman, and a judge who jailed her for daring to say he was corrupt.</p>
      <p>Before Wangari Maathai was celebrated, she was resisted. Loudly. Repeatedly. By people with the power to make resistance painful.</p>
      <p>And she planted trees anyway.</p>
      <p>I have been thinking about her story a great deal lately — not because of the prize, but because of the years before it. The twenty-seven years between the first seven seedlings she planted on World Environment Day in 1977 and the Nobel Peace Prize Committee calling her name in 2004. What happened in those years is not a footnote. It is the whole story. And I think it is a story that speaks directly to something I encounter in my work every single day — the money stories that people carry long before anyone else recognises their worth.</p>

      <h3>What was always true, before it was seen</h3>
      <p>Wangari Maathai did not begin planting trees because she expected recognition. She began because she saw something that others refused to see — that the deforestation stripping Kenya's hills was not just an environmental problem. It was an economic one. A food security problem. A women's empowerment problem. A democracy problem.</p>
      <p>She understood, before the language for it existed in policy circles, that you cannot separate the health of the land from the financial health of the household. That a woman walking six hours for firewood is a woman who cannot plant crops, cannot earn income, cannot educate her children.</p>
      <p>She saw the whole picture. And she acted on it — not with a grand strategy backed by donors and government support, but with seven seedlings and a backyard nursery and a belief that ordinary women, given tools and agency, would do the rest.</p>
      <p>She was right. The movement planted over 51 million trees across Kenya. But that number did not arrive fully formed. It arrived one tree at a time, across decades, in the face of a government that saw her not as a conservationist but as a threat.</p>
      <p><em>The value was always there. The world just hadn't decided to see it yet.</em></p>

      <h3>The cost of being right too early</h3>
      <p>This is the part of Wangari's story that I think we skip too quickly, because the Nobel Prize ending makes it feel inevitable. It was not inevitable. It was hard-won in ways that most people will never have to experience.</p>
      <p>Her vocal opposition to a 60-story development planned for the middle of Uhuru Park led the government of President Daniel arap Moi to label both Maathai and the Green Belt Movement "subversive." She was vilified in Parliament and in the press and forced to vacate her office of ten years with 24 hours' notice.</p>
      <p>In 1992, Uhuru Park became the site of a hunger strike to secure the release of political prisoners — at which Professor Maathai was beaten unconscious by police.</p>
      <p>Her husband divorced her, publicly calling her too educated, too strong, too successful. The judge who ruled in his favour — whom she then called out publicly — had her jailed for contempt of court.</p>
      <p>She was beaten. Jailed. Ridiculed. Dismissed. And called dangerous by the very people who needed her work the most.</p>
      <blockquote><p>"Nobody would have bothered me if all I did was encourage women to plant trees."<br/><em>— Wangari Maathai</em></p></blockquote>
      <p>That line has stayed with me. Because what it reveals is this: the moment her work began to threaten existing power structures — the moment it was clearly working — was the moment the resistance intensified. The persecution was not a sign that she was wrong. It was a sign that she was right, and that the right thing she was doing made powerful people uncomfortable.</p>

      <h3>Money Stories and the Wangari Principle</h3>
      <p>In my work as a financial adviser, I sit with people's money stories every day. And I have come to believe something that I want to name plainly here:</p>
      <p><strong>The value of your financial story is not determined by the moment someone else recognises it.</strong></p>
      <p>I meet women — and it is often women — who have been building quietly for years. Running households on impossible budgets. Raising children while servicing debt taken on by someone else. Saving $11 a month in a stokvel that nobody in their professional circle takes seriously. Making micro-decisions every single day that, compounded over time, represent extraordinary financial discipline and intelligence.</p>
      <p>And yet they come to me apologising. For not having started sooner. For not having more. For not looking like the version of financial success that gets celebrated on magazine covers.</p>
      <p>Wangari Maathai did not wait for the Nobel Prize to validate her work. She planted her next tree on the day she was released from prison. She rebuilt her office after she was forced out. She went back to Uhuru Park.</p>
      <p><em>The work was the work. The value was the value. The recognition was just the world catching up.</em></p>

      <h3>What had to survive before the value was seen</h3>
      <p>What had to survive before Wangari Maathai's vision was celebrated?</p>
      <p>Her marriage. Her reputation. Her physical safety. Her freedom. Her office. Her certainty, on the worst days, that what she was doing mattered at all.</p>
      <p>She survived all of it. And she kept planting.</p>
      <p>I think about the women in the villages who planted trees alongside her — the thousands who never got a prize, never gave a speech, never had a road named after them. Women who simply showed up, year after year, and put something living in the ground because a woman they trusted told them it mattered. Their contribution is in the roots of 51 million trees. It is real. It always was.</p>
      <p><em>Recognition came last. But value came first.</em></p>

      <h3>What this means for your money story</h3>
      <p>If you are reading this and you recognise yourself in the part of Wangari's story that came before Oslo — the part where you are doing the work and the world hasn't caught up yet — I want to say something directly to you.</p>
      <p><strong>The absence of recognition is not evidence of the absence of value.</strong></p>
      <p>The financial journey that looks modest from the outside may be extraordinary from the inside. The stokvel that gets dismissed at the dinner party is building real wealth. The budget that gets maintained through a job loss, a fuel price spike, a school fee increase, and a sick parent — that is a masterclass in financial resilience that no MBA programme teaches. The woman who started with nothing and built something small but solid — she is not behind. She is the story.</p>
      <blockquote><p>"Until you dig a hole, you plant a tree, you water it, and make it survive, you haven't done a thing. You're just talking."<br/><em>— Wangari Maathai</em></p></blockquote>
      <p>That is financial advice as much as it is environmental philosophy. The doing is everything. The planting is everything. Not the prize. Not the moment someone finally looks at what you have built and declares it worthy.</p>
      <p><em>The worth was there in the digging.</em></p>

      <h3>The Unbowed lesson</h3>
      <p>Wangari Maathai named her memoir <em>Unbowed</em>. Not Triumphant. Not Celebrated. Unbowed.</p>
      <p>Because the thing worth preserving — through the beatings and the jailings and the divorce and the vilification — was not her comfort or her reputation. It was her direction. The refusal to be turned around by pressure. The commitment to keep moving toward the thing she knew was right, even when the world insisted she was wrong.</p>
      <p>I think that is the deepest financial lesson her life teaches. Not the lesson of the prize. The lesson of the years before it.</p>
      <p>Stay unbowed toward your financial future. Not because the recognition will definitely come — it may not, not in the form you imagine. But because the work of building security, of planting something that will outlast this difficult season, is worth doing for its own sake.</p>
      <p><em>The trees are real. The roots are deep. Even when nobody is looking.</em></p>

      <hr/>
      <p style="font-size:14px;color:#6B6253;font-style:italic">This article is part of the Money Stories series — exploring the financial lives, struggles, and wisdom of African women and communities that rarely make the headlines. If you have a money story worth telling, Kathleen would love to hear it.</p>
      <p style="font-size:14px;color:#6B6253"><strong>Kathleen Mureithi</strong> is a financial adviser working with African households to build financial resilience. Connect with her at <a href="tel:+254723158920">+254 723 158920</a> · <a href="https://kathleenmureithi.com" target="_blank" rel="noopener">kathleenmureithi.com</a>.</p>
      <p style="font-size:14px;color:#6B6253">The accompanying portrait is Money Stories No. 1, the series centerpiece — Kathleen Mureithi, graphite and mixed media on paper, by Morris Javan Andanje. (The graphite portrait of Wangari Maathai herself is Art-to-Soul No. 1, also by Morris Javan, accompanying the second chapter.)</p>
    `,
    coverImage: "portrait",
    region: "Africa",
    tags: ["Art + Finance","Money Stories","Wangari Maathai"]
  },
  {
    publishDate: "2026-04-20",
    title: "Where the centre of the art market is moving.",
    slug: "market-geography-in-motion",
    author: "Morris Javan",
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
    author: "Morris Javan",
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
    author: "Morris Javan",
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
    author: "Morris Javan",
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
    author: "Morris Javan",
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
    author: "Morris Javan",
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
          <img src={`assets/work/${
            article.slug === 'money-stories-01-wangari-unbowed' ? 'money-stories-01-kathleen-mureithi.jpg'
            : article.slug === 'money-stories-02' ? 'art-to-soul-01-wangari-maathai.jpg'
            : article.coverImage === 'portrait' ? 'el-anatsui-mans-cloth.jpg'
            : article.coverImage === 'gallery' ? 'gallery-1957-unlimited.jpg'
            : 'lagos-biennial-2026.jpg'}`} alt={article.title} />
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
            <p className="italic-serif" style={{maxWidth:'58ch', marginTop:'0.5rem', fontSize:'15px'}}>
              Pick a region. Read what's there. Wherever you live, your part of the world comes around.
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
                <img src={`assets/work/${
                  b.slug === 'money-stories-01-wangari-unbowed' ? 'money-stories-01-kathleen-mureithi.jpg'
                  : b.slug === 'money-stories-02' ? 'art-to-soul-01-wangari-maathai.jpg'
                  : b.coverImage === 'portrait' ? 'el-anatsui-mans-cloth.jpg'
                  : b.coverImage === 'gallery' ? 'gallery-1957-unlimited.jpg'
                  : 'maboneng-arts-on-main.jpg'}`} alt={b.title} loading="lazy" />
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
