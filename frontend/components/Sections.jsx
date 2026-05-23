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

        {/* --- SECTION 1 — Category claim (option A) --- */}
        <div className="about-claim" style={{marginBottom:'4rem'}}>
          <div className="eyebrow dark">About · ArtempireMJ</div>
          <h2 className="display-caslon about-claim-title" style={{fontSize:'clamp(40px,5vw,72px)', lineHeight:1.05, marginTop:'1rem'}}>
            ArtempireMJ holds art and the human <em style={{fontFamily:'var(--font-display-serif)', fontStyle:'italic', color:'var(--badge-orange)'}}>together.</em>
            <span style={{display:'block', fontSize:'0.6em', fontWeight:400, marginTop:'0.4em', color:'var(--type-charcoal)'}}>
              From inside. Daily.
            </span>
          </h2>
        </div>

        {/* --- SECTION 2 — Reader recognition + the anchor (option C + skill narrative) --- */}
        <div className="about-recognition" style={{marginBottom:'4rem', maxWidth:'780px'}}>
          <div className="eyebrow dark" style={{marginBottom:'1rem'}}>Who this is for</div>

          <p className="italic-serif" style={{fontSize:'clamp(22px,2.2vw,30px)', lineHeight:1.5, marginBottom:'1.5rem'}}>
            For anyone who has been noticing things alone.
          </p>

          <p className="about-p" style={{fontSize:'18px', lineHeight:1.7}}>
            The artist at 11pm building a practice with fewer resources than the work deserves. The first-time collector who isn't sure if they paid too much. The art finance professional priced out of the institutional reports. The diaspora reader connecting back through art experiences. The story-carrier whose tattoo or skin marking deserves witnessing.
          </p>
          <p className="about-p" style={{fontSize:'18px', lineHeight:1.7}}>
            Where they live is not the point. What they carry is.
          </p>

          {/* --- Who this lands for --- */}
          <div className="about-for" style={{margin:'2.5rem 0', padding:'1.5rem 0', borderTop:'1px solid var(--rule, #D8D4C8)', borderBottom:'1px solid var(--rule, #D8D4C8)'}}>
            <div className="mono-label" style={{color:'var(--badge-orange)', marginBottom:'0.8rem'}}>This lands for</div>
            <ul style={{fontSize:'17px', lineHeight:1.7, listStyle:'none', padding:0, margin:0, columnCount:2, columnGap:'2rem'}}>
              <li>· Readers who want what's actually happening on the floor</li>
              <li>· Buyers choosing for meaning, looking for the work that holds up</li>
              <li>· Artists and writers building a practice and want company in it</li>
              <li>· Travelers planning around the art, the gallery, the fair</li>
              <li>· Story-carriers whose skin, city, or career a piece of art names</li>
              <li>· Collectors looking for a portrait that holds a face the long way</li>
            </ul>
          </div>

          {/* --- The anchor narrative --- */}
          <p className="about-p" style={{fontSize:'19px', lineHeight:1.7, marginTop:'2rem'}}>
            Art is not separate from how people live.
          </p>
          <p className="about-p" style={{fontSize:'18px', lineHeight:1.7}}>
            It is in the spaces they inhabit — the mural on the building they pass every morning, the painting on the café wall they've eaten beneath for years without knowing the artist's name. It is on the skin they carry — the tattoo that holds a migration story, a grief, a ceremony. It is in the cities they move through — the gallery that opened in a neighbourhood changing faster than its residents can afford, the biennale that landed in a city that didn't have one until someone built it.
          </p>
          <p className="about-p" style={{fontSize:'18px', lineHeight:1.7}}>
            It is in the money — what art costs to make, what it sells for, who captures the value, who never sees it. It is in the mind — the question art asks that won't resolve, that stays with you on the commute.
          </p>
          <p className="about-p" style={{fontSize:'18px', lineHeight:1.7}}>
            ArtempireMJ maps all of it. From inside the African art world. Addressed globally to anyone who is also paying attention.
          </p>
        </div>

        {/* --- SECTION 3 — Who's writing --- */}
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

              <div className="about-correspondents" style={{marginTop:'2rem'}}>
                <div className="mono-label" style={{color:'var(--muted)', marginBottom:'0.5rem'}}>Collaborators</div>

                <div style={{display:'grid', gridTemplateColumns:'160px 1fr', gap:'1.25rem', alignItems:'flex-start', marginTop:'0.8rem'}}>
                  <figure style={{margin:0}}>
                    <img src="assets/work/money-stories-01-kathleen-mureithi.jpg"
                         alt="Kathleen Mureithi portrait, graphite and mixed media on paper — Money Stories No. 1, by Morris Javan Andanje"
                         loading="lazy"
                         style={{width:'100%', height:'auto', display:'block', borderRadius:'2px'}} />
                    <figcaption className="mono-label" style={{fontSize:'10px', color:'var(--muted)', marginTop:'6px', lineHeight:1.4}}>
                      Money Stories No. 1 · Kathleen Mureithi · graphite and mixed media on paper · MJ
                    </figcaption>
                  </figure>
                  <div>
                    <p className="about-p" style={{fontSize:'17px', margin:0}}>
                      <strong>Kathleen Mureithi</strong> — Research Analyst and Strategy Consultant in Nairobi. Three years at Centonomy running programs that teach Kenyans how money actually works. Before that, KEMRI, climate consulting, health systems, women&apos;s economic empowerment across five countries. A decade of sitting with people and the stories money leaves on them.
                    </p>
                    <p className="about-p" style={{fontSize:'17px', margin:'0.8rem 0 0'}}>
                      With MJ she co-authors <em>Money Stories</em>, the chapter series inside Art + Finance. Each chapter is a story she writes; each chapter has a portrait MJ draws. The series opens with hers.
                    </p>
                    <p className="mono-label" style={{fontSize:'11px', color:'var(--muted)', marginTop:'0.6rem'}}>
                      <a href="https://kathleenmureithi.com" target="_blank" rel="noopener">kathleenmureithi.com</a> · <a href="https://instagram.com/kathleenmureithi" target="_blank" rel="noopener">@kathleenmureithi</a>
                    </p>
                  </div>
                </div>

                <p className="about-p" style={{fontSize:'17px', marginTop:'1.5rem'}}>
                  <strong>Khethiwe Tracy Gumede</strong> — Global Art Correspondent, South Africa. Press-accredited at the Investec Cape Town Art Fair. Field photography and gallery reporting from across the continent.
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
              <blockquote className="about-pullquote">
                <div className="caps-fraunces" style={{fontSize:'clamp(24px,2.6vw,38px)', lineHeight:1.05}}>
                  We don't tell people<br/>art is valuable.<br/>
                  <em style={{fontFamily:'var(--font-display-serif)', fontStyle:'italic', color:'var(--badge-orange)'}}>We align with what they value.</em>
                </div>
                <footer className="mono-label" style={{marginTop:16, color:'var(--muted)'}}>— ArtempireMJ founding principle</footer>
              </blockquote>
            </div>
          </div>
        </div>

        {/* --- SECTION 4 — What you find here (the offers, audience-job worded) --- */}
        <div className="about-offers" style={{marginBottom:'4rem'}}>
          <div className="eyebrow dark" style={{marginBottom:'1.5rem'}}>What you find here</div>
          <div className="about-offers-grid">
            <div className="about-offer">
              <div className="mono-label" style={{color:'var(--badge-orange)'}}>READ</div>
              <h4 className="caps-fraunces">A read worth your morning.</h4>
              <p>Art + Finance every week — the work, the money, and how value moves. Inside it, <em>Money Stories</em>: chapter-length writing by Kathleen Mureithi with a portrait by MJ. Plus artists, intersections, mind, and the world read through art.</p>
            </div>
            <div className="about-offer">
              <div className="mono-label" style={{color:'var(--badge-orange)'}}>DISCOVER</div>
              <h4 className="caps-fraunces">The shows worth crossing a city for.</h4>
              <p>Every fair, biennale, open call, exhibition, deadline — verified daily. Built so the door isn't already closed by the time you find it.</p>
            </div>
            <div className="about-offer">
              <div className="mono-label" style={{color:'var(--badge-orange)'}}>STUDIO &amp; GALLERY</div>
              <h4 className="caps-fraunces">The studio practice.</h4>
              <p>MJ&apos;s portrait series in graphite and mixed media — your face, an artist you admire, or the work-meets-money piece. Plus work by other artists shown and sold through the gallery floor.</p>
            </div>
            <div className="about-offer">
              <div className="mono-label" style={{color:'var(--badge-orange)'}}>SUBMIT</div>
              <h4 className="caps-fraunces">Be in the room.</h4>
              <p>Artists submit work for Spotlight features. Writers and researchers join as correspondents. Skin-story carriers submit to the Ink archive.</p>
            </div>
          </div>
        </div>

        {/* --- SECTION 5 — How we work --- */}
        <div className="about-position" style={{marginBottom:'3rem', background:'var(--cream-2, #E8DFCC)', padding:'2.5rem', borderLeft:'6px solid var(--badge-orange)'}}>
          <div className="eyebrow dark" style={{marginBottom:'1rem'}}>How we work</div>
          <p className="italic-serif" style={{fontSize:'clamp(20px,2.2vw,28px)', lineHeight:1.45, marginBottom:'1.2rem'}}>
            We show, we don't explain. We align with what readers and artists already value, and we add the work of seeing it together.
          </p>
          <p className="about-p" style={{fontSize:'17px'}}>
            Living in Nairobi. Attending the fairs. Drawing the portraits. Reading the room the institutions, galleries, fairs and artists are already shaping — and adding what we see from inside it.
          </p>
          <p className="about-p" style={{fontSize:'17px'}}>
            Daily, since 2023. Open to collaborate with the people doing the same work elsewhere.
          </p>
        </div>

        {/* --- SECTION 6 — Who we work with vs who we cover (honest framing) --- */}
        <div className="about-people" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2.5rem', marginTop:'2rem'}}>
          <div>
            <div className="eyebrow dark" style={{marginBottom:'1rem'}}>Who we work with</div>
            <p className="about-p" style={{fontSize:'16px', lineHeight:1.65}}>
              <strong>Khethiwe Tracy Gumede</strong> — Global Art Correspondent, South Africa. Press-accredited at the Investec Cape Town Art Fair. Field photography + gallery observations.
            </p>
            <p className="about-p" style={{fontSize:'16px', lineHeight:1.65}}>
              <strong>Kathleen Mureithi</strong> — Money Stories co-author. The human financial reality of creative practice.
            </p>
            <p className="about-p" style={{fontSize:'15px', color:'var(--muted)', fontStyle:'italic'}}>
              Network growing in Lagos, Accra, Dakar, and the London diaspora.
            </p>
          </div>
          <div>
            <div className="eyebrow dark" style={{marginBottom:'1rem'}}>Recently covered</div>
            <p className="about-p" style={{fontSize:'15px', lineHeight:1.65}}>
              Brush Tu (Nairobi) · Lagos Biennial 2026 · Gallery 1957 (Accra) · The African Arts Trust (Nairobi) · El Anatsui at Tate Modern · Maboneng Precinct (Johannesburg) · Olga Moela (Vanderbijlpark) · RMB Latitudes Art Fair · Everlyn Nicodemus at Goodman Gallery.
            </p>
            <p className="about-p" style={{fontSize:'13px', color:'var(--muted)', marginTop:'1rem'}}>
              Coverage isn't endorsement. Featured artists keep their own contact lines.
            </p>
          </div>
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
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="newsletter-form"
            onSubmit={(e) => { setSent(true); }}>
            <input type="hidden" name="form-name" value="newsletter" />
            <p style={{display:'none'}}><input name="bot-field" /></p>
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
            "Art and the human, held together. From inside. Daily."
          </div>
        </div>

        <div className="footer-cols">
          <div>
            <div className="mono-label footer-colhead">Series · Weekly</div>
            <ul>
              <li>Mon · Global Art Spotlight</li>
              <li>Tue · Art + Finance</li>
              <li>Wed · Money Stories / The World Through Art</li>
              <li>Thu · Artist Spotlight</li>
              <li>Fri · Intersections</li>
              <li>Sat · Art of Mind</li>
              <li>Sun · Civic · Nude · Ink (rotating)</li>
              <li>Daily · DISCOVER RADAR — 12:00 EAT</li>
            </ul>
          </div>
          <div>
            <div className="mono-label footer-colhead">Sub-brands</div>
            <ul>
              <li>Studio &amp; Gallery</li>
              <li>.spotlight</li>
              <li>.ink</li>
              <li>Art Itineraries</li>
              <li>.community <span style={{color:'var(--muted)'}}>(opens at 5k)</span></li>
            </ul>
          </div>
          <div>
            <div className="mono-label footer-colhead">Channels</div>
            <ul>
              <li>Instagram · @artempiremj</li>
              <li>TikTok · @artempiremj</li>
              <li>LinkedIn · artempiremj</li>
              <li>Facebook · Artempiremj</li>
              <li>Newsletter · beehiiv (Tuesdays)</li>
              <li>WhatsApp · commission intake</li>
            </ul>
          </div>
          <div>
            <div className="mono-label footer-colhead">Studio &amp; Connect</div>
            <ul>
              <li><a href="#commission">Commission a portrait</a></li>
              <li><a href="#develop">Submit your work / story</a></li>
              <li><a href="#sustain">Partners &amp; sponsors</a></li>
              <li>Nairobi, Kenya</li>
              <li><a href="mailto:mj@artempiremj.com">mj@artempiremj.com</a></li>
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
