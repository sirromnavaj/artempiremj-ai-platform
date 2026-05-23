// Email provider cascade.
//
// Each provider exposes:
//   - name (string)
//   - capable(env): boolean — true if the required secrets/vars are present
//   - send({ env, to, from, subject, text }): { ok, status, body, error }
//
// The worker tries providers in PROVIDER_ORDER until one returns ok=true.
// All providers are free-tier; secrets are set via `wrangler secret put`.
//
// Adding a new provider: implement the send() contract, add to PROVIDER_ORDER.
// Removing: set its capable() to return false or drop from the order array.

async function postJson(url, body, headers) {
  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
  const text = await resp.text();
  return { ok: resp.ok, status: resp.status, body: text.slice(0, 400) };
}

export const PROVIDERS = {
  resend: {
    name: "resend",
    capable: (env) => !!env.RESEND_API_KEY,
    async send({ env, to, from, subject, text }) {
      // https://resend.com/docs/api-reference/emails/send-email
      return postJson(
        "https://api.resend.com/emails",
        {
          from: `${from.name} <${from.email}>`,
          to: [to],
          subject,
          text,
        },
        { Authorization: `Bearer ${env.RESEND_API_KEY}` }
      );
    },
  },

  brevo: {
    name: "brevo",
    capable: (env) => !!env.BREVO_API_KEY,
    async send({ env, to, from, subject, text }) {
      // https://developers.brevo.com/reference/sendtransacemail
      return postJson(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: { name: from.name, email: from.email },
          to: [{ email: to }],
          subject,
          textContent: text,
        },
        { "api-key": env.BREVO_API_KEY }
      );
    },
  },

  sendgrid: {
    name: "sendgrid",
    capable: (env) => !!env.SENDGRID_API_KEY,
    async send({ env, to, from, subject, text }) {
      // https://docs.sendgrid.com/api-reference/mail-send/mail-send
      return postJson(
        "https://api.sendgrid.com/v3/mail/send",
        {
          personalizations: [{ to: [{ email: to }] }],
          from: { email: from.email, name: from.name },
          subject,
          content: [{ type: "text/plain", value: text }],
        },
        { Authorization: `Bearer ${env.SENDGRID_API_KEY}` }
      );
    },
  },
};

export const PROVIDER_ORDER = ["resend", "brevo", "sendgrid"];

export async function sendCascade({ env, to, from, subject, text, log }) {
  const attempts = [];
  for (const key of PROVIDER_ORDER) {
    const p = PROVIDERS[key];
    if (!p || !p.capable(env)) {
      attempts.push({ provider: key, skipped: "not capable" });
      continue;
    }
    try {
      const result = await p.send({ env, to, from, subject, text });
      attempts.push({ provider: key, ok: result.ok, status: result.status });
      if (result.ok) {
        if (log) log(`sent via ${key} (${result.status})`);
        return { ok: true, provider: key, status: result.status, attempts };
      }
      if (log) log(`${key} failed (${result.status}): ${result.body.slice(0, 120)}`);
    } catch (e) {
      attempts.push({ provider: key, error: String(e) });
      if (log) log(`${key} threw: ${e}`);
    }
  }
  return { ok: false, provider: null, attempts };
}
