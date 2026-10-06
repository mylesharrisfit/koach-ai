import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import Icon from './Icons'
import Piece from './Pieces'
import { LOGIN_URL, SIGNUP_URL } from '../lib/config'
import { FEATURES, GROUPS, featureUrl } from '../lib/features'

export const WHO_LINKS = [
  ['Online coaches', 'Run a full roster remotely'],
  ['Hybrid coaches', 'In-person and online clients together'],
  ['Nutrition coaches', 'Meal plans and macro targets'],
  ['Small teams', 'Team seats and shared AI'],
]
const GROUP_ICON = { coach: 'clipboard', engage: 'message', manage: 'chart', scale: 'tag' }
const groupLinks = (g) => [
  ...g.pages.map((s) => [FEATURES[s].nav, FEATURES[s].desc, featureUrl(s)]),
  ...(g.extra || []),
]

// Opens on hover (with a short grace period so the pointer can travel into the panel) or on click.
// Esc closes and returns focus to the button. The panel fades down 6px over 160ms.
function useHoverMenu() {
  const [open, setOpen] = useState(false)
  const t = useRef(0)
  const btn = useRef(null)
  const wrap = useRef(null)
  const enter = (e) => {
    if (e.pointerType === 'touch') return
    clearTimeout(t.current)
    t.current = setTimeout(() => setOpen(true), 60)
  }
  const leave = () => {
    clearTimeout(t.current)
    t.current = setTimeout(() => setOpen(false), 140)
  }
  useEffect(() => () => clearTimeout(t.current), [])
  const props = {
    ref: wrap,
    onPointerEnter: enter,
    onPointerLeave: leave,
    onKeyDown: (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false)
        btn.current?.focus()
      }
    },
    onBlur: (e) => !wrap.current.contains(e.relatedTarget) && setOpen(false),
  }
  return { open, setOpen, btn, props }
}

function MegaMenu() {
  const { open, setOpen, btn, props } = useHoverMenu()
  const [g, setG] = useState(0)
  const group = GROUPS[g]
  return (
    <div {...props}>
      <button ref={btn} type="button" aria-expanded={open} aria-controls="mega" onClick={() => setOpen((o) => !o)} className="nav-link flex h-10 items-center gap-1">
        Features
        <Icon name="chevron" size={16} className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div id="mega" className="mega" onClick={(e) => e.target.closest('a') && setOpen(false)}>
          <div className="mega-in">
            <div className="mega-cols">
              {GROUPS.map((x, n) => (
                <div key={x.id} className="mega-col" data-on={n === g ? '' : undefined} onPointerEnter={() => setG(n)} onFocus={() => setG(n)}>
                  <h3><Icon name={GROUP_ICON[x.id]} size={16} />{x.label}</h3>
                  <ul>
                    {groupLinks(x).map(([t, d, href]) => (
                      <li key={t}><a className="mega-link" href={href}><b>{t}</b><span>{d}</span></a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mega-prev stage-blue !rounded-none" aria-hidden="true">
              <div key={group.id} className="mega-prev-in">
                {group.preview.map((k) => <Piece key={k} k={k} />)}
              </div>
              <p>{group.label}: {group.blurb}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Dropdown({ label, children }) {
  const { open, setOpen, btn, props } = useHoverMenu()
  return (
    <div className="relative" {...props}>
      <button ref={btn} type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="nav-link flex h-10 items-center gap-1">
        {label}
        <Icon name="chevron" size={16} className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 pt-2.5">
          <ul className="drop w-72 rounded-2xl bg-white p-2 shadow-[0_24px_48px_-16px_rgba(11,31,92,0.35)] ring-1 ring-ink/10" onClick={() => setOpen(false)}>
            {children}
          </ul>
        </div>
      )}
    </div>
  )
}

// After 40px the bar turns translucent with a blur; on desktop it slides away on a fast scroll down
// and comes back on any scroll up. Transform/opacity only, so nothing below moves.
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

function MobileGroup({ label, links }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-line">
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between py-4 text-left text-[17px] font-bold">
        {label}
        <Icon name="plus" size={20} className={`faq-plus ${open ? 'is-open' : ''}`} />
      </button>
      <div className="m-acc" data-open={open ? '' : undefined}>
        <div>
          <ul className="grid gap-1 pb-4">
            {links.map(([t, d, href]) => (
              <li key={t}>
                <a href={href} className="block rounded-xl px-3 py-2.5 hover:bg-mist">
                  <span className="block font-semibold">{t}</span>
                  {d && <span className="block text-sm text-mut">{d}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
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

  return (
    <header ref={headRef} className={`navwrap sticky top-0 z-40 h-16 ${scrolled ? 'is-scrolled' : ''} ${away && !open ? 'is-away' : ''}`}>
      <a href="#main" className="sr-only-focusable absolute left-3 top-3 z-50 rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-white">Skip to content</a>
      <i className="nav-bg" aria-hidden="true" />
      <div className="nav-row wrap relative flex h-16 items-center justify-between gap-3">
        <a href="/" aria-label="KOACH.AI home" className="flex shrink-0 items-center rounded-lg">
          <Logo dark className="nav-logo h-9 sm:h-10" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <MegaMenu />
          <Dropdown label="Who it’s for">
            {WHO_LINKS.map(([t, d]) => (
              <li key={t}>
                <a href="/#coaching-styles" className="block rounded-xl px-3 py-2.5 hover:bg-mist">
                  <span className="block text-[15px] font-semibold text-ink">{t}</span>
                  <span className="block text-sm text-mut">{d}</span>
                </a>
              </li>
            ))}
          </Dropdown>
          <a href="/#pricing" className="nav-link flex h-10 items-center">Pricing</a>
          <a href="/#compare" className="nav-link flex h-10 items-center">Compare</a>
        </nav>

        <div className="flex items-center gap-2">
          <a href={LOGIN_URL} className="nav-link hidden h-10 items-center lg:flex">Sign in</a>
          <a href={SIGNUP_URL} className="btn btn-brand !h-10 !px-4 !text-sm sm:!text-[15px]">Start free trial</a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-mist lg:hidden"
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
        <div id="mobile-menu" className="drop absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-white shadow-[0_24px_40px_-20px_rgba(0,0,0,0.3)] lg:hidden">
          <nav aria-label="Mobile" className="wrap pb-6 pt-2 text-ink" onClick={(e) => e.target.closest('a') && close()}>
            {GROUPS.map((g) => <MobileGroup key={g.id} label={g.label} links={groupLinks(g)} />)}
            <MobileGroup label="Who it’s for" links={WHO_LINKS.map(([t, d]) => [t, d, '/#coaching-styles'])} />
            <div className="grid gap-1 pt-3">
              <a href="/#pricing" className="rounded-xl px-1 py-2.5 text-[17px] font-bold">Pricing</a>
              <a href="/#compare" className="rounded-xl px-1 py-2.5 text-[17px] font-bold">Compare</a>
              <a href={LOGIN_URL} className="rounded-xl px-1 py-2.5 text-[17px] font-bold">Sign in</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
