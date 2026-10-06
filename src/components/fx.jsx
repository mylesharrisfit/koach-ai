import { Children, Fragment, cloneElement, isValidElement, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { isRM, tween, useRM } from '../lib/motion'

/* ---------- scroll reveal ----------
   <Reveal from="up|left|right|fade|grow" i={n}>: plays once when it enters the viewport.
   Hidden only while <html class="js"> is set, so nothing is hidden if JavaScript fails. */
let io = null
const observer = () => {
  if (io) return io
  io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.setAttribute('data-in', '')
          io.unobserve(e.target)
        }
      }),
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  )
  return io
}
export function useRevealRef() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.setAttribute('data-in', '')
      return
    }
    observer().observe(el)
    return () => io?.unobserve(el)
  }, [])
  return ref
}
export function Reveal({ as: T = 'div', from = 'up', i = 0, style, children, ...rest }) {
  const ref = useRevealRef()
  return (
    <T ref={ref} data-rv={from} style={{ '--i': i, ...style }} {...rest}>
      {children}
    </T>
  )
}

/* ---------- numbers: count up on first view, roll to new values afterwards ---------- */
export function Num({ value, format = (n) => String(Math.round(n)), dur = 0.7 }) {
  const ref = useRef(null)
  const shown = useRef(null)
  const seen = useRef(false)
  useLayoutEffect(() => {
    const el = ref.current
    if (isRM() || !('IntersectionObserver' in window)) {
      el.textContent = format(value)
      shown.current = value
      return
    }
    if (!seen.current) {
      el.textContent = format(0)
      const o = new IntersectionObserver((e) => {
        if (!e.some((x) => x.isIntersecting)) return
        o.disconnect()
        seen.current = true
        tween(0, value, dur * 1.6, (v) => (el.textContent = format(v)))
        shown.current = value
      }, { threshold: 0.4 })
      o.observe(el)
      return () => o.disconnect()
    }
    const from = shown.current ?? value
    shown.current = value
    return tween(from, value, dur, (v) => (el.textContent = format(v)))
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps
  return <span ref={ref}>{format(value)}</span>
}

/* ---------- floating UI cards around mockups (bob loop + scroll parallax) ---------- */
export function useParallax(ref, enabled = true, dep) {
  const rm = useRM()
  useEffect(() => {
    const host = ref.current
    if (!host || rm || !enabled) return
    const items = [...host.querySelectorAll('[data-depth]')]
    let raf = 0
    const update = () => {
      raf = 0
      const r = host.getBoundingClientRect()
      if (r.bottom < 0 || r.top > innerHeight) return
      const c = r.top + r.height / 2 - innerHeight / 2
      for (const n of items) {
        const y = Math.max(-36, Math.min(36, -c * n.dataset.depth))
        n.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`
      }
    }
    const on = () => (raf ||= requestAnimationFrame(update))
    addEventListener('scroll', on, { passive: true })
    update()
    return () => {
      removeEventListener('scroll', on)
      cancelAnimationFrame(raf)
      items.forEach((n) => (n.style.transform = ''))
    }
  }, [ref, rm, enabled, dep])
}
export function Floaters({ items, className = '' }) {
  return (
    <div className={`fl-layer ${className}`} aria-hidden="true">
      {items.map((it, n) => (
        <div key={n} className="fl" style={it.pos} data-depth={it.depth ?? 0.05}>
          <div className="fl-bob" style={{ animationDelay: `${-n * 1.3}s` }}>{it.node}</div>
        </div>
      ))}
    </div>
  )
}

/* ---------- cursor-follow light for cards on graphite ---------- */
export function SpotCard({ as: T = 'div', className = '', children, ...rest }) {
  const s = useRef(null)
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    s.current.style.transform = `translate3d(${e.clientX - r.left - 160}px,${e.clientY - r.top - 160}px,0)`
  }
  return (
    <T className={`spot-host ${className}`} onPointerMove={move} {...rest}>
      <i ref={s} className="spot" aria-hidden="true" />
      {children}
    </T>
  )
}

/* ---------- pills ---------- */
export const AiPill = () => (
  <span className="ai-pill" title="AI-powered">
    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1l1.8 5.2L15 8l-5.2 1.8L8 15l-1.8-5.2L1 8l5.2-1.8z" /></svg>
    AI
    <i className="ai-sheen" aria-hidden="true" />
  </span>
)
export const TierPill = ({ children }) => <span className="tier-pill">{children}</span>

/* ---------- dark/light section divider: a curve that grows in on scroll ---------- */
export function Divider({ fill, top = false }) {
  const ref = useRevealRef()
  return (
    <svg
      ref={ref}
      data-rv="grow"
      className={`divider ${top ? 'divider-top' : ''}`}
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={top ? 'M0 0H1440V22C1080 48 360 48 0 22Z' : 'M0 48V26C360 0 1080 0 1440 26V48Z'} fill={fill} />
    </svg>
  )
}

/* ---------- mount a heavy section's code when it gets near the viewport ---------- */
export function LazyMount({ load, id, className = '', minH }) {
  const ref = useRef(null)
  const [C, setC] = useState(null)
  useEffect(() => {
    let off = false
    const go = () => load().then((m) => !off && setC(() => m.default))
    if (!('IntersectionObserver' in window)) {
      go()
      return
    }
    const o = new IntersectionObserver((e) => {
      if (e.some((x) => x.isIntersecting)) {
        o.disconnect()
        go()
      }
    }, { rootMargin: '1000px 0px' })
    o.observe(ref.current)
    // anchors to this section load it straight away
    if (id && location.hash === `#${id}`) go()
    return () => {
      off = true
      o.disconnect()
    }
  }, [load, id])
  if (C) return <C />
  return <div ref={ref} id={id} className={className} style={{ minHeight: minH }} />
}

// icons whose strokes draw themselves in: every shape gets pathLength=1
export function drawable(node) {
  const kids = isValidElement(node) && node.type === Fragment ? Children.toArray(node.props.children) : [node]
  return kids.map((k, n) => (isValidElement(k) ? cloneElement(k, { key: n, pathLength: 1 }) : k))
}

/* ---------- scroll-linked zoom ----------
   useScrollZoom(ref) writes two numbers on the element as it moves through the viewport:
   --zin  0 -> 1 while its top travels from the bottom of the screen to 40% of the way up (zoom in)
   --zout 0 -> 1 while its bottom travels from 40% of the way up to the top (zoom back out)
   The .zs classes in motion.css turn them into scale and tilt. One shared scroll listener. */
const zooms = new Set()
let zraf = 0
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)
function zoomUpdate() {
  zraf = 0
  const vh = innerHeight
  for (const el of zooms) {
    const r = el.getBoundingClientRect()
    if (r.bottom < -80 || r.top > vh + 80) continue
    const p = clamp01((vh - r.top) / (vh * 0.6))
    const zin = 1 - (1 - p) * (1 - p)
    const zout = clamp01((vh * 0.4 - r.bottom) / (vh * 0.4))
    el.style.setProperty('--zin', zin.toFixed(3))
    el.style.setProperty('--zout', zout.toFixed(3))
  }
}
const zoomQueue = () => (zraf ||= requestAnimationFrame(zoomUpdate))
export function useScrollZoom(ref) {
  const rm = useRM()
  useEffect(() => {
    const el = ref.current
    if (!el || rm) return
    if (!zooms.size) {
      addEventListener('scroll', zoomQueue, { passive: true })
      addEventListener('resize', zoomQueue)
    }
    zooms.add(el)
    zoomQueue()
    return () => {
      zooms.delete(el)
      el.style.removeProperty('--zin')
      el.style.removeProperty('--zout')
      if (!zooms.size) {
        removeEventListener('scroll', zoomQueue)
        removeEventListener('resize', zoomQueue)
      }
    }
  }, [ref, rm])
}
// <ZoomIn kind="stage|card|hero">: wrapper that zooms its content in on the way in and out on the way out
export function ZoomIn({ as: T = 'div', kind = 'stage', className = '', children, ...rest }) {
  const ref = useRef(null)
  useScrollZoom(ref)
  return (
    <T ref={ref} className={`zs zs-${kind} ${className}`} {...rest}>
      {children}
    </T>
  )
}

/* ---------- reading progress: a thin brand-blue bar along the top of the page ---------- */
export function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - innerHeight
      ref.current.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max).toFixed(4) : 0})`
    }
    const on = () => (raf ||= requestAnimationFrame(update))
    addEventListener('scroll', on, { passive: true })
    addEventListener('resize', on)
    update()
    return () => {
      removeEventListener('scroll', on)
      removeEventListener('resize', on)
      cancelAnimationFrame(raf)
    }
  }, [])
  return <div ref={ref} className="scroll-progress" aria-hidden="true" />
}
