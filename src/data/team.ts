export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  /**
   * Portrait image URL. Left undefined for now → the Team section renders an
   * on-brand sunrise initials placeholder.
   *
   * TODO(Gabriel): drop the real photos into `src/assets/team/` and wire them
   * up, e.g.:
   *   import mikePhoto from "../assets/team/mike.jpg";
   *   ...then set `photo: mikePhoto` on the matching member below.
   */
  photo?: string;
};

/**
 * The crew. Corrected titles per brief §7.7 (the old draft had these wrong).
 */
export const team: TeamMember[] = [
  {
    name: "Mike Panero",
    role: "Digital strategist, filmmaker & paid-ads lead",
    initials: "MP",
  },
  {
    name: "Gabriel Tenório",
    role: "Video editor & scriptwriter",
    initials: "GT",
  },
  {
    name: "Miguel Ricardo",
    role: "AI strategist & automation",
    initials: "MR",
  },
];
