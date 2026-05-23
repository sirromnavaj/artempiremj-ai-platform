// components/Divisions.jsx — the seven sub-brands

const DIVISIONS = [
  { key:"main", name:"artempiremj", label:"Main", tagline:"Where Art Meets Everything",
    register:"Analytical, institutional",
    copy:"The anchor account. Daily structural reading of the global art economy.",
    logo:"assets/logos/master-circle.png", bg:"var(--editorial-dark)", fg:"var(--ivory)", accent:"var(--editorial-gold-mist)" },
  { key:"studio", name:"Studio & Gallery", label:"Commission",
    tagline:"Crafted. Collected. Exhibited.",
    register:"Maker's voice. MJ, first person.",
    copy:"Pencil-portrait commissions on cartridge paper. The Art-to-Soul series.",
    logo:"assets/logos/studio-gallery.png", bg:"var(--cream)", fg:"var(--type-charcoal)", accent:"var(--studio-orange)" },
  { key:"spotlight", name:".spotlight", label:"Curatorial",
    tagline:"Observing the institutions.",
    register:"Curatorial, observational",
    copy:"Exhibition reads, artist profiles, museum decisions — structural, not decorative.",
    logo:"assets/logos/spotlight.png", bg:"var(--cream-2)", fg:"var(--type-charcoal)", accent:"var(--spotlight-crimson)" },
  { key:"ink", name:".ink", label:"Archive",
    tagline:"Your Skin. Your Story. Our Archive.",
    register:"Body-positive, archive-building",
    copy:"An open call. Real tattoo stories from Africa and beyond — documented with care.",
    logo:"assets/logos/ink-division.png", bg:"var(--ink-forest-deep)", fg:"var(--ivory)", accent:"var(--ink-red)" },
  { key:"ai", name:".ai Studio", label:"Technical",
    tagline:"Intelligence, no jargon.",
    register:"Technical, plain",
    copy:"Where art's tools are changing. Pipelines, provenance, and the machinery of seeing.",
    logo:"assets/logos/ai-studio.png", bg:"var(--ai-teal-deep)", fg:"var(--ivory)", accent:"var(--ai-teal)" },
  { key:"community", name:".community", label:"Collective",
    tagline:"A continent listens to itself.",
    register:"Collective, inclusive",
    copy:"Readers, collectors, makers, students. The conversation between the posts.",
    logo:"assets/logos/community.png", bg:"var(--community-violet)", fg:"var(--ivory)", accent:"var(--community-gold)" },
  { key:"travel", name:"Art Travel", label:"Itinerary",
    tagline:"Capital in motion.",
    register:"Itinerary-led",
    copy:"Fair circuits, biennial maps, and the geography of where to go next.",
    logo:"assets/logos/art-travel.png", bg:"var(--travel-navy)", fg:"var(--ivory)", accent:"var(--travel-amber)" },
];

function Divisions() {
  return (
    <section id="divisions" className="section surface-cream-2" data-screen-label="Divisions">
      <div className="container">
        <div className="divisions-head">
          <div className="eyebrow dark">The continuum of creativity</div>
          <h2 className="display-caslon divisions-title">
            Seven divisions.<br/>
            <em style={{fontFamily:'var(--font-display-serif)', fontStyle:'italic', color:'var(--badge-orange)'}}>One institution.</em>
          </h2>
          <p className="divisions-deck italic-serif">
            Each division holds a register. The main account observes.
            Studio & Gallery makes. Spotlight curates. Ink archives.
            AI Studio measures. Community gathers. Art Travel maps.
          </p>
        </div>

        <div className="divisions-grid">
          {DIVISIONS.map(d => <DivisionCard key={d.key} d={d} />)}
        </div>
      </div>
    </section>
  );
}

function DivisionCard({ d }) {
  return (
    <a href="#" className="division-card" style={{
      background: d.bg, color: d.fg,
      ['--accent']: d.accent,
    }}>
      <div className="division-top">
        <span className="mono-label" style={{color:'var(--accent)'}}>{d.label}</span>
        <span className="mono-label" style={{opacity:0.5}}>@{d.key === 'main' ? 'artempiremj' : 'artempiremj.' + d.key}</span>
      </div>

      <div className="division-logo-wrap">
        <img src={d.logo} alt="" className="division-logo" />
      </div>

      <div className="division-body">
        <div className="division-name" style={{fontFamily:'var(--font-wordmark)', fontWeight:500}}>{d.name}</div>
        <div className="division-tagline italic-serif">"{d.tagline}"</div>
        <div className="division-register mono-label">{d.register}</div>
        <p className="division-copy">{d.copy}</p>
      </div>

      <div className="division-foot">
        <span className="mono-label">Enter →</span>
        <span className="division-bar" />
      </div>
    </a>
  );
}

window.Divisions = Divisions;
