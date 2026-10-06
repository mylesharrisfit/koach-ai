import { useEffect, useRef, useState } from 'react'
import WeekDevices, { STEPS } from './WeekDevices'
import Icon from './Icons'
import { useRM } from '../lib/motion'
import { SIGNUP_URL } from '../lib/config'

const CHAPTER = 6000 // ms per day; 5 days = 30 seconds

// The only modal on the site, opened by the visitor. Native <dialog>: Esc closes, the page behind
// is inert (focus stays inside), and focus returns to the button that opened it.
export default function Tour({ onClose }) {
  const dlg = useRef(null)
  const opener = useRef(document.activeElement)
  const closeCb = useRef(onClose)
  closeCb.current = onClose
  const rm = useRM()
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)
  const playing = !rm && !paused

  useEffect(() => {
    const d = dlg.current
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    d.showModal()
    const back = opener.current
    const closed = () => closeCb.current()
    d.addEventListener('close', closed)
    return () => {
      d.removeEventListener('close', closed)
      document.documentElement.style.overflow = prev
      back?.focus?.()
    }
  }, [])

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), CHAPTER)
    return () => clearTimeout(t)
  }, [playing, step])

  const close = () => dlg.current?.close()
  const s = STEPS[step]
  return (
    <dialog ref={dlg} className="tour dark-zone" aria-labelledby="tour-title" onClick={(e) => e.target === dlg.current && close()}>
      <div className="tour-in">
        <div className="flex items-center justify-between gap-4">
          <h2 id="tour-title" className="text-2xl !text-white sm:text-3xl">A week with KOACH</h2>
          <button type="button" autoFocus onClick={close} className="grid h-10 w-10 place-items-center rounded-lg border border-white/25 text-white hover:bg-white/10" aria-label="Close tour">
            <Icon name="close" size={20} />
          </button>
        </div>
        <div className="tour-stage mt-5">
          <WeekDevices step={step} />
        </div>
        <p className="mt-5 min-h-[3.2em] text-[17px] leading-snug text-white" aria-live="polite">
          <b className="font-display font-bold" style={{ fontStretch: '85%' }}>{s.day}. {s.title}.</b> <span className="text-[#b9bfca]">{s.text}</span>
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="flex gap-1" role="group" aria-label="Chapters">
            {STEPS.map((x, n) => (
              <button key={x.day} type="button" className="tour-dot" aria-label={x.day} aria-current={n === step ? 'step' : undefined} onClick={() => setStep(n)}>
                <span>{x.short}</span>
                <i>{n === step && playing && <i key={step} className="tour-fill" style={{ animationDuration: `${CHAPTER}ms` }} />}</i>
              </button>
            ))}
          </div>
          {!rm && (
            <button type="button" onClick={() => setPaused((p) => !p)} className="btn btn-outline-dark !h-10 !px-3.5" aria-label={paused ? 'Play tour' : 'Pause tour'}>
              <Icon name={paused ? 'play' : 'pause'} size={16} /> {paused ? 'Play' : 'Pause'}
            </button>
          )}
          <a href={SIGNUP_URL} className="btn btn-brand ml-auto">Start free trial</a>
        </div>
        <p className="mt-3 text-xs text-[#b9bfca]">Sample data. 30 seconds, five days.</p>
      </div>
    </dialog>
  )
}
