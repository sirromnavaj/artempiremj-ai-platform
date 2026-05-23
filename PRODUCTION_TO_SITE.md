# Production -> Site connector

Owner: hub / artempiremj
Created: 2026-05-23

## The pipeline

```
NohvaraContinuum/03_sandboxes/artempire/drafts/*.md        (real shipped content)
NohvaraContinuum/03_sandboxes/artempire/media/INDEX.md     (credits / usage)
                              |
                              v
                  scripts/sync_production_to_site.py
                              |
                              v
            frontend/content/editorial.json
            frontend/content/spotlight.json   (next)
            frontend/content/discover.json    (next)
                              |
                              v
        site components fetch() with hardcoded fallback
```

## How to use

After shipping a new draft / dispatch / event, run:

```powershell
python scripts/sync_production_to_site.py
```

This reads every `drafts/*.md` file with a real LinkedIn (article) body,
extracts title + body + region (from the Week 1/2/3/4 header), and writes
JSON to `frontend/content/`.

Then commit + push. Netlify auto-deploys. Site reads JSON at runtime.

## What gets skipped

- Template drafts (containing "Start with a specific fact" placeholder)
- Drafts without a `## LINKEDIN (article)` section
- Drafts without a date prefix in the filename

This is intentional — only ready content reaches the site.

## What still needs building

- `spotlight.json` sync (short dispatches with one image)
- `discover.json` sync from the skill's discover-rotation log
- Media credits auto-merged from `media/INDEX.md`
- Auto-run on git pre-commit hook (so the operator doesn't have to remember)
- Eventually: Supabase live read instead of JSON snapshot

## Schema

`editorial.json`:
```json
{
  "updated": "2026-05-23",
  "items": [
    {
      "publishDate": "2026-05-05",
      "title": "...",
      "slug": "...",
      "author": "MJ",
      "summary": "first sentence",
      "bodyHtml": "<p>...</p>",
      "coverImage": "painting | gallery | portrait | <slug>",
      "region": "Americas | Europe | Africa | Asia & Middle East | Global",
      "tags": ["Art + Finance", "..."]
    }
  ]
}
```

The site's `Editorial` component fetches this, merges with the hardcoded
BLOGS array (production items first), and renders. If fetch fails, the
hardcoded array renders unchanged. No site break possible from a bad sync.
