import logoFull from "../assets/logo-full.webp";
import logoMark from "../assets/logo-mark.webp";

export type LogoVariant = "color" | "white";
export type LogoKind = "mark" | "full";

type LogoProps = {
  variant?: LogoVariant;
  /** "mark" = sun+wave only (slim nav); "full" = stacked lockup with wordmark. */
  kind?: LogoKind;
  /** Set the height with a utility class, e.g. "h-9". */
  className?: string;
};

/*
 * Real brand logo (uploaded by the team). The full color lockup ships as
 * `src/assets/logo-full.png`; the sun+wave mark (auto-cropped for the slim nav)
 * ships as `src/assets/logo-mark.png`. On dark backgrounds we knock the artwork
 * out to solid white with a CSS filter, so no separate white asset is needed.
 */
export function Logo({
  variant = "color",
  kind = "full",
  className = "h-9",
}: LogoProps) {
  const src = kind === "mark" ? logoMark : logoFull;
  return (
    <img
      src={src}
      alt="High Ground Agency"
      draggable={false}
      className={`w-auto select-none ${className}`}
      style={
        variant === "white"
          ? { filter: "brightness(0) invert(1)" }
          : undefined
      }
    />
  );
}
