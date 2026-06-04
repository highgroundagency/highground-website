import mikePhoto from "../assets/team/mike.jpg";
import gabrielPhoto from "../assets/team/gabriel.jpg";
import miguelPhoto from "../assets/team/miguel.jpg";

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  /**
   * Portrait image. Falls back to an on-brand sunrise initials placeholder
   * when undefined.
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
    photo: mikePhoto,
  },
  {
    name: "Gabriel Tenório",
    role: "Video editor & scriptwriter",
    initials: "GT",
    photo: gabrielPhoto,
  },
  {
    name: "Miguel Ricardo",
    role: "AI strategist & automation",
    initials: "MR",
    photo: miguelPhoto,
  },
];
