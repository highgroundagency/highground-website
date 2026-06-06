import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sun } from "../motion/Sun";
import { WaveLayer } from "../motion/WaveLayer";
import { Gull } from "../motion/Gull";
import { Eyebrow } from "../ui/Eyebrow";
import { Button } from "../ui/Button";
import { Reveal, RevealItem } from "../ui/Reveal";
import { PlayIcon } from "../ui/icons";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useContact } from "../ContactModal";

/*
 * TODO(Gabriel): drop the vertical demo reel + poster into src/assets and set
 * these. When `HERO_VIDEO` is set, the phone's play button lazy-loads and
 * plays it (poster shows until then). Until both exist we show an on-brand
 * placeholder scene so nothing looks broken.
 *   import heroVideo from "../../assets/hero-demo.mp4";
 *   import heroPoster from "../../assets/hero-poster.jpg";
 */
const HERO_VIDEO: string | undefined = undefined;
const HERO_POSTER: string | undefined = undefined;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { open: openContact } = useContact();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Sun lags behind the foreground as you scroll away (parallax).
  const sunY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="High Ground Agency — get seen, booked, and growing"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(180deg, var(--sky-top) 0%, var(--sky-high) 34%, var(--sky-mid) 66%, var(--sky-low) 100%)",
      }}
    >
      {/* Sun on the horizon (parallax) */}
      <motion.div
        className="absolute left-1/2 top-[46%] -z-10 -translate-x-1/2 sm:left-[62%]"
        style={reduced ? undefined : { y: sunY }}
      >
        <Sun className="relative" size={520} />
      </motion.div>

      {/* Gliding gull */}
      <Gull className="left-0 top-[22%] -z-10" />

      {/* Ocean + layered waves */}
      <WaveLayer className="-z-10 h-[34vh] min-h-[220px]" />
      {/* Soft fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent to-cream/70" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 pt-28 pb-32 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24 lg:pb-24">
        {/* Copy */}
        <motion.div style={reduced ? undefined : { y: copyY }}>
          <Reveal stagger>
            <RevealItem>
              <Eyebrow className="text-sea-mid">
                Marketing &amp; content — Aptos, California
              </Eyebrow>
            </RevealItem>

            <RevealItem>
              <h1 className="mt-5 text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-navy">
                We get your business seen, booked, and{" "}
                <span className="text-sun-gradient">growing.</span>
              </h1>
            </RevealItem>

            <RevealItem>
              <p className="mt-6 max-w-xl text-[1.125rem] leading-relaxed text-ink/80">
                From the first script to the final ad, High Ground films it,
                edits it, posts it, and runs the ads that bring you real
                customers. Start with a low-cost trial and see it work for
                yourself before you commit.
              </p>
            </RevealItem>

            <RevealItem>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button size="lg" onClick={openContact}>
                  Get started
                </Button>
                <Button size="lg" variant="ghost" href="#how">
                  See how it works
                </Button>
              </div>
            </RevealItem>
          </Reveal>
        </motion.div>

        {/* Phone-framed demo reel */}
        <Reveal delay={0.35} className="flex justify-center lg:justify-end">
          <PhoneDemo />
        </Reveal>
      </div>
    </section>
  );
}

function PhoneDemo() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(HERO_VIDEO);

  return (
    <div
      className="relative w-[clamp(220px,72vw,300px)]"
      style={
        reduced ? undefined : { animation: "soft-bob 7s ease-in-out infinite" }
      }
    >
      {/* glow behind the phone */}
      <div
        className="absolute -inset-6 -z-10 rounded-[3rem] blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(246,198,114,0.55), rgba(246,198,114,0) 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative aspect-[9/19] rounded-[2.5rem] border-[7px] border-navy bg-navy shadow-[var(--shadow-sun-lg)]">
        {/* notch */}
        <div className="absolute left-1/2 top-2 z-20 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/30" />

        <div className="absolute inset-0 m-[3px] overflow-hidden rounded-[2.1rem]">
          {hasVideo && playing ? (
            // Lazy: the <video> only mounts on play (load on interaction).
            <video
              className="h-full w-full object-cover"
              src={HERO_VIDEO}
              poster={HERO_POSTER}
              autoPlay
              muted
              playsInline
              controls
            />
          ) : (
            <PosterScene onPlay={hasVideo ? () => setPlaying(true) : undefined} />
          )}
        </div>
      </div>
    </div>
  );
}

/** On-brand placeholder scene shown until the real reel is wired up. */
function PosterScene({ onPlay }: { onPlay?: () => void }) {
  return (
    <div
      className="relative h-full w-full"
      style={{
        backgroundImage:
          "linear-gradient(180deg, var(--sky-top) 0%, var(--sky-high) 28%, var(--sun-amber) 72%, var(--sun-gold) 100%)",
      }}
    >
      {/* mini sun */}
      <div
        className="absolute left-1/2 top-[46%] h-24 w-24 -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, var(--sun-pale), var(--sun-gold) 55%, var(--sun-orange) 100%)",
          boxShadow: "0 0 50px 8px rgba(244,162,79,0.5)",
        }}
        aria-hidden="true"
      />
      {/* wave silhouette */}
      <svg
        className="absolute inset-x-0 bottom-0"
        viewBox="0 0 300 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 70 Q75 50 150 70 T300 70 V120 H0 Z"
          fill="var(--sea-blue)"
          opacity="0.85"
        />
        <path
          d="M0 88 Q75 70 150 88 T300 88 V120 H0 Z"
          fill="var(--navy)"
        />
      </svg>

      {/* play affordance */}
      {onPlay ? (
        <button
          type="button"
          onClick={onPlay}
          aria-label="Play demo reel"
          className="group absolute inset-0 grid place-items-center"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-[1.6rem] text-navy shadow-lg transition-transform group-hover:scale-105">
            <PlayIcon />
          </span>
        </button>
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <span
            className="grid h-16 w-16 place-items-center rounded-full bg-white/85 text-[1.6rem] text-navy/80 shadow-lg"
            aria-hidden="true"
          >
            <PlayIcon />
          </span>
        </div>
      )}

      {/* caption */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/85">
          {/* TODO(Gabriel): real demo reel goes here */}
          Your business, on camera
        </p>
      </div>
    </div>
  );
}
