// components/DevelopSustain.jsx — contributor form + partners grid + feedback

// --- DEVELOP (contributor submission) ---
// Schema matches submitContributorForm(data): fullName, email, location, whatsapp,
// portfolio, discipline, segment, bio, workLink, rights

const DISCIPLINES = [
  "Painting", "Drawing / Illustration", "Sculpture", "Photography",
  "Textile / Fibre", "Film / Video", "Writing / Editorial",
  "Curation / Research", "Design", "Music / Sound", "Other"
];

const SEGMENTS = [
  "Money Stories", "Global Art Spotlight", "Major Art Events",
  "Artist Spotlight", "Art + Finance", "Intersections",
  "Art of Mind", "Ink Series", "Civic Art Spotlight", "Nude Art Series"
];

function Develop() {
  const [form, setForm] = React.useState({
    fullName: "", email: "", location: "", whatsapp: "",
    portfolio: "", discipline: "", segment: "",
    bio: "", workLink: "", rights: false
  });
  const [sent, setSent] = React.useState(false);
  const [step, setStep] = React.useState(1);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const canAdvance = () => {
    if (step === 1) return form.fullName && form.email && form.location;
    if (step === 2) return form.discipline && form.segment && form.portfolio;
    if (step === 3) return form.bio && form.workLink && form.rights;
    return false;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!canAdvance()) return;
    const fd = new FormData();
    fd.append("form-name", "contributor");
    fd.append("bot-field", "");
    Object.entries(form).forEach(([k, v]) => fd.append(k, typeof v === "boolean" ? String(v) : v));
    try {
      await fetch("https://artempiremj-forms.navajsirrom.workers.dev/submit", { method: "POST", body: fd });
    } catch {}
    setSent(true);
  };

  return (
    <section id="develop" className="section surface-cream" data-screen-label="Develop">
      <div className="container">
        <div className="develop-grid">
          <div className="develop-left">
            <div className="eyebrow dark">Pillar 03 · Develop</div>
            <h2 className="display-caslon develop-title">
              Submit your practice.<br/>
              <em style={{fontFamily:'var(--font-display-serif)', fontStyle:'italic', color:'var(--badge-orange)'}}>We read every submission.</em>
            </h2>
            <p className="develop-deck italic-serif">
              Artempire is a platform, not a portfolio. If your work belongs in one
              of the seven series, we want to know. Approved contributors are
              featured in a weekly dispatch, interviewed on record, and placed
              in the editorial archive.
            </p>

            <div className="develop-tests">
              <div className="develop-test">
                <div className="mono-label" style={{color:'var(--badge-orange)'}}>WHAT WE LOOK FOR</div>
                <ul className="develop-ul">
                  <li>A clear practice, stated in your own language.</li>
                  <li>Work that is structural, not decorative.</li>
                  <li>A body of evidence — not one piece.</li>
                  <li>Consent to publish, unambiguously given.</li>
                </ul>
              </div>
              <div className="develop-test">
                <div className="mono-label" style={{color:'var(--badge-orange)'}}>RESPONSE TIME</div>
                <div className="italic-serif" style={{fontSize:18, marginTop:6, color:'var(--type-charcoal)'}}>
                  Seven to fourteen days. Every submission is read by a person.
                </div>
              </div>
            </div>
          </div>

          <div className="develop-right">
            <div className="develop-card">
              {!sent ? (
                <form onSubmit={submit} className="develop-form">
                  <div className="develop-steps">
                    {[1,2,3].map(n => (
                      <div key={n} className={"develop-step " + (step >= n ? "active" : "")}>
                        <span className="develop-step-n">{String(n).padStart(2,'0')}</span>
                        <span className="develop-step-label">
                          {n === 1 ? "You" : n === 2 ? "Practice" : "Sample"}
                        </span>
                      </div>
                    ))}
                  </div>

                  {step === 1 && (
                    <div className="develop-fields">
                      <label className="develop-field">
                        <span className="mono-label">Full name</span>
                        <input type="text" required value={form.fullName}
                               onChange={e => update("fullName", e.target.value)}
                               placeholder="Anne Mwiti" />
                      </label>
                      <label className="develop-field">
                        <span className="mono-label">Email</span>
                        <input type="email" required value={form.email}
                               onChange={e => update("email", e.target.value)}
                               placeholder="you@domain.com" />
                      </label>
                      <div className="develop-row">
                        <label className="develop-field">
                          <span className="mono-label">City / Country</span>
                          <input type="text" required value={form.location}
                                 onChange={e => update("location", e.target.value)}
                                 placeholder="Nairobi, Kenya" />
                        </label>
                        <label className="develop-field">
                          <span className="mono-label">WhatsApp (optional)</span>
                          <input type="tel" value={form.whatsapp}
                                 onChange={e => update("whatsapp", e.target.value)}
                                 placeholder="+254…" />
                        </label>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="develop-fields">
                      <label className="develop-field">
                        <span className="mono-label">Discipline</span>
                        <select required value={form.discipline}
                                onChange={e => update("discipline", e.target.value)}>
                          <option value="">Choose one</option>
                          {DISCIPLINES.map(d => <option key={d}>{d}</option>)}
                        </select>
                      </label>
                      <label className="develop-field">
                        <span className="mono-label">Best-fit series</span>
                        <select required value={form.segment}
                                onChange={e => update("segment", e.target.value)}>
                          <option value="">Choose one</option>
                          {SEGMENTS.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </label>
                      <label className="develop-field">
                        <span className="mono-label">Portfolio / IG / Website</span>
                        <input type="url" required value={form.portfolio}
                               onChange={e => update("portfolio", e.target.value)}
                               placeholder="https://…" />
                      </label>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="develop-fields">
                      <label className="develop-field">
                        <span className="mono-label">Short bio / practice</span>
                        <textarea required rows={4} value={form.bio}
                                  onChange={e => update("bio", e.target.value)}
                                  placeholder="Three to five sentences. Your own language, not a CV." />
                      </label>
                      <label className="develop-field">
                        <span className="mono-label">One work sample link</span>
                        <input type="url" required value={form.workLink}
                               onChange={e => update("workLink", e.target.value)}
                               placeholder="Drive, Dropbox, or public URL" />
                      </label>
                      <label className="develop-rights">
                        <input type="checkbox" checked={form.rights}
                               onChange={e => update("rights", e.target.checked)} />
                        <span className="italic-serif">
                          I consent to ArtempireMJ publishing my name, work sample,
                          and bio if accepted. I retain all copyright.
                        </span>
                      </label>
                    </div>
                  )}

                  <div className="develop-nav">
                    {step > 1 && (
                      <button type="button" className="btn btn-ghost-cream"
                              onClick={() => setStep(step - 1)}>← Back</button>
                    )}
                    <div style={{flex:1}} />
                    {step < 3 ? (
                      <button type="button" className="btn btn-primary"
                              disabled={!canAdvance()}
                              onClick={() => setStep(step + 1)}>
                        Continue →
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-primary"
                              disabled={!canAdvance()}>
                        Submit practice →
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                <div className="develop-done">
                  <div className="mono-label" style={{color:'var(--badge-orange)'}}>● RECEIVED</div>
                  <h3 className="display-caslon" style={{fontSize:40, margin:'16px 0', color:'var(--type-charcoal)'}}>
                    Thank you, {form.fullName.split(' ')[0]}.
                  </h3>
                  <p className="italic-serif" style={{fontSize:19, color:'var(--type-charcoal-soft)', maxWidth:420}}>
                    We read every submission. Expect a response within seven to
                    fourteen days. Meanwhile — read the week, on one page.
                  </p>
                  <a href="#newsletter" className="btn btn-primary" style={{marginTop:20}}>
                    Subscribe to the dispatch →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- SUSTAIN (partners) ---
const PARTNERS = [
  { name: "One Off Contemporary", category: "Gallery", surface: "Primary market placement",
    description: "Long-standing Nairobi gallery. Placement partner for commissioned portraits and estate work.",
    placement: "Nairobi" },
  { name: "Circle Art Gallery", category: "Gallery", surface: "Secondary market counsel",
    description: "East Africa's auction house of record. Reference point for price, provenance, and estate.",
    placement: "Nairobi" },
  { name: "1-54 Contemporary", category: "Fair", surface: "Distribution",
    description: "The continental fair. Annual travel and editorial reporting home.",
    placement: "London · Marrakech · NYC" },
  { name: "beehiiv", category: "Infrastructure", surface: "Dispatch delivery",
    description: "The weekly dispatch runs on beehiiv. 422 issues archived; 516 readers current.",
    placement: "Global" },
  { name: "Akirachix", category: "Community", surface: "Civic Art partnership",
    description: "Nairobi-based technology training for young women. Co-programming on civic art commissions.",
    placement: "Nairobi" },
  { name: "Printing press (withheld)", category: "Production", surface: "Ink Series output",
    description: "The letterpress partner behind the quarterly Ink Series broadsheet. Named on request.",
    placement: "Nairobi" },
  { name: "Private patrons (anonymous)", category: "Patronage", surface: "Commission pipeline",
    description: "Seven standing patrons. Names held in confidence per terms of commission.",
    placement: "Nairobi · London · Lagos" },
];

function Sustain() {
  const [cat, setCat] = React.useState("all");
  const cats = ["all", ...new Set(PARTNERS.map(p => p.category))];
  const filtered = cat === "all" ? PARTNERS : PARTNERS.filter(p => p.category === cat);

  return (
    <section id="sustain" className="section surface-dark" data-screen-label="Sustain">
      <div className="container">
        <div className="sustain-head">
          <div>
            <div className="eyebrow">Pillar 04 · Sustain</div>
            <h2 className="caps-fraunces sustain-title">
              Who holds<br/>the platform up.
            </h2>
            <p className="italic-serif sustain-deck">
              Seven registers, one continent's worth of attention — none of it
              works without the galleries, fairs, infrastructure, production
              partners, and patrons below. Named where they've agreed to be named.
            </p>
          </div>
          <div className="sustain-filters">
            {cats.map(c => (
              <button key={c}
                className={"sustain-chip " + (cat === c ? "active" : "")}
                onClick={() => setCat(c)}>
                {c === "all" ? "All registers" : c}
              </button>
            ))}
          </div>
        </div>

        <div className="sustain-grid">
          {filtered.map((p, i) => (
            <article key={i} className="sustain-card">
              <div className="sustain-card-cat">
                <span className="mono-label" style={{color:'var(--editorial-gold-mist)'}}>
                  {p.category}
                </span>
                <span className="sustain-placement mono-label">{p.placement}</span>
              </div>
              <h3 className="display-caslon sustain-name">{p.name}</h3>
              <div className="italic-serif sustain-surface">{p.surface}</div>
              <p className="sustain-desc">{p.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- FEEDBACK (lightweight) ---
// Schema matches Platform_Feedback: Page_Context, User_Type, What_Worked, What_Didnt,
// Suggestion, Urgency, Followup_OK, Contact

function Feedback() {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    pageContext: "home",
    userType: "reader",
    whatWorked: "",
    whatDidnt: "",
    suggestion: "",
    urgency: "low",
    followupOk: false,
    contact: ""
  });
  const [sent, setSent] = React.useState(false);
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("form-name", "feedback");
    fd.append("bot-field", "");
    Object.entries(form).forEach(([k, v]) => fd.append(k, typeof v === "boolean" ? String(v) : v));
    try {
      await fetch("https://artempiremj-forms.navajsirrom.workers.dev/submit", { method: "POST", body: fd });
    } catch {}
    setSent(true);
    setTimeout(() => { setOpen(false); setSent(false); }, 2500);
  };

  return (
    <>
      <button className="feedback-trigger" onClick={() => setOpen(true)}>
        <span className="mono-label">Tell us what's not working →</span>
      </button>
      {open && (
        <div className="feedback-sheet" onClick={(e) => { if (e.target.classList.contains('feedback-sheet')) setOpen(false); }}>
          <div className="feedback-box">
            <button className="feedback-close" onClick={() => setOpen(false)}>×</button>
            <div className="mono-label" style={{color:'var(--badge-orange)'}}>Platform Feedback</div>
            <h3 className="display-caslon" style={{fontSize:32, margin:'12px 0 4px', color:'var(--type-charcoal)'}}>
              What's not working?
            </h3>
            <p className="italic-serif" style={{color:'var(--type-charcoal-soft)', fontSize:16, marginBottom:20}}>
              Structural notes only. We read them all.
            </p>

            {!sent ? (
              <form onSubmit={submit} className="feedback-form">
                <div className="feedback-row">
                  <label className="develop-field">
                    <span className="mono-label">You are…</span>
                    <select value={form.userType} onChange={e => update("userType", e.target.value)}>
                      <option value="reader">A reader</option>
                      <option value="contributor">A contributor</option>
                      <option value="collector">A collector / patron</option>
                      <option value="partner">A partner organization</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                  <label className="develop-field">
                    <span className="mono-label">Urgency</span>
                    <select value={form.urgency} onChange={e => update("urgency", e.target.value)}>
                      <option value="low">Low — observation</option>
                      <option value="medium">Medium — blocking</option>
                      <option value="high">High — broken</option>
                    </select>
                  </label>
                </div>

                <label className="develop-field">
                  <span className="mono-label">What's not working</span>
                  <textarea rows={3} required value={form.whatDidnt}
                            onChange={e => update("whatDidnt", e.target.value)}
                            placeholder="Be specific. A broken link is more useful than a feeling." />
                </label>

                <label className="develop-field">
                  <span className="mono-label">Suggestion (optional)</span>
                  <textarea rows={2} value={form.suggestion}
                            onChange={e => update("suggestion", e.target.value)} />
                </label>

                <label className="develop-rights">
                  <input type="checkbox" checked={form.followupOk}
                         onChange={e => update("followupOk", e.target.checked)} />
                  <span className="italic-serif" style={{fontSize:14}}>
                    OK to follow up with me.
                  </span>
                </label>

                {form.followupOk && (
                  <label className="develop-field">
                    <span className="mono-label">Contact</span>
                    <input type="text" value={form.contact}
                           onChange={e => update("contact", e.target.value)}
                           placeholder="Email or handle" />
                  </label>
                )}

                <div className="develop-nav">
                  <div style={{flex:1}} />
                  <button type="submit" className="btn btn-primary">Send →</button>
                </div>
              </form>
            ) : (
              <div style={{padding:'24px 0'}}>
                <div className="mono-label" style={{color:'var(--editorial-gold-mist)'}}>● RECEIVED</div>
                <div className="italic-serif" style={{fontSize:20, marginTop:8, color:'var(--type-charcoal)'}}>
                  Thank you. Noted.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

window.Develop = Develop;
window.Sustain = Sustain;
window.Feedback = Feedback;
