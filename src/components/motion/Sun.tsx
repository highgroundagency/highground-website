import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type SunProps = {
  /** Position the sun by giving the wrapper an absolute/positioning class. */
  className?: string;
  size?: number;
};

/**
 * The sunrise disc (brief §7.2 / §8): a radial-gradient sun with a slow
 * breathing glow that rises into place on load. The caller positions the
 * wrapper (e.g. `absolute`), which becomes the containing block for the
 * absolutely-placed glow + disc.
 */
export function Sun({ className = "", size = 460 }: SunProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className={className}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Outer glow — breathing */}
      <div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, var(--sun-pale), rgba(248,217,138,0) 70%)",
          animation: reduced ? undefined : "sun-glow 6s ease-in-out infinite",
        }}
      />
      {/* Disc — rises in */}
      <motion.div
        className="absolute inset-[14%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 38%, var(--sun-pale), var(--sun-gold) 36%, var(--sun-amber) 64%, var(--sun-orange) 100%)",
          boxShadow: "0 0 90px 14px rgba(244,162,79,0.45)",
        }}
        initial={reduced ? false : { y: 54, scale: 0.94, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }}
      />
    </div>
  );
}
