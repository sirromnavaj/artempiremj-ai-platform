// components/Nav.jsx — labels in words people search for, not insider terms
// 2026-05-23: anchors keep stable (#discover etc); labels use plain language
function Nav({ dark }) {
  const [open, setOpen] = React.useState(false);
  return (
    <nav className={"nav " + (dark ? "dark" : "")}>
      <div className="nav-inner">
        <a href="#top" className="nav-brand">
          <img src="assets/logos/master-circle.png" alt="ArtempireMJ — art and the human" className="nav-logo" />
          <span className="nav-wordmark">artempiremj</span>
          <span className="nav-tagline">Art and the human · Daily</span>
        </a>
        <button
          className="nav-toggle"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >☰</button>
        <div className={"nav-links " + (open ? "open" : "")}>
          <a href="#discover" onClick={() => setOpen(false)}>What's on</a>
          <a href="#editorial" onClick={() => setOpen(false)}>Read</a>
          <a href="#commission" onClick={() => setOpen(false)}>Commission a portrait</a>
          <a href="#develop" onClick={() => setOpen(false)}>Submit your work</a>
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#newsletter" onClick={() => setOpen(false)} className="nav-cta">Get the newsletter →</a>
        </div>
      </div>
    </nav>
  );
}

window.Nav = Nav;
