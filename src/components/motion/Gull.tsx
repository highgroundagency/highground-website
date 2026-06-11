import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type GullProps = {
  className?: string;
  /** Seconds for one glide across the sky. */
  duration?: number;
  /** Quiet gap between glides so it stays a delight, not a distraction. */
  repeatDelay?: number;
  /** Initial delay before the first glide — lets a flock feel staggered. */
  delay?: number;
  /** Size multiplier — smaller gulls read as farther away. */
  scale?: number;
};

/**
 * A white gull that glides across the sky on a gentle arc, built from the
 * logo's wing curve (brief §7.2 / §8). Render a few with different scales,
 * delays, and durations for a natural flock. Auto-moving, so it's hidden
 * under prefers-reduced-motion.
 */
export function Gull({
  className = "",
  duration = 24,
  repeatDelay = 7,
  delay = 0,
  scale = 1,
}: GullProps) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  const w = Math.round(46 * scale);
  const h = Math.round(20 * scale);

  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      aria-hidden="true"
      initial={{ x: "-12vw", y: 0, opacity: 0 }}
      animate={{
        x: ["-12vw", "28vw", "64vw", "112vw"],
        y: [0, -26 * scale, 8 * scale, -14 * scale],
        rotate: [0, -6, 4, -3],
        opacity: [0, 0.55 + 0.45 * scale, 0.55 + 0.45 * scale, 0],
      }}
      transition={{
        duration,
        times: [0, 0.35, 0.7, 1],
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay,
        delay,
      }}
    >
      <svg width={w} height={h} viewBox="0 0 46 20" fill="none" aria-hidden="true">
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
