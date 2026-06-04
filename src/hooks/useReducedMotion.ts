import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Definite-boolean wrapper around Framer Motion's reduced-motion signal.
 * Reactive: updates if the user toggles their OS "reduce motion" setting.
 *
 * Use this to gate parallax, looping, and auto-moving animations so the
 * site stays calm and fully usable with motion reduced (see brief §8 / §10).
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
