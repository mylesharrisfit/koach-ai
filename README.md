# KOACH AI website (www.koachai.net)

Marketing site for KOACH AI. The application lives at app.koachai.net (separate repo).

Stack: Vite, React 18, Tailwind CSS. No other runtime dependencies.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # emits ./dist
npm run lint
```

## Routes

`/` (features and pricing sections), `/pricing`, `/privacy`, `/terms`, `/login`.
`/login` is redirected to https://app.koachai.net/login by `vercel.json` and, as a fallback, in the client.

## Links into the app

All app URLs are built in `src/lib/config.js`; plans and prices are in `src/lib/plans.js`.

## Assets to add in `public/`

- `koach-logo-dark.png` (logo for light backgrounds) and `koach-logo-white.png` (for the dark footer).
  Until they exist, a text wordmark is shown.
- `screenshots/dashboard.png`, `programs.png`, `checkins.png`, `clients.png` (16:10 works best).
  Until they exist, the screenshot frames are hidden.
- Optional: `favicon.png`; `favicon.svg` is currently a flat red K.

The accent red is `accent` in `tailwind.config.js`; match it to the logo.

## Deploy

Vercel project `koachaiwebsite` (team KoachAi). Framework preset must be Vite, output `dist`.
