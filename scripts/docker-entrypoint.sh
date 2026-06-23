#!/bin/sh
set -e

POSTGRES_HOST="${POSTGRES_HOST:-db}"
POSTGRES_PORT="${POSTGRES_PORT:-5432}"
POSTGRES_USER="${POSTGRES_USER:-postgres}"
POSTGRES_DB="${POSTGRES_DB:-sami_showcase}"

# ponytail: POSTGRES_PASSWORD is the single source of truth — avoids DATABASE_URL / volume password drift
if [ -n "$POSTGRES_PASSWORD" ]; then
  DATABASE_URL="$(node -e "
    const u = process.env.POSTGRES_USER || 'postgres';
    const p = process.env.POSTGRES_PASSWORD || '';
    const d = process.env.POSTGRES_DB || 'sami_showcase';
    const h = process.env.POSTGRES_HOST || 'db';
    const port = process.env.POSTGRES_PORT || '5432';
    console.log('postgresql://' + encodeURIComponent(u) + ':' + encodeURIComponent(p) + '@' + h + ':' + port + '/' + d);
  ")"
  export DATABASE_URL
fi

if [ -n "$DATABASE_URL" ]; then
  echo "Waiting for Postgres at ${POSTGRES_HOST}:${POSTGRES_PORT}..."
  for i in $(seq 1 30); do
    if pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" >/dev/null 2>&1; then
      break
    fi
    if [ "$i" -eq 30 ]; then
      echo "Postgres not ready after 60s"
      exit 1
    fi
    sleep 2
  done

  echo "Running migrations..."
  npx prisma migrate deploy

  if [ "$RUN_SEED" = "true" ]; then
    echo "Seeding database..."
    npx tsx prisma/seed.ts
  fi
else
  echo "WARNING: DATABASE_URL not set — skipping migrations"
fi

UPLOAD_DIR="${UPLOAD_DIR:-/app/data/uploads}"
mkdir -p "$UPLOAD_DIR"

echo "Starting app on ${HOST:-0.0.0.0}:${PORT:-3000}..."
exec "$@"
