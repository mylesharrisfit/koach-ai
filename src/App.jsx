import { Nav, Footer } from './components/Layout'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import { Privacy, Terms } from './pages/Legal'

const ROUTES = {
  '/': Home,
  '/pricing': Pricing,
  '/login': Login,
  '/privacy': Privacy,
  '/terms': Terms,
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const Page = ROUTES[path] || Home
  return (
    <>
      <Nav />
      <main>
        <Page />
      </main>
      <Footer />
    </>
  )
}
