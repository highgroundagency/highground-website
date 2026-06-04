import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { Variants } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger direct <RevealItem> children instead of revealing as one block. */
  stagger?: boolean;
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  id?: string;
};

/**
 * Shared scroll-reveal wrapper (brief §8). Fades + lifts content into view
 * once. With reduced motion it degrades to a short, calm fade (no travel).
 */
export function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  y = 24,
  id,
}: RevealProps) {
  const reduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: delay,
        staggerChildren: reduced ? 0 : 0.12,
      },
    },
  };

  const single: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.25 : 0.7, ease: EASE, delay },
    },
  };

  return (
    <motion.div
      id={id}
      className={className}
      variants={stagger ? container : single}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </motion.div>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
};

/** A single staggered child. Must sit inside a <Reveal stagger>. */
export function RevealItem({ children, className, y = 24 }: RevealItemProps) {
  const reduced = useReducedMotion();
  const item: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.25 : 0.6, ease: EASE },
    },
  };
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
