import { useEffect, useRef, useState } from 'react'
import WeekDevices, { STEPS } from './WeekDevices'
import { Divider, Reveal, SpotCard } from './fx'
import { SectionHead } from './Sections'
import { useRM, useSeen } from '../lib/motion'

function useDesktop() {
  const q = '(min-width: 1024px)'
  const [d, setD] = useState(() => matchMedia(q).matches)
  useEffect(() => {
    const mq = matchMedia(q)
    const on = () => setD(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return d
}

// Mobile: no pinning. Each day is its own device-above-text block; the device plays when the block
// scrolls in, so text never sits under or around a device.
function MobileStep({ s, n, onPick }) {
  const [ref, seen] = useSeen('0px 0px -30% 0px')
  return (
    <li ref={ref} className="wk-mstep" data-step={n}>
      <Rail step={n} onPick={onPick} still />
      <WeekDevices step={n} idle={!seen} />
      <SpotCard className="wk-card mt-5">
        <p className="eyebrow">{s.day}</p>
        <h3 className="mt-2 text-[1.7rem] !text-white">{s.title}</h3>
        <p className="lede mt-3">{s.text}</p>
      </SpotCard>
    </li>
  )
}

function Rail({ step, fillRef, onPick, still }) {
  return (
    <div className="wk-rail" role="group" aria-label="Days of the week">
      <div className="wk-rail-line"><i ref={fillRef} style={still ? { transform: `scaleX(${step / (STEPS.length - 1)})` } : undefined} /></div>
      {STEPS.map((s, n) => (
        <button key={s.day} type="button" className="wk-rail-day" aria-current={n === step ? 'step' : undefined} onClick={() => onPick(n)}>
          <i />
          {s.short}
        </button>
      ))}
    </div>
  )
}

// Pinned scrollytelling: the devices stay put (CSS sticky) while the five days scroll past.
// Scroll speed is never changed; the active day is whichever step crosses the middle of the screen.
export default function Week() {
  const rm = useRM()
  const desktop = useDesktop()
  const pinned = desktop && !rm
  const [step, setStep] = useState(0)
  const stepsRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    if (!pinned) return
    const els = [...stepsRef.current.querySelectorAll('[data-step]')]
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setStep(+e.target.dataset.step)),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    els.forEach((el) => io.observe(el))
    let raf = 0
    const update = () => {
      raf = 0
      const r = stepsRef.current.getBoundingClientRect()
      if (r.bottom < 0 || r.top > innerHeight) return
      const p = Math.min(1, Math.max(0, (innerHeight / 2 - r.top) / r.height))
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${p.toFixed(3)})`
    }
    const on = () => (raf ||= requestAnimationFrame(update))
    addEventListener('scroll', on, { passive: true })
    update()
    return () => {
      io.disconnect()
      removeEventListener('scroll', on)
      cancelAnimationFrame(raf)
    }
  }, [pinned])

  const pick = (n) => document.querySelector(`#week [data-step="${n}"]`)?.scrollIntoView({ block: pinned ? 'center' : 'start', behavior: rm ? 'auto' : 'smooth' })

  return (
    <section id="week" className="dark-zone glow relative bg-graphite pb-24 pt-16 text-white sm:pb-32 sm:pt-24">
      <div className="wrap">
        <SectionHead eyebrow="A week with KOACH" title={<span className="!text-white">One coaching week, start to finish</span>}>
          Scroll through five days. Every screen uses the real product layout with sample data.
        </SectionHead>

        {rm ? (
          <div className="mt-12 grid gap-14">
            {STEPS.map((s, n) => (
              <div key={s.day} className="grid items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div>
                  <p className="eyebrow">{s.day}</p>
                  <h3 className="mt-2 text-3xl !text-white">{s.title}</h3>
                  <p className="lede mt-3">{s.text}</p>
                </div>
                <WeekDevices step={n} />
              </div>
            ))}
          </div>
        ) : !pinned ? (
          <ol className="mt-10 grid gap-16">
            {STEPS.map((s, n) => <MobileStep key={s.day} s={s} n={n} onPick={pick} />)}
          </ol>
        ) : (
          <div className="wk-layout mt-10 lg:mt-14">
            <div className="wk-pin">
              <Rail step={step} fillRef={fillRef} onPick={pick} />
              <WeekDevices step={step} />
            </div>
            <ol ref={stepsRef} className="wk-steps">
              {STEPS.map((s, n) => (
                <li key={s.day} data-step={n} className="wk-step" aria-current={n === step ? 'step' : undefined}>
                  <Reveal from="up">
                    <SpotCard className="wk-card">
                      <p className="eyebrow">{s.day}</p>
                      <h3 className="mt-2 text-[1.7rem] !text-white sm:text-3xl">{s.title}</h3>
                      <p className="lede mt-3">{s.text}</p>
                    </SpotCard>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      <Divider fill="#EEF0F2" />
    </section>
  )
}
