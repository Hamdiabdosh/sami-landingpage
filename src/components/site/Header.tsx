import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Logo } from "./Logo";
import { useI18n, type Lang } from "@/lib/i18n";
import { EASE, spring, tapScale } from "@/lib/motion";

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
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`sticky top-0 z-50 border-b border-border transition-[background,box-shadow,backdrop-filter] duration-300 ${
        scrolled ? "bg-surface/95 shadow-sm backdrop-blur-lg" : "bg-surface/85 backdrop-blur-md"
      }`}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gold"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.div
        animate={{ height: scrolled ? 56 : 64 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="container-x flex items-center justify-between"
      >
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Logo size={scrolled ? 36 : 40} />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => {
            const active =
              l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative text-sm font-medium tracking-wide transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gold rounded-full"
                    transition={spring}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden md:inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            {t("nav.contact")}
          </Link>
          <LangToggle value={lang} onChange={setLang} />
          <motion.button
            whileTap={tapScale}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="md:hidden border-t border-border overflow-hidden"
          >
            <div className="container-x py-3 flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="py-3 px-1 text-base font-medium border-b border-border last:border-b-0"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function LangToggle({ value, onChange }: { value: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="relative inline-flex rounded-full border border-border bg-card p-1 text-xs font-semibold">
      {(["en", "am"] as const).map((l) => (
        <motion.button
          key={l}
          whileTap={tapScale}
          onClick={() => onChange(l)}
          className={`relative z-10 px-3 py-1.5 rounded-full transition-colors ${
            value === l ? "text-primary-foreground" : "text-muted-foreground"
          }`}
        >
          {value === l && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-primary"
              transition={spring}
            />
          )}
          <span className="relative">{l.toUpperCase()}</span>
        </motion.button>
      ))}
    </div>
  );
}
