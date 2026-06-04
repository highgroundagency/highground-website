import { Logo } from "../Logo";
import { InstagramIcon } from "../ui/icons";
import { useContact } from "../ContactModal";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
];

export function Footer() {
  const { open: openContact } = useContact();

  return (
    <footer
      data-section-theme="dark"
      className="relative bg-deep-sea text-white/85"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Identity */}
          <div>
            <Logo variant="white" className="text-[1.15rem]" />
            <p className="mt-5 max-w-xs text-[0.98rem] leading-relaxed text-white/70">
              We get local businesses seen, booked, and growing — the whole
              pipeline, from the first script to the ads that bring real
              customers.
            </p>
            <p className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-white/55">
              High Ground Agency — Aptos · Santa Cruz County, California.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-sun-gold">
              Explore
            </h2>
            <ul className="mt-4 space-y-3 text-[0.98rem]">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/75 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openContact}
                  className="text-sun-gold transition-colors hover:text-sun-pale"
                >
                  Start free
                </button>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-sun-gold">
              Say hello
            </h2>
            <ul className="mt-4 space-y-3 text-[0.98rem]">
              <li>
                {/* TODO(Gabriel): replace with the real inbox. */}
                <a
                  href="mailto:hello@highgroundagency.com"
                  className="text-white/75 transition-colors hover:text-white"
                >
                  hello@highgroundagency.com
                </a>
              </li>
              <li>
                {/* TODO(Gabriel): replace with the real phone number. */}
                <a
                  href="tel:+10000000000"
                  className="text-white/75 transition-colors hover:text-white"
                >
                  Call or text us
                </a>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-3">
              {/* TODO(Gabriel): point this at the real Instagram handle. */}
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="High Ground Agency on Instagram"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-[1.25rem] text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-[0.85rem] text-white/55 sm:flex-row sm:items-center">
          <p>© 2026 High Ground Agency. All rights reserved.</p>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em]">
            Based in California · Serving the Central Coast
          </p>
        </div>
      </div>
    </footer>
  );
}
