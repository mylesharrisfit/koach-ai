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

- `src/pages/Home.jsx`: section order. `src/components/`: nav, hero, feature tabs, sections, pricing, footer.
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

Tokens are in `tailwind.config.js`. Brand blue (#1F5EFF) drives CTAs, highlights and accents; striped red stays only as the "missed" status color inside mockups. The logo is `public/koach-logo.webp` (from the supplied file); favicon, apple-touch-icon and `og-image.png` (1200x630) are cut from it.
