-- ArtempireMJ — our own data layer (Cloudflare D1, serverless SQLite).
-- We own the subscriber list and the submissions. Nothing about the audience lives on a
-- third-party newsletter platform. A delivery provider (Resend) is only the pipe.
-- Apply:  wrangler d1 execute artempiremj --file=./db/schema.sql

CREATE TABLE IF NOT EXISTS subscribers (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  email       TEXT NOT NULL UNIQUE,
  status      TEXT NOT NULL DEFAULT 'active',   -- active | unsubscribed | bounced
  source      TEXT,                             -- home | footer | submit | discover
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Artist submissions. "Artist means any maker, in any medium" (skill DECISIONS #18).
-- Submission-based CTAs are the engagement engine (skill cta-system): this is core, not a side door.
CREATE TABLE IF NOT EXISTS submissions (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  medium      TEXT NOT NULL,   -- painting | photography | sculpture | music | tattoo | writing | design | film | craft | other
  series      TEXT,            -- ink | money-stories | artist-edition | correspondent | general
  location    TEXT,            -- city, country (vantage, not boundary)
  links       TEXT,            -- portfolio / socials
  story       TEXT NOT NULL,   -- the story they carry
  consent     INTEGER NOT NULL DEFAULT 0,
  status      TEXT NOT NULL DEFAULT 'new',   -- new | reviewing | featured | archived
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- The Global Art Calendar, owned. The static site reads the build-time seed; this table
-- lets DISCOVER add/verify entries without a redeploy (read by an API island when present).
CREATE TABLE IF NOT EXISTS opportunities (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  kind        TEXT,
  organizer   TEXT,
  city        TEXT,
  country     TEXT,
  region      TEXT,
  start       TEXT,
  deadline    TEXT,
  window      TEXT,
  url         TEXT,
  summary     TEXT,
  verified    INTEGER NOT NULL DEFAULT 0,
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_opp_region   ON opportunities(region);
CREATE INDEX IF NOT EXISTS idx_opp_deadline ON opportunities(deadline);
CREATE INDEX IF NOT EXISTS idx_sub_status   ON submissions(status);
