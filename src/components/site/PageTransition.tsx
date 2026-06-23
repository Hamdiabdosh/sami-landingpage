import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { pageTransition, EASE } from "@/lib/motion";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduced = useReducedMotion();

  return (
    <LayoutGroup>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={pathname}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -8 }}
          transition={{ ...pageTransition, ease: EASE }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
}
