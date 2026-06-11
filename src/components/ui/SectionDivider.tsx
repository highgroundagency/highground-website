type SectionDividerProps = {
  /** Fill color — use the background of the *adjacent* section so the wave
   *  reads as that section flowing into this one. */
  color: string;
  /** flip=true renders at the TOP of a section (waves dipping downward). */
  flip?: boolean;
  className?: string;
};

/**
 * Two stacked wave paths used to hand one section to the next — no hard
 * horizontal seams anywhere on the page. The curve family echoes the logo's
 * gull-wing wave.
 */
export function SectionDivider({ color, flip = false, className = "" }: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-10 ${
        flip ? "top-[-1px]" : "bottom-[-1px]"
      } ${className}`}
      style={{
        height: "clamp(44px, 8vw, 110px)",
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 72 C240 30 480 28 720 60 C960 92 1200 94 1440 56 L1440 110 L0 110 Z"
          fill={color}
          opacity="0.45"
        />
        <path
          d="M0 88 C260 52 520 46 760 74 C1000 102 1240 100 1440 70 L1440 110 L0 110 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
