import { useReducedMotion } from "../../hooks/useReducedMotion";

type CloudSpec = {
  top: string;
  left?: string;
  right?: string;
  width: string;
  height: number;
  opacity: number;
  duration: number;
};

const CLOUDS: CloudSpec[] = [
  { top: "8%", left: "4%", width: "clamp(180px, 26vw, 380px)", height: 56, opacity: 0.55, duration: 64 },
  { top: "16%", right: "30%", width: "clamp(120px, 18vw, 260px)", height: 40, opacity: 0.4, duration: 84 },
  { top: "5%", right: "8%", width: "clamp(150px, 22vw, 320px)", height: 48, opacity: 0.45, duration: 72 },
];

/**
 * Soft pre-dawn clouds drifting very slowly across the hero sky. Static under
 * reduced motion (still present — they're part of the scene, not decoration
 * that needs to move).
 */
export function Clouds({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white blur-2xl"
          style={{
            top: c.top,
            left: c.left,
            right: c.right,
            width: c.width,
            height: c.height,
            opacity: c.opacity,
            animation: reduced
              ? undefined
              : `cloud-drift ${c.duration}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
