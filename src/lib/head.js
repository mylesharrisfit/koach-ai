// Per-route <head>: title, description, canonical and Open Graph tags. index.html carries the home
// page's values for crawlers that don't run JS; every route then sets its own, so pages are not all
// "duplicates" of the home page. noindex for the not-found page (the host still answers 200).
export const SITE_URL = 'https://www.koachai.net'

const DEFAULT_DESCRIPTION =
  'Programs, nutrition, check-ins, a client app and payments in one place, with AI that drafts and you approve. Plans from $49 a month, 30 days free.'

function meta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function setHead({ title, description = DEFAULT_DESCRIPTION, path = '/', noindex = false }) {
  const url = `${SITE_URL}${path === '/' ? '/' : path}`
  document.title = title
  meta('name', 'description', description)
  meta('property', 'og:title', title)
  meta('property', 'og:description', description)
  meta('property', 'og:url', url)
  meta('name', 'robots', noindex ? 'noindex' : 'index, follow')
  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (noindex) {
    canonical?.remove()
  } else {
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }
}

export const ROUTE_HEAD = {
  '/': { title: 'KOACH | The coaching OS for online coaches' },
  '/about': {
    title: 'About KOACH | Built by coaches for online coaches',
    description: 'Why KOACH exists, who builds it, and how to reach us.',
  },
  '/privacy': { title: 'Privacy policy | KOACH', description: 'What KOACH collects, why, and the choices you have.' },
  '/terms': { title: 'Terms of service | KOACH', description: 'The terms for using KOACH.' },
}
