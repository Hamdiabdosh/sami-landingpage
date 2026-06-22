import { createFileRoute } from "@tanstack/react-router";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getUploadDir } from "@/lib/image-storage";

const WEBP_NAME = /^[a-f0-9-]{36}\.webp$/i;

export const Route = createFileRoute("/uploads/$filename")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { filename } = params;
        if (!WEBP_NAME.test(filename)) return new Response("Not found", { status: 404 });

        const dir = path.resolve(getUploadDir());
        const filepath = path.resolve(dir, filename);
        if (!filepath.startsWith(`${dir}${path.sep}`)) {
          return new Response("Not found", { status: 404 });
        }

        try {
          const body = await readFile(filepath);
          return new Response(body, {
            headers: {
              "Content-Type": "image/webp",
              "Cache-Control": "public, max-age=31536000, immutable",
            },
          });
        } catch {
          return new Response("Not found", { status: 404 });
        }
      },
    },
  },
});
