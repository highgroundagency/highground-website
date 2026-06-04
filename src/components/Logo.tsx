import { useId } from "react";

export type LogoVariant = "color" | "white" | "navy";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  showWordmark?: boolean;
};

/*
 * High Ground Agency logo — rendered as inline SVG + live text so it stays
 * crisp at any size and recolors instantly for dark sections (white knockout)
 * and tight/monochrome uses (navy).
 *
 * TODO(Gabriel): once the real logo files are uploaded, drop them into
 * `src/assets/` as:
 *   high-ground-agency-logo-transparent.png   (full color)
 *   high-ground-agency-logo-white.png          (white knockout)
 *   high-ground-agency-logo-navy.png           (navy mono)
 * Then you can swap <LogoMark> for an <img> keyed off `variant` (and likewise
 * the wordmark if the real lockup already includes the type). The size /
 * variant API below is built to make that a drop-in change.
 */

function LogoMark({
  variant,
  className,
}: {
  variant: LogoVariant;
  className?: string;
}) {
  const gid = useId();
  const sunFill = variant === "color" ? `url(#${gid}-sun)` : "currentColor";

  // Wave stroke colors per variant (front → back gives depth).
  const waves =
    variant === "color"
      ? ["var(--sea-azure)", "var(--sea-blue)", "var(--sea-mid)"]
      : ["currentColor", "currentColor", "currentColor"];
  const waveOpacity =
    variant === "color" ? [1, 1, 1] : [0.55, 0.78, 1];

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${gid}-sun`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--sun-orange)" />
          <stop offset="0.55" stopColor="var(--sun-amber)" />
          <stop offset="1" stopColor="var(--sun-gold)" />
        </linearGradient>
      </defs>

      {/* Sun cresting the horizon */}
      <circle cx="24" cy="21" r="11" fill={sunFill} />

      {/* Layered waves — also read as a gull's wings */}
      <path
        d="M2 30 Q13 24 24 30 T46 30"
        fill="none"
        stroke={waves[0]}
        strokeOpacity={waveOpacity[0]}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M2 36 Q13 30 24 36 T46 36"
        fill="none"
        stroke={waves[1]}
        strokeOpacity={waveOpacity[1]}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M2 42 Q13 36 24 42 T46 42"
        fill="none"
        stroke={waves[2]}
        strokeOpacity={waveOpacity[2]}
        strokeWidth="3.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Full horizontal lockup. Scales with the wrapper's font-size, so set a size
 * by giving it a text-size utility (e.g. `text-[1.25rem]`) in className.
 */
export function Logo({
  variant = "color",
  className = "",
  showWordmark = true,
}: LogoProps) {
  const markColorClass =
    variant === "white"
      ? "text-white"
      : variant === "navy"
        ? "text-navy"
        : "";
  const wordColor = variant === "white" ? "#ffffff" : "var(--navy)";

  return (
    <span
      className={`inline-flex items-center gap-[0.45em] leading-none ${className}`}
    >
      <LogoMark
        variant={variant}
        className={`h-[2em] w-[2em] shrink-0 ${markColorClass}`}
      />
      {showWordmark && (
        <span className="leading-none">
          <span
            className="block font-display text-[1.18em] font-semibold tracking-[-0.01em]"
            style={{ color: wordColor }}
          >
            High Ground
          </span>
          <span
            className="mt-[0.18em] block font-mono text-[0.5em] font-medium uppercase tracking-[0.24em] opacity-70"
            style={{ color: wordColor }}
          >
            Agency
          </span>
        </span>
      )}
    </span>
  );
}
