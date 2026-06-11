import { Eyebrow } from "../ui/Eyebrow";
import { Reveal, RevealItem } from "../ui/Reveal";
import { team } from "../../data/team";
import type { TeamMember } from "../../data/team";

export function Team() {
  return (
    <section
      id="about"
      aria-labelledby="team-title"
      className="relative overflow-hidden bg-cream py-[clamp(5rem,12vh,9rem)]"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal stagger className="max-w-2xl">
          <RevealItem>
            <Eyebrow className="text-sun-orange">05 — The crew</Eyebrow>
          </RevealItem>
          <RevealItem>
            <h2
              id="team-title"
              className="mt-5 text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05] text-navy"
            >
              Real people, right here on the coast.
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-5 max-w-xl text-[1.1rem] leading-relaxed text-ink/75">
              A small crew that actually does the work — strategy, camera, edit,
              and the tech behind it.
            </p>
          </RevealItem>
        </Reveal>

        <Reveal
          stagger
          className="mx-auto mt-16 grid max-w-4xl gap-12 sm:grid-cols-3 sm:gap-8"
        >
          {team.map((m) => (
            <RevealItem key={m.name}>
              <TeamCard member={m} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Arch-top portrait — the silhouette of a rising sun. A gold sun disc peeks
 * over the arch and climbs a little higher on hover: every member of the crew
 * with the sun coming up behind them.
 */
function TeamCard({ member }: { member: TeamMember }) {
  return (
    <figure className="group text-center">
      <div className="relative mx-auto w-full max-w-[300px] px-3 pt-12">
        {/* rising sun behind the arch */}
        <div
          className="absolute inset-x-0 top-0 flex justify-center"
          aria-hidden="true"
        >
          <div
            className="h-44 w-44 rounded-full transition-transform duration-500 ease-out group-hover:-translate-y-2.5"
            style={{
              background:
                "radial-gradient(circle at 50% 38%, var(--sun-pale), var(--sun-gold) 55%, var(--sun-orange) 100%)",
              boxShadow: "0 0 44px rgba(244,162,79,0.5)",
            }}
          />
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[1.4rem] border-4 border-white/90 shadow-[var(--shadow-sun-lg)]">
          {member.photo ? (
            <img
              src={member.photo}
              alt={`${member.name} — ${member.role}, High Ground Agency`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
          ) : (
            <PlaceholderPortrait initials={member.initials} />
          )}
          {/* warm hover wash */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(180deg, rgba(232,116,58,0) 55%, rgba(232,116,58,0.22))",
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      <figcaption className="mt-6">
        <h3 className="font-display text-[1.35rem] font-semibold text-navy">
          {member.name}
        </h3>
        <p className="mx-auto mt-1 max-w-[260px] text-[0.95rem] leading-snug text-ink/70">
          {member.role}
        </p>
      </figcaption>
    </figure>
  );
}

/* On-brand sunrise placeholder if a member's photo is ever missing. */
function PlaceholderPortrait({ initials }: { initials: string }) {
  return (
    <div
      className="relative grid h-full w-full place-items-center"
      style={{
        backgroundImage:
          "linear-gradient(180deg, var(--sky-high) 0%, var(--sky-mid) 45%, var(--sun-amber) 100%)",
      }}
      aria-hidden="true"
    >
      <span className="font-display text-[3.5rem] font-semibold text-white/85 drop-shadow">
        {initials}
      </span>
      <svg
        className="absolute inset-x-0 bottom-0"
        viewBox="0 0 300 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 30 Q75 12 150 30 T300 30 V60 H0 Z" fill="var(--sea-blue)" opacity="0.7" />
        <path d="M0 42 Q75 26 150 42 T300 42 V60 H0 Z" fill="var(--navy)" opacity="0.85" />
      </svg>
    </div>
  );
}
