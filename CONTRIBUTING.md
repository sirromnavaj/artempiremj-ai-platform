# Contributing — git workflow + release discipline

This is the working set of rules for everyone (operator + future contributors + AI agents) touching this repo.

## Branch model

```
main                  ← production. Auto-deploys to Netlify (artempiremj.com).
                        Protected. No direct pushes. PRs only.

feature/<short-slug>  ← any new work. Branches from main. Merged via PR.
fix/<short-slug>      ← bug fixes
chore/<short-slug>    ← non-functional housekeeping
docs/<short-slug>     ← docs-only changes (CHANGELOG, README, etc.)

session/YYYY-MM-DD-<topic>  ← session branches (Nohvara convention).
                              Squash-merged into main when shipping.
```

## Commit messages

Format:
```
type(scope): short imperative summary (max 72 chars)

Body explains WHY, not just WHAT (the diff shows what).
Reference issues with #N. Reference architecture sections explicitly.

- Bullet for each notable change
- Group changes by concern, not by file

Co-Authored-By: [person or AI] <email>
```

Types: `feat` (new feature) · `fix` (bug) · `chore` (housekeeping) · `docs` (documentation) · `refactor` · `perf` · `test` · `ci`

Examples that pass:
- `feat(commission): visible 4-tier pricing card + intake form`
- `fix(seo): correct og:image URL to absolute https://`
- `chore(deps): remove venv from tracking, add gitignore`

Examples that fail (voice/style):
- ❌ `Updated stuff` — no type, no scope, no specifics
- ❌ `feat: amazing new transformative feature` — banned voice-gate words
- ❌ `WIP` as a merged commit message — should be squashed before merge

## Pull request rules

Every PR has:
1. **Title** following commit-message format
2. **Description** with: what changed · why · how to test
3. **Voice-gate scan**: any new public-surface copy passes the 13 hard stops in `artempiremj-complete-system/ops/caption-gate.md`
4. **Architecture link**: which section of `frontend/ARCHITECTURE.md` does this implement or change?
5. **Screenshot or video** for any visual change
6. **CHANGELOG entry** in the `## [Unreleased]` section (we cut it into a versioned section at release time)
7. **CI green** — `.github/workflows/validate.yml` must pass

## Releases (Semantic Versioning)

We follow [SemVer](https://semver.org/):
- **MAJOR** (v2.0.0) — breaking changes (e.g., migration to Next.js, schema rewrite)
- **MINOR** (v1.1.0) — new features, no breakage
- **PATCH** (v1.0.1) — bug fixes, no new features

### How to cut a release

```bash
# 1. Make sure CHANGELOG.md has a versioned section for the new tag
#    Change `## [Unreleased]` to `## [v1.0.1] — YYYY-MM-DD`
git checkout main
git pull
$EDITOR CHANGELOG.md

# 2. Commit the changelog update
git add CHANGELOG.md
git commit -m "chore(release): cut v1.0.1"

# 3. Tag the release
git tag v1.0.1
git push origin main --tags

# 4. GitHub Actions creates the GitHub Release from the CHANGELOG section.
#    Netlify auto-deploys main (so production is already updated).
```

### Versioning the build artifacts

- Every push to `main` triggers a Netlify deploy. Each deploy is a build with a Netlify-assigned ID.
- Tags (v1.0.0, v1.0.1, etc.) are the human-facing version markers.
- Match the version in three places: `CHANGELOG.md` section, git tag, GitHub Release.
- Optional but recommended: write the version into `frontend/version.txt` so it's pullable from a live URL (`https://artempiremj.com/version.txt`).

## Production protection

`main` is protected:
- Required CI status checks: `validate`
- No force-push
- Direct push by admin only in emergencies (and only with operator sign-off)
- All other changes go through PR review

## Voice gate at the PR level

If a PR adds public-surface copy (anything visible to a site visitor), it MUST be voice-gated:

1. Run the 13 hard stops from `caption-gate.md` line-by-line
2. Run the kill-list scan (banned words like *transformative · journey · tapestry · delve · robust · vibrant*)
3. Pass the connect-with-not-talk-to check ("are we in the room with the reader?")
4. Pass the aloud test ("does this sound like someone who found something worth telling a friend?")

CI auto-scans for kill-list words. Other stops are operator-reviewed.

## Decision discipline at the PR level

Per Nohvara universal decision algorithm — every architectural PR (not just bug fixes) names:

1. **TAEMR** — what does this cost in time / attention / energy / money / relationships?
2. **Bias check** — what would prove this wrong? Have I looked?
3. **Alpha-beta** — what's the current floor? Does this beat it?
4. **Musk-5** — did we study peers + delete + simplify before optimizing? Is automation last, not first?

Bug fixes and content updates can skip the formal 4-frame; they're already small Type 2 decisions.

## What NEVER ships

- AI-generated public-facing copy
- Stock photography
- Banned voice-gate words (kill-list)
- Hardcoded secrets / API keys
- `venv/` · `node_modules/` · `.env` · build artifacts
- Carousel sliders
- Pop-up modals on entry
- Cookie consent banners (we use Plausible analytics which doesn't need them)
- Generic "Welcome to our blog" or "Our mission" copy
- Anti-institution framing (per skill Hard Stop 4)

## Who owns what

- **Operator (Morris):** all editorial decisions, voice gate, brand DNA, image choices, releases
- **AI agents (Claude Code etc.):** code, infrastructure, refactors, doc updates — always via PR, never direct to main
- **External contributors (future):** Spotlight + Develop submissions go through the form, NOT through this repo
