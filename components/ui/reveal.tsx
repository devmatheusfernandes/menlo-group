"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger step, in seconds. */
  delay?: number;
};

/**
 * Scroll-triggered entrance. Mirrors the original `.reveal` behaviour: fires
 * once, 26px rise, and collapses to a plain fade when the user prefers
 * reduced motion.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 0.68, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
