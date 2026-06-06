# High Ground Agency — Website

Marketing & content agency in **Aptos · Santa Cruz County, California**.
A single-page, motion-rich marketing site built around one idea: your marketing
is the half-sunk **Cement Ship** at Seacliff — and High Ground is the crew that
gets you up to **higher ground**, where the sun's already up and customers can
finally see you.

The whole page is a sunrise: it moves from a cold, sinking shipwreck up to a warm
golden summit, with the background temperature shifting as you scroll.

## Stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS v4** (Vite plugin) — brand tokens live in `src/styles/tokens.css`
  and are mapped to utilities in `src/styles/index.css` (`@theme`)
- **Framer Motion** for the orchestrated motion (rising sun, looping waves,
  gliding gull, the underwater Cement-Ship parallax, scroll reveals)
- Deploy target: **Vercel**

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build → dist/
npm run preview  # preview the production build
```

## Assets

### ✅ Logo + team photos — wired in

- **Logo** (`src/assets/logo-full.webp`, `logo-mark.webp`): the real lockup,
  optimized to WebP. The slim nav uses the sun+wave mark; the footer uses the
  full lockup. Dark backgrounds knock it out to white via a CSS filter (no
  separate white file needed). Details in `src/assets/README.md`.
- **Team photos** (`src/assets/team/*.jpg`): real portraits, optimized and
  imported in `src/data/team.ts`.

To replace either later, swap the file (same name) or update the import.

### ⏳ Still placeholders (search the code for `TODO(Gabriel)`)

- **Hero demo reel** — vertical video + poster (`src/components/sections/Hero.tsx`).
  The phone shows an on-brand placeholder until then; the play button lazy-loads
  the real video on click.
- **Contact destination** — the CTA form logs the lead to the console for now.
  Wire it to email / a Calendly link / your CRM in `src/components/ContactModal.tsx`.
- **Favicon / social image** — a simple sun mark lives at `public/favicon.svg`;
  generate a 1200×630 OG image when you can.

(The fake testimonials were removed; that section is now "What we need from you".)

## Project structure

```
src/
  components/
    layout/    Nav, Footer
    sections/  Hero, Problem, Services, HowItWorks, Expectations, Team, FinalCTA
    motion/    WaveLayer, Sun, Gull, Bubbles, LightRays
    ui/        Button, Eyebrow, Reveal, Card, icons
    Logo.tsx   ContactModal.tsx
  data/        services, team, steps, faqs, expectations
  hooks/       useReducedMotion, useSectionTheme
  styles/      index.css (Tailwind + theme), tokens.css (brand colors)
```

## House rules (please keep these)

- **The offer / pricing (per owner decision):** the strategy call is free, then a
  **low-cost trial — $400 to start plus the ad spend the client chooses** — and
  they continue at the regular monthly rate only if they're happy. Don't call it
  a "free trial" (it isn't) and don't add "no upfront cost" language.
- **Never** use the strings "Panero Creative" or "Based on California" (both were
  errors in the old draft). The name is **High Ground Agency**; the place is
  **Aptos / Santa Cruz County, California** ("based in California").
- Fonts are **Fraunces** (display), **Hanken Grotesk** (body), **Space Mono**
  (labels) — loaded from Google Fonts in `index.html`.
- Motion respects `prefers-reduced-motion` everywhere; keep it that way.

## Deploy (Vercel)

Framework preset: **Vite**. Build command `npm run build`, output `dist/`.
All assets are imported through the bundler so they hash correctly.
