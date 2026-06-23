import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/lib/db";
import { absoluteUrl } from "@/lib/seo";

const STATIC_PATHS = ["/", "/catalog", "/gallery", "/about", "/contact"] as const;

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function urlEntry(loc: string, lastmod?: Date): string {
  const last = lastmod ? `\n    <lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : "";
  return `  <url>\n    <loc>${escapeXml(loc)}</loc>${last}\n  </url>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const products = await db.product.findMany({
          where: { isActive: true },
          select: { id: true, updatedAt: true },
          orderBy: { updatedAt: "desc" },
        });

        const urls = [
          ...STATIC_PATHS.map((p) => urlEntry(absoluteUrl(p))),
          ...products.map((p) => urlEntry(absoluteUrl(`/catalog/${p.id}`), p.updatedAt)),
        ];

        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;

        return new Response(body, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
