// components/About.jsx, Newsletter, Footer, Ticker
// Refreshed 2026-05-23: About expanded into category claim + reader recognition + who's writing + what's here + proof.
// Copy quoted from artempiremj-complete-system skill v2.5 (operator-gated).

function Ticker() {
  const items = [
    "ARTEMPIREMJ · LIVE AT ARTEMPIREMJ.COM",
    "LAGOS BIENNIAL 2026 · 17 OCT – 18 DEC",
    "BRUSH TU · HANDLE WITH CARE · CLOSES 29 MAY",
    "GALLERY 1957 · ACCRA · OPEN TUE–SAT",
    "TAAT · NAIROBI · GRANTS + GALLERY",
    "DISCOVER RADAR · DAILY 12:00 EAT",
    "ART + FINANCE · NEWSLETTER · TUESDAYS",
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
      <div className="container">

        {/* Opening: just the line, no preamble. */}
        <div className="about-claim" style={{marginBottom:'4rem', maxWidth:'780px'}}>
          <div className="eyebrow dark">About</div>
          <p className="italic-serif" style={{fontSize:'clamp(26px,3vw,40px)', lineHeight:1.4, marginTop:'1.5rem'}}>
            Art lives where people live — on their walls, on their skin, in their cities, in their money, in their mind. We read it from there.
          </p>
        </div>

        {/* Who's writing */}
        <div className="about-who" style={{marginBottom:'4rem'}}>
          <div className="eyebrow dark" style={{marginBottom:'1.5rem'}}>Who's writing</div>
          <div className="about-grid">
            <div className="about-left">
              <h3 className="display-caslon" style={{fontSize:'clamp(28px,3vw,40px)', lineHeight:1.1, marginBottom:'1rem'}}>
                Morris Javan Andanje. <em style={{fontFamily:'var(--font-display-serif)', fontStyle:'italic', color:'var(--badge-orange)'}}>Artist &amp; editor.</em>
              </h3>
              <p className="about-p">
                Morris Javan Andanje is an artist and the founding editor of ArtempireMJ. He works in graphite on paper — three portrait series held under the Studio &amp; Gallery practice, alongside original work shown and sold. He writes daily on art and the human, the way money, place, mind and skin pass through art and through each other.
              </p>
              <p className="about-p">
                Trained in analytical chemistry before turning to a practice that asks the same kind of questions. Based in Nairobi. Travels for the fairs that matter. Publishes across Instagram, TikTok, LinkedIn, Facebook, and a weekly newsletter. Commissions open by WhatsApp.
              </p>

              {/* Money Stories — co-authored. Kathleen's own practice leads. */}
              <div className="about-coauthor" style={{marginTop:'2.5rem', padding:'1.5rem', background:'var(--cream-2, #E8DFCC)', borderLeft:'4px solid var(--badge-orange)'}}>
                <div className="mono-label" style={{color:'var(--badge-orange)', marginBottom:'0.6rem'}}>Money Stories · co-authored</div>

                <div style={{display:'grid', gridTemplateColumns:'170px 1fr', gap:'1.25rem', alignItems:'flex-start'}}>
                  <figure style={{margin:0}}>
                    <img src="assets/work/money-stories-01-kathleen-mureithi.jpg"
                         alt="Kathleen Mureithi portrait, graphite and mixed media on paper — Money Stories No. 1, by Morris Javan Andanje"
                         loading="lazy"
                         style={{width:'100%', height:'auto', display:'block', borderRadius:'2px'}} />
                    <figcaption className="mono-label" style={{fontSize:'10px', color:'var(--muted)', marginTop:'6px', lineHeight:1.4}}>
                      Money Stories No. 1 · Kathleen Mureithi · graphite and mixed media on paper · Morris Javan
                    </figcaption>
                  </figure>
                  <div>
                    <div className="caps-fraunces" style={{fontSize:'22px', lineHeight:1.2, marginBottom:'0.2rem'}}>Kathleen Mureithi</div>
                    <div className="mono-label" style={{color:'var(--muted)', fontSize:'12px', marginBottom:'0.8rem', letterSpacing:'0.06em'}}>FINANCIAL ADVISER · RESEARCH ANALYST · STRATEGY CONSULTANT · NAIROBI</div>
                    <p className="about-p" style={{fontSize:'16px', margin:0, lineHeight:1.65}}>
                      Three years at Centonomy running programs that teach Kenyans how money actually works. Before that, KEMRI, climate consulting, health systems, women&apos;s economic empowerment across five countries. A decade of sitting with people and the stories money leaves on them.
                    </p>
                    <p className="about-p" style={{fontSize:'16px', margin:'0.7rem 0 0', lineHeight:1.65}}>
                      <em>Money Stories</em> is hers and Morris Javan&apos;s — chapters she writes inside Art + Finance, with a graphite portrait from Morris Javan on each. Equal credit, equal hand on the work. The series opens with her own portrait.
                    </p>
                    <p className="mono-label" style={{fontSize:'11px', color:'var(--type-charcoal-soft)', marginTop:'0.8rem'}}>
                      Her practice → <a href="https://kathleenmureithi.com" target="_blank" rel="noopener" style={{borderBottom:'1px solid currentColor'}}>kathleenmureithi.com</a> · <a href="https://instagram.com/kathleenmureithi" target="_blank" rel="noopener" style={{borderBottom:'1px solid currentColor'}}>@kathleenmureithi</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Correspondents — different relationship, different register */}
              <div className="about-correspondents" style={{marginTop:'2rem'}}>
                <div className="mono-label" style={{color:'var(--muted)', marginBottom:'0.5rem'}}>Correspondent</div>
                <p className="about-p" style={{fontSize:'17px', marginTop:'0.5rem'}}>
                  <strong>Khethiwe Tracy Gumede</strong> — Global Art Correspondent, based in South Africa. Press-accredited at the Investec Cape Town Art Fair. Field photography and gallery reporting from across the continent.
                </p>
                <p className="about-p" style={{fontSize:'15px', color:'var(--muted)', fontStyle:'italic'}}>
                  Open to working with artists, writers, photographers, and editors. Lagos, Accra, Dakar, London — wherever the work asks for it.
                </p>
              </div>
            </div>

            <div className="about-right">
              <div className="about-portrait">
                <img src="assets/work/art-to-soul-01-wangari-maathai.jpg" alt="Wangari Maathai portrait, graphite and mixed media on paper — Art-to-Soul No. 1, by Morris Javan Andanje" loading="lazy" />
                <div className="about-portrait-caption">
                  <span className="mono-label" style={{color:'var(--editorial-gold-mist)'}}>ART-TO-SOUL · NO. 1</span>
                  <div className="italic-serif" style={{color:'var(--ivory)', marginTop:6, fontSize:18}}>
                    Wangari Maathai · graphite and mixed media on paper · Morris Javan Andanje
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recently covered — show, not tell. */}
        <div style={{marginTop:'3rem', paddingTop:'2rem', borderTop:'1px solid var(--rule, #D8D4C8)'}}>
          <div className="eyebrow dark" style={{marginBottom:'1rem'}}>Recently covered</div>
          <p className="about-p" style={{fontSize:'15px', lineHeight:1.7, maxWidth:'780px'}}>
            Brush Tu (Nairobi) · Lagos Biennial 2026 · Gallery 1957 (Accra) · The African Arts Trust (Nairobi) · El Anatsui at Tate Modern · Maboneng Precinct (Johannesburg) · Olga Moela (Vanderbijlpark) · RMB Latitudes Art Fair · Everlyn Nicodemus at Goodman Gallery · Kathleen Mureithi · Wangari Maathai.
          </p>
          <p className="about-p" style={{fontSize:'12px', color:'var(--muted)', marginTop:'0.6rem', fontStyle:'italic'}}>
            Featured artists keep their own contact lines.
          </p>
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
        <div className="eyebrow">Published weekly · Art + Finance · free</div>
        <h2 className="caps-fraunces newsletter-title">
          What's actually happening,<br/>delivered weekly.
        </h2>
        <p className="italic-serif newsletter-deck">
          A read on what the work costs to make, where the value lands, and what's worth seeing this week. Written from inside, sent to anyone paying attention.
        </p>

        {!sent ? (
          <form
            name="newsletter"
            method="POST"
            action="https://artempiremj-forms.navajsirrom.workers.dev/submit"
            className="newsletter-form"
            onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              try {
                await fetch("https://artempiremj-forms.navajsirrom.workers.dev/submit", {
                  method: "POST",
                  body: fd,
                });
              } catch {}
              setSent(true);
            }}>
            <input type="hidden" name="form-name" value="newsletter" />
            <p style={{display:'none', position:'absolute', left:'-9999px'}}>
              <label>Don't fill this if you're human: <input name="bot-field" tabIndex="-1" autoComplete="off" /></label>
            </p>
            <input
              type="email"
              name="email"
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
              Thank you, {email}. Next Art + Finance lands Tuesday morning.
            </div>
          </div>
        )}

        <div className="newsletter-foot mono-label">
          Daily DISCOVER on social. Tuesday deep-read in your inbox. Unsubscribe in one click.
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
            Art and the human.
          </div>
        </div>

        <div className="footer-cols">
          <div>
            <div className="mono-label footer-colhead">The site</div>
            <ul>
              <li><a href="#discover">What's on</a></li>
              <li><a href="#editorial">Read</a></li>
              <li><a href="#commission">Commission a portrait</a></li>
              <li><a href="#develop">Submit your work</a></li>
              <li><a href="#newsletter">Newsletter</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>
          <div>
            <div className="mono-label footer-colhead">Find us</div>
            <ul>
              <li><a href="https://instagram.com/artempiremj" target="_blank" rel="noopener">Instagram</a></li>
              <li><a href="https://www.tiktok.com/@artempiremj" target="_blank" rel="noopener">TikTok</a></li>
              <li><a href="https://www.linkedin.com/company/artempiremj" target="_blank" rel="noopener">LinkedIn</a></li>
              <li><a href="https://www.facebook.com/artempiremj" target="_blank" rel="noopener">Facebook</a></li>
            </ul>
          </div>
          <div>
            <div className="mono-label footer-colhead">Get in touch</div>
            <ul>
              <li><a href="mailto:mj@artempiremj.com">mj@artempiremj.com</a></li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="mono-label">© 2026 ARTEMPIREMJ · NAIROBI</span>
        </div>
      </div>
    </footer>
  );
}

window.Ticker = Ticker;
window.About = About;
window.Newsletter = Newsletter;
window.Footer = Footer;
