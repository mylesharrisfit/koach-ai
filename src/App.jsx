import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import CtaBar from './components/CtaBar'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import { Privacy, Terms } from './pages/Legal'

const ROUTES = {
  '/': Home,
  '/about': About,
  '/login': Login,
  '/privacy': Privacy,
  '/terms': Terms,
}
// old checkout / pricing URLs land on the pricing section (vercel.json does this server-side)
const OLD_PRICING = ['/pricing', '/subscription', '/checkout']

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const old = OLD_PRICING.some((p) => path === p || path.startsWith(`${p}/`))
  useEffect(() => {
    if (old) window.location.replace('/#pricing')
  }, [old])
  // The page renders after the browser's own jump to #fragment, so jump once it exists. Re-applied
  // briefly while lazy sections above it settle, and never after the visitor has scrolled.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id || old) return
    let last = null
    let n = 0
    let t = 0
    const go = () => {
      if (last !== null && Math.abs(window.scrollY - last) > 2) return
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ block: 'start', behavior: 'instant' })
        last = window.scrollY
      }
      if (++n < 4) t = setTimeout(go, 350)
    }
    const raf = requestAnimationFrame(go)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t)
    }
  }, [old])
  const Page = ROUTES[path] || Home
  return (
    <>
      <Nav />
      <main id="main">
        <Page />
      </main>
      <Footer />
      {Page === Home && <CtaBar />}
    </>
  )
}
