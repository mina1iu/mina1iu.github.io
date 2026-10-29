# Mina Liu portfolio

Seven responsive portfolio routes, implemented from page 19:2 of the approved Figma file. Uses Vite and plain JavaScript, semantic HTML, and ordinary CSS. Published with GitHub Pages at https://mina1iu.github.io/.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:5173. `npm run build` emits `dist/`, including an index document for each route. `npm run preview` serves that build locally. Fonts and design assets are local; production has no Figma API dependency.

## Deployment

Repository: https://github.com/mina1iu/mina1iu.github.io

Pushing to `main` runs `.github/workflows/deploy-pages.yml`, verifies local assets, builds the site, and deploys `dist/` to GitHub Pages. Every page has its own static index document so direct links and refreshes work. The site is hosted at the account root, so links and local assets use `/` as their base. Local reference captures are ignored by Git and are not published.

## Edit

- `src/content.json`: canonical copy, shared by desktop and mobile.
- `src/layouts.json`: inspected Figma layout metadata and asset placement, with separate responsive compositions. No complete-frame screenshots are used as content.
- `src/main.js`: shared navigation, linked project cards, media renderer, semantic headings, footer rendering, and paper scroll enhancement.
- `src/style.css`: design tokens, local fonts, a centered 1200px frame with full-width section colors, responsive adaptations, texture clipping, and interaction states.
- `src/image-assets.json`: deduplicated WebP sources with responsive widths. Photos use quality 84; app screens, graphs, masks, and grain use lossless WebP. Sizes are selected from the actual rendered crop width and device pixel ratio.
- `npm run images`: regenerate optimized variants from the original design assets. Originals stay in the repository; the production build omits the unused PNG/JPEG sources.
- `src/scroll-motion.js`: card and section entrances, subtle photo parallax, and drifting footer letters. Effects clean up on responsive changes and reduced-motion preference changes; keyboard focus immediately completes entrances.
- `src/scroll-video.js`: scroll-linked seeking with reduced-motion and loading/error fallbacks; ready to bind when the original videos are supplied.
- `scripts/import-design.mjs`: reproducible import of the saved design context in `reference/`. Ordinary copy edits belong in `src/content.json`; re-importing overwrites those edits.

Image compositions retain their own aspect ratios; surrounding page layout, text, and columns are fluid. Only overlapping media compositions scale within their containers.

## Validation

`npm run check` verifies seven routes, fourteen layout variants, and every referenced image file. `npm test` opens all pages at 1440, 1024, 768, 390, and 360 pixels and captures desktop/mobile screenshots. `node scripts/interactions.mjs` checks card navigation, refresh, Work anchors, contact destinations, keyboard focus, and reduced/reversible paper motion. Browser checks use the installed Google Chrome through Playwright. `SCREENSHOTS=0 npm test` skips image capture; `BASE_URL=http://localhost:4173 npm test` targets the production preview.

Figma reference screenshots and browser screenshots are in `reference/` and `reference/browser/`. `reference/validation.json` records browser metrics. These are development references, not shipped page content. Build, asset checks, browser metrics across all 35 production page/viewport combinations, and interaction checks pass. All fourteen initial browser/reference captures were visually reviewed; a later full screenshot rerun stalled in browser automation, so the final production metrics pass used image capture disabled. Small text rasterization and wrapping differences remain between Figma and browser fonts; this is not a pixel-identical canvas.

## Pending assets and design discrepancy

- Final résumé PDF: the honest Figma embed placeholder remains. No fabricated download link is shown.
- Original About clips `IMG_8719` and `IMG_8712` were not available through the image export tools or in the project/Downloads. Approved static photos remain; no substituted video is used. Supply the source clips before connecting and validating actual video playback.
- The live desktop footer spells **SAY HI**, while the supplied mobile footer spells **SAY HELLO**. Both supplied compositions are preserved. The spec's wording differs from the desktop design.

Original image exports, supplied phone frames, project screens, real robotics photography, and the original research graph are stored in `public/assets/`. Do not replace them with generated imagery or expiring Figma URLs.
