import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { useI18n } from "@/lib/i18n";
import { listGalleryImages } from "@/fns/gallery";

export const Route = createFileRoute("/gallery")({
  loader: () => listGalleryImages(),
  head: () => ({
    meta: [
      { title: "Gallery — Sami General Trading" },
      { name: "description", content: "Photos from our shop and the goods we move in Dire Dawa." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { t, lang } = useI18n();
  const items = Route.useLoaderData();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openIdx === null) return;
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight") setOpenIdx((i) => (i === null ? null : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setOpenIdx((i) => (i === null ? null : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx, items.length]);

  return (
    <SiteShell>
      <section className="container-x pt-14">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs uppercase tracking-[0.22em] text-gold font-semibold">Gallery</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">{t("gallery.title")}</h1>
          <p className="mt-3 text-muted-foreground max-w-xl">{t("gallery.sub")}</p>
        </motion.div>
      </section>

      <section className="container-x py-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {items.map((img, i) => {
            const cap = lang === "en" ? img.captionEn : img.captionAm;
            return (
              <motion.button
                key={img.id}
                onClick={() => setOpenIdx(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                className="group relative mb-5 block w-full overflow-hidden rounded-2xl bg-muted break-inside-avoid"
              >
                <img src={img.src} alt={cap} loading="lazy" className="w-full transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                  <span className="text-white text-sm font-medium">{cap}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {openIdx !== null && items[openIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm grid place-items-center p-4"
            onClick={() => setOpenIdx(null)}
          >
            <button
              className="absolute top-5 right-5 h-11 w-11 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20"
              onClick={() => setOpenIdx(null)}
            >
              <X size={20} />
            </button>
            <button
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); setOpenIdx((i) => (i === null ? null : (i - 1 + items.length) % items.length)); }}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 text-white grid place-items-center hover:bg-white/20"
              onClick={(e) => { e.stopPropagation(); setOpenIdx((i) => (i === null ? null : (i + 1) % items.length)); }}
            >
              <ChevronRight size={22} />
            </button>
            <motion.div
              key={items[openIdx].id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="max-w-5xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={items[openIdx].src} alt="" className="max-h-[80vh] w-auto rounded-xl" />
              <p className="mt-3 text-center text-white/80 text-sm">
                {lang === "en" ? items[openIdx].captionEn : items[openIdx].captionAm}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SiteShell>
  );
}
