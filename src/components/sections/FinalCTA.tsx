import { Reveal, RevealItem } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { SectionDivider } from "../ui/SectionDivider";
import { WaveLayer } from "../motion/WaveLayer";
import type { Wave } from "../motion/WaveLayer";
import { Gull } from "../motion/Gull";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useContact } from "../ContactModal";

// Front wave lands on deep-sea — the exact footer color — so the page flows
// straight from the golden summit down into the footer with no seam.
const CTA_WAVES: Wave[] = [
  { color: "var(--sea-azure)", opacity: 0.45, duration: 28, amplitude: 22, baseline: 64 },
  { color: "var(--sea-blue)", opacity: 0.7, duration: 20, amplitude: 28, baseline: 98 },
  { color: "var(--deep-sea)", opacity: 1, duration: 14, amplitude: 32, baseline: 132 },
];

export function FinalCTA() {
  const reduced = useReducedMotion();
  const { open: openContact } = useContact();

  return (
    <section
      id="contact"
      aria-labelledby="cta-title"
      className="relative isolate flex min-h-[88svh] items-center overflow-hidden py-[clamp(6rem,14vh,10rem)]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, var(--sun-pale) 0%, var(--sun-gold) 40%, var(--sun-amber) 74%, var(--sun-orange) 100%)",
      }}
    >
      {/* cream waves dipping in from the Team section above */}
      <SectionDivider color="var(--cream)" flip />

      {/* slow-turning sun rays behind everything */}
      <div
        className="pointer-events-none absolute left-1/2 top-[30%] -z-10 h-[150vmin] w-[150vmin] -translate-x-1/2 -translate-y-1/2 opacity-35"
        style={{
          background:
            "repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.5) 0deg 5deg, rgba(255,255,255,0) 5deg 17deg)",
          maskImage:
            "radial-gradient(closest-side, black 0%, rgba(0,0,0,0.4) 45%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(closest-side, black 0%, rgba(0,0,0,0.4) 45%, transparent 72%)",
          animation: reduced ? undefined : "ray-spin 90s linear infinite",
        }}
        aria-hidden="true"
      />

      {/* fully-risen sun glow behind the headline */}
      <div
        className="pointer-events-none absolute left-1/2 top-[14%] -z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <div
          className="h-72 w-72 rounded-full sm:h-96 sm:w-96"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, var(--sun-pale), var(--sun-gold) 42%, rgba(244,162,79,0) 72%)",
            animation: reduced ? undefined : "sun-glow 6s ease-in-out infinite",
          }}
        />
      </div>

      {/* gulls cresting the light */}
      <Gull className="left-0 top-[24%] -z-10" duration={26} repeatDelay={9} />
      <Gull className="left-0 top-[16%] -z-10" duration={32} repeatDelay={13} delay={7} scale={0.6} />

      {/* calm ocean at the base */}
      <WaveLayer className="-z-10 h-[26vh] min-h-[180px]" waves={CTA_WAVES} />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal stagger>
          <RevealItem>
            <p className="eyebrow text-navy/70">High ground is waiting</p>
          </RevealItem>
          <RevealItem>
            <h2
              id="cta-title"
              className="mt-5 text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.01em] text-navy"
            >
              The sun's coming up. Let's get your name out there.
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mx-auto mt-6 max-w-xl text-[1.15rem] leading-relaxed text-navy/80">
              Book a free call and we'll show you exactly how we'd grow your
              business — and what your first month looks like.
            </p>
          </RevealItem>
          <RevealItem>
            <div className="mt-9 flex justify-center">
              <Button size="lg" variant="navy" onClick={openContact}>
                Book your free call
              </Button>
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
