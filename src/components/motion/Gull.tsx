import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type GullProps = {
  className?: string;
  /** Seconds for one glide across the sky. */
  duration?: number;
  /** Quiet gap between glides so it stays a delight, not a distraction. */
  repeatDelay?: number;
};

/**
 * A single white gull that glides across the sky on a gentle arc, built from
 * the logo's wing curve (brief §7.2 / §8). Auto-moving, so it's hidden under
 * prefers-reduced-motion.
 */
export function Gull({
  className = "",
  duration = 24,
  repeatDelay = 7,
}: GullProps) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      aria-hidden="true"
      initial={{ x: "-12vw", y: 0, opacity: 0 }}
      animate={{
        x: ["-12vw", "28vw", "64vw", "112vw"],
        y: [0, -26, 8, -14],
        rotate: [0, -6, 4, -3],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        times: [0, 0.35, 0.7, 1],
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay,
      }}
    >
      <svg width="46" height="20" viewBox="0 0 46 20" fill="none" aria-hidden="true">
        <path
          d="M2 12 Q12 2 22.5 11"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M22.5 11 Q33 2 44 12"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}
