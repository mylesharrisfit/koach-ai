import { useEffect, useRef, useState } from 'react'
import WeekDevices, { STEPS } from './WeekDevices'
import { Divider, Reveal, SpotCard } from './fx'
import { SectionHead } from './Sections'
import { useRM } from '../lib/motion'

function Rail({ step, fillRef, onPick }) {
  return (
    <div className="wk-rail" role="group" aria-label="Days of the week">
      <div className="wk-rail-line"><i ref={fillRef} /></div>
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
  const [step, setStep] = useState(0)
  const stepsRef = useRef(null)
  const fillRef = useRef(null)

  useEffect(() => {
    if (rm) return
    const els = [...stepsRef.current.querySelectorAll('[data-step]')]
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setStep(+e.target.dataset.step)),
      // desktop: the middle of the screen; mobile: a line below the pinned device
      { rootMargin: matchMedia('(min-width: 1024px)').matches ? '-45% 0px -45% 0px' : '-70% 0px -26% 0px' },
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
  }, [rm])

  const pick = (n) => stepsRef.current.querySelector(`[data-step="${n}"]`)?.scrollIntoView({ block: 'center', behavior: rm ? 'auto' : 'smooth' })

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
