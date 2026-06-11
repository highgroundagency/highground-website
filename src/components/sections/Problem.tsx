import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal, RevealItem } from "../ui/Reveal";
import { SectionDivider } from "../ui/SectionDivider";
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
      className="relative isolate flex min-h-[96svh] items-center overflow-hidden py-[clamp(5rem,12vh,9rem)]"
      style={{
        // Starts at the exact color of the hero's frontmost wave, then sinks —
        // scrolling out of the hero literally reads as going underwater.
        backgroundImage:
          "linear-gradient(180deg, var(--sea-mid) 0%, var(--deep-sea) 16%, var(--abyss) 62%, #0a1622 100%)",
        marginTop: -1,
      }}
    >
      {/* water surface — bright line + caustic shimmer just below the waves */}
      <div
        className="absolute inset-x-0 top-0 h-28"
        style={{
          background:
            "linear-gradient(180deg, rgba(160,220,240,0.35), rgba(120,200,230,0.12) 36%, rgba(120,200,230,0) 100%)",
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
      <Bubbles count={22} className="-z-10" />

      {/* the wreck */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-6 -z-10 flex justify-center sm:bottom-2"
        style={reduced ? undefined : { y: shipY }}
        aria-hidden="true"
      >
        <CementShip />
      </motion.div>

      {/* dawn breaking on the horizon — warms the transition out */}
      <div
        className="absolute inset-x-0 bottom-0 h-44"
        style={{
          background:
            "radial-gradient(60% 130% at 50% 100%, rgba(232,116,58,0.26), rgba(232,116,58,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal stagger className="max-w-2xl">
          <RevealItem>
            <Eyebrow className="text-sea-azure">01 — The problem</Eyebrow>
          </RevealItem>
          <RevealItem>
            <h2
              id="problem-title"
              className="mt-5 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] text-white"
            >
              Right now, your marketing is{" "}
              <em className="text-sun-pale">the Cement Ship.</em>
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
          <p className="font-display text-[clamp(1.25rem,2.4vw,1.7rem)] font-medium leading-snug text-white">
            It doesn't have to stay stuck. High Ground is the crew that gets you
            off the wreck — and up to{" "}
            <span className="text-sun-gold">higher ground.</span>
          </p>
        </Reveal>

        {/* breathing room above the divider */}
        <div className="h-16 sm:h-24" aria-hidden="true" />
      </div>

      {/* surfacing into the dawn — hands off to Services */}
      <SectionDivider color="#e7eef2" />
    </section>
  );
}

/**
 * The SS Palo Alto as it actually sits at Seacliff: broken in two, the stern
 * settled lower in the swell, birds roosting on the bow. Gently rocking.
 */
function CementShip() {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 760 300"
      preserveAspectRatio="xMidYMax meet"
      className="h-[clamp(220px,42vh,440px)] w-full max-w-5xl opacity-95"
      style={{ transformOrigin: "50% 78%" }}
      animate={reduced ? undefined : { rotate: [-0.6, 0.6, -0.6] }}
      transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c3c55" />
          <stop offset="1" stopColor="#091625" />
        </linearGradient>
        <linearGradient id="hull-dim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#152e42" />
          <stop offset="1" stopColor="#081320" />
        </linearGradient>
      </defs>

      {/* STERN HALF — listing, settled deeper */}
      <g transform="rotate(3.5 215 205)">
        <path
          d="M70 206 Q76 186 124 182 L330 170 L340 180 L330 192 L344 202 L352 216
             Q300 240 196 242 Q108 242 70 206 Z"
          fill="url(#hull-dim)"
          stroke="rgba(120,200,230,0.22)"
          strokeWidth="1.4"
        />
        {/* deck line */}
        <path
          d="M126 184 L328 172"
          stroke="rgba(120,200,230,0.14)"
          strokeWidth="2"
          fill="none"
        />
        {/* stub of the aft mast */}
        <path
          d="M170 182 L168 160"
          stroke="#12283c"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>

      {/* BOW HALF — riding higher, tilted up out of the surf */}
      <g transform="rotate(-7 540 200)">
        <path
          d="M392 206 L380 190 L392 180 L382 168 L396 160 L640 140
             Q702 136 728 162 L738 192 Q694 228 545 232 Q446 234 392 206 Z"
          fill="url(#hull)"
          stroke="rgba(120,200,230,0.28)"
          strokeWidth="1.5"
        />
        {/* deck line */}
        <path
          d="M398 162 L636 143"
          stroke="rgba(120,200,230,0.18)"
          strokeWidth="2"
          fill="none"
        />
        {/* bridge / superstructure */}
        <path
          d="M560 158 L632 152 L632 118 L566 124 Z"
          fill="#13314a"
          stroke="rgba(120,200,230,0.2)"
          strokeWidth="1.2"
        />
        {/* funnel + mast */}
        <path
          d="M588 122 L588 100"
          stroke="#13314a"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M664 142 L662 108"
          stroke="#13314a"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* birds roosting on the bow — like the real wreck */}
        <g
          stroke="rgba(185,210,225,0.7)"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        >
          <path d="M700 128 q5 -5 10 0 q5 -5 10 0" />
          <path d="M672 104 q4 -4 8 0 q4 -4 8 0" />
          <path d="M640 134 q4 -4 8 0 q4 -4 8 0" />
          <path d="M594 96 q4 -4 8 0 q4 -4 8 0" />
        </g>
      </g>

      {/* surf line swallowing both hulls */}
      <path
        d="M0 238 Q95 226 190 236 T380 238 T570 234 T760 238 L760 300 L0 300 Z"
        fill="#081522"
        opacity="0.94"
      />
      {/* faint foam where the wreck meets the water */}
      <path
        d="M70 236 Q200 228 350 235 T700 233"
        stroke="rgba(150,205,225,0.18)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}
