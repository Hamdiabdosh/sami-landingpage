# syntax=docker/dockerfile:1

FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
# prisma generate runs via postinstall; dummy URL satisfies schema validation at build time
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build"
RUN bun run build

FROM oven/bun:1-debian AS production
WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl postgresql-client ca-certificates wget \
  && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY package.json bun.lock ./
COPY prisma ./prisma
RUN bun install --frozen-lockfile --production \
  && bun add prisma@6 \
  && bunx prisma generate

COPY --from=build /app/.output ./.output
COPY scripts/docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
CMD ["bun", ".output/server/index.mjs"]
