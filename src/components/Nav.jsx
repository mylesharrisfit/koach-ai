import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import Icon from './Icons'
import { LOGIN_URL, SIGNUP_URL } from '../lib/config'

export const FEATURE_LINKS = [
  ['coach', 'Coaching', 'Programs, templates and the AI builder'],
  ['nutrition', 'Nutrition', 'Meal plans and macro tracking'],
  ['checkins', 'Check-ins', 'A review queue with AI-drafted replies'],
  ['app', 'Client app', 'Workout logging and messaging'],
  ['business', 'Business', 'Payments, scheduling and revenue'],
]
export const WHO_LINKS = [
  ['Online coaches', 'Run a full roster remotely'],
  ['Hybrid coaches', 'In-person and online clients together'],
  ['Nutrition coaches', 'Meal plans and macro targets'],
  ['Small teams', 'Team seats and shared AI'],
]

function Dropdown({ label, children }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const btn = useRef(null)
  const hovering = useRef(false)
  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={(e) => { if (e.nativeEvent.pointerType !== 'touch') { hovering.current = true; setOpen(true) } }}
      onMouseLeave={() => { hovering.current = false; setOpen(false) }}
      onKeyDown={(e) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus() } }}
      onBlur={(e) => { if (!ref.current.contains(e.relatedTarget)) setOpen(false) }}
    >
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => (hovering.current ? true : !o))}
        className="flex h-10 items-center gap-1 rounded-lg px-3 text-[15px] font-medium text-white/85 hover:text-white"
      >
        {label}
        <Icon name="chevron" size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 pt-2">
          <ul className="w-72 rounded-xl border border-line bg-white p-2 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)]" onClick={() => setOpen(false)}>
            {children}
          </ul>
        </div>
      )}
    </div>
  )
}

const MenuLink = ({ href, title, desc, tab }) => (
  <li>
    <a href={href} data-tab={tab} className="block rounded-lg px-3 py-2.5 hover:bg-mist">
      <span className="block text-[15px] font-semibold text-ink">{title}</span>
      <span className="block text-sm text-mut">{desc}</span>
    </a>
  </li>
)

// After 40px the bar shrinks slightly and turns translucent with a blur; on desktop it slides away
// on a fast scroll down and comes back on any scroll up. Transform/opacity only, so nothing below moves.
function useNavScroll(locked) {
  const [scrolled, setScrolled] = useState(false)
  const [away, setAway] = useState(false)
  useEffect(() => {
    let last = scrollY
    let raf = 0
    const desk = matchMedia('(min-width: 1024px)')
    const update = () => {
      raf = 0
      const y = scrollY
      const dy = y - last
      last = y
      setScrolled(y > 40)
      if (!desk.matches || locked.current?.() || y < 200) return setAway(false)
      if (dy > 14) setAway(true)
      else if (dy < -2) setAway(false)
    }
    const on = () => (raf ||= requestAnimationFrame(update))
    addEventListener('scroll', on, { passive: true })
    update()
    return () => {
      removeEventListener('scroll', on)
      cancelAnimationFrame(raf)
    }
  }, [locked])
  return [scrolled, away]
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const lock = useRef(null)
  const headRef = useRef(null)
  const [scrolled, away] = useNavScroll(lock)
  lock.current = () => open || !!headRef.current?.matches(':focus-within, :hover')
  useEffect(() => {
    if (!open) return
    const on = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', on)
    return () => document.removeEventListener('keydown', on)
  }, [open])
  const close = () => setOpen(false)
  const link = 'rounded-lg px-3 text-[15px] font-medium text-white/85 hover:text-white'

  return (
    <header ref={headRef} className={`navwrap dark-zone sticky top-0 z-40 h-16 ${scrolled ? 'is-scrolled' : ''} ${away && !open ? 'is-away' : ''}`}>
      <a href="#main" className="sr-only-focusable absolute left-3 top-3 z-50 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-ink">Skip to content</a>
      <i className="nav-bg" aria-hidden="true" />
      <div className="nav-row wrap relative flex h-16 items-center justify-between gap-3">
        <a href="/" aria-label="KOACH.AI home" className="flex shrink-0 items-center rounded-lg">
          <Logo className="nav-logo h-9 sm:h-10" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <Dropdown label="Features">
            {FEATURE_LINKS.map(([tab, t, d]) => <MenuLink key={tab} href="/#features" tab={tab} title={t} desc={d} />)}
          </Dropdown>
          <Dropdown label="Who it’s for">
            {WHO_LINKS.map(([t, d]) => <MenuLink key={t} href="/#coaching-styles" title={t} desc={d} />)}
          </Dropdown>
          <a href="/#pricing" className={`${link} flex h-10 items-center`}>Pricing</a>
          <a href="/#compare" className={`${link} flex h-10 items-center`}>Compare</a>
        </nav>

        <div className="flex items-center gap-2">
          <a href={LOGIN_URL} className={`${link} hidden h-10 items-center lg:flex`}>Log in</a>
          <a href={SIGNUP_URL} className="btn btn-red !h-10 !px-3.5 !text-sm sm:!px-4 sm:!text-[15px]">Start free trial</a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg text-white lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-graphite lg:hidden">
          <nav aria-label="Mobile" className="wrap grid gap-6 py-5 text-white" onClick={(e) => e.target.closest('a') && close()}>
            <div>
              <p className="mb-1 px-1 text-sm font-semibold text-white/60">Features</p>
              {FEATURE_LINKS.map(([tab, t]) => (
                <a key={tab} href="/#features" data-tab={tab} className="block rounded-lg px-1 py-2.5 text-[17px] font-medium">{t}</a>
              ))}
            </div>
            <div>
              <p className="mb-1 px-1 text-sm font-semibold text-white/60">Who it’s for</p>
              {WHO_LINKS.map(([t]) => (
                <a key={t} href="/#coaching-styles" className="block rounded-lg px-1 py-2.5 text-[17px] font-medium">{t}</a>
              ))}
            </div>
            <div className="grid gap-1 border-t border-white/10 pt-4">
              <a href="/#pricing" className="rounded-lg px-1 py-2.5 text-[17px] font-medium">Pricing</a>
              <a href="/#compare" className="rounded-lg px-1 py-2.5 text-[17px] font-medium">Compare</a>
              <a href={LOGIN_URL} className="rounded-lg px-1 py-2.5 text-[17px] font-medium">Log in</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
