import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { FormEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/Button";
import { CloseIcon, CheckIcon } from "./ui/icons";
import { Logo } from "./Logo";

type ContactCtx = { open: () => void; close: () => void };
const ContactContext = createContext<ContactCtx | null>(null);

/** Open the free-call / free-trial form from any CTA. */
export function useContact(): ContactCtx {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used within <ContactProvider>");
  return ctx;
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactContext.Provider value={{ open, close }}>
      {children}
      <ContactModal open={isOpen} onClose={close} />
    </ContactContext.Provider>
  );
}

const FIELD =
  "w-full rounded-xl border border-line bg-cream/70 px-4 py-3 text-[1rem] text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-sun-amber focus:bg-white";

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    // TODO(Gabriel): wire this up to the real destination — send to your
    // email, a Calendly booking link, or your CRM endpoint. For now we just
    // log the lead and show a confirmation (no page reload).
    console.info("[High Ground] new lead:", data);
    setSent(true);
  };

  // Focus trap, Esc-to-close, scroll lock, focus restore.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;

    const focusables = () =>
      dialog
        ? Array.from(
            dialog.querySelectorAll<HTMLElement>(
              'a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        const f = focusables();
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  // Reset the success panel shortly after closing.
  useEffect(() => {
    if (!open && sent) {
      const t = setTimeout(() => setSent(false), 300);
      return () => clearTimeout(t);
    }
  }, [open, sent]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-abyss/55 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="relative w-full max-w-lg overflow-hidden rounded-t-[var(--radius-card)] border border-line bg-cream shadow-[var(--shadow-deep)] sm:rounded-[var(--radius-card)]"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{
              duration: 0.32,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
          >
            {/* Sunrise header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--sun-orange), var(--sun-amber) 55%, var(--sun-gold))",
              }}
            >
              <Logo kind="mark" variant="white" className="h-9" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/15"
              >
                <CloseIcon className="text-[1.2rem]" />
              </button>
            </div>

            {sent ? (
              <div className="px-6 py-10 text-center">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-sun-gold/30 text-[1.6rem] text-sun-orange">
                  <CheckIcon />
                </div>
                <h2
                  id="contact-title"
                  className="text-[1.6rem] font-semibold text-navy"
                >
                  You're on the list.
                </h2>
                <p className="mx-auto mt-2 max-w-sm text-ink/75">
                  Thanks — we'll reach out shortly to set up your free call and
                  map out your free trial. No cost, no pressure.
                </p>
                <div className="mt-6">
                  <Button variant="navy" onClick={onClose}>
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-6">
                <h2
                  id="contact-title"
                  className="text-[1.55rem] font-semibold leading-tight text-navy"
                >
                  Start your free trial.
                </h2>
                <p className="mt-1.5 text-[0.95rem] text-ink/70">
                  Tell us a little about your business and we'll set up a free
                  call. You only pay once you see it working.
                </p>

                <div className="mt-5 grid gap-4">
                  <div>
                    <label
                      htmlFor="c-name"
                      className="mb-1.5 block text-sm font-medium text-navy"
                    >
                      Your name
                    </label>
                    <input
                      id="c-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Jane Rivera"
                      className={FIELD}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="c-business"
                      className="mb-1.5 block text-sm font-medium text-navy"
                    >
                      Business name
                    </label>
                    <input
                      id="c-business"
                      name="business"
                      type="text"
                      placeholder="Rivera Roofing"
                      className={FIELD}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="c-contact"
                      className="mb-1.5 block text-sm font-medium text-navy"
                    >
                      Best phone or email
                    </label>
                    <input
                      id="c-contact"
                      name="contact"
                      type="text"
                      required
                      placeholder="(831) 555-0192 or jane@…"
                      className={FIELD}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="c-help"
                      className="mb-1.5 block text-sm font-medium text-navy"
                    >
                      What do you want help with?
                    </label>
                    <textarea
                      id="c-help"
                      name="help"
                      rows={3}
                      placeholder="More calls, more local customers, getting our name out there…"
                      className={`${FIELD} resize-none`}
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Button type="submit" size="lg" className="w-full">
                    Request my free call
                  </Button>
                  <p className="text-center text-xs text-ink/55">
                    Free trial · no upfront cost · cancel anytime.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
