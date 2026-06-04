# Drop your real assets here

The site renders with on-brand placeholders until these exist, so nothing ever
looks broken. Add the files, follow the matching `TODO(Gabriel)` comment in the
code, and you're done.

## Logo (this folder, `src/assets/`)

| File | Used where |
|---|---|
| `high-ground-agency-logo-transparent.png` | full color — light/cream/sky backgrounds |
| `high-ground-agency-logo-white.png` | white knockout — dark Problem section + footer |
| `high-ground-agency-logo-navy.png` | navy mono — tight / single-color uses |

→ then swap `LogoMark`/wordmark for an `<img>` per variant in
`src/components/Logo.tsx` (the API there is already built for a drop-in swap).

## Team photos (`src/assets/team/`)

Add portraits (square or 4:5 works best), then set the `photo` field in
`src/data/team.ts`:

```ts
import mikePhoto from "../assets/team/mike.jpg";
// ...
{ name: "Mike Panero", role: "...", initials: "MP", photo: mikePhoto },
```

- `mike.jpg` — Mike Panero
- `gabriel.jpg` — Gabriel Tenório
- `miguel.jpg` — Miguel Ricardo

## Hero demo reel (this folder)

Add `hero-demo.mp4` + `hero-poster.jpg`, then set `HERO_VIDEO` / `HERO_POSTER`
at the top of `src/components/sections/Hero.tsx`.

> Tip: import assets (don't hard-code `/public` paths) so Vite hashes them for
> cache-busting on deploy.
