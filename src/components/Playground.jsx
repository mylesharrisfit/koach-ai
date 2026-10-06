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
  ['Check off a set', 'The check draws in and the rest timer slides up.'],
  ['Rest, or keep scrolling', 'Minimise the timer to a pill. It tells you when to go again.'],
  ['Beat your best', 'Put 325 lb on the last set and watch the new-best flag.'],
  ['Finish', 'See sets, volume and new bests for the session.'],
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
                <p className="lede mt-3">The client app, with sample data. Weight and reps set by set, a rest timer between them, and new bests flagged as they happen.</p>
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
