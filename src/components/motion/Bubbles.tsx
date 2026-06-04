import { useMemo } from "react";
import type { CSSProperties } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type BubblesProps = {
  count?: number;
  className?: string;
};

/**
 * Small bubbles drifting upward at varied speeds for the underwater Problem
 * scene (brief §7.3 / §8). Auto-moving → suppressed under reduced motion.
 */
export function Bubbles({ count = 18, className = "" }: BubblesProps) {
  const reduced = useReducedMotion();

  const bubbles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        key: i,
        left: Math.random() * 100,
        size: 4 + Math.random() * 12,
        duration: 7 + Math.random() * 9,
        delay: Math.random() * 10,
        drift: (Math.random() * 2 - 1) * 30,
        opacity: 0.12 + Math.random() * 0.3,
      })),
    [count],
  );

  if (reduced) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {bubbles.map((b) => (
        <span
          key={b.key}
          className="absolute rounded-full"
          style={
            {
              left: `${b.left}%`,
              bottom: `-${b.size}px`,
              width: b.size,
              height: b.size,
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), rgba(120,180,210,0.12))",
              border: "1px solid rgba(255,255,255,0.18)",
              opacity: b.opacity,
              ["--drift"]: `${b.drift}px`,
              animation: `bubble-rise ${b.duration}s ease-in ${b.delay}s infinite`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
