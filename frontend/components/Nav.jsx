// components/Nav.jsx
function Nav({ dark }) {
  const [open, setOpen] = React.useState(false);
  return (
    <nav className={"nav " + (dark ? "dark" : "")}>
      <div className="nav-inner">
        <a href="#top" className="nav-brand">
          <img src="assets/logos/master-circle.png" alt="" className="nav-logo" />
          <span className="nav-wordmark">artempiremj</span>
          <span className="nav-tagline">Where Art Meets Everything</span>
        </a>
        <div className="nav-links">
          <a href="#discover">Discover</a>
          <a href="#editorial">Editorial</a>
          <a href="#develop">Develop</a>
          <a href="#sustain">Sustain</a>
          <a href="#commission">Commission</a>
          <a href="#commission" className="nav-cta">Commission a portrait</a>
        </div>
      </div>
    </nav>
  );
}

window.Nav = Nav;
