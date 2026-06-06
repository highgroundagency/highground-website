import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "../Logo";
import { Button } from "../ui/Button";
import { MenuIcon, CloseIcon } from "../ui/icons";
import { useSectionTheme } from "../../hooks/useSectionTheme";
import { useContact } from "../ContactModal";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how" },
  { label: "What we need", href: "#expectations" },
  { label: "About", href: "#about" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useSectionTheme();
  const { open: openContact } = useContact();

  const dark = theme === "dark";

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 60);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Lock scroll while the mobile overlay is open.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const barClass = dark
    ? "bg-deep-sea/50 backdrop-blur-md border-b border-white/10"
    : scrolled
      ? "bg-cream/80 backdrop-blur-md border-b border-line"
      : "bg-transparent border-b border-transparent";

  const textClass = dark ? "text-white" : "text-navy";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`transition-colors duration-300 ${barClass}`}>
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8"
          aria-label="Primary"
        >
          <a
            href="#top"
            aria-label="High Ground Agency — home"
            className="rounded-lg transition-opacity hover:opacity-90"
          >
            <Logo
              kind="full"
              variant={dark ? "white" : "color"}
              className="h-11 sm:h-14"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            <ul className={`flex items-center gap-7 text-[0.95rem] ${textClass}`}>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="link-underline py-1 font-medium opacity-85 transition-opacity hover:opacity-100"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button onClick={openContact} size="md">
              Get started
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className={`grid h-11 w-11 place-items-center rounded-xl text-[1.5rem] md:hidden ${textClass}`}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>
        </nav>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[60] flex flex-col md:hidden"
            style={{
              backgroundImage:
                "linear-gradient(160deg, var(--sun-orange), var(--sun-amber) 45%, var(--sun-gold) 80%, var(--sun-pale))",
            }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
          >
            <div className="flex h-16 items-center justify-between px-5">
              <Logo kind="full" variant="white" className="h-11" />
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-xl text-[1.5rem] text-white"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <motion.ul
              className="flex flex-1 flex-col justify-center gap-2 px-7"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
              }}
            >
              {LINKS.map((l) => (
                <motion.li
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 font-display text-[2.4rem] font-semibold leading-tight text-white"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <div className="px-7 pb-10">
              <Button
                variant="navy"
                size="lg"
                className="w-full"
                onClick={() => {
                  setMenuOpen(false);
                  openContact();
                }}
              >
                Get started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
