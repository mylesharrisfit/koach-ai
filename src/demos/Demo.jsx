import { useEffect, useRef, useState } from 'react'
import { clamp } from './engine'

// Each scene is its own chunk, fetched when its section is near the viewport.
const SCENES = {
  hero: () => import('./scenes/hero.jsx'),
  builder: () => import('./scenes/builder.jsx'),
  meals: () => import('./scenes/meals.jsx'),
  checkin: () => import('./scenes/checkin.jsx'),
  app: () => import('./scenes/app.jsx'),
  business: () => import('./scenes/business.jsx'),
  today: () => import('./scenes/today.jsx'),
}
const loaded = {}

const HOLD = 2 // seconds on the final frame
const FADE_IN = 0.35
const FADE_OUT = 0.5

export const stopClock = (c) => (c?.cancel ? c.cancel() : c?.stop?.())

export function useReducedMotion() {
  const [r, setR] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setR(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return r
}

const PauseIcon = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    <rect x="2" y="1.5" width="3" height="9" rx="0.8" />
    <rect x="7" y="1.5" width="3" height="9" rx="0.8" />
  </svg>
)
const PlayIcon = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
    <path d="M3 1.8v8.4a.6.6 0 0 0 .9.5l6.5-4.2a.6.6 0 0 0 0-1L3.9 1.3a.6.6 0 0 0-.9.5Z" />
  </svg>
)

export function PauseButton({ paused, onToggle, innerRef }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={paused ? 'Play animation' : 'Pause animation'}
      className="kd-pause"
      ref={innerRef}
      style={{ visibility: 'hidden' }}
    >
      {paused ? PlayIcon : PauseIcon}
    </button>
  )
}

export default function Demo({ scene, label, className = '', paused, onPausedChange, control = true }) {
  const wrapRef = useRef(null)
  const stageRef = useRef(null)
  const sceneRef = useRef(null)
  const btnRef = useRef(null)
  const ctlRef = useRef(null)
  const tRef = useRef(0)
  const [mod, setMod] = useState(loaded[scene] || null)
  const [visible, setVisible] = useState(false)
  const [hidden, setHidden] = useState(typeof document !== 'undefined' && document.hidden)
  const [ready, setReady] = useState(false)
  const [localPaused, setLocalPaused] = useState(false)
  const reduced = useReducedMotion()
  const isPaused = paused ?? localPaused

  // fetch the scene's code when near the viewport
  useEffect(() => {
    if (mod) return
    const el = wrapRef.current
    let off = false
    const load = () =>
      SCENES[scene]().then((m) => {
        loaded[scene] = m
        if (!off) setMod(m)
      })
    if (!('IntersectionObserver' in window)) {
      load()
      return
    }
    const io = new IntersectionObserver(
      (e) => {
        if (e.some((x) => x.isIntersecting)) {
          io.disconnect()
          load()
        }
      },
      { rootMargin: '900px 0px' },
    )
    io.observe(el)
    return () => {
      off = true
      io.disconnect()
    }
  }, [scene, mod])

  // on screen?
  useEffect(() => {
    const el = wrapRef.current
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver((e) => setVisible(e[e.length - 1].isIntersecting), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const on = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', on)
    return () => document.removeEventListener('visibilitychange', on)
  }, [])

  // the button sits in the top-right corner of the demo's frame (8px inset). It lives outside the
  // aria-hidden stage so it stays reachable, and is positioned from the frame's measured box.
  const placeBtn = useRef(() => {})
  placeBtn.current = () => {
    const f = stageRef.current?.querySelector('.kd-browser, .kd-phone')
    const b = btnRef.current
    if (!f || !b) return
    const w = wrapRef.current.getBoundingClientRect()
    const r = f.getBoundingClientRect()
    b.style.left = `${r.right - w.left - 8 - 24}px`
    b.style.top = `${r.top - w.top + 8}px`
    b.style.visibility = 'visible'
  }
  useEffect(() => {
    if (ready) placeBtn.current()
  }, [ready, reduced])

  // build the scene once its markup is in the DOM; re-measure on resize
  useEffect(() => {
    if (!mod) return
    const stage = stageRef.current
    const s = mod.create(stage)
    sceneRef.current = s
    const refresh = () => {
      s.render(mod.dur) // everything at rest while measuring
      s.measure()
      s.render(reduced ? mod.dur : tRef.current)
      placeBtn.current()
    }
    refresh()
    setReady(true)
    let raf = 0
    const ro = 'ResizeObserver' in window ? new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(refresh) }) : null
    ro?.observe(stage)
    return () => {
      ro?.disconnect()
      cancelAnimationFrame(raf)
      stopClock(ctlRef.current)
      ctlRef.current = null
      sceneRef.current = null
      setReady(false)
    }
  }, [mod, reduced])

  // play / pause
  const shouldPlay = ready && !reduced && visible && !hidden && !isPaused
  useEffect(() => {
    const s = sceneRef.current
    if (!s) return
    if (reduced) {
      stageRef.current.style.opacity = 1
      return
    }
    if (!shouldPlay) {
      ctlRef.current?.pause()
      return
    }
    if (ctlRef.current) {
      ctlRef.current.play()
      return
    }
    let cancelled = false
    const cycle = mod.dur + HOLD + FADE_OUT
    import('motion').then(({ animate }) => {
      if (cancelled || ctlRef.current || !sceneRef.current) return
      ctlRef.current = animate(0, cycle, {
        duration: cycle,
        ease: 'linear',
        repeat: Infinity,
        onUpdate: (v) => {
          if (!stageRef.current || sceneRef.current !== s) return
          const t = Math.min(v, mod.dur)
          tRef.current = t
          s.render(t)
          const o = v < FADE_IN ? v / FADE_IN : v > mod.dur + HOLD ? 1 - (v - mod.dur - HOLD) / FADE_OUT : 1
          stageRef.current.style.opacity = clamp(o)
        },
      })
    })
    return () => {
      cancelled = true
    }
  }, [shouldPlay, ready, reduced, mod])

  const Markup = mod?.Markup
  return (
    <div ref={wrapRef} role="group" aria-label={label} className={`kd-wrap ${className}`}>
      <div ref={stageRef} aria-hidden="true" className={`kd-stage kd-s-${scene}`}>
        {Markup ? <Markup /> : null}
      </div>
      {control && ready && !reduced && (
        <PauseButton innerRef={btnRef} paused={isPaused} onToggle={() => (onPausedChange ? onPausedChange(!isPaused) : setLocalPaused((p) => !p))} />
      )}
    </div>
  )
}
