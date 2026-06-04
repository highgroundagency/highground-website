import { useReducedMotion } from "../../hooks/useReducedMotion";

type Ray = {
  left: string;
  width: number;
  rotate: number;
  opacity: number;
  duration: number;
  delay: number;
};

const RAYS: Ray[] = [
  { left: "12%", width: 90, rotate: -14, opacity: 0.28, duration: 9, delay: 0 },
  { left: "34%", width: 140, rotate: -8, opacity: 0.2, duration: 12, delay: 1.5 },
  { left: "58%", width: 70, rotate: -16, opacity: 0.3, duration: 8, delay: 0.8 },
  { left: "78%", width: 120, rotate: -10, opacity: 0.18, duration: 11, delay: 2.2 },
];

/**
 * Faint god-rays angling down from the surface in the underwater Problem
 * scene (brief §7.3). Opacity drifts gently; with reduced motion they stay
 * present but static.
 */
export function LightRays({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {RAYS.map((r, i) => (
        <div
          key={i}
          className="absolute -top-1/4 h-[150%] origin-top"
          style={{
            left: r.left,
            width: r.width,
            transform: `rotate(${r.rotate}deg)`,
            background:
              "linear-gradient(to bottom, rgba(120,200,230,0.4), rgba(120,200,230,0) 75%)",
            filter: "blur(10px)",
            opacity: r.opacity,
            animation: reduced
              ? undefined
              : `ray-shimmer ${r.duration}s ease-in-out ${r.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
