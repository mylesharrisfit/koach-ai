import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { Reveal } from './ui'

const STATS = [
  { value: 10, suffix: 'x', label: 'faster program creation' },
  { value: 12, suffix: 'hrs', label: 'saved per week on admin' },
  { value: 94, suffix: '%', label: 'client retention rate' },
  { value: 3, suffix: 'x', label: 'more clients per coach' },
]

function Counter({ to, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref} className="text-gradient text-4xl font-extrabold sm:text-5xl">
      {val}
      {suffix}
    </span>
  )
}

export default function Metrics() {
  return (
    <section className="relative py-16">
      <div className="container-x">
        <Reveal>
          <div className="glass rounded-3xl px-6 py-10 sm:px-10">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <Counter to={s.value} suffix={s.suffix} />
                  <p className="mt-2 text-sm text-white/55">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
