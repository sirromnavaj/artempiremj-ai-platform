// components/Divisions.jsx — the seven sub-brands

const DIVISIONS = [
  { key:"main", name:"artempiremj", label:"Main", tagline:"Where Art Meets Everything",
    copy:"The main account. Daily reads on what the art world is making, costing, and missing.",
    logo:"assets/logos/master-circle.png", bg:"var(--editorial-dark)", fg:"var(--ivory)", accent:"var(--editorial-gold-mist)" },
  { key:"studio", name:"Studio & Gallery", label:"The studio practice",
    tagline:"Crafted. Collected. Exhibited.",
    copy:"MJ as artist. Three portrait series — Art-to-Soul (your face), Artist Edition (other artists), Money Stories Edition (work meets money). Original work shown and sold through the gallery function. The first-person sub-brand.",
    logo:"assets/logos/studio-gallery.png", bg:"var(--cream)", fg:"var(--type-charcoal)", accent:"var(--studio-orange)" },
  { key:"spotlight", name:".spotlight", label:"Curatorial",
    tagline:"Observing the institutions.",
    copy:"Exhibition reads, artist profiles, what museum decisions actually mean.",
    logo:"assets/logos/spotlight.png", bg:"var(--cream-2)", fg:"var(--type-charcoal)", accent:"var(--spotlight-crimson)" },
  { key:"ink", name:".ink", label:"Archive",
    tagline:"Your Skin. Your Story. Our Archive.",
    copy:"An open call. Real tattoo stories from Africa and beyond — documented with care.",
    logo:"assets/logos/ink-division.png", bg:"var(--ink-forest-deep)", fg:"var(--ivory)", accent:"var(--ink-red)" },
  { key:"itineraries", name:"Art Itineraries", label:"Travel",
    tagline:"Where to go to see the work that matters.",
    copy:"City guides for art trips. Where to stay, what to see first, what to skip, what it actually costs when you land.",
    logo:"assets/logos/art-travel.png", bg:"var(--travel-navy)", fg:"var(--ivory)", accent:"var(--travel-amber)" },
  { key:"community", name:".community", label:"Collective",
    tagline:"A continent listens to itself.",
    copy:"Readers, collectors, makers, students. Opens at five thousand followers.",
    logo:"assets/logos/community.png", bg:"var(--community-violet)", fg:"var(--ivory)", accent:"var(--community-gold)" },
];

function Divisions() {
  return (
    <section id="divisions" className="section surface-cream-2" data-screen-label="Divisions">
      <div className="container">
        <div className="divisions-head">
          <div className="eyebrow dark">If you want more</div>
          <h2 className="display-caslon divisions-title">
            Wherever <em style={{fontFamily:'var(--font-display-serif)', fontStyle:'italic', color:'var(--badge-orange)'}}>you came in</em> for.
          </h2>
          <p className="divisions-deck italic-serif">
            A portrait of your face. A read on the exhibition you missed. A tattoo story you've never heard. A trip planned around what's worth seeing.
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
