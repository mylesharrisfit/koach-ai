# KOACH website (www.koachai.net)

Marketing site for KOACH. The application lives at app.koachai.net (separate repo).

Stack: Vite, React 18, Tailwind CSS, [Motion](https://motion.dev) (lazy-loaded, drives the product demos only). Fonts (Archivo variable with width axis, Hanken Grotesk) are self-hosted in `public/fonts`.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # emits ./dist
npm run lint
```

## Structure

- `src/pages/Home.jsx`: section order (follows the Everfit homepage: hero, logo strip, categories, product tour, high-ticket vs scalable, statement, capability areas, branding, playground, pricing, FAQ, CTA). `src/components/`: nav (mega menu), hero, feature tabs, sections, pricing, footer.
- `src/lib/features.js`: every feature page, the mega menu groups (Coach / Engage / Manage / Scale), the home category cards and the footer read from here. `src/pages/Feature.jsx` is the one template for `/features/:slug`.
- `src/components/Pieces.jsx`: product UI pulled out as floating pieces (revenue card, macro rings, check-in card, …), reused in the hero, category cards, feature pages and menu previews.
- Interactive pieces: `BrandStudio.jsx` (white-label preview), `WorkoutDemo.jsx` (client-app set logging with rest timer), `Playground.jsx` (both demos behind a segmented control), `SupportFab.jsx` (bottom-right help popover).
- `src/assets/photos/`: real photography for the blue stages. Drop a file named after a slot (`hero`, `cta`, `branding`, `workout`, `feature-<slug>`) and it shows on the next build; see the README in that folder.
- `src/site.css`: the editorial/marketing layer and its motion values (hover 140ms, cards 180ms, dropdown 160ms + 6px, popover 180ms, accordion 200ms, tabs 180ms, sheet 260ms spring, toast 180/140ms).
- `src/demos/`: animated product demos. `Demo.jsx` is the shell (lazy chunk per scene, play only on screen, pause when the tab is hidden, pause button, reduced-motion = static final frame). `engine.js` has the seekable `render(t)` helpers and the fake cursor. `scenes/*.jsx` are the seven scenes (markup + timeline). `demo.css` styles the mockups.
- `src/lib/config.js`: all app URLs. `src/lib/plans.js`: plans and prices.
- `vercel.json`: `/login` goes to the app; `/pricing`, `/subscription` and `/checkout` go to `/#pricing`.

## Motion and interactivity

- `src/lib/motion.js`: one switch for "no motion". `<html class="rm">` is set when the OS asks for reduced motion or the visitor presses "Pause animations" in the footer; CSS and JS both read it and fall back to static final states.
- `src/components/fx.jsx`: `Reveal` (scroll reveal, plays once, nothing hidden without JS), `Num` (count up / roll), `Floaters` + `useParallax`, `SpotCard`, `AiPill` / `TierPill`, `Divider`, `LazyMount` (loads a section's code near the viewport).
- `src/motion.css`: all motion styles, transform/opacity only (the capability icons' stroke draw-in is the one exception), plus the reduced-motion overrides at the end.
- Lazy sections: `TryIt.jsx` (scripted demo, no AI calls, nothing stored), `Week.jsx` + `WeekDevices.jsx` (pinned scrollytelling with CSS sticky; scroll speed is never changed), `TodayBand.jsx` (interactive status grid), `Tour.jsx` (the only modal, a native `<dialog>` opened by the visitor).
- Offscreen sections use `content-visibility: auto` (class `cv`), which keeps the first render light.
- Testimonials: `src/components/Testimonials.jsx` renders only when `src/data/testimonials.js` has real entries. It ships empty.

## Brand

Tokens are in `tailwind.config.js`. Brand blue (#1F5EFF) drives CTAs, highlights and accents; striped red stays only as the "missed" status color inside mockups. The logo is `public/koach-logo.webp` (white wordmark, for dark backgrounds) and `public/koach-logo-dark.webp` (ink wordmark, for the white nav); favicon, apple-touch-icon and `og-image.png` (1200x630) are cut from it.
