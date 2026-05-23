// main app — assembles everything, handles tweaks protocol
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "editorial",
  "accentColor": "#E8891C",
  "darkNav": false
}/*EDITMODE-END*/;

const HERO_VARIANTS = [
  { key: "editorial", label: "Editorial", desc: "Dark, painterly, Market Geography cut" },
  { key: "typographic", label: "Typographic", desc: "Cream, massive Caslon serif" },
  { key: "portrait", label: "Portrait", desc: "Full-bleed pencil portrait" },
];

function App() {
  const [tweaks, setTweaks] = React.useState(() => {
    try {
      const saved = localStorage.getItem("artempire_tweaks");
      if (saved) return { ...TWEAK_DEFAULTS, ...JSON.parse(saved) };
    } catch (e) {}
    return TWEAK_DEFAULTS;
  });
  const [tweakOpen, setTweakOpen] = React.useState(false);

  React.useEffect(() => {
    try { localStorage.setItem("artempire_tweaks", JSON.stringify(tweaks)); } catch(e){}
    document.documentElement.style.setProperty('--badge-orange', tweaks.accentColor);
  }, [tweaks]);

  // Tweaks protocol — register listener first
  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setTweakOpen(true);
      else if (e.data.type === '__deactivate_edit_mode') setTweakOpen(false);
    };
    window.addEventListener('message', onMsg);
    // Now announce
    try {
      window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    } catch(e){}
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const update = (patch) => {
    setTweaks(prev => {
      const next = { ...prev, ...patch };
      try {
        window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
      } catch(e){}
      return next;
    });
  };

  // IntersectionObserver for reveals
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('in'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div id="top">
      <Nav dark={tweaks.darkNav} />
      <Hero variant={tweaks.heroVariant} />
      <Ticker />
      <Discover />
      <Editorial />
      <SeriesIndex />
      <Divisions />
      <Commission />
      <Develop />
      <Sustain />
      <About />
      <Newsletter />
      <Feedback />
      <Footer />

      {tweakOpen && (
        <div className="tweaks-panel visible">
          <h4>Tweaks</h4>

          <div className="tweak-row">
            <label>Hero variant</label>
            <div className="seg">
              {HERO_VARIANTS.map(v => (
                <button key={v.key}
                  className={tweaks.heroVariant === v.key ? "active" : ""}
                  onClick={() => update({ heroVariant: v.key })}>
                  {v.label}
                </button>
              ))}
            </div>
            <div style={{fontSize:11, color:'var(--muted)', marginTop:8, fontStyle:'italic'}}>
              {HERO_VARIANTS.find(v => v.key === tweaks.heroVariant)?.desc}
            </div>
          </div>

          <div className="tweak-row">
            <label>Accent</label>
            <div className="seg">
              {[
                { key:"#E8891C", label:"Master" },
                { key:"#C45E24", label:"Studio" },
                { key:"#8E2424", label:"Spot." },
                { key:"#0F4C3A", label:"Ink" },
              ].map(c => (
                <button key={c.key}
                  className={tweaks.accentColor === c.key ? "active" : ""}
                  onClick={() => update({ accentColor: c.key })}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tweak-row">
            <label>Nav mode</label>
            <div className="seg">
              <button className={!tweaks.darkNav ? "active" : ""} onClick={() => update({ darkNav: false })}>Cream</button>
              <button className={tweaks.darkNav ? "active" : ""} onClick={() => update({ darkNav: true })}>Dark</button>
            </div>
          </div>

          <div style={{marginTop:20, paddingTop:16, borderTop:'1px solid rgba(241,232,212,0.15)', fontSize:11, color:'var(--muted)', fontStyle:'italic', lineHeight:1.5}}>
            Changes persist. Use the Tweaks toggle in the toolbar to hide this panel.
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
