# Prompt: rebuild a client's website as a before/after for a pitch

Paste everything below the line into Claude Code, opened in the `highground-website` folder. Fill in the three blanks first.

---

I'm pitching **[CLIENT NAME]** (website: **[CLIENT URL]**, the product their ads push: **[PRODUCT PAGE URL]**). Build me a before/after of their website that I can click through live in the pitch.

**1. Capture the "before" (real, not described)**
- Use Playwright to screenshot their homepage on a laptop (1440×900) and their product page on an iPhone 13. Capture the first phone screen with whatever pop-up appears. Also capture a tall phone screenshot (390×2000) so I can show the scroll.
- Measure on the phone: where the price and the Add to Cart button sit (pixels from the top), how tall the page is in phone screens, and whether a pop-up covers the product.
- Read `/products.json` from their store for real prices, compare-at prices, bundles, and every product photo URL. Read their About page for the founder's story in their own words, and the product page for real reviews.
- Make a contact sheet of their product photos so you can pick clean ones (no text baked in) for heroes. Look for founder, farm, process and hands-holding-product shots.
- Look up their live ads in the Meta Ad Library and screenshot each ad card.

**2. Build the "after" in `public/[client]-site/`**
Use only their real photos (hotlink their Shopify CDN), real prices, real reviews and their brand colours and fonts. Never invent a stat, review or price. Anything new you suggest (like a free-shipping threshold) goes in a visible note.

Product page (`product.html`), phone first, fast, light motion only:
- Screen one on a phone must show: product photo, outcome headline that names the buyer, stars with review count, price with the crossed-out compare price, 2–3 value bullets, and a buy button. On phones the Add to Cart bar stays stuck to the bottom.
- Bundle ladder: 1 / 2 / 3 packs with per-unit price, "Most popular" on the middle one, real savings. If the middle bundle is just under the free-shipping line, flag it.
- A mini testimonial right under the photo; longer reviews lower down.
- Then, in order: problem → "old way vs. their way" comparison → benefits (feeling, not medical promises) → founder story with their photo and their own words → reviews → who it's for / not for → 5–7 question FAQ → final buy button with the guarantee.
- No pop-up on load. Cosmetic wording only: no disease, condition or "heals/cures/treats" language, and no review that makes a medical claim.
- A working cart drawer with a free-shipping progress bar; checkout links to their live store.

Homepage (`index.html`), the place for the "wow":
- Full-screen hero with their best founder or brand photo, slow parallax, headline words rising in.
- A pinned scroll section where the hero product grows in and its key ingredients float in around it, ending with a price chip and a Shop button.
- Founder story in three short chapters with drifting photos, a best-sellers grid with real prices and review counts, a slow reviews marquee, and a closing shot of the full product line.
- GSAP 3.12.5 + ScrollTrigger from cdnjs and Lenis 1.1.13 from unpkg for smooth scroll. Respect reduced motion.

**3. Put it in the pitch**
In the presentation, add a "website" section with:
- A phone frame where their real product page scrolls as you scroll the presentation, a red box on their Add to Cart, and a badge with how many screens it takes to reach it.
- A Today / Rebuilt toggle: Rebuilt swaps the phone to a live iframe of `product.html`. Each finding card flips from the problem (red) to the fix (green).
- The same toggle for the homepage in a browser frame, plus "Open full page" buttons.
- Their live ads, cropped to the creative, with the risky words in red and a rewritten version in green.

**4. Check it**
Syntax-check every script. Open each page in the browser at 1440×900 and at phone size, with no console errors, no broken images and no sideways scroll. Measure that the price and a buy button are visible on the rebuilt product page's first phone screen.
