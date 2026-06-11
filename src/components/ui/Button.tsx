import type { MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "ghost" | "ghost-light" | "navy" | "cream";
type Size = "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  className?: string;
  ariaLabel?: string;
  target?: string;
};

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-7 py-4 text-[1.02rem]",
};

// Hover lift + press scale use CSS transitions, so prefers-reduced-motion
// (handled globally in index.css) calms them automatically.
const liftPress =
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";

const variantClasses: Record<Variant, string> = {
  primary: `btn-shine text-white shadow-[var(--shadow-sun)] hover:shadow-[var(--shadow-sun-lg)] ${liftPress}`,
  navy: `bg-navy text-cream hover:bg-[#16365a] shadow-[0_18px_40px_-18px_rgba(26,62,102,0.6)] ${liftPress}`,
  cream: `bg-cream text-navy shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)] hover:bg-white ${liftPress}`,
  ghost: `text-navy border border-navy/25 hover:bg-navy/5 ${liftPress}`,
  "ghost-light": `text-white border border-white/40 hover:bg-white/10 ${liftPress}`,
};

/**
 * Brand button. Renders an <a> when `href` is set, otherwise a <button>.
 * Primary uses the sun gradient (orange → gold), the recurring CTA look.
 */
export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  ariaLabel,
  target,
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 will-change-transform select-none cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const style =
    variant === "primary"
      ? {
          backgroundImage:
            "linear-gradient(100deg, var(--sun-orange), var(--sun-amber) 55%, var(--sun-gold))",
        }
      : undefined;

  if (href) {
    const rel = target === "_blank" ? "noreferrer noopener" : undefined;
    return (
      <a
        href={href}
        onClick={onClick}
        className={cls}
        style={style}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cls}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
