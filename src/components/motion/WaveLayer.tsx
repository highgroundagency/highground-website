export type Wave = {
  color: string;
  opacity: number;
  /** Loop seconds — slowest = farthest back (brief §8: 14 / 20 / 28). */
  duration: number;
  amplitude: number;
  baseline: number;
};

const DEFAULT_WAVES: Wave[] = [
  { color: "var(--sea-azure)", opacity: 0.45, duration: 28, amplitude: 22, baseline: 64 },
  { color: "var(--sea-blue)", opacity: 0.62, duration: 20, amplitude: 28, baseline: 98 },
  { color: "var(--sea-mid)", opacity: 0.9, duration: 14, amplitude: 32, baseline: 132 },
];

/** One seamless 2-period wave area path (viewBox 0 0 2880 200). */
function waveD(baseline: number, amp: number) {
  const b = baseline;
  return `M0 ${b} Q360 ${b - amp} 720 ${b} T1440 ${b} T2160 ${b} T2880 ${b} L2880 200 L0 200 Z`;
}

type WaveLayerProps = {
  className?: string;
  waves?: Wave[];
  height?: number | string;
};

/**
 * Layered, horizontally-looping SVG waves (brief §8 "wave engine"). Each layer
 * is 200% wide and scrolls by exactly one period, so the loop is seamless.
 * Reused for the hero, services base, and final CTA. Pure CSS transform —
 * prefers-reduced-motion freezes it (handled globally in index.css).
 */
export function WaveLayer({
  className = "",
  waves = DEFAULT_WAVES,
  height = 220,
}: WaveLayerProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      {waves.map((w, i) => (
        <svg
          key={i}
          className="absolute bottom-0 left-0 h-full"
          style={{
            width: "200%",
            willChange: "transform",
            animation: `wave-scroll ${w.duration}s linear infinite`,
          }}
          viewBox="0 0 2880 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={waveD(w.baseline, w.amplitude)} fill={w.color} fillOpacity={w.opacity} />
        </svg>
      ))}
    </div>
  );
}
