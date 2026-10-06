import { useLayoutEffect, useRef, useState } from 'react'
import { ProgramDemo } from './TryIt'
import WorkoutDemo from './WorkoutDemo'
import { SectionHead } from './Sections'
import Icon from './Icons'
import StagePhoto from './StagePhoto'

// "Try it yourself": one segmented control, two hands-on demos (coach side and client side).
const TABS = [
  ['program', 'Build a program', 'clipboard'],
  ['workout', 'Log a workout', 'timer'],
]
const WORKOUT_STEPS = [
  ['Set the weight and reps', 'Use the steppers or the +2.5, +5 and +10 chips. Last time’s numbers sit above.'],
  ['Log the set', 'LOG SET flashes green and the Rest Time screen takes over, with the next set lined up.'],
  ['Rest or skip', 'The coach sets the rest per exercise (30 seconds here). Skip Rest whenever you’re ready.'],
  ['Finish', 'Finish Workout for the Workout Complete summary: duration, sets, volume and a rating.'],
]

export function Segmented({ tabs, value, onChange, label, idBase }) {
  const list = useRef(null)
  const [pill, setPill] = useState({ x: 0, w: 0 })
  useLayoutEffect(() => {
    const el = list.current?.querySelector('[aria-selected="true"]')
    if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth })
  }, [value])
  const onKey = (e) => {
    const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (!d) return
    e.preventDefault()
    const i = (tabs.findIndex((t) => t[0] === value) + d + tabs.length) % tabs.length
    onChange(tabs[i][0])
    list.current.querySelectorAll('[role="tab"]')[i].focus()
  }
  return (
    <div ref={list} role="tablist" aria-label={label} className="seg" onKeyDown={onKey}>
      <span className="seg-pill" style={{ width: pill.w, transform: `translateX(${pill.x}px)` }} aria-hidden="true" />
      {tabs.map(([id, t, icon]) => (
        <button
          key={id}
          id={`${idBase}-tab-${id}`}
          role="tab"
          type="button"
          aria-selected={value === id}
          aria-controls={`${idBase}-panel`}
          tabIndex={value === id ? 0 : -1}
          onClick={() => onChange(id)}
          className="inline-flex items-center gap-2"
        >
          {icon && <Icon name={icon} size={18} />}
          {t}
        </button>
      ))}
    </div>
  )
}

export default function Playground() {
  const [tab, setTab] = useState('program')
  return (
    <section id="try-it" className="bg-mist section">
      <div className="wrap">
        <SectionHead eyebrow="Try it yourself" title="Coach side and client side, hands on" center>
          Demos with sample data. Nothing you do here is stored.
        </SectionHead>
        <div className="mt-8 flex justify-center">
          <Segmented tabs={TABS} value={tab} onChange={setTab} label="Choose a demo" idBase="pg" />
        </div>
        <div id="pg-panel" role="tabpanel" aria-labelledby={`pg-tab-${tab}`} key={tab} className="pg-panel mt-10">
          {tab === 'program' ? (
            <ProgramDemo />
          ) : (
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h3 className="h-mega text-[2rem] sm:text-[2.6rem]">Log a workout like your clients do</h3>
                <p className="lede mt-3">A working copy of the KOACH client app’s workout screen, with sample data. Weight and reps set by set, a rest timer between them, and a summary at the end.</p>
                <ol className="mt-7 grid gap-4">
                  {WORKOUT_STEPS.map(([t, d], n) => (
                    <li key={t} className="flex gap-4">
                      <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-ink font-display text-sm font-extrabold text-white">{n + 1}</span>
                      <span><b className="block">{t}</b><span className="text-[15px] text-mut">{d}</span></span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="stage-blue py-10">
                <StagePhoto slot="workout" />
                <WorkoutDemo />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
