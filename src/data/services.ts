export type ServiceIcon = "ads" | "content" | "social" | "web" | "email";

export type Service = {
  id: string;
  title: string;
  blurb: string;
  icon: ServiceIcon;
};

/**
 * The climb to high ground — what High Ground actually does. Benefit-first,
 * plain-spoken (brief §7.4). The whole pipeline so the client doesn't lift
 * a finger.
 */
export const services: Service[] = [
  {
    id: "paid-ads",
    title: "Paid ads",
    blurb:
      "Instagram & Facebook campaigns that put you in front of real local buyers — not tire-kickers.",
    icon: "ads",
  },
  {
    id: "content",
    title: "Script, film & edit",
    blurb:
      "We write it, shoot it, and cut it — so you look professional online without ever touching a camera.",
    icon: "content",
  },
  {
    id: "social",
    title: "Social growth & posting",
    blurb:
      "Consistent posts, scheduled and managed, so your page actually grows instead of going quiet.",
    icon: "social",
  },
  {
    id: "web",
    title: "Websites & landing pages",
    blurb:
      "A clean, fast page built for one job: turning clicks into calls and booked customers.",
    icon: "web",
  },
  {
    id: "email",
    title: "Email automation",
    blurb:
      "Follow-ups that nurture every lead on autopilot, so nobody slips through the cracks.",
    icon: "email",
  },
];
