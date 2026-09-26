import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Logo } from "./Logo";
import { useI18n, type Lang } from "@/lib/i18n";
import { EASE, tapScale } from "@/lib/motion";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", () => {
    setScrolled(window.scrollY > 48);
  });

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/catalog", label: t("nav.catalog") },
    { to: "/gallery", label: t("nav.gallery") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-border/80 bg-background/92 backdrop-blur-md"
          : "border-b border-transparent bg-background/70 backdrop-blur-sm"
      }`}
    >
      {/* Thin gold reading-progress — restrained editorial accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gold"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.div
        animate={{ height: scrolled ? 52 : 64 }}
        transition={{ duration: 0.28, ease: EASE }}
        className="container-x flex items-center justify-between gap-6"
      >
        <Link to="/" className="flex shrink-0 items-center py-1" onClick={() => setOpen(false)}>
          <Logo size={scrolled ? 32 : 36} />
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative py-1 text-[13px] tracking-[0.04em] transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-gold"
                    transition={{ duration: 0.25, ease: EASE }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 sm:gap-5">
          <Link
            to="/contact"
            className="hidden text-[13px] font-medium tracking-[0.04em] text-foreground transition-colors hover:text-gold md:inline-flex"
          >
            {t("nav.contact")}
          </Link>

          <LangToggle value={lang} onChange={setLang} />

          <motion.button
            whileTap={tapScale}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="overflow-hidden border-t border-border/70 bg-background md:hidden"
          >
            <nav className="container-x flex flex-col py-2" aria-label="Mobile">
              {links.map((l) => {
                const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`border-b border-border/50 py-4 text-base tracking-[0.02em] last:border-b-0 ${
                      active ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {l.label}
                    {active && (
                      <span className="ml-3 inline-block h-px w-6 translate-y-[-3px] bg-gold align-middle" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function LangToggle({ value, onChange }: { value: Lang; onChange: (l: Lang) => void }) {
  return (
    <div
      className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.12em]"
      role="group"
      aria-label="Language"
    >
      {(["en", "am"] as const).map((l, i) => (
        <span key={l} className="inline-flex items-center gap-1.5">
          {i > 0 && (
            <span className="text-border" aria-hidden>
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => onChange(l)}
            className={`py-2 transition-colors ${
              value === l ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
            aria-pressed={value === l}
          >
            <span className={value === l ? "border-b border-gold pb-0.5" : ""}>
              {l.toUpperCase()}
            </span>
          </button>
        </span>
      ))}
    </div>
  );
}
