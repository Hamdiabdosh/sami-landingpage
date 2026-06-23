#!/usr/bin/env bash
# Fresh Postgres + uploads volumes, then rebuild and start. Use after password mismatch (P1000).
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Stopping stack and removing pgdata + uploads volumes..."
docker compose down -v

echo "Building and starting..."
docker compose up -d --build

echo "Done. Tail app logs: docker compose logs -f app"
