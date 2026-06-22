#!/bin/sh
set -e

POSTGRES_HOST="${POSTGRES_HOST:-db}"
POSTGRES_PORT="${POSTGRES_PORT:-5432}"
POSTGRES_USER="${POSTGRES_USER:-postgres}"

if [ -n "$DATABASE_URL" ]; then
  echo "Waiting for Postgres at ${POSTGRES_HOST}:${POSTGRES_PORT}..."
  until pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" >/dev/null 2>&1; do
    sleep 2
  done

  echo "Running migrations..."
  bunx prisma migrate deploy

  if [ "$RUN_SEED" = "true" ]; then
    echo "Seeding database..."
    bun prisma/seed.ts
  fi
fi

echo "Starting app on ${HOST:-0.0.0.0}:${PORT:-3000}..."
exec "$@"
