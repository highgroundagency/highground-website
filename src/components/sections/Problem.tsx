import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal, RevealItem } from "../ui/Reveal";
import { LightRays } from "../motion/LightRays";
import { Bubbles } from "../motion/Bubbles";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const PAINS = [
  "A website nobody can find.",
  "Posts nobody sees.",
  "Ads that drain cash and bring tire-kickers.",
  "No captain. No crew. No direction.",
];

export function Problem() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const shipY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const raysY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      ref={ref}
      id="problem"
      data-section-theme="dark"
      aria-labelledby="problem-title"
      className="relative isolate overflow-hidden py-[clamp(5rem,12vh,9rem)]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, var(--deep-sea) 0%, var(--abyss) 60%, #0a1622 100%)",
      }}
    >
      {/* caustic shimmer at the surface */}
      <div
        className="absolute inset-x-0 top-0 h-24"
        style={{
          background:
            "linear-gradient(180deg, rgba(120,200,230,0.18), rgba(120,200,230,0) 100%)",
          animation: reduced ? undefined : "ray-shimmer 9s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* god-rays + bubbles */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduced ? undefined : { y: raysY }}
      >
        <LightRays />
      </motion.div>
      <Bubbles count={20} className="-z-10" />

      {/* the wreck */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex justify-center"
        style={reduced ? undefined : { y: shipY }}
        aria-hidden="true"
      >
        <CementShip />
      </motion.div>

      {/* dawn breaking on the horizon — warms the transition out */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "radial-gradient(60% 120% at 50% 100%, rgba(232,116,58,0.22), rgba(232,116,58,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal stagger className="max-w-2xl">
          <RevealItem>
            <Eyebrow className="text-sea-azure">01 — The problem</Eyebrow>
          </RevealItem>
          <RevealItem>
            <h2
              id="problem-title"
              className="mt-5 text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05] text-white"
            >
              Right now, your marketing is{" "}
              <span className="italic text-sun-pale">the Cement Ship.</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-6 text-[1.125rem] leading-relaxed text-white/75">
              Just down the coast at Seacliff, a once-grand ship sits half-sunk
              in the surf — full of promise, going nowhere. That's what most
              small-business marketing looks like:
            </p>
          </RevealItem>
        </Reveal>

        <Reveal stagger className="mt-8 grid max-w-2xl gap-x-8 gap-y-4 sm:grid-cols-2">
          {PAINS.map((p) => (
            <RevealItem key={p}>
              <div className="flex items-start gap-3">
                <span
                  className="mt-2.5 h-px w-6 shrink-0 bg-sea-azure/70"
                  aria-hidden="true"
                />
                <p className="text-[1.05rem] text-white/80">{p}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="mt-12 max-w-2xl">
          <p className="text-[clamp(1.25rem,2.4vw,1.7rem)] font-display font-medium leading-snug text-white">
            It doesn't have to stay stuck. High Ground is the crew that gets you
            off the wreck — and up to{" "}
            <span className="text-sun-gold">higher ground.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** Half-sunk SS Palo Alto, tilted, with birds roosting on the highest point. */
function CementShip() {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 640 260"
      preserveAspectRatio="xMidYMax meet"
      className="h-[clamp(220px,40vh,420px)] w-full max-w-5xl opacity-95"
      style={{ transformOrigin: "50% 80%" }}
      animate={reduced ? undefined : { rotate: [-1, 1, -1] }}
      transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a3a52" />
          <stop offset="1" stopColor="#091625" />
        </linearGradient>
      </defs>

      <g transform="rotate(-6 320 150)">
        {/* hull */}
        <path
          d="M30 148 Q34 126 96 124 L486 100 Q560 96 600 124 L612 150 Q560 198 300 202 Q90 205 30 148 Z"
          fill="url(#hull)"
          stroke="rgba(120,200,230,0.28)"
          strokeWidth="1.5"
        />
        {/* deck shadow line */}
        <path
          d="M104 126 L486 103"
          stroke="rgba(120,200,230,0.16)"
          strokeWidth="2"
          fill="none"
        />
        {/* superstructure / bridge */}
        <path
          d="M356 108 L420 104 L420 78 L360 82 Z"
          fill="#13314a"
          stroke="rgba(120,200,230,0.2)"
          strokeWidth="1.2"
        />
        {/* mast */}
        <path d="M392 80 L390 56" stroke="#13314a" strokeWidth="3" strokeLinecap="round" />
        {/* crack at the stern */}
        <path
          d="M150 122 L142 150 L156 168 L148 186"
          stroke="#071019"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* birds roosting on the highest point */}
        <g stroke="rgba(180,205,220,0.65)" strokeWidth="1.6" fill="none" strokeLinecap="round">
          <path d="M498 92 q5 -5 10 0 q5 -5 10 0" />
          <path d="M526 88 q4 -4 8 0 q4 -4 8 0" />
          <path d="M474 95 q4 -4 8 0 q4 -4 8 0" />
        </g>
      </g>

      {/* water shadow swallowing the lower hull */}
      <rect
        x="0"
        y="196"
        width="640"
        height="64"
        fill="#070f18"
        opacity="0.85"
      />
    </motion.svg>
  );
}
