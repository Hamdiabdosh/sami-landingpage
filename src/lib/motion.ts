import type { Transition, Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const spring = { type: "spring" as const, stiffness: 380, damping: 32 };

export const stagger = 0.06;

export const pageTransition: Transition = {
  duration: 0.3,
  ease: EASE,
};

export const revealTransition: Transition = {
  duration: 0.5,
  ease: EASE,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: revealTransition },
};

export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: 0.1 } },
};

export const tapScale = { scale: 0.97 };
export const hoverLift = { y: -2 };
