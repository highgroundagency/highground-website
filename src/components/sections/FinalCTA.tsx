import { Reveal, RevealItem } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { WaveLayer } from "../motion/WaveLayer";
import { Gull } from "../motion/Gull";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useContact } from "../ContactModal";

export function FinalCTA() {
  const reduced = useReducedMotion();
  const { open: openContact } = useContact();

  return (
    <section
      id="contact"
      aria-labelledby="cta-title"
      className="relative isolate flex min-h-[88svh] items-center overflow-hidden py-[clamp(5rem,12vh,9rem)]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, var(--sun-pale) 0%, var(--sun-gold) 40%, var(--sun-amber) 74%, var(--sun-orange) 100%)",
      }}
    >
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

      {/* a gull cresting the light */}
      <Gull className="left-0 top-[26%] -z-10" duration={26} repeatDelay={9} />

      {/* calm ocean at the base */}
      <WaveLayer className="-z-10 h-[26vh] min-h-[180px]" />

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
              business — free trial included.
            </p>
          </RevealItem>
          <RevealItem>
            <div className="mt-9 flex flex-col items-center gap-4">
              <Button size="lg" variant="navy" onClick={openContact}>
                Book your free call
              </Button>
              <p className="font-mono text-[0.78rem] uppercase tracking-[0.14em] text-navy/65">
                Free trial · no upfront cost · cancel anytime
              </p>
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
