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

## 🔧 Assets to drop in (the stuff to upload)

Everything renders today with on-brand placeholders, so the site is never
broken. Swap them for the real files when ready — no other code changes needed.

### Logo — `src/assets/`

The logo currently renders as a crisp inline SVG (`src/components/Logo.tsx`) that
recolors itself for light/dark/mono use. When you upload the real files, drop
them in `src/assets/` and follow the `TODO(Gabriel)` note in `Logo.tsx`:

| File | Use |
|---|---|
| `high-ground-agency-logo-transparent.png` | full color (light backgrounds) |
| `high-ground-agency-logo-white.png` | white knockout (dark sections, footer) |
| `high-ground-agency-logo-navy.png` | navy mono (tight uses) |

### Team photos — `src/assets/team/`

Portraits show a sunrise initials placeholder until you add photos. To wire them
up, drop the images in `src/assets/team/` and set the `photo` field in
`src/data/team.ts` (there's a `TODO(Gabriel)` with the exact snippet):

- **Mike Panero** — Digital strategist, filmmaker & paid-ads lead
- **Gabriel Tenório** — Video editor & scriptwriter
- **Miguel Ricardo** — AI strategist & automation

### Other TODOs (search the code for `TODO(Gabriel)`)

- **Hero demo reel** — vertical video + poster (`src/components/sections/Hero.tsx`).
  The phone shows an on-brand placeholder until then; the play button lazy-loads
  the real video on click.
- **Contact destination** — the CTA form logs the lead to the console for now.
  Wire it to email / a Calendly link / your CRM in `src/components/ContactModal.tsx`.
- **Real testimonials** — placeholders in `src/components/sections/Proof.tsx`.
- **Favicon / social image** — a simple sun mark lives at `public/favicon.svg`;
  generate a 1200×630 OG image when you can.

## Project structure

```
src/
  components/
    layout/    Nav, Footer
    sections/  Hero, Problem, Services, HowItWorks, Proof, Team, FinalCTA
    motion/    WaveLayer, Sun, Gull, Bubbles, LightRays
    ui/        Button, Eyebrow, Reveal, Card, icons
    Logo.tsx   ContactModal.tsx
  data/        services, team, steps, faqs
  hooks/       useReducedMotion, useSectionTheme
  styles/      index.css (Tailwind + theme), tokens.css (brand colors)
```

## House rules (please keep these)

- **No prices / dollar amounts anywhere.** The offer is always framed as a free
  trial → low monthly fee only once it's working.
- **Never** use the strings "Panero Creative" or "Based on California" (both were
  errors in the old draft). The name is **High Ground Agency**; the place is
  **Aptos / Santa Cruz County, California** ("based in California").
- Fonts are **Fraunces** (display), **Hanken Grotesk** (body), **Space Mono**
  (labels) — loaded from Google Fonts in `index.html`.
- Motion respects `prefers-reduced-motion` everywhere; keep it that way.

## Deploy (Vercel)

Framework preset: **Vite**. Build command `npm run build`, output `dist/`.
All assets are imported through the bundler so they hash correctly.
