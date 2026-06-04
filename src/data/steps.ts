export type Step = {
  n: string;
  title: string;
  blurb: string;
  note?: string;
};

/**
 * The free-trial path — risk reversal made simple (brief §7.5).
 * No numbers, no price: you only pay once you see it working.
 */
export const steps: Step[] = [
  {
    n: "01",
    title: "Free strategy call",
    blurb: "We learn your business and map out a plan to get you seen.",
    note: "15 minutes, no pressure.",
  },
  {
    n: "02",
    title: "Free trial",
    blurb: "We produce and run real work for you — on us. You see it live.",
  },
  {
    n: "03",
    title: "You decide",
    blurb:
      "Keep going at a low monthly fee only if you love the results. That's it.",
  },
];
