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

## Brand

Tokens are in `tailwind.config.js`. Red (#E30E1F) is only for the "Start free trial" button and small highlights. The logo is `public/koach-logo.webp` (from the supplied file); favicon, apple-touch-icon and `og-image.png` (1200x630) are cut from it.
