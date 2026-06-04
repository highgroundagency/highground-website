import { Eyebrow } from "../ui/Eyebrow";
import { Card } from "../ui/Card";
import { Reveal, RevealItem } from "../ui/Reveal";

/*
 * TODO(Gabriel): replace these placeholders with real client quotes (and real
 * names + business names, with permission). Keep them qualitative — no
 * fabricated lead/revenue numbers (brief §2 / §7.6).
 */
const TESTIMONIALS = [
  {
    quote:
      "We went from invisible to booked out. The phone actually rings now — and it's real local customers, not tire-kickers.",
    attribution: "Owner, Roofing & Exteriors",
    location: "Aptos, CA",
  },
  {
    quote:
      "They handled everything — filming, posting, the ads. I just kept doing the work. It's like having a marketing department without the headache.",
    attribution: "Owner, Home Services",
    location: "Santa Cruz, CA",
  },
  {
    quote:
      "I was skeptical after burning money on another agency. The free trial sold me — I saw it working before I paid a thing.",
    attribution: "Realtor",
    location: "Capitola, CA",
  },
];

// Qualitative outcomes only — what "working" looks like (no numbers).
const OUTCOMES = ["More calls", "More reach", "More booked jobs", "Less guesswork"];

const TOWNS = ["Aptos", "Santa Cruz", "Capitola", "Watsonville", "Monterey"];

export function Proof() {
  return (
    <section
      id="work"
      aria-labelledby="proof-title"
      className="relative overflow-hidden bg-sand py-[clamp(5rem,12vh,9rem)]"
    >
      {/* faint morning glow */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(246,198,114,0.5), rgba(246,198,114,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal stagger className="max-w-2xl">
          <RevealItem>
            <Eyebrow className="text-sun-orange">04 — The proof</Eyebrow>
          </RevealItem>
          <RevealItem>
            <h2
              id="proof-title"
              className="mt-5 text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05] text-navy"
            >
              Local businesses, finally getting found.
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-5 max-w-xl text-[1.1rem] leading-relaxed text-ink/75">
              We're a small Central Coast crew that does the whole job. Here's
              what it looks like when the marketing finally starts pulling its
              weight.
            </p>
          </RevealItem>
        </Reveal>

        {/* Testimonials */}
        <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <RevealItem key={t.attribution + t.location} className="h-full">
              <Card className="flex h-full flex-col">
                <span
                  className="font-display text-5xl leading-none text-sun-amber"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-1 flex-1 text-[1.05rem] leading-relaxed text-ink/85">
                  {t.quote}
                </blockquote>
                <footer className="mt-5 border-t border-line pt-4">
                  <p className="font-semibold text-navy">{t.attribution}</p>
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-sea-mid">
                    {t.location}
                  </p>
                </footer>
              </Card>
            </RevealItem>
          ))}
        </Reveal>

        {/* Outcomes strip */}
        <Reveal stagger className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {OUTCOMES.map((o) => (
            <RevealItem key={o}>
              <div className="rounded-[var(--radius-card)] border border-line bg-white/60 px-5 py-6 text-center">
                <p className="font-mono text-[1.05rem] font-bold uppercase tracking-[0.04em] text-navy">
                  {o}
                </p>
              </div>
            </RevealItem>
          ))}
        </Reveal>

        {/* Local trust line */}
        <Reveal className="mt-12 text-center">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-sea-mid">
            Trusted by local businesses across the Central Coast
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-ink/55">
            {TOWNS.map((town, i) => (
              <span key={town} className="flex items-center gap-3">
                <span className="font-display text-[1.05rem]">{town}</span>
                {i < TOWNS.length - 1 && (
                  <span className="text-sun-amber" aria-hidden="true">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
