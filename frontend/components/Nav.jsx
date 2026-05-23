// components/Nav.jsx — audience-needs-led labels, not operator-pillar words
// Refreshed 2026-05-23: Discover · Editorial · Spotlight · Submit · About · Commission + Newsletter CTA chip
function Nav({ dark }) {
  const [open, setOpen] = React.useState(false);
  return (
    <nav className={"nav " + (dark ? "dark" : "")}>
      <div className="nav-inner">
        <a href="#top" className="nav-brand">
          <img src="assets/logos/master-circle.png" alt="" className="nav-logo" />
          <span className="nav-wordmark">artempiremj</span>
          <span className="nav-tagline">Art and the human · From inside · Daily</span>
        </a>
        <button
          className="nav-toggle"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >☰</button>
        <div className={"nav-links " + (open ? "open" : "")}>
          <a href="#discover" onClick={() => setOpen(false)}>Discover</a>
          <a href="#editorial" onClick={() => setOpen(false)}>Editorial</a>
          <a href="#spotlight" onClick={() => setOpen(false)}>Spotlight</a>
          <a href="#develop" onClick={() => setOpen(false)}>Submit</a>
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#commission" onClick={() => setOpen(false)}>Commission</a>
          <a href="#newsletter" onClick={() => setOpen(false)} className="nav-cta">Get the newsletter →</a>
        </div>
      </div>
    </nav>
  );
}

window.Nav = Nav;
