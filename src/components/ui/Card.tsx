import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  /** Adds a hover lift + warm shadow bloom (brief §8). */
  interactive?: boolean;
};

/**
 * Soft, rounded surface. Defaults to a light card for warm sections; pass
 * className to override the background for the dark/underwater section.
 * Extra div props (onMouseMove, etc.) pass straight through.
 */
export function Card({
  children,
  className = "",
  interactive = false,
  ...rest
}: CardProps) {
  const interactiveCls = interactive
    ? "transition-all duration-300 will-change-transform hover:-translate-y-1.5 hover:shadow-[var(--shadow-sun-lg)]"
    : "";
  return (
    <div
      {...rest}
      className={`rounded-[var(--radius-card)] border border-line bg-white/70 p-6 shadow-[var(--shadow-sun)] backdrop-blur-sm ${interactiveCls} ${className}`}
    >
      {children}
    </div>
  );
}
