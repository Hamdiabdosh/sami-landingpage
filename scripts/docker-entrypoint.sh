#!/bin/sh
set -e

POSTGRES_HOST="${POSTGRES_HOST:-db}"
POSTGRES_PORT="${POSTGRES_PORT:-5432}"
POSTGRES_USER="${POSTGRES_USER:-postgres}"

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
  bun x prisma migrate deploy

  if [ "$RUN_SEED" = "true" ]; then
    echo "Seeding database..."
    bun prisma/seed.ts
  fi
else
  echo "WARNING: DATABASE_URL not set — skipping migrations"
fi

echo "Starting app on ${HOST:-0.0.0.0}:${PORT:-3000}..."
exec "$@"
