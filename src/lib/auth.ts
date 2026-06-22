import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "./db";

const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:8080";

function isPrivateDevHost(hostname: string) {
  return (
    hostname === "localhost" ||
    hostname.endsWith(".local") ||
    /^127\./.test(hostname) ||
    /^10\./.test(hostname) ||
    /^192\.168\./.test(hostname) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(hostname)
  );
}

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  secret: process.env.BETTER_AUTH_SECRET ?? "dev-secret-change-me-in-production",
  baseURL,
  trustedOrigins: (request) => {
    const origins = new Set([
      baseURL,
      ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS?.split(",").map((s) => s.trim()).filter(Boolean) ?? []),
    ]);
    const origin = request?.headers.get("origin");
    // ponytail: dev-only — trust private/LAN origins so phone/tablet testing works without redeploy
    if (process.env.NODE_ENV !== "production" && origin) {
      try {
        if (isPrivateDevHost(new URL(origin).hostname)) origins.add(origin);
      } catch {
        /* ignore bad origin header */
      }
    }
    return [...origins];
  },
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  plugins: [tanstackStartCookies()],
});

export type Session = typeof auth.$Infer.Session;
