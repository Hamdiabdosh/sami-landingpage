#!/usr/bin/env bash
# Build and run production Docker stack locally (same as Coolify, with host port 3080).
set -euo pipefail
cd "$(dirname "$0")/.."

ENV_FILE=".env.docker.local"
COMPOSE="docker compose -f docker-compose.yml -f docker-compose.local.yml --env-file $ENV_FILE"

if [ ! -f "$ENV_FILE" ]; then
  cp .env.docker.local.example "$ENV_FILE"
  echo "Created $ENV_FILE from example"
fi

echo "Building and starting (first run ~5-8 min)..."
$COMPOSE up -d --build

echo "Waiting for app..."
for i in $(seq 1 60); do
  if curl -sf -o /dev/null "http://localhost:3080/"; then
    echo ""
    echo "OK — site is up at http://localhost:3080"
    echo "Admin:  http://localhost:3080/admin/login"
    echo "Logs:   npm run docker:logs"
    echo "Stop:   npm run docker:down"
    exit 0
  fi
  sleep 5
done

echo "Timed out. App logs:"
$COMPOSE logs app --tail 40
exit 1
