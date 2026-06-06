export type ExpectationIcon = "clock" | "content" | "wallet";

export type Expectation = {
  icon: ExpectationIcon;
  title: string;
  blurb: string;
};

/**
 * What we need from the client for this to actually work. Honest, up-front
 * qualification — we're a lead generator, not magic.
 */
export const expectations: Expectation[] = [
  {
    icon: "clock",
    title: "Call your leads in 5 minutes",
    blurb:
      "When a lead comes in, it's hot — they just watched your ad and filled out the form. Dial them back within five minutes and they're up to 8× more likely to book. Not just answer the phone — you call them.",
  },
  {
    icon: "content",
    title: "About a day a month to film",
    blurb:
      "We shoot fresh ads roughly once a month so your content never goes stale. You bring yourself — we bring the cameras, the script, and the edit.",
  },
  {
    icon: "wallet",
    title: "A budget to start",
    blurb:
      "$400 to run your trial, plus whatever ad spend you want to put behind it. That's what gets your name in front of real local buyers.",
  },
];
