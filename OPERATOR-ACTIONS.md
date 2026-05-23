# Operator actions — to go live TODAY

The repo is ready. These three steps are operator-side (require Netlify + GoDaddy auth I can't access). 15-30 minutes total.

---

## Step 1 — Connect repo to Netlify (≈5 min)

The existing Netlify account already has `artempiremj-products` running. Add a NEW site for the main domain.

1. Go to <https://app.netlify.com/start>
2. Click **"Deploy with GitHub"** (Netlify is already authorized for the operator's GitHub from the products site setup)
3. Pick the repo: `sirromnavaj/artempiremj-ai-platform`
4. Configure:
   - **Branch to deploy:** `main`
   - **Base directory:** (leave blank — `netlify.toml` handles it)
   - **Build command:** (leave blank — `netlify.toml` says no build needed; static site)
   - **Publish directory:** `frontend` (already in `netlify.toml`; just confirms)
5. Click **"Deploy site"**
6. Netlify assigns a temporary URL like `https://magenta-cupcake-12345.netlify.app`
7. Open that URL — confirm the site loads (it'll take ~30 sec on first load due to Babel-in-browser compiling JSX)

**Expected first load:** all 11 components render — Hero, Discover, Editorial, Series, Spotlight, Divisions, Commission, Develop, Sustain, About, Newsletter, Footer.

**If something's broken:** open browser DevTools console, copy errors, send back here.

---

## Step 2 — Add custom domain `artempiremj.com` (≈10 min total · 5 min Netlify · ≤10 min DNS propagation)

### 2a — In Netlify (the new site you just created)

1. Site settings → **Domain management** → **Add a domain**
2. Type: `artempiremj.com`
3. Netlify will say "this domain is registered elsewhere" — that's fine, click **Verify**
4. Netlify shows you DNS records to add (one A record + one CNAME). Note the values it gives — you'll paste them in GoDaddy.
5. Also add the `www.artempiremj.com` subdomain → redirect to apex

### 2b — In GoDaddy

This is the part that REPLACES the current "coming soon" GoDaddy-builder site.

1. Sign in to GoDaddy
2. **My Products** → find `artempiremj.com` → click **Manage**
3. **First**: CANCEL the **Website Builder** product (NOT the domain registration — only the builder hosting). Look for the "Website" or "Website Builder" line item next to the domain. Cancel it.
4. Wait until GoDaddy confirms the builder is off (the live page will go down briefly — that's expected; we're replacing it)
5. **Then**: go to **DNS** → **Manage DNS** for `artempiremj.com`
6. Delete any existing A records pointing to GoDaddy's hosting (Netlify will replace them)
7. Add Netlify's A record (the IP they gave you in 2a)
8. Add Netlify's CNAME for `www` (also given in 2a)
9. Save

**Propagation:** typically 5-15 minutes. Use <https://dnschecker.org> to watch it propagate globally.

### 2c — Back in Netlify

1. Once DNS propagates, Netlify automatically issues a Let's Encrypt cert
2. **Site settings → Domain management → HTTPS** → confirm "Certificate active"
3. **Force HTTPS** = ON
4. **Primary domain** = `artempiremj.com` (apex, not www)
5. `www.artempiremj.com` should auto-redirect to apex

---

## Step 3 — Verify go-live (≈5 min)

Once `artempiremj.com` resolves to the new Netlify site:

1. Open <https://artempiremj.com> in a private/incognito window — confirm fresh load (no caching)
2. Test all 4 forms:
   - **Commission**: Click "Commission a portrait" → fill 4-question intake → submit → confirm a Netlify Forms entry lands at <https://app.netlify.com/projects/artempiremj-ai-platform/forms> (or whatever the Netlify project name was assigned)
   - **Contributor**: Open Develop → submit a test → check Netlify Forms
   - **Newsletter**: Submit an email → check Netlify Forms
   - **Feedback**: Submit a test → check Netlify Forms
3. Open <https://artempiremj.com/version.txt> → should show `v1.0.0`
4. Open <https://artempiremj.com/sitemap.xml> → should render as XML
5. Open <https://artempiremj.com/robots.txt> → should show `User-agent: *` + sitemap reference
6. Open <https://artempiremj.com/this-page-does-not-exist> → should show the on-brand 404 page (cream + Fraunces + orange stripe)
7. View page source on the home page → confirm meta tags + JSON-LD Organization schema present

---

## Step 4 — Post-launch (within 24 hours)

1. **Update all social bios** to point to `artempiremj.com` (not the Netlify subdomain)
2. **Update Beehiiv newsletter footer** to use `artempiremj.com` URLs in all template
3. **Update existing post URL references**: this is operator-side; the captions already shipped this week mostly reference the netlify subdomain. Future posts use `artempiremj.com`. Old posts will need a Beehiiv resend or LinkedIn edit campaign — track as a separate task.
4. **Submit `artempiremj.com` to Google Search Console** + Bing Webmaster Tools — accelerates indexing
5. **GBP integration**: link the Google Business Profile to the new `artempiremj.com` URL (replaces any earlier URL on the listing) + populate the GBP per `frontend/ARCHITECTURE.md` Section 8 "Google Business Profile" if not yet complete
6. **Submit IndexNow** ping to surface the new URLs faster to AI assistants

---

## What this DOESN'T do (deliberate — v1.1+)

- No Vite / Next.js build pipeline (still React-CDN — fine for v1 but slow first-load)
- No Supabase wiring (events / editorial / spotlight content is hardcoded in JSX arrays — operator updates by editing JSX directly until v1.2)
- No Beehiiv embed (newsletter signup goes to Netlify Forms, not directly to Beehiiv — needs manual sync until v2)
- No Selar.co integration (digital products link out to Selar product pages when those exist)
- No YouTube channel video embeds (no channel yet)
- No automated content from Sheet (manual JSX edits for now)

These are all in the roadmap (`README.md`). v1 ships the SUBSTRATE that v1.1+ improves on.

---

## Rollback plan (if something breaks)

If anything fails irreversibly during DNS swap and the site goes down:

1. In GoDaddy DNS, revert A records to point back to GoDaddy hosting (the values were the same as before — keep a screenshot of the original DNS before changing)
2. Reactivate the GoDaddy Website Builder product (may require contacting GoDaddy support if cancelled — that's why we don't cancel the builder until Netlify is verified working)

**Safer sequence**: do step 2a (add domain in Netlify) → 2b DNS swap → confirm site works on new IP → THEN cancel GoDaddy builder. This way, if anything goes wrong during DNS propagation, the GoDaddy builder is still live as a fallback.

---

## Net status after these 4 steps

- **`artempiremj.com`** = live, serving the new editorial site, HTTPS, on-brand
- **GoDaddy** = retains the domain registration (renewal still needed yearly); the website builder product is cancelled
- **Netlify** = hosts the site, free tier, auto-deploys on every push to `main`
- **GitHub** = source of truth; tagged v1.0.0; CI gates future PRs
- **Forms** = working, captured in Netlify Forms dashboard
- **All posts shipped this week** = still link to the old Netlify subdomain, but that's a separate (lower-priority) cleanup task. Future posts use `artempiremj.com`.

You're no longer posting to the void.
