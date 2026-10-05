import { useEffect, useState } from 'react'
import Icon from './Icons'
import { SIGNUP_URL } from '../lib/config'

const KEY = 'koach-cta-bar'
const seen = () => {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}
const remember = () => {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    /* storage blocked: the bar may show again, which is harmless */
  }
}

// One non-blocking bar after 60% of the page, at most once per session. Never a modal. Hidden while
// the pricing section or the final call-to-action band is on screen (they have their own buttons).
export default function CtaBar() {
  const [show, setShow] = useState(false)
  const [gone, setGone] = useState(seen)
  const [zoneInView, setZoneInView] = useState(false)

  useEffect(() => {
    if (gone) return
    let raf = 0
    const check = () => {
      raf = 0
      const h = document.documentElement.scrollHeight
      if ((scrollY + innerHeight) / h > 0.6) {
        setShow(true)
        remember()
      }
    }
    const on = () => (raf ||= requestAnimationFrame(check))
    addEventListener('scroll', on, { passive: true })
    return () => {
      removeEventListener('scroll', on)
      cancelAnimationFrame(raf)
    }
  }, [gone])

  useEffect(() => {
    const els = ['pricing', 'get-started'].map((id) => document.getElementById(id)).filter(Boolean)
    const on = new Set()
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => (e.isIntersecting ? on.add(e.target) : on.delete(e.target)))
      setZoneInView(on.size > 0)
    }, { threshold: 0 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  if (gone && !show) return null
  const visible = show && !gone && !zoneInView
  return (
    <div className={`ctabar dark-zone ${visible ? 'is-on' : ''}`} role="region" aria-label="Free trial" aria-hidden={!visible} inert={!visible ? '' : undefined}>
      <p className="font-semibold text-white">Start your 30-day free trial</p>
      <a href={SIGNUP_URL} className="btn btn-red !h-10 !px-4 !text-sm">Start free trial</a>
      <button type="button" onClick={() => setGone(true)} className="grid h-10 w-10 flex-none place-items-center rounded-lg text-white hover:bg-white/10" aria-label="Close">
        <Icon name="close" size={18} />
      </button>
    </div>
  )
}
