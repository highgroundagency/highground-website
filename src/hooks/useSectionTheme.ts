import { useEffect, useState } from "react";

export type SectionTheme = "light" | "dark";

/**
 * Tracks the theme of whichever section currently sits beneath the sticky
 * nav, so the nav can swap its logo (full-color ↔ white knockout) and link
 * colors. Sections opt in by rendering with `data-section-theme="dark"`
 * (the underwater Problem section and the footer). Everything else is light.
 *
 * `offset` is the y-position (px from the top of the viewport) used as the
 * detection line — roughly the vertical center of the nav bar.
 */
export function useSectionTheme(offset = 38): SectionTheme {
  const [theme, setTheme] = useState<SectionTheme>("light");

  useEffect(() => {
    let raf = 0;

    const compute = () => {
      raf = 0;
      const darkEls = document.querySelectorAll<HTMLElement>(
        '[data-section-theme="dark"]',
      );
      let dark = false;
      darkEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= offset && r.bottom > offset) dark = true;
      });
      setTheme((prev) => {
        const next: SectionTheme = dark ? "dark" : "light";
        return prev === next ? prev : next;
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [offset]);

  return theme;
}
