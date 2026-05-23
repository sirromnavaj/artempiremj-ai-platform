// components/Hero.jsx
// Heroes — three variants toggled via Tweaks.

function HeroEditorial() {
  // Dark editorial — "Market Geography" cut — painterly sepia background.
  return (
    <section className="hero-editorial surface-dark" data-screen-label="Hero">
      <div className="hero-editorial-bg" aria-hidden="true" />
      <div className="container hero-editorial-inner">
        <div className="hero-top">
          <div className="eyebrow">SATURDAY · ART OF MIND · W21 · NBO</div>
          <div className="hero-meta mono-label">ISSUE 030 · MAY 23, 2026</div>
        </div>

        <h1 className="hero-headline caps-fraunces">
          Market<br/>Geography<br/>
          <span className="italic-serif" style={{textTransform:'none', letterSpacing:'-0.01em', fontWeight:400, display:'block', marginTop:'0.15em'}}>is in motion.</span>
        </h1>

        <div className="hero-rule" />

        <p className="hero-deck italic-serif">
          How art capital relocates through institutions and platforms —<br/>
          read daily from Nairobi.
        </p>

        <div className="hero-foot">
          <div className="hero-datum">
            <div className="mono-label" style={{color:'var(--editorial-gold-mist)'}}>This week</div>
            <div className="hero-datum-val">Something to read every day.</div>
          </div>
          <div className="hero-datum">
            <div className="mono-label" style={{color:'var(--editorial-gold-mist)'}}>Daily 12:00 EAT</div>
            <div className="hero-datum-val">DISCOVER RADAR — 4-field test</div>
          </div>
          <div className="hero-datum">
            <div className="mono-label" style={{color:'var(--editorial-gold-mist)'}}>Commissions</div>
            <div className="hero-datum-val">Pencil on cartridge · By appointment</div>
          </div>
        </div>

        <div className="hero-cta-row">
          <a className="btn btn-gold" href="#series">Read the week</a>
          <a className="btn btn-ghost-dark" href="#commission">Commission a portrait →</a>
        </div>

        <div className="hero-brand-bar">
          <span className="mono-label" style={{color:'var(--editorial-gold-mist)'}}>ARTEMPIREMJ</span>
          <span className="italic-serif" style={{fontSize:14, color:'var(--ivory-soft)'}}>Discover · Develop · Sustain</span>
          <span className="mono-label" style={{color:'var(--muted)'}}>NAIROBI</span>
        </div>
      </div>
    </section>
  );
}

function HeroTypographic() {
  // Cream, massive Caslon — "Where Art Meets Everything" typographic manifesto
  return (
    <section className="hero-typographic surface-cream" data-screen-label="Hero">
      <div className="container hero-typographic-inner">
        <div className="hero-top">
          <div className="eyebrow dark">EDITORIAL INSTITUTION · NAIROBI · EST. 2024</div>
          <div className="mono-label" style={{color:'var(--muted)'}}>VOL 04 · NO. 128</div>
        </div>

        <h1 className="hero-big display-caslon">
          Where<br/>
          <em style={{fontFamily:'var(--font-display-serif)', fontStyle:'italic'}}>art</em>{" "}
          meets<br/>
          everything.
        </h1>

        <div className="hero-typographic-columns">
          <div>
            <div className="mono-label" style={{color:'var(--badge-orange)'}}>The read</div>
            <p className="typographic-copy">
              What money tells you about value. What artists were making before
              the headlines moved. What things cost. Who captures the value, who
              never sees it. Read daily from inside the African art world,
              addressed to anyone who is also paying attention.
            </p>
          </div>
          <div>
            <div className="mono-label" style={{color:'var(--badge-orange)'}}>The practice</div>
            <p className="typographic-copy">
              The studio in Nairobi takes commissions. The newsletter lands every
              Tuesday. The DISCOVER calendar names what's open. The studio watches
              the market; the market reframes the studio.
            </p>
          </div>
        </div>

        <div className="hero-cta-row" style={{marginTop:48}}>
          <a className="btn btn-dark" href="#series">Read the week →</a>
          <a className="btn btn-ghost-cream" href="#commission">Commission a portrait</a>
        </div>
      </div>
    </section>
  );
}

function HeroPortrait() {
  // Full-bleed pencil portrait + serif overlay
  return (
    <section className="hero-portrait" data-screen-label="Hero">
      <div className="hero-portrait-media">
        <img src="assets/work/brushtu-handle-with-care.jpg" alt="Installation view, Brush Tu — Handle with Care, Circle Art Gallery Nairobi, May 2026" />
        <div className="hero-portrait-scrim" />
      </div>
      <div className="container hero-portrait-inner">
        <div className="hero-top">
          <div className="eyebrow">STUDIO · GALLERY · COMMISSION</div>
          <div className="mono-label" style={{color:'var(--editorial-gold-mist)'}}>ART-TO-SOUL NO. 28</div>
        </div>

        <h1 className="hero-portrait-headline caps-fraunces">
          Crafted.<br/>Collected.<br/>Exhibited.
        </h1>

        <p className="italic-serif hero-portrait-deck">
          Pencil on cartridge paper. By appointment from Nairobi —<br/>
          shipped worldwide. The archive of one hand, one face, one memory.
        </p>

        <div className="hero-cta-row">
          <a className="btn btn-orange" href="#commission">Begin a commission →</a>
          <a className="btn btn-ghost-dark" href="#spotlight">See recent work</a>
        </div>
      </div>
    </section>
  );
}

function Hero({ variant }) {
  if (variant === "typographic") return <HeroTypographic />;
  if (variant === "portrait") return <HeroPortrait />;
  return <HeroEditorial />;
}

window.Hero = Hero;
