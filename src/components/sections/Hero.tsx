import { Fragment, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { Sun } from "../motion/Sun";
import { WaveLayer } from "../motion/WaveLayer";
import type { Wave } from "../motion/WaveLayer";
import { Gull } from "../motion/Gull";
import { Clouds } from "../motion/Clouds";
import { Eyebrow } from "../ui/Eyebrow";
import { Button } from "../ui/Button";
import { Reveal, RevealItem } from "../ui/Reveal";
import { PlayIcon, ArrowDownIcon } from "../ui/icons";
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

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Frontmost wave is fully opaque sea-mid so the hero's bottom edge fuses
// seamlessly into the Problem section (which starts at the same color).
const HERO_WAVES: Wave[] = [
  { color: "var(--sea-azure)", opacity: 0.5, duration: 28, amplitude: 22, baseline: 64 },
  { color: "var(--sea-blue)", opacity: 0.75, duration: 20, amplitude: 28, baseline: 98 },
  { color: "var(--sea-mid)", opacity: 1, duration: 14, amplitude: 32, baseline: 132 },
];

const TITLE_WORDS = ["We", "get", "your", "business", "seen,", "booked,", "and"];

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
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const titleContainer: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduced ? 0 : 0.055, delayChildren: 0.12 },
    },
  };
  const titleWord: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { y: "115%" },
        show: { y: "0%", transition: { duration: 0.6, ease: EASE } },
      };

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
      {/* Drifting pre-dawn clouds */}
      <Clouds className="-z-10" />

      {/* Sun on the horizon (parallax) */}
      <motion.div
        className="absolute left-1/2 top-[46%] -z-10 -translate-x-1/2 sm:left-[62%]"
        style={reduced ? undefined : { y: sunY }}
      >
        <Sun className="relative" size={520} />
      </motion.div>

      {/* A small flock at different depths */}
      <Gull className="left-0 top-[20%] -z-10" duration={26} repeatDelay={8} />
      <Gull className="left-0 top-[13%] -z-10" duration={34} repeatDelay={14} delay={6} scale={0.7} />
      <Gull className="left-0 top-[29%] -z-10" duration={30} repeatDelay={11} delay={13} scale={0.5} />

      {/* Ocean + layered waves */}
      <WaveLayer className="-z-10 h-[34vh] min-h-[220px]" waves={HERO_WAVES} />

      {/* Sun glitter — the reflection shimmering on the water */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -z-10 h-[26vh] w-24 -translate-x-1/2 sm:left-[62%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(248,217,138,0.9), rgba(246,198,114,0.35) 55%, rgba(246,198,114,0))",
          clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)",
          filter: "blur(6px)",
          mixBlendMode: "screen",
          animation: reduced ? undefined : "glitter-pulse 5s ease-in-out infinite",
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 pt-28 pb-32 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24 lg:pb-28">
        {/* Copy */}
        <motion.div style={reduced ? undefined : { y: copyY }}>
          <Reveal stagger>
            <RevealItem>
              <Eyebrow className="text-sea-mid">
                Marketing &amp; content — Aptos, California
              </Eyebrow>
            </RevealItem>

            <motion.h1
              className="mt-5 text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-navy"
              variants={titleContainer}
              initial="hidden"
              animate="show"
            >
              {TITLE_WORDS.map((w) => (
                <Fragment key={w}>
                  <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                    <motion.span
                      className="inline-block will-change-transform"
                      variants={titleWord}
                    >
                      {w}
                    </motion.span>
                  </span>{" "}
                </Fragment>
              ))}
              <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                <motion.span
                  className="text-sun-gradient inline-block will-change-transform"
                  variants={titleWord}
                >
                  growing.
                </motion.span>
              </span>
            </motion.h1>

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

      {/* Scroll cue — fades as soon as you start moving */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        style={{ opacity: cueOpacity }}
        aria-hidden="true"
      >
        <div
          className="grid h-11 w-11 place-items-center rounded-full border border-white/50 bg-white/10 text-[1.1rem] text-white/90 backdrop-blur-sm"
          style={{ animation: reduced ? undefined : "soft-bob 2.6s ease-in-out infinite" }}
        >
          <ArrowDownIcon />
        </div>
      </motion.div>
    </section>
  );
}

function PhoneDemo() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(HERO_VIDEO);

  return (
    <div
      className="relative w-[clamp(230px,72vw,310px)]"
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

/* ----- Tiny social-UI glyphs for the reel mock (decorative only) ----- */
const glyph = {
  fill: "none",
  stroke: "white",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ReelActions() {
  return (
    <div
      className="absolute bottom-20 right-2.5 z-10 flex flex-col items-center gap-4 drop-shadow-[0_1px_3px_rgba(10,22,34,0.5)]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M12 20.5S5.2 16.2 2.9 12C1.2 8.9 3 5.2 6.4 5.2c2.1 0 3.5 1.1 4.6 2.7h2c1.1-1.6 2.5-2.7 4.6-2.7 3.4 0 5.2 3.7 3.5 6.8C18.8 16.2 12 20.5 12 20.5z"
          {...glyph}
        />
      </svg>
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M21 11.5a8 8 0 0 1-11.6 7.2L4 20l1.3-4.1A8 8 0 1 1 21 11.5z"
          {...glyph}
        />
      </svg>
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path d="M21.5 3 11 13M21.5 3l-6.8 17.5L11 13 3.5 9.8z" {...glyph} />
      </svg>
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M7 4h10v16l-5-3.6L7 20z" {...glyph} />
      </svg>
    </div>
  );
}

/** On-brand reel mock shown until the real vertical video is wired up. */
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
        className="absolute left-1/2 top-[44%] h-24 w-24 -translate-x-1/2 rounded-full"
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
        <path d="M0 88 Q75 70 150 88 T300 88 V120 H0 Z" fill="var(--navy)" />
      </svg>

      {/* reel progress bar */}
      <div className="absolute inset-x-3 top-2.5 z-10 h-[3px] overflow-hidden rounded-full bg-white/30" aria-hidden="true">
        <div className="h-full w-2/3 rounded-full bg-white/90" />
      </div>

      {/* side action stack */}
      <ReelActions />

      {/* screen sheen */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(115deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 28%)",
        }}
        aria-hidden="true"
      />

      {/* play affordance */}
      {onPlay ? (
        <button
          type="button"
          onClick={onPlay}
          aria-label="Play demo reel"
          className="group absolute inset-0 z-10 grid place-items-center"
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

      {/* caption block */}
      <div className="absolute inset-x-0 bottom-0 z-[5] p-4 pr-14">
        <div
          className="pointer-events-none absolute inset-0 -top-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,22,34,0) 0%, rgba(10,22,34,0.45) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <p className="text-[0.78rem] font-semibold text-white">
            @highgroundagency
          </p>
          <p className="mt-0.5 text-[0.72rem] leading-snug text-white/85">
            {/* TODO(Gabriel): real demo reel goes here */}
            Your next ad — shot, cut &amp; posted by us
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-white/70">
            <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true">
              <path d="M9 18V6l9-2v11" {...glyph} />
              <circle cx="6.5" cy="18" r="2.5" {...glyph} />
              <circle cx="15.5" cy="15" r="2.5" {...glyph} />
            </svg>
            High Ground · original audio
          </p>
        </div>
      </div>
    </div>
  );
}
