import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A 3px sunrise-gradient progress bar pinned to the very top of the viewport.
 * It fills as you scroll — a quiet echo of the page's "rise to high ground"
 * arc. Scroll-linked only (no autonomous motion), so it stays calm under
 * prefers-reduced-motion too.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left"
      style={{
        scaleX,
        backgroundImage:
          "linear-gradient(90deg, var(--sun-orange), var(--sun-amber), var(--sun-gold))",
      }}
    />
  );
}
