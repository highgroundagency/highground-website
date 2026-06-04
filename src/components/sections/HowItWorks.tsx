import { useId, useState } from "react";
import { Eyebrow } from "../ui/Eyebrow";
import { Card } from "../ui/Card";
import { Reveal, RevealItem } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { PlusIcon } from "../ui/icons";
import { steps } from "../../data/steps";
import { faqs } from "../../data/faqs";
import { useContact } from "../ContactModal";

export function HowItWorks() {
  const { open: openContact } = useContact();

  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="relative overflow-hidden py-[clamp(5rem,12vh,9rem)]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #f7ecd6 0%, var(--cream) 30%, var(--cream) 100%)",
      }}
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal stagger className="max-w-2xl">
          <RevealItem>
            <Eyebrow className="text-sun-orange">03 — How it works</Eyebrow>
          </RevealItem>
          <RevealItem>
            <h2
              id="how-title"
              className="mt-5 text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05] text-navy"
            >
              See it work before you pay a cent.
            </h2>
          </RevealItem>
        </Reveal>

        {/* Steps */}
        <div className="relative mt-14">
          {/* connecting line (desktop) */}
          <div
            className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-0.5 lg:block"
            style={{
              backgroundImage:
                "linear-gradient(90deg, var(--sun-orange), var(--sun-gold))",
            }}
            aria-hidden="true"
          />

          <Reveal stagger className="grid gap-10 lg:grid-cols-3">
            {steps.map((s) => (
              <RevealItem key={s.n}>
                <div className="relative text-center lg:text-left">
                  <div className="flex justify-center lg:justify-start">
                    <span
                      className="grid h-14 w-14 place-items-center rounded-full font-mono text-[1.05rem] font-bold text-white shadow-[var(--shadow-sun)]"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, var(--sun-orange), var(--sun-gold))",
                      }}
                    >
                      {s.n}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[1.35rem] font-semibold text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[1.02rem] leading-relaxed text-ink/75">
                    {s.blurb}
                  </p>
                  {s.note && (
                    <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-sea-mid">
                      {s.note}
                    </p>
                  )}
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>

        {/* Reassurance + CTA */}
        <Reveal className="mt-14">
          <Card className="flex flex-col items-start gap-6 border-sun-gold/40 !bg-sun-gold/10 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-[1.3rem] font-semibold text-navy">
                No big upfront cost. No long contract.
              </h3>
              <p className="mt-1.5 text-ink/75">
                If it's not right for you, you walk away — no cost, no hard
                feelings.
              </p>
            </div>
            <Button size="lg" className="shrink-0" onClick={openContact}>
              Start your free trial
            </Button>
          </Card>
        </Reveal>

        {/* FAQ */}
        <div className="mx-auto mt-20 max-w-3xl">
          <Reveal>
            <h3 className="text-center text-[1.6rem] font-semibold text-navy">
              Questions, answered.
            </h3>
          </Reveal>
          <Reveal stagger className="mt-8 divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <RevealItem key={f.q}>
                <FaqItem question={f.q} answer={f.a} />
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-[1.08rem] font-medium text-navy">{question}</span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy/5 text-[1.1rem] text-sun-orange transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          <PlusIcon />
        </span>
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pr-12 text-[1.02rem] leading-relaxed text-ink/75">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
