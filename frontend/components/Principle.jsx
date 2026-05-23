// components/Principle.jsx — the founding line, shown not narrated.
// Anchor quote between Hero and Discover. Operator-locked copy.

function Principle() {
  return (
    <section id="principle" className="section surface-cream-2" data-screen-label="Principle">
      <div className="container" style={{maxWidth: 900, textAlign: "center", padding: "5rem 24px"}}>
        <div className="caps-fraunces"
             style={{fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.15, color: "var(--type-charcoal)"}}>
          We don&apos;t tell people<br/>art is valuable.{" "}
          <em style={{fontFamily: "var(--font-display-serif)", fontStyle: "italic", color: "var(--badge-orange)"}}>
            We align with what they value.
          </em>
        </div>
        <div className="mono-label" style={{marginTop: 28, color: "var(--muted)"}}>
          — ArtempireMJ founding principle
        </div>
      </div>
    </section>
  );
}

window.Principle = Principle;
