// Single source of truth for outbound links to the KOACH AI application.
// Every sign-up / login / CTA button in the site routes through here so the
// destination can be swapped per-environment via VITE_APP_URL.
export const APP_URL =
  import.meta.env.VITE_APP_URL?.replace(/\/$/, '') || 'https://app.koachai.net'

export const links = {
  signup: `${APP_URL}/signup?ref=koachai.net`,
  login: `${APP_URL}/login?ref=koachai.net`,
  demo: `${APP_URL}/signup?ref=koachai.net&plan=demo`,
}

// Reusable UTM-tagged CTA builder for tracking which section drove the click.
export const cta = (source) => `${links.signup}&utm_source=website&utm_medium=cta&utm_campaign=${source}`
