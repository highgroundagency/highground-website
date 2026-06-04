# Brand assets

## Logo — ✅ wired in

The real logo lives here as WebP (downscaled for the web, transparent):

| File | Used where |
|---|---|
| `logo-full.webp` | full stacked lockup (mark + wordmark) — the footer |
| `logo-mark.webp` | sun+wave mark only — the slim nav, modal & mobile-menu headers |

`logo-mark.webp` was auto-cropped from the full lockup. On dark backgrounds the
artwork is knocked out to solid white with a CSS filter
(`brightness(0) invert(1)`) in `src/components/Logo.tsx`, so there's no separate
white file to maintain.

To replace the logo later, drop in new `logo-full.webp` / `logo-mark.webp` (same
names) or update the imports at the top of `src/components/Logo.tsx`.

## Team photos — ✅ wired in (`src/assets/team/`)

`mike.jpg`, `gabriel.jpg`, `miguel.jpg` — optimized to ≤900px JPEG and imported
in `src/data/team.ts`. To swap a photo, replace the file (same name) or update
the import. Square or 4:5 framing works best (cards crop to 4:5).

## Hero demo reel — ⏳ still a placeholder (this folder)

Add `hero-demo.mp4` + `hero-poster.jpg`, then set `HERO_VIDEO` / `HERO_POSTER`
at the top of `src/components/sections/Hero.tsx`. Until then the hero phone shows
an on-brand placeholder scene.

> Tip: import assets (don't hard-code `/public` paths) so Vite hashes them for
> cache-busting on deploy.
