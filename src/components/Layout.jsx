import Logo from './Logo'
import { LOGIN_URL, signupUrl } from '../lib/config'

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-3">
        <a href="/" aria-label="KOACH AI home" className="flex shrink-0 items-center">
          <Logo variant="dark" />
        </a>
        <nav className="flex items-center gap-4 text-sm sm:gap-7">
          <a href="/#features" className="hidden text-neutral-600 hover:text-ink sm:inline">Features</a>
          <a href="/pricing" className="text-neutral-600 hover:text-ink">Pricing</a>
          <a href={LOGIN_URL} className="text-neutral-600 hover:text-ink">Log in</a>
          <a href={signupUrl('pro', 'monthly')} className="btn btn-primary !h-9 !px-3.5 sm:!px-4">
            <span className="sm:hidden">Try free</span>
            <span className="hidden sm:inline">Start free trial</span>
          </a>
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  const link = 'text-neutral-400 hover:text-white'
  return (
    <footer className="bg-ink text-sm text-neutral-400">
      <div className="wrap py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Logo variant="white" />
            <p className="mt-4 leading-relaxed">Coaching software for online fitness coaches.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-3 sm:gap-x-20">
            <div className="flex flex-col gap-3">
              <span className="text-white">Product</span>
              <a className={link} href="/#features">Features</a>
              <a className={link} href="/pricing">Pricing</a>
              <a className={link} href={LOGIN_URL}>Log in</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-white">Legal</span>
              <a className={link} href="/privacy">Privacy</a>
              <a className={link} href="/terms">Terms</a>
            </div>
          </div>
        </div>
        <p className="mt-12 border-t border-neutral-800 pt-6 text-xs">© {new Date().getFullYear()} KOACH AI. All rights reserved.</p>
      </div>
    </footer>
  )
}
