// artempiremj-forms — Cloudflare Worker that accepts POSTs from
// the four site forms (newsletter, commission, feedback, contributor),
// validates a honeypot, stores in KV, and emails Morris via MailChannels.
//
// Endpoints:
//   POST /submit              — accepts any of the four form types
//   GET  /count               — admin: total submissions count (no auth, low-risk read)
//   GET  /                    — health check
//
// Submission shape (form-encoded or JSON):
//   form-name: one of [newsletter, commission, feedback, contributor]
//   ...other fields per form...
//   bot-field: must be empty (honeypot)

const FORM_TYPES = new Set(["newsletter", "commission", "feedback", "contributor"]);

function corsHeaders(origin, allowList) {
  const allowed = allowList.split(",").includes(origin) ? origin : allowList.split(",")[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function jsonResponse(body, status, extraHeaders) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}

async function parseBody(request) {
  const contentType = (request.headers.get("Content-Type") || "").toLowerCase();
  if (contentType.includes("application/json")) {
    try {
      return await request.json();
    } catch {
      return null;
    }
  }
  // form-encoded (default browser form POST)
  try {
    const form = await request.formData();
    const out = {};
    for (const [k, v] of form.entries()) out[k] = v;
    return out;
  } catch {
    return null;
  }
}

async function sendNotificationEmail(env, formType, payload) {
  // MailChannels — free for Cloudflare Workers.
  // Requires the destination domain to have:
  //   _mailchannels TXT "v=mc1 cfid=<workers-subdomain>"  (Domain Lockdown — mandatory)
  //   SPF TXT       "v=spf1 include:relay.mailchannels.net ~all"
  //   mailchannels._domainkey TXT "v=DKIM1; k=rsa; p=<PUBLIC_KEY>"  (deliverability)
  // The worker passes its DKIM private key so MailChannels signs the message.
  const subject = `[ArtempireMJ] new ${formType} submission`;
  const lines = Object.entries(payload)
    .filter(([k]) => k !== "bot-field" && k !== "form-name")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  const body = `Form: ${formType}\nReceived: ${new Date().toISOString()}\n\n${lines}\n\n--\nartempiremj-forms worker`;

  const fromDomain = (env.NOTIFY_FROM || "").split("@")[1] || "artempiremj.com";

  const message = {
    personalizations: [{
      to: [{ email: env.NOTIFY_TO }],
      ...(env.DKIM_PRIVATE_KEY ? {
        dkim_domain: fromDomain,
        dkim_selector: "mailchannels",
        dkim_private_key: env.DKIM_PRIVATE_KEY,
      } : {}),
    }],
    from: { email: env.NOTIFY_FROM, name: "ArtempireMJ Forms" },
    subject,
    content: [{ type: "text/plain", value: body }],
  };

  try {
    const resp = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    const text = await resp.text();
    return { ok: resp.ok, status: resp.status, body: text.slice(0, 300) };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

async function handleSubmit(request, env) {
  const origin = request.headers.get("Origin") || "";
  const cors = corsHeaders(origin, env.ALLOWED_ORIGINS);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }
  if (request.method !== "POST") {
    return jsonResponse({ error: "POST only" }, 405, cors);
  }

  const data = await parseBody(request);
  if (!data) return jsonResponse({ error: "invalid body" }, 400, cors);

  // Honeypot
  if (data["bot-field"]) {
    return jsonResponse({ ok: true, note: "received" }, 200, cors);
  }

  const formType = String(data["form-name"] || "").trim().toLowerCase();
  if (!FORM_TYPES.has(formType)) {
    return jsonResponse({ error: "unknown form-name" }, 400, cors);
  }

  // Strip honeypot + form-name before storing
  const payload = {};
  for (const [k, v] of Object.entries(data)) {
    if (k === "bot-field" || k === "form-name") continue;
    payload[k] = String(v).slice(0, 5000); // length cap per field
  }

  // Basic per-form min field validation
  if (formType === "newsletter" && !payload.email) {
    return jsonResponse({ error: "email required" }, 400, cors);
  }

  const ts = new Date().toISOString();
  const key = `${formType}:${ts}:${crypto.randomUUID().slice(0, 8)}`;
  const record = {
    formType,
    receivedAt: ts,
    ip: request.headers.get("CF-Connecting-IP") || "unknown",
    country: request.headers.get("CF-IPCountry") || "unknown",
    userAgent: (request.headers.get("User-Agent") || "").slice(0, 300),
    referer: request.headers.get("Referer") || "",
    payload,
  };

  await env.SUBMISSIONS.put(key, JSON.stringify(record));

  // Best-effort email notification (non-blocking on failure)
  const emailResult = await sendNotificationEmail(env, formType, payload);

  return jsonResponse(
    { ok: true, form: formType, id: key, notified: emailResult.ok },
    200,
    cors
  );
}

async function handleCount(request, env) {
  const list = await env.SUBMISSIONS.list();
  const counts = {};
  for (const k of list.keys) {
    const type = k.name.split(":")[0];
    counts[type] = (counts[type] || 0) + 1;
  }
  return jsonResponse(
    { totalKeys: list.keys.length, byForm: counts },
    200,
    { "Cache-Control": "no-cache" }
  );
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/submit") return handleSubmit(request, env);
    if (url.pathname === "/count") return handleCount(request, env);
    if (url.pathname === "/") {
      return jsonResponse(
        {
          service: "artempiremj-forms",
          endpoints: { submit: "POST /submit", count: "GET /count" },
        },
        200
      );
    }
    return jsonResponse({ error: "not found" }, 404);
  },
};
