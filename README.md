# KOACH AI — Website (koachai.net)

Marketing website for **KOACH AI**, the AI coaching operating system. This is the
public site at **koachai.net**; the application lives at **app.koachai.net** (see the
`koach-ai-fitness-coaching-platform` repo). Every sign-up / login CTA on this site
routes to the app.

## Stack

- **Vite + React 18** — fast SPA build
- **Tailwind CSS** — matte-black premium theme matching the app (blue `#2563EB` → violet `#7C3AED`, Inter)
- **Framer Motion** — scroll reveals, magnetic buttons, animated counters, aurora background, signup popup
- **lucide-react** — icons

Deploys to **Vercel** (`vercel.json`). This is the public website only — the KOACH AI
**application** (`koach-ai-fitness-coaching-platform`) is a separate repo that deploys to
**Cloudflare** at `app.koachai.net`.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # emits ./dist
npm run preview    # serve the production build
```

## Configuration

Sign-up / login destinations are centralized in `src/lib/config.js` and driven by an
env var (falls back to `https://app.koachai.net`):

```
VITE_APP_URL=https://app.koachai.net
```

Copy `.env.example` → `.env.local` to override locally.

## Deploy (Vercel)

The website is deployed on **Vercel** (project `koachaiwebsite`, team `KoachAi`), serving
`koachai.net`. Import the repo once and every push to the production branch builds and
deploys automatically:

1. Vercel → Add New → Project → import `mylesharrisfit/koach-ai`.
2. Framework auto-detects as **Vite** (`vercel.json` pins the build command, `dist`
   output, and SPA rewrites).
3. Add `VITE_APP_URL=https://app.koachai.net` under Project → Settings → Environment
   Variables (optional — it defaults to that in code).
4. Attach the `koachai.net` domain under Project → Settings → Domains.

> The application (`app.koachai.net`) lives in the separate
> `koach-ai-fitness-coaching-platform` repo and deploys to Cloudflare — keep the two
> hosts separate to avoid divergent builds.

## Structure

```
src/
  App.jsx                 # page composition + scroll progress
  lib/config.js           # APP_URL + CTA link builder (app.koachai.net)
  lib/motion.js           # shared Framer Motion variants
  components/
    Background.jsx         # aurora + grid backdrop
    Nav.jsx / Logo.jsx     # floating glass nav + brand mark
    Hero.jsx / ProductMockup.jsx
    TrustBar.jsx           # capability marquee
    Features.jsx           # bento feature grid (tilt cards)
    HowItWorks.jsx / Metrics.jsx / Testimonials.jsx
    Pricing.jsx            # monthly/annual toggle
    FAQ.jsx                # accordion
    FinalCTA.jsx / Footer.jsx
    SignupModal.jsx        # popup w/ exit-intent + timed trigger, useSignup() context
    ui.jsx                 # Reveal, MagneticButton, buttons, TiltCard, headings
```
