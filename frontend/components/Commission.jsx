// components/Commission.jsx — the WhatsApp commission funnel

function Commission() {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({
    subject: "one-person portrait",
    size: "A3",
    deadline: "4 weeks",
    delivery: "framed + shipped",
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 2));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const waText = encodeURIComponent(
    `Hello MJ — I'd like to commission a pencil portrait.\n\n` +
    `Subject: ${form.subject}\n` +
    `Size: ${form.size}\n` +
    `Deadline: ${form.deadline}\n` +
    `Delivery: ${form.delivery}\n\n` +
    `Looking forward to speaking.`
  );
  const waHref = `https://wa.me/254700000000?text=${waText}`;

  return (
    <section id="commission" className="section surface-dark" data-screen-label="Commission">
      <div className="container commission-grid">
        <div className="commission-left">
          <div className="eyebrow">Studio & Gallery · Art-to-Soul</div>
          <h2 className="caps-fraunces commission-title">
            Crafted.<br/>Collected.<br/>Exhibited.
          </h2>
          <p className="italic-serif commission-deck">
            Pencil on cartridge paper. By appointment from Nairobi —<br/>
            shipped worldwide. The archive of one hand, one face, one memory.
          </p>

          <div className="commission-facts">
            <div className="commission-fact">
              <div className="mono-label" style={{color:'var(--editorial-gold-mist)'}}>MEDIUM</div>
              <div className="commission-fact-val">Graphite · cartridge paper · up to 8 sessions</div>
            </div>
            <div className="commission-fact">
              <div className="mono-label" style={{color:'var(--editorial-gold-mist)'}}>LEAD TIME</div>
              <div className="commission-fact-val">4–10 weeks from photograph approval</div>
            </div>
            <div className="commission-fact">
              <div className="mono-label" style={{color:'var(--editorial-gold-mist)'}}>EDITION</div>
              <div className="commission-fact-val">Original only. You keep it.</div>
            </div>
          </div>

          <p className="commission-closing italic-serif">
            That origin matters. Every commission is documented in Art-to-Soul.
          </p>
        </div>

        <div className="commission-right">
          <div className="commission-card">
            <div className="commission-card-head">
              <span className="mono-label" style={{color:'var(--editorial-gold-mist)'}}>INTAKE · STEP {step + 1} / 3</span>
              <span className="mono-label" style={{color:'var(--muted)'}}>WHATSAPP HANDOFF</span>
            </div>

            {step === 0 && (
              <div className="commission-step">
                <h3 className="display-caslon commission-step-title">Who is the subject?</h3>
                <div className="commission-choices">
                  {["one-person portrait","two-person portrait","family group","self-portrait","from-archive reference"].map(o => (
                    <button key={o}
                      className={"commission-choice " + (form.subject===o?"active":"")}
                      onClick={() => setForm({...form, subject:o})}>
                      <span className="italic-serif">{o}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="commission-step">
                <h3 className="display-caslon commission-step-title">Size and deadline.</h3>
                <div className="commission-choices">
                  {["A4","A3","A2","A1","custom"].map(o => (
                    <button key={o}
                      className={"commission-choice " + (form.size===o?"active":"")}
                      onClick={() => setForm({...form, size:o})}>
                      <span className="italic-serif">{o}</span>
                    </button>
                  ))}
                </div>
                <div className="mono-label" style={{color:'var(--editorial-gold-mist)', marginTop:24, marginBottom:10}}>DEADLINE</div>
                <div className="commission-choices">
                  {["4 weeks","6 weeks","10 weeks","flexible"].map(o => (
                    <button key={o}
                      className={"commission-choice " + (form.deadline===o?"active":"")}
                      onClick={() => setForm({...form, deadline:o})}>
                      <span className="italic-serif">{o}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="commission-step">
                <h3 className="display-caslon commission-step-title">How should it arrive?</h3>
                <div className="commission-choices">
                  {["framed + shipped","rolled + shipped","collect in Nairobi","gallery placement"].map(o => (
                    <button key={o}
                      className={"commission-choice " + (form.delivery===o?"active":"")}
                      onClick={() => setForm({...form, delivery:o})}>
                      <span className="italic-serif">{o}</span>
                    </button>
                  ))}
                </div>
                <div className="commission-summary">
                  <div className="mono-label" style={{color:'var(--editorial-gold-mist)', marginBottom:12}}>YOUR BRIEF</div>
                  <div className="commission-summary-row"><span>Subject</span><span className="italic-serif">{form.subject}</span></div>
                  <div className="commission-summary-row"><span>Size</span><span className="italic-serif">{form.size}</span></div>
                  <div className="commission-summary-row"><span>Deadline</span><span className="italic-serif">{form.deadline}</span></div>
                  <div className="commission-summary-row"><span>Delivery</span><span className="italic-serif">{form.delivery}</span></div>
                </div>
              </div>
            )}

            <div className="commission-card-foot">
              <button className="btn btn-ghost-dark" onClick={prevStep} disabled={step===0} style={{opacity: step===0?0.3:1}}>← Back</button>
              {step < 2 ? (
                <button className="btn btn-gold" onClick={nextStep}>Continue →</button>
              ) : (
                <a className="btn btn-gold" href={waHref} target="_blank" rel="noopener">
                  <svg className="ico" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.5 4.2 1.6 6L0 24l6.2-1.6c1.8.9 3.8 1.4 5.8 1.4 6.6 0 12-5.4 12-12 0-3.2-1.3-6.2-3.5-8.3ZM12 21.8c-1.8 0-3.6-.5-5.1-1.3l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.5-1.5-3.4-1.5-5.3 0-5.5 4.5-10 10-10 2.7 0 5.2 1 7 2.9s2.9 4.4 2.9 7c.1 5.6-4.4 10.1-10 10.1Zm5.5-7.5c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2c-.2.3-.8 1-1 1.2s-.4.2-.7 0c-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.6s.2-.3.3-.5c.1-.2.1-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.5 1.1 2.9 1.2 3.1c.2.2 2.2 3.4 5.4 4.7.7.3 1.3.5 1.8.7.7.2 1.4.2 2 .1.6-.1 1.8-.7 2-1.4s.2-1.3.2-1.4c-.2-.2-.4-.2-.7-.3Z"/></svg>
                  Send to MJ on WhatsApp
                </a>
              )}
            </div>
          </div>

          <p className="commission-footnote italic-serif">
            Nothing on the web closes a commission. WhatsApp does — that is where the conversation begins.
          </p>
        </div>
      </div>
    </section>
  );
}

window.Commission = Commission;
