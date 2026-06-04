export type Faq = {
  q: string;
  a: string;
};

/**
 * Last-objection answers shown with the free-trial steps. Every answer
 * stays on-message: risk reversal, no price, no fabricated guarantees
 * (brief §2). Keep the voice owner-to-owner.
 */
export const faqs: Faq[] = [
  {
    q: "How does the free trial actually work?",
    a: "We start with a quick strategy call, then produce and run real work for you — on us. You only continue at a low monthly fee if you're happy with what you see.",
  },
  {
    q: "Do I have to sign a long contract?",
    a: "No. There's no big upfront cost and no long lock-in. If it's not right for you, you walk away — no cost, no hard feelings.",
  },
  {
    q: "I've never done marketing before. Is that a problem?",
    a: "That's exactly who we build for. You don't lift a finger — we handle strategy, filming, editing, posting, and the ads. You keep doing what you do best.",
  },
  {
    q: "What kind of businesses do you work with?",
    a: "Local and small-to-mid businesses around the Central Coast — home services, real estate, trades, and the shops that want more customers without the headache.",
  },
  {
    q: "Where are you based?",
    a: "Right here on the coast in Aptos, Santa Cruz County, California. We know the area and the people you're trying to reach.",
  },
];
