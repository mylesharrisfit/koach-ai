import { useEffect, useRef, useState } from 'react'
import CtaForm from './CtaForm'
import Demo, { useReducedMotion } from '../demos/Demo'

const WORDS = ['online coaches', 'hybrid coaches', 'nutrition coaches', 'small teams']

function useOnScreen(ref) {
  const [on, setOn] = useState(true)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver((e) => setOn(e[e.length - 1].isIntersecting), { threshold: 0.1 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [ref])
  return on
}

export default function Hero() {
  const ref = useRef(null)
  const [paused, setPaused] = useState(false)
  const [i, setI] = useState(0)
  const [hidden, setHidden] = useState(false)
  const reduced = useReducedMotion()
  const onScreen = useOnScreen(ref)

  useEffect(() => {
    const on = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', on)
    return () => document.removeEventListener('visibilitychange', on)
  }, [])

  useEffect(() => {
    if (reduced || paused || hidden || !onScreen) return
    const id = setInterval(() => setI((x) => (x + 1) % WORDS.length), 2800)
    return () => clearInterval(id)
  }, [reduced, paused, hidden, onScreen])

  return (
    <section ref={ref} className="dark-zone relative overflow-hidden bg-graphite pb-16 pt-10 text-white sm:pb-24 sm:pt-16">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h1 className="text-[2.45rem] !leading-[1.02] !text-white sm:text-[3.5rem] lg:text-[3rem] xl:text-[3.5rem]">
            The all-in-one coaching OS for
            <span className="mt-1 block">
              <span className="inline-grid whitespace-nowrap">
                {WORDS.map((w, n) => (
                  <span
                    key={w}
                    aria-hidden={n !== i}
                    className="col-start-1 row-start-1 transition-[opacity,transform] duration-300 ease-out"
                    style={{ opacity: n === i ? 1 : 0, transform: n === i ? 'none' : 'translateY(10px)' }}
                  >
                    {w}
                  </span>
                ))}
              </span>
              <span className="mt-2 block h-1.5 w-20 rounded-full bg-red" aria-hidden="true" />
            </span>
          </h1>
          <p className="lede mt-6 max-w-md">
            Programs, nutrition, check-ins, a client app and payments in one place, with AI that drafts and you review before anything reaches a client.
          </p>
          <CtaForm id="hero-email" className="mt-8" />
        </div>
        <div className="mx-auto w-full max-w-[720px] lg:col-span-7">
          <Demo
            scene="hero"
            paused={paused}
            onPausedChange={setPaused}
            label="Animated demo. A coach dashboard lists who needs attention today. The coach opens an overdue check-in and it turns green, while a client's phone logs the last set of a workout and a notification appears on the dashboard."
          />
        </div>
      </div>
    </section>
  )
}
