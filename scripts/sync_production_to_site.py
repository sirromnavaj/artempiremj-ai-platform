"""Sync production content (drafts + media credits) into site JSON.

Reads:
  NohvaraContinuum/03_sandboxes/artempire/drafts/*.md   — series drafts
  NohvaraContinuum/03_sandboxes/artempire/media/INDEX.md — credits/usage

Writes:
  frontend/content/editorial.json — long-form articles (Art+Finance, Money
                                    Stories, Intersections, Art of Mind, etc.)
  frontend/content/spotlight.json — short dispatches (one image per)
  frontend/content/discover.json  — calendar events (manual today; future
                                    will read from media + skill rotation)

The site fetches these JSONs at runtime with a hardcoded fallback baked in.
Run this after every new draft commit:
    python scripts/sync_production_to_site.py
"""
import json
import os
import re
import sys
from datetime import date
from pathlib import Path

try:
    import yaml
except ImportError:
    yaml = None

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parents[1]
ARTEMPIRE = Path("C:/Users/User/Desktop/NohvaraContinuum/03_sandboxes/artempire")
DRAFTS = ARTEMPIRE / "drafts"
DISCOVER_YAML = ARTEMPIRE / "drafts" / "site_content" / "discover_events.yaml"
OUT_DIR = ROOT / "frontend" / "content"
OUT_DIR.mkdir(parents=True, exist_ok=True)

SERIES_TO_TAGS = {
    "art-finance": ["Art + Finance", "Market"],
    "art-+-finance": ["Art + Finance", "Market"],
    "money-stories": ["Money Stories"],
    "artist-spotlight": ["Artist Spotlight"],
    "art-of-mind": ["Art of Mind"],
    "intersections": ["Intersections"],
    "global-art-spotlight": ["Global Art Spotlight"],
    "discover-radar": ["Discover Radar"],
    "world-through-art": ["The World Through Art"],
    "civic-art": ["Civic Art"],
    "nude-art": ["Nude Art"],
    "ink": ["Ink Division"],
}

WEEK_TO_REGION = {1: "Americas", 2: "Europe", 3: "Africa", 4: "Asia & Middle East"}


def slugify(s: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return s[:80]


def parse_header(text: str) -> dict:
    """Extract the # comment header block at top of draft."""
    meta = {}
    for line in text.splitlines():
        if not line.startswith("#"):
            if line.strip() == "" and meta:
                break
            continue
        line = line.lstrip("#").strip()
        if ":" in line:
            k, v = line.split(":", 1)
            meta[k.strip().lower()] = v.strip()
    return meta


def extract_body(text: str) -> tuple[str, str]:
    """Get LinkedIn (article) body and the title. Pattern: ## LINKEDIN (article)
    then **Title** then paragraphs."""
    m = re.search(
        r"##\s*LINKEDIN\s*\(article\)\s*(.*?)(?=\n##\s|\Z)",
        text, re.DOTALL | re.IGNORECASE,
    )
    if not m:
        return "", ""
    body = m.group(1).strip()
    title_match = re.match(r"\*\*(.+?)\*\*", body)
    title = title_match.group(1).strip() if title_match else ""
    if title_match:
        body = body[title_match.end():].strip()
    paragraphs = [p.strip() for p in body.split("\n\n") if p.strip()]
    body_html = "\n".join(f"<p>{p}</p>" for p in paragraphs if not p.startswith("---"))
    return title, body_html


def looks_template(text: str) -> bool:
    return "Start with a specific fact" in text or "TEMPLATE — needs human rewrite" in text


def sync_editorial():
    items = []
    for md in sorted(DRAFTS.glob("*.md"), reverse=True):
        text = md.read_text(encoding="utf-8", errors="ignore")
        if looks_template(text):
            continue
        meta = parse_header(text)
        title, body_html = extract_body(text)
        if not title or not body_html:
            continue
        date_match = re.match(r"(\d{4}-\d{2}-\d{2})", md.name)
        if not date_match:
            continue
        pub_date = date_match.group(1)
        series_slug = md.stem.split("-", 3)[-1] if md.stem.count("-") >= 3 else ""
        series_slug = series_slug.replace("_", "-")
        tags = SERIES_TO_TAGS.get(series_slug, ["Editorial"])
        week_match = re.search(r"week\s*[:#]?\s*(\d)", meta.get("week", ""), re.IGNORECASE)
        region = WEEK_TO_REGION.get(int(week_match.group(1)), "Global") if week_match else "Global"

        item = {
            "publishDate": pub_date,
            "title": title,
            "slug": slugify(title),
            "author": "Morris Javan",
            "summary": re.sub(r"<[^>]+>", "", body_html).split(". ", 1)[0][:240] + ".",
            "bodyHtml": body_html,
            "coverImage": "painting",
            "region": region,
            "tags": tags,
        }
        items.append(item)
    items = items[:12]
    out = OUT_DIR / "editorial.json"
    out.write_text(json.dumps({"updated": str(date.today()), "items": items}, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"[OK] editorial.json -> {len(items)} items")


def sync_discover():
    if yaml is None:
        print("[SKIP] discover.json — install pyyaml: pip install pyyaml")
        return
    if not DISCOVER_YAML.exists():
        print(f"[SKIP] discover.json — source not found: {DISCOVER_YAML}")
        return
    raw = yaml.safe_load(DISCOVER_YAML.read_text(encoding="utf-8"))
    events_in = raw.get("events", []) if isinstance(raw, dict) else []
    items = []
    for e in events_in:
        items.append({
            "eventDate": str(e.get("event_date", "")),
            "endDate": str(e.get("end_date", "")),
            "eventName": e.get("name", "").strip(),
            "city": e.get("city", ""),
            "country": e.get("country", ""),
            "region": e.get("region", "Global"),
            "venue": e.get("venue", ""),
            "description": " ".join((e.get("description") or "").split()),
            "imageUrl": e.get("image", ""),
            "credit": e.get("credit", ""),
            "sourceLink": e.get("source", ""),
        })
    out = OUT_DIR / "discover.json"
    out.write_text(
        json.dumps({"updated": str(date.today()), "items": items}, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    print(f"[OK] discover.json -> {len(items)} events")


def main():
    sync_editorial()
    sync_discover()
    print("[DONE] production -> site sync complete.")


if __name__ == "__main__":
    main()
