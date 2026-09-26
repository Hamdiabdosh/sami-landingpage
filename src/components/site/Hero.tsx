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
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  return (
    <section className="relative isolate bg-background text-foreground">
      <div className="grid min-h-[min(92vh,56rem)] lg:grid-cols-12">
        {/* Copy — mobile: identity → message → support → action, then photo below */}
        <div className="relative z-10 flex flex-col justify-center px-5 pb-10 pt-12 sm:px-8 sm:pb-12 sm:pt-14 md:px-10 lg:col-span-5 lg:py-24 xl:px-14">
          <div className="mx-auto flex w-full max-w-sm flex-col lg:mx-0 lg:max-w-[28rem]">
            <motion.p
              {...reveal(0.3)}
              className="flex items-center gap-3 text-[11px] leading-none tracking-[0.08em] text-muted-foreground"
            >
              <span className="inline-block h-px w-6 bg-gold" aria-hidden />
              <span>{t("hero.tag")}</span>
            </motion.p>

            {/* Brand = large identity; weight kept below the headline message */}
            <motion.div {...reveal(0.4)} className="mt-8 lg:mt-9">
              <p className="font-display text-[clamp(2.35rem,5.2vw,3.75rem)] font-semibold leading-[0.96] tracking-[-0.035em] text-primary">
                <span className="block">SAMI</span>
                <span className="block">GENERAL</span>
                <span className="block">TRADING</span>
              </p>
            </motion.div>

            {/* Single editorial detail: separates identity from message */}
            <motion.div {...reveal(0.5)} className="mt-10 h-px w-10 bg-gold lg:mt-12" aria-hidden />

            {/* Headline = primary communication */}
            <motion.h1
              {...reveal(0.55)}
              className="mt-8 max-w-[17ch] font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.022em] text-foreground lg:mt-9"
            >
              <span className="block">{line1}.</span>
              {line2 && (
                <span className="mt-1.5 block font-medium text-foreground/65">{line2}.</span>
              )}
            </motion.h1>

            <motion.p
              {...reveal(0.65)}
              className="mt-5 max-w-[34ch] text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]"
            >
              {t("hero.sub")}
            </motion.p>

            <motion.div {...reveal(0.75)} className="mt-9 lg:mt-11">
              <Link
                to="/catalog"
                className="group inline-flex items-center gap-3 border-b border-primary pb-1 text-[13px] font-medium tracking-[0.06em] text-primary transition-colors hover:border-gold hover:text-foreground"
              >
                {t("cta.catalog")}
                <ArrowRight
                  size={15}
                  strokeWidth={1.75}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Photography — substantial band on mobile; dominant plane on desktop */}
        <div className="relative min-h-[58vh] overflow-hidden bg-primary sm:min-h-[62vh] lg:col-span-7 lg:min-h-full">
          <motion.div
            className="absolute inset-0"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.05, ease }}
          >
            <img
              src={heroImg}
              alt="Bicycle — Sami General Trading"
              className="h-full w-full object-cover object-[center_38%] lg:object-center"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
