import type { ReactElement } from "react";
import { Eyebrow } from "../ui/Eyebrow";
import { Card } from "../ui/Card";
import { Reveal, RevealItem } from "../ui/Reveal";
import { ServiceIcons, ClockIcon, WalletIcon } from "../ui/icons";
import { expectations } from "../../data/expectations";
import type { ExpectationIcon } from "../../data/expectations";

const ICONS: Record<ExpectationIcon, (props: { className?: string }) => ReactElement> = {
  clock: ClockIcon,
  content: ServiceIcons.content,
  wallet: WalletIcon,
};

export function Expectations() {
  return (
    <section
      id="expectations"
      aria-labelledby="expectations-title"
      className="relative overflow-hidden bg-sand py-[clamp(5rem,12vh,9rem)]"
    >
      {/* faint morning glow */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(246,198,114,0.5), rgba(246,198,114,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal stagger className="max-w-2xl">
          <RevealItem>
            <Eyebrow className="text-sun-orange">04 — What we need from you</Eyebrow>
          </RevealItem>
          <RevealItem>
            <h2
              id="expectations-title"
              className="mt-5 text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05] text-navy"
            >
              We do the heavy lifting. Here's your part.
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-5 max-w-xl text-[1.1rem] leading-relaxed text-ink/75">
              We're a lead generator, not magic. We'll bring you hot leads — but
              this only works if you hold up your end of it.
            </p>
          </RevealItem>
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {expectations.map((e, i) => {
            const Icon = ICONS[e.icon];
            return (
              <RevealItem key={e.title} className="h-full">
                <Card className="relative flex h-full flex-col">
                  <span
                    className="absolute right-6 top-6 font-mono text-[0.78rem] font-bold text-sun-amber/60"
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sun-gold/20 text-[1.5rem] text-sun-orange">
                    <Icon />
                  </span>
                  <h3 className="mt-5 text-[1.25rem] font-semibold leading-snug text-navy">
                    {e.title}
                  </h3>
                  <p className="mt-2 text-[1rem] leading-relaxed text-ink/75">
                    {e.blurb}
                  </p>
                </Card>
              </RevealItem>
            );
          })}
        </Reveal>

        <Reveal className="mt-10">
          <p className="font-display text-[1.2rem] font-medium italic text-navy">
            Do that, and we'll take care of the rest.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
