// components/About.jsx, Newsletter, Footer, Ticker
function Ticker() {
  const items = [
    "AFRICA IS NOW A CREATIVE CAPITAL ENGINE",
    "W17 · APR 20–26 · NAIROBI",
    "TEFAF MAASTRICHT 2026 · OPEN",
    "ART BASEL QATAR · CONFIRMED",
    "INVESTEC CAPE TOWN FAIR · FEB 2027",
    "DISCOVER RADAR · DAILY 12:00 EAT",
    "NEW ARTIST SPOTLIGHT · ANNE MWITI · THURSDAY",
  ];
  const loop = [...items, ...items];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {loop.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="section surface-cream" data-screen-label="About">
      <div className="container about-grid">
        <div className="about-left">
          <div className="eyebrow dark">The operator · MJ</div>
          <h2 className="display-caslon about-title">
            One hand at the centre. <em style={{fontFamily:'var(--font-display-serif)', fontStyle:'italic', color:'var(--badge-orange)'}}>Seven registers around it.</em>
          </h2>
          <p className="about-p">
            Morris Javan Andanje — MJ — is an artist and editor based in Nairobi.
            The commission practice is pencil-on-paper portraiture. The editorial
            practice is a daily structural reading of the global art economy.
            The two inform each other: the portrait watches the market; the market
            reframes the portrait.
          </p>
          <p className="about-p">
            Published across Instagram, TikTok, LinkedIn, Facebook, and a beehiiv
            newsletter. Commissions close on WhatsApp.
          </p>

          <div className="about-tests">
            <div className="about-test">
              <div className="mono-label" style={{color:'var(--badge-orange)'}}>MASTER TEST</div>
              <div className="italic-serif about-test-q">"Is this decorating culture — or analysing its mechanics?"</div>
            </div>
            <div className="about-test">
              <div className="mono-label" style={{color:'var(--badge-orange)'}}>AI REDUNDANCY TEST</div>
              <div className="italic-serif about-test-q">"Could someone get this from ChatGPT? If yes — transform."</div>
            </div>
          </div>
        </div>

        <div className="about-right">
          <div className="about-portrait">
            <img src="assets/placeholder-portrait.svg" alt="MJ at work" />
            <div className="about-portrait-caption">
              <span className="mono-label" style={{color:'var(--editorial-gold-mist)'}}>MJ · STUDIO · NBO</span>
              <div className="italic-serif" style={{color:'var(--ivory)', marginTop:6, fontSize:18}}>Pencil on cartridge · Session 3 of 8</div>
            </div>
          </div>
          <blockquote className="about-pullquote">
            <div className="caps-fraunces" style={{fontSize:'clamp(28px,3vw,44px)', lineHeight:1.05}}>
              Legitimacy<br/>is not given.<br/>It is structured.
            </div>
            <footer className="mono-label" style={{marginTop:16, color:'var(--muted)'}}>— MJ</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  return (
    <section id="newsletter" className="section surface-dark" data-screen-label="Newsletter">
      <div className="container newsletter-inner">
        <div className="eyebrow">Published weekly · beehiiv · free</div>
        <h2 className="caps-fraunces newsletter-title">
          The week,<br/>on one page.
        </h2>
        <p className="italic-serif newsletter-deck">
          Every Sunday night (Nairobi time) we send the week's seven reads as a
          single dispatch. No hype. No "this artist's journey." Just the structural facts.
        </p>

        {!sent ? (
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input
              type="email"
              required
              placeholder="your.email@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-gold">Subscribe →</button>
          </form>
        ) : (
          <div className="newsletter-done">
            <div className="mono-label" style={{color:'var(--editorial-gold-mist)', marginBottom:12}}>● RECEIVED</div>
            <div className="italic-serif" style={{fontSize:22, color:'var(--ivory)'}}>
              Thank you, {email}. Next dispatch Sunday night.
            </div>
          </div>
        )}

        <div className="newsletter-foot mono-label">
          422 posts · 516 readers · 1,333 following · growing slowly, on purpose
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer surface-dark" data-screen-label="Footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="assets/logos/master-circle.png" alt="" className="footer-logo" />
            <div>
              <div className="wordmark" style={{color:'var(--ivory)', fontSize:28}}>artempiremj</div>
              <div className="mono-label" style={{color:'var(--editorial-gold-mist)', marginTop:4}}>Where Art Meets Everything</div>
            </div>
          </div>
          <div className="footer-closing italic-serif">
            "Every voice adds texture. Between the artworks and the words exchanged. A continent listens to itself."
          </div>
        </div>

        <div className="footer-cols">
          <div>
            <div className="mono-label footer-colhead">Series</div>
            <ul>
              <li>Mon · Global Art Spotlight</li>
              <li>Tue · Art + Finance</li>
              <li>Wed · Money Stories</li>
              <li>Thu · Artist Spotlight</li>
              <li>Fri · Intersections</li>
              <li>Sat · Art of Mind</li>
              <li>Sun · Civic Art</li>
            </ul>
          </div>
          <div>
            <div className="mono-label footer-colhead">Divisions</div>
            <ul>
              <li>Studio & Gallery</li>
              <li>.spotlight</li>
              <li>.ink</li>
              <li>.ai Studio</li>
              <li>.community</li>
              <li>Art Travel</li>
            </ul>
          </div>
          <div>
            <div className="mono-label footer-colhead">Channels</div>
            <ul>
              <li>Instagram · @artempiremj</li>
              <li>TikTok · @artempiremj</li>
              <li>LinkedIn · artempiremj</li>
              <li>Facebook · Artempiremj</li>
              <li>Threads · artempiremj</li>
              <li>Newsletter · beehiiv</li>
            </ul>
          </div>
          <div>
            <div className="mono-label footer-colhead">Studio</div>
            <ul>
              <li>WhatsApp intake</li>
              <li>Art-to-Soul series</li>
              <li>Gallery placement</li>
              <li>Nairobi, Kenya</li>
              <li>mj@artempiremj.com</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="mono-label">ARTEMPIREMJ · DISCOVER · DEVELOP · SUSTAIN</span>
          <span className="mono-label">© 2026 · NAIROBI · ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
}

window.Ticker = Ticker;
window.About = About;
window.Newsletter = Newsletter;
window.Footer = Footer;
