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
  images      TEXT,            -- JSON array of uploaded R2 keys (portfolio uploads)
  story       TEXT NOT NULL,   -- the story they carry
  consent     INTEGER NOT NULL DEFAULT 0,
  status      TEXT NOT NULL DEFAULT 'new',   -- new | reviewing | featured | archived
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
-- For an existing DB, run once: ALTER TABLE submissions ADD COLUMN images TEXT;

-- Public listings submitted by organisers (fairs, residencies, galleries) with photos.
-- The self-submit spine of the calendar: pending -> verified -> published into opportunities.
CREATE TABLE IF NOT EXISTS listings (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  kind        TEXT,            -- open-call | residency | grant | fair | biennial | prize | exhibition
  organizer   TEXT,
  email       TEXT NOT NULL,
  city        TEXT,
  country     TEXT,
  start       TEXT,
  deadline    TEXT,
  url         TEXT,
  summary     TEXT NOT NULL,
  images      TEXT,            -- JSON array of uploaded R2 keys
  status      TEXT NOT NULL DEFAULT 'pending',   -- pending | verified | published | rejected
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

-- Reach record. Each weekly send logs how many it reached + which feature it carried.
-- This is the seating-capacity number over time, and the basis for telling a featured
-- artist the reach their story got (the real value exchange, Red Bull's athlete contract).
CREATE TABLE IF NOT EXISTS sends (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  subject     TEXT,
  recipients  INTEGER NOT NULL DEFAULT 0,
  feature_url TEXT,
  sent_at     TEXT NOT NULL
);

-- Interaction log: the data the learning layer trains on. No PII, just events keyed to a target.
-- The slow, compounding layer (instrument now so the posteriors have signal as traffic grows).
CREATE TABLE IF NOT EXISTS interactions (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  ts          TEXT NOT NULL DEFAULT (datetime('now')),
  type        TEXT NOT NULL,   -- impression | click | search | affiliate | subscribe
  surface     TEXT,            -- home | festival | city | calendar | sticky ...
  target      TEXT,            -- event slug | link host | query | cta id
  meta        TEXT             -- optional JSON
);
CREATE INDEX IF NOT EXISTS idx_inter_type   ON interactions(type);
CREATE INDEX IF NOT EXISTS idx_inter_target ON interactions(target);

-- Bandit arms: Beta posteriors per learner (source-weighting | feature | cta | timing).
-- alpha = successes + 1, beta = failures + 1. Thompson-sample; act only when the gauge says ready.
CREATE TABLE IF NOT EXISTS bandit_arms (
  learner     TEXT NOT NULL,
  arm         TEXT NOT NULL,
  alpha       REAL NOT NULL DEFAULT 1,
  beta        REAL NOT NULL DEFAULT 1,
  updated_at  TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (learner, arm)
);

CREATE INDEX IF NOT EXISTS idx_opp_region   ON opportunities(region);
CREATE INDEX IF NOT EXISTS idx_opp_deadline ON opportunities(deadline);
CREATE INDEX IF NOT EXISTS idx_sub_status   ON submissions(status);
