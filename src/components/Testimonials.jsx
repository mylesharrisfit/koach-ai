import { useEffect, useRef, useState } from 'react'
import { TESTIMONIALS } from '../data/testimonials'
import { usePageHidden, useRM } from '../lib/motion'

// Rendered only when src/data/testimonials.js has real entries. Auto-advances every 7s,
// pauses on hover/focus, swipes on touch (scroll-snap), dots to jump.
export default function Testimonials() {
  const list = TESTIMONIALS
  const track = useRef(null)
  const [i, setI] = useState(0)
  const [hold, setHold] = useState(false)
  const rm = useRM()
  const hidden = usePageHidden()
  const n = list.length

  useEffect(() => {
    if (rm || hold || hidden || n < 2) return
    const t = setTimeout(() => go((i + 1) % n), 7000)
    return () => clearTimeout(t)
  }, [i, rm, hold, hidden, n]) // eslint-disable-line react-hooks/exhaustive-deps

  const go = (k) => {
    setI(k)
    const el = track.current?.children[k]
    el && track.current.scrollTo({ left: el.offsetLeft, behavior: rm ? 'auto' : 'smooth' })
  }
  const onScroll = () => {
    const t = track.current
    const k = Math.round(t.scrollLeft / t.clientWidth)
    if (k !== i) setI(k)
  }

  if (!n) return null
  return (
    <section className="section" aria-roledescription="carousel" aria-label="What coaches say">
      <div className="wrap" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
        <div ref={track} onScroll={onScroll} className="flex snap-x snap-mandatory overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {list.map((t, k) => (
            <figure key={k} className="w-full flex-none snap-start px-1" aria-roledescription="slide" aria-label={`${k + 1} of ${n}`}>
              <blockquote className="font-display text-3xl font-bold leading-tight" style={{ fontStretch: '85%' }}>“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-mut">{t.name}, {t.role}</figcaption>
            </figure>
          ))}
        </div>
        {n > 1 && (
          <div className="mt-6 flex gap-1" role="group" aria-label="Choose a testimonial">
            {list.map((t, k) => (
              <button key={k} type="button" className="hdot hdot-light" aria-label={`Show testimonial ${k + 1}`} aria-pressed={k === i} onClick={() => go(k)}><i /></button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
