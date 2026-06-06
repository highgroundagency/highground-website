export type Step = {
  n: string;
  title: string;
  blurb: string;
  note?: string;
};

/**
 * The real path (brief §7.5, updated): the strategy call is free, the trial is
 * a low-cost paid run so they can see it work, then they continue at the
 * regular rate if they like it. No "free trial" fiction.
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
    title: "Your trial run",
    blurb:
      "We script, shoot, and run real ads for your business so you can see it work — live, on your own audience.",
    note: "$400 to start + the ad spend you choose.",
  },
  {
    n: "03",
    title: "You continue",
    blurb:
      "Love the results? Keep going at our regular monthly rate. If it's not for you, you walk away.",
  },
];
