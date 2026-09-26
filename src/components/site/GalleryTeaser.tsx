import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { GalleryImage } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { EASE, revealTransition } from "@/lib/motion";

export function GalleryTeaser({ images }: { images: GalleryImage[] }) {
  const { t, lang } = useI18n();
  const reduced = useReducedMotion();

  const shots = images.slice(0, 4);
  if (shots.length === 0) return null;

  const [dominant, ...support] = shots;

  const altFor = (img: GalleryImage) => {
    const cap = (lang === "en" ? img.captionEn : img.captionAm || img.captionEn).trim();
    return cap;
  };

  return (
    <section className="border-t border-border/60 bg-background py-20 md:py-28">
      <div className="container-x">
        <motion.header
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-xl">
            <p className="flex items-center gap-3 text-[11px] tracking-[0.14em] text-muted-foreground">
              <span className="inline-block h-px w-7 bg-gold" aria-hidden />
              <span>{t("home.gallery.sub")}</span>
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
              {t("home.gallery.title")}
            </h2>
          </div>

          <Link
            to="/gallery"
            className="group inline-flex w-fit items-center gap-2 border-b border-primary pb-1 text-[13px] font-medium tracking-[0.06em] text-primary transition-colors hover:border-gold hover:text-foreground"
          >
            {t("home.gallery.more")}
            <ArrowRight
              size={14}
              strokeWidth={1.75}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.header>

        {/* Mobile: vertical stack of substantial frames */}
        <div className="mt-14 flex flex-col gap-5 md:hidden">
          {shots.map((img, i) => (
            <GalleryFrame
              key={img.id}
              src={img.src}
              alt={altFor(img)}
              reduced={!!reduced}
              delay={i * 0.06}
              aspect={i === 0 ? "aspect-[4/5]" : "aspect-[5/4]"}
            />
          ))}
        </div>

        {/* Desktop: asymmetric editorial composition */}
        <div className="mt-16 hidden gap-4 md:grid md:grid-cols-12 md:gap-5 lg:mt-20 lg:gap-6">
          {/* Dominant */}
          <div className="md:col-span-7 md:row-span-2">
            <GalleryFrame
              src={dominant.src}
              alt={altFor(dominant)}
              reduced={!!reduced}
              delay={0}
              aspect="aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[32rem]"
            />
          </div>

          {/* Support stack (right) */}
          {support[0] && (
            <div className="md:col-span-5">
              <GalleryFrame
                src={support[0].src}
                alt={altFor(support[0])}
                reduced={!!reduced}
                delay={0.08}
                aspect="aspect-[5/4]"
              />
            </div>
          )}
          {support[1] && (
            <div className="md:col-span-5">
              <GalleryFrame
                src={support[1].src}
                alt={altFor(support[1])}
                reduced={!!reduced}
                delay={0.12}
                aspect="aspect-[5/4]"
              />
            </div>
          )}

          {/* Bottom row: fourth image + breathing room */}
          {support[2] && (
            <div className="md:col-span-5 md:col-start-1">
              <GalleryFrame
                src={support[2].src}
                alt={altFor(support[2])}
                reduced={!!reduced}
                delay={0.16}
                aspect="aspect-[4/3]"
              />
            </div>
          )}
          <div className="hidden md:col-span-7 md:col-start-6 md:block" aria-hidden>
            <div className="flex h-full min-h-[8rem] items-end border-t border-border/50 pt-6">
              <p className="max-w-xs text-[13px] leading-relaxed text-muted-foreground">
                {t("gallery.sub")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryFrame({
  src,
  alt,
  reduced,
  delay,
  aspect,
}: {
  src: string;
  alt: string;
  reduced: boolean;
  delay: number;
  aspect: string;
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...revealTransition, duration: 0.75, delay: reduced ? 0 : delay }}
      className="h-full"
    >
      <Link
        to="/gallery"
        className={`group relative block h-full overflow-hidden bg-surface-muted ${aspect}`}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover ${
            reduced ? "" : "transition duration-[1.1s] ease-out group-hover:scale-[1.03]"
          }`}
        />
      </Link>
    </motion.div>
  );
}
