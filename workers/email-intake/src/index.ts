// ArtempireMJ email-intake Worker. Email Routing hands inbound mail (tips@/submissions@/listings@)
// to this Worker, which parses it, stores it in D1 as PENDING (so email becomes a feed for the
// calendar's review queue, not lost mail), and forwards a copy to Gmail so the operator still sees
// it. Nothing is published from email automatically — it lands in the same human/fact-verify gate.
//
// Activate per address in the dashboard: Email Routing -> Routing rules -> Create address ->
// tips@ (or submissions@/listings@) -> Action "Send to a Worker" -> artempiremj-email-intake.
import PostalMime from 'postal-mime';

interface Env {
  DB: D1Database;
  FORWARD_TO: string;
}

export default {
  async email(message: ForwardableEmailMessage, env: Env): Promise<void> {
    const to = (message.to || '').toLowerCase();
    const from = message.from || '';
    const kind = (to.split('@')[0] || 'other').slice(0, 40);

    let subject = '';
    let body = '';
    try {
      const parsed = await PostalMime.parse(message.raw);
      subject = (parsed.subject || '').slice(0, 300);
      body = (parsed.text || parsed.html || '').replace(/<[^>]+>/g, ' ').slice(0, 8000);
    } catch {
      subject = message.headers.get('subject') || '';
    }

    try {
      await env.DB.prepare(
        'INSERT INTO email_intake (from_addr, to_addr, kind, subject, body, status) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(from, to, kind, subject, body, 'pending').run();
    } catch {
      // never let a DB hiccup drop the mail — the forward below still delivers it
    }

    // Always forward a copy so the operator sees it (FORWARD_TO must be a verified routing destination).
    try {
      await message.forward(env.FORWARD_TO);
    } catch {
      // if forward fails, the row in D1 is still the record of intake
    }
  },
};
