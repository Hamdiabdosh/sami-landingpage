# syntax=docker/dockerfile:1

FROM oven/bun:1-debian AS build
WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package.json bun.lock ./
COPY prisma ./prisma
RUN bun install --frozen-lockfile

COPY . .
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
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.output ./.output
COPY scripts/docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null 2>&1 || exit 1

ENTRYPOINT ["/entrypoint.sh"]
CMD ["bun", ".output/server/index.mjs"]
