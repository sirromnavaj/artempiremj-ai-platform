#!/usr/bin/env bash
# Nightly self-update: rebuild the static site and deploy. Run by the engine's scheduler
# (e.g. a daily Windows task). Because the build stamps "today", date-aware sorting auto-expires
# past events and surfaces upcoming ones, and any newly-published listings/opportunities in the
# build data are picked up. Keeps the calendar current with zero manual work.
#
# Register (Windows, daily 05:00):
#   schtasks /Create /TN "ArtempireMJ Self-Update" /TR "bash <repo>/scripts/selfupdate-deploy.sh" \
#     /SC DAILY /ST 05:00 /AllowStartIfOnBatteries
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/site"
export CLOUDFLARE_API_TOKEN="$(grep '^CLOUDFLARE_API_TOKEN=' "$HOME/.cloudflare/credentials" | head -1 | cut -d= -f2- | tr -d '\r\n[:space:]')"
export CI=1
echo "[$(date)] self-update: build"
npm run build
echo "[$(date)] self-update: deploy"
npx wrangler pages deploy --branch main
echo "[$(date)] self-update: done"
