import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
};

/**
 * Section eyebrow / label in Space Mono — e.g. `01 — THE PROBLEM`.
 * Colour is inherited so it adapts to light/dark sections; pass a text
 * colour utility via className where needed.
 */
export function Eyebrow({ children, className = "", as: Tag = "p" }: EyebrowProps) {
  return <Tag className={`eyebrow ${className}`}>{children}</Tag>;
}
