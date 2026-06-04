import { Eyebrow } from "../ui/Eyebrow";
import { Card } from "../ui/Card";
import { Reveal, RevealItem } from "../ui/Reveal";
import { ServiceIcons } from "../ui/icons";
import { services } from "../../data/services";
import type { Service } from "../../data/services";

export function Services() {
  const main = services.filter((s) => !s.secondary);
  const extra = services.filter((s) => s.secondary);

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative overflow-hidden py-[clamp(5rem,12vh,9rem)]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #e7eef2 0%, var(--cream) 42%, #f7ecd6 100%)",
      }}
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal stagger className="max-w-2xl">
          <RevealItem>
            <Eyebrow className="text-sun-orange">02 — What we do</Eyebrow>
          </RevealItem>
          <RevealItem>
            <h2
              id="services-title"
              className="mt-5 text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05] text-navy"
            >
              We're the crew that gets you to higher ground.
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-5 max-w-xl text-[1.1rem] leading-relaxed text-ink/75">
              We handle the whole pipeline — strategy, filming, editing,
              posting, and the ads — so you can run your business while we grow
              it.
            </p>
          </RevealItem>
        </Reveal>

        <Reveal
          stagger
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {main.map((s) => (
            <RevealItem key={s.id} className="h-full">
              <ServiceCard service={s} />
            </RevealItem>
          ))}
        </Reveal>

        {/* Also included */}
        {extra.map((s) => {
          const Icon = ServiceIcons[s.icon];
          return (
            <Reveal key={s.id} className="mt-5">
              <Card className="flex flex-col items-start gap-5 !bg-white/60 sm:flex-row sm:items-center">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sun-gold/20 text-[1.5rem] text-sun-orange">
                  <Icon />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[1.15rem] font-semibold text-navy">
                      {s.title}
                    </h3>
                    <span className="rounded-full bg-navy/5 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-sea-mid">
                      Also included
                    </span>
                  </div>
                  <p className="mt-1 text-ink/75">{s.blurb}</p>
                </div>
              </Card>
            </Reveal>
          );
        })}

        <Reveal className="mt-10">
          <p className="font-display text-[1.2rem] font-medium italic text-navy">
            You don't lift a finger — we run the whole thing.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = ServiceIcons[service.icon];
  return (
    <Card interactive className="group relative h-full overflow-hidden">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sun-gold/20 text-[1.5rem] text-sun-orange transition-colors group-hover:bg-sun-gold/35">
        <Icon />
      </span>
      <h3 className="mt-5 text-[1.2rem] font-semibold leading-snug text-navy">
        {service.title}
      </h3>
      <p className="mt-2 text-[0.98rem] leading-relaxed text-ink/75">
        {service.blurb}
      </p>

      {/* gull-wing accent */}
      <svg
        className="pointer-events-none absolute -bottom-2 -right-2 h-16 w-24 text-sun-amber/25"
        viewBox="0 0 100 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 30 Q26 12 50 30 T98 30"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </Card>
  );
}
