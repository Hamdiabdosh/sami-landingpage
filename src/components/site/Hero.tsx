import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { EASE } from "@/lib/motion";
import heroImg from "@/assets/hero.jpg";

const ease = EASE;

export function Hero() {
  const { t } = useI18n();
  const reduced = useReducedMotion();

  const titleParts = t("hero.title").split(".");
  const line1 = titleParts[0]?.trim() ?? t("hero.title");
  const line2 = titleParts[1]?.trim();

  const reveal = (delay: number) =>
    reduced
      ? undefined
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease },
        };

  return (
    <section className="relative isolate bg-background text-foreground">
      <div className="grid min-h-[min(92vh,56rem)] lg:grid-cols-12">
        {/* Copy column */}
        <div className="relative z-10 flex flex-col justify-center px-5 py-14 sm:px-8 md:px-10 lg:col-span-5 lg:py-20 xl:px-14">
          <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <motion.p
              {...reveal(0.35)}
              className="flex items-center gap-3 text-[12px] text-muted-foreground"
            >
              <span className="inline-block h-px w-7 bg-gold" aria-hidden />
              <span>{t("hero.tag")}</span>
            </motion.p>

            <motion.div {...reveal(0.45)} className="mt-8">
              <p className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-[0.92] tracking-[-0.035em] text-primary">
                <span className="block">SAMI</span>
                <span className="block">GENERAL</span>
                <span className="block">TRADING</span>
              </p>
            </motion.div>

            <motion.h1
              {...reveal(0.58)}
              className="mt-10 max-w-[18ch] font-display text-[clamp(1.5rem,3.2vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground"
            >
              <span className="block">{line1}.</span>
              {line2 && <span className="mt-1 block text-muted-foreground">{line2}.</span>}
            </motion.h1>

            <motion.p
              {...reveal(0.7)}
              className="mt-6 max-w-[36ch] text-[15px] leading-relaxed text-muted-foreground"
            >
              {t("hero.sub")}
            </motion.p>

            <motion.div {...reveal(0.82)} className="mt-10">
              <Link
                to="/catalog"
                className="group inline-flex items-center gap-3 border-b border-primary pb-1 text-sm font-medium tracking-[0.04em] text-primary transition-colors hover:border-gold hover:text-foreground"
              >
                {t("cta.catalog")}
                <ArrowRight
                  size={16}
                  strokeWidth={1.75}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Photographic plane */}
        <div className="relative min-h-[52vh] overflow-hidden bg-primary lg:col-span-7 lg:min-h-full">
          <motion.div
            className="absolute inset-0"
            initial={reduced ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.15, ease }}
          >
            <img
              src={heroImg}
              alt="Bicycle — Sami General Trading"
              className="h-full w-full object-cover object-[center_40%] sm:object-center"
            />
          </motion.div>

          {/* Localized edge wash so copy column edge reads cleanly at the seam on large screens */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-background/25 to-transparent lg:block"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
