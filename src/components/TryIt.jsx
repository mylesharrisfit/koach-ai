import { useEffect, useRef, useState } from 'react'
import { Browser, Spark, Check } from '../demos/ui'
import { AiPill, Reveal } from './fx'
import { useRM } from '../lib/motion'
import { SIGNUP_URL } from '../lib/config'

// Scripted demo: no AI call and nothing stored. Programs are assembled from the pre-written tables below.
const GOALS = [['fat', 'Fat loss'], ['muscle', 'Muscle'], ['perf', 'Performance']]
const DAYS = [3, 4, 5]
const EQUIP = [['gym', 'Gym'], ['home', 'Home']]
const SPLIT = {
  3: [['Mon', 'Full body A', 'full', 0], ['Wed', 'Full body B', 'full', 1], ['Fri', 'Full body C', 'full', 2]],
  4: [['Mon', 'Upper A', 'upper', 0], ['Tue', 'Lower A', 'lower', 0], ['Thu', 'Upper B', 'upper', 1], ['Fri', 'Lower B', 'lower', 1]],
  5: [['Mon', 'Push', 'push', 0], ['Tue', 'Pull', 'pull', 0], ['Wed', 'Legs', 'lower', 0], ['Fri', 'Upper', 'upper', 1], ['Sat', 'Lower', 'lower', 1]],
}
const POOL = {
  gym: {
    upper: ['Bench press', 'Lat pulldown', 'Seated cable row', 'Overhead press', 'Incline dumbbell press', 'Face pull'],
    lower: ['Back squat', 'Romanian deadlift', 'Leg press', 'Walking lunge', 'Hip thrust', 'Leg curl'],
    push: ['Bench press', 'Overhead press', 'Incline dumbbell press', 'Triceps pushdown'],
    pull: ['Pull-up', 'Seated cable row', 'Face pull', 'Barbell curl'],
    full: ['Back squat', 'Bench press', 'Barbell row', 'Romanian deadlift', 'Overhead press', 'Lat pulldown', 'Leg press', 'Incline dumbbell press', 'Seated cable row'],
  },
  home: {
    upper: ['Push-up', 'One-arm dumbbell row', 'Dumbbell floor press', 'Pike push-up', 'Band pull-apart', 'Dumbbell curl'],
    lower: ['Goblet squat', 'Dumbbell RDL', 'Split squat', 'Glute bridge', 'Step-up', 'Single-leg RDL'],
    push: ['Push-up', 'Dumbbell floor press', 'Pike push-up', 'Bench dip'],
    pull: ['One-arm dumbbell row', 'Inverted row', 'Band face pull', 'Dumbbell curl'],
    full: ['Goblet squat', 'Push-up', 'One-arm dumbbell row', 'Dumbbell RDL', 'Pike push-up', 'Split squat', 'Dumbbell floor press', 'Glute bridge', 'Inverted row'],
  },
}
const SCHEME = { fat: ['3×12', '3×12', '3×15'], muscle: ['4×8', '4×10', '3×12'], perf: ['5×3', '4×5', '3×6'] }
const LAST = { fat: ['Intervals', '10 min'], perf: ['Box jump', '4×3'] }

function makeProgram(goal, days, equip) {
  return SPLIT[days].map(([day, name, type, v]) => {
    const pool = POOL[equip][type]
    const step = type === 'full' ? 3 : 2
    const n = LAST[goal] ? 3 : 4
    const rows = Array.from({ length: n }, (_, k) => [pool[(v * step + k) % pool.length], SCHEME[goal][Math.min(k, 2)]])
    if (LAST[goal]) rows.push(LAST[goal])
    return { day, name, rows }
  })
}

function Chips({ legend, name, options, value, onChange }) {
  return (
    <fieldset className="mt-5">
      <legend className="text-sm font-semibold text-mut">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map(([v, label]) => (
          <span key={v}>
            <input type="radio" className="peer sr-only" id={`ti-${name}-${v}`} name={`ti-${name}`} value={v} checked={value === v} onChange={() => onChange(v)} />
            <label htmlFor={`ti-${name}-${v}`} className="ti-chip">{label}</label>
          </span>
        ))}
      </div>
    </fieldset>
  )
}

const GOAL_TXT = { fat: 'fat loss', muscle: 'muscle gain', perf: 'performance' }

export default function TryIt() {
  const rm = useRM()
  const [goal, setGoal] = useState('muscle')
  const [days, setDays] = useState(4)
  const [equip, setEquip] = useState('gym')
  const [phase, setPhase] = useState('idle')
  const [prog, setProg] = useState(null)
  const [run, setRun] = useState(0)
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])

  const change = (fn) => (v) => {
    fn(v)
    clearTimeout(timer.current)
    setPhase('idle')
  }
  const build = () => {
    if (phase === 'building') return
    clearTimeout(timer.current)
    setPhase('building')
    setRun((r) => r + 1)
    const p = makeProgram(goal, days, equip)
    timer.current = setTimeout(() => {
      setProg(p)
      setPhase('done')
    }, rm ? 0 : 1100)
  }
  const prompt = `${GOAL_TXT[goal][0].toUpperCase()}${GOAL_TXT[goal].slice(1)}, ${days} days a week, ${equip === 'gym' ? 'full gym' : 'home with dumbbells'}`
  const n = phase === 'done' ? prog.length : days

  return (
    <section id="try-it" className="bg-mist section">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
        <Reveal from="left">
          <p className="eyebrow">Try it</p>
          <h2 className="mt-2 text-[2rem] sm:text-5xl">Build a sample program</h2>
          <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-ink ring-1 ring-line">
            Demo with sample data. The real builder is in the app.
          </p>
          <Chips legend="Goal" name="goal" options={GOALS} value={goal} onChange={change(setGoal)} />
          <Chips legend="Days a week" name="days" options={DAYS.map((d) => [d, String(d)])} value={days} onChange={change((v) => setDays(+v))} />
          <Chips legend="Equipment" name="equip" options={EQUIP} value={equip} onChange={change(setEquip)} />
          <button type="button" onClick={build} className="btn btn-dark mt-7" aria-disabled={phase === 'building'}>
            <Spark /> Build my program
          </button>
        </Reveal>

        <Reveal from="right">
          <Browser url="app.koachai.net/programs/new · demo" className="ti-frame">
            <div className="ti-body">
              <div className="ti-prompt">
                <span className="flex items-center gap-2 text-xs font-bold text-mut"><Spark /> Describe the program <AiPill /></span>
                <p className="mt-1.5 font-medium">{prompt}</p>
              </div>
              <div className={`ti-out ti-n${n}`} data-phase={phase} key={run + phase}>
                {phase === 'done'
                  ? prog.map((d, i) => (
                      <div key={d.day} className="ti-day" style={{ '--i': i }}>
                        <div className="ti-dayh"><b>{d.day}</b><small>{d.name}</small></div>
                        {d.rows.map(([ex, sr], j) => (
                          <div key={ex + j} className="ti-ex" style={{ '--j': j }}><span>{ex}</span><b className="num">{sr}</b></div>
                        ))}
                      </div>
                    ))
                  : Array.from({ length: days }).map((_, i) => (
                      <div key={i} className="ti-day ti-skel">
                        <div className="ti-dayh"><i /></div>
                        {[0, 1, 2, 3].map((j) => <div key={j} className="ti-ex"><i /></div>)}
                      </div>
                    ))}
                {phase === 'building' && <i className="ti-shim" aria-hidden="true" />}
              </div>
              <div className="ti-foot">
                {phase === 'done' ? (
                  <span className="kd-review ti-review"><Check s={11} /> Coach reviews every line before it is sent</span>
                ) : (
                  <span className="text-xs text-mut">{phase === 'building' ? 'Building the week…' : 'Pick options, then build.'}</span>
                )}
                <a href={SIGNUP_URL} className={`btn btn-red !h-9 !px-3.5 !text-sm ${phase === 'done' ? 'ti-cta-on' : ''}`}>Start free trial</a>
              </div>
            </div>
          </Browser>
          <p className="sr-only" aria-live="polite">
            {phase === 'building' ? 'Building a sample program.' : phase === 'done' ? `Sample program built: ${prompt}. ${prog.length} training days shown.` : ''}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
