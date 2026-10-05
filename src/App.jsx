import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
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
  const Page = ROUTES[path] || Home
  return (
    <>
      <Nav />
      <main id="main">
        <Page />
      </main>
      <Footer />
    </>
  )
}
