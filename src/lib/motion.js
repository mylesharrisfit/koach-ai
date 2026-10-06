import { useEffect, useRef, useState } from 'react'

// One switch for "no motion": <html class="rm"> is set when the OS asks for reduced motion or the
// visitor presses "Pause animations" in the footer. CSS and JS both read it, so every animation on
// the site falls back to its static final state from the same place.
const html = () => document.documentElement
const mq = () => window.matchMedia('(prefers-reduced-motion: reduce)')
let userPaused = false

function sync() {
  html().classList.toggle('rm', mq().matches || userPaused)
}

export function initMotion() {
  html().classList.add('js') // reveal styles only apply once JS is running
  sync()
  mq().addEventListener('change', sync)
}

export const systemReduced = () => mq().matches
export const isRM = () => html().classList.contains('rm')
export function setUserPaused(on) {
  userPaused = on
  sync()
}

export function useRM() {
  const [rm, setRm] = useState(isRM)
  useEffect(() => {
    const mo = new MutationObserver(() => setRm(isRM()))
    mo.observe(html(), { attributes: true, attributeFilter: ['class'] })
    setRm(isRM())
    return () => mo.disconnect()
  }, [])
  return rm
}

export function usePageHidden() {
  const [h, setH] = useState(() => document.hidden)
  useEffect(() => {
    const on = () => setH(document.hidden)
    document.addEventListener('visibilitychange', on)
    return () => document.removeEventListener('visibilitychange', on)
  }, [])
  return h
}

// true while the element is on screen
export function useOnScreen(ref, threshold = 0.15, initial = false) {
  const [on, setOn] = useState(initial)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return setOn(true)
    const io = new IntersectionObserver((e) => setOn(e[e.length - 1].isIntersecting), { threshold })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [ref, threshold])
  return on
}

// true once the element has been seen (never goes back)
export function useSeen(rootMargin = '0px 0px -8% 0px') {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return setSeen(true)
    const io = new IntersectionObserver(
      (e) => {
        if (e.some((x) => x.isIntersecting)) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold: 0.1 },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [rootMargin])
  return [ref, seen]
}

// small number tween (text only) used for counters and rolling prices
export function tween(from, to, dur, onUpdate, onDone) {
  const t0 = performance.now()
  let raf = 0
  const step = (now) => {
    const p = Math.min(1, (now - t0) / (dur * 1000))
    const e = 1 - Math.pow(1 - p, 3)
    onUpdate(from + (to - from) * e)
    if (p < 1) raf = requestAnimationFrame(step)
    else onDone?.()
  }
  raf = requestAnimationFrame(step)
  return () => cancelAnimationFrame(raf)
}
