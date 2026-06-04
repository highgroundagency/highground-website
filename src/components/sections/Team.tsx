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

        <Reveal stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <RevealItem key={m.name} className="h-full">
              <TeamCard member={m} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <figure className="group overflow-hidden rounded-[var(--radius-card)] border border-line bg-white/60 shadow-[var(--shadow-sun)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-sun-lg)]">
      <div className="relative aspect-[4/5] overflow-hidden">
        {member.photo ? (
          <img
            src={member.photo}
            alt={`${member.name} — ${member.role}, High Ground Agency`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
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
      <figcaption className="p-6">
        <h3 className="text-[1.3rem] font-semibold text-navy">{member.name}</h3>
        <p className="mt-1 text-[0.98rem] text-ink/70">{member.role}</p>
      </figcaption>
    </figure>
  );
}

/* On-brand sunrise placeholder until real portraits are dropped into team.ts. */
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
      {/* sun + wave hint */}
      <div
        className="absolute bottom-10 h-20 w-20 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, var(--sun-pale), var(--sun-gold) 60%, var(--sun-orange))",
          boxShadow: "0 0 40px 8px rgba(244,162,79,0.45)",
        }}
      />
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
