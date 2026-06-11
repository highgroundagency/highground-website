import type { MouseEvent } from "react";
import { Eyebrow } from "../ui/Eyebrow";
import { Card } from "../ui/Card";
import { Reveal, RevealItem } from "../ui/Reveal";
import { ServiceIcons } from "../ui/icons";
import { services } from "../../data/services";
import type { Service } from "../../data/services";

export function Services() {
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

        <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <RevealItem key={s.id} className="h-full">
              <ServiceCard service={s} index={i} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = ServiceIcons[service.icon];

  // Warm glow that tracks the pointer (hover-only, so touch is unaffected).
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Card
      interactive
      onMouseMove={handleMove}
      className="group relative h-full overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx, 65%) var(--my, 30%), rgba(246,198,114,0.3), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sun-gold/20 text-[1.5rem] text-sun-orange transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-sun-gold/35">
          <Icon />
        </span>
        <span
          className="font-mono text-[0.78rem] font-bold text-sun-amber/60"
          aria-hidden="true"
        >
          0{index + 1}
        </span>
      </div>
      <h3 className="relative mt-5 text-[1.2rem] font-semibold leading-snug text-navy">
        {service.title}
      </h3>
      <p className="relative mt-2 text-[0.98rem] leading-relaxed text-ink/75">
        {service.blurb}
      </p>

      {/* gull-wing accent */}
      <svg
        className="pointer-events-none absolute -bottom-2 -right-2 h-16 w-24 text-sun-amber/25 transition-colors duration-300 group-hover:text-sun-amber/50"
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
