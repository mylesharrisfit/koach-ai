import { useEffect, useRef, useState } from 'react'
import { Phone } from '../demos/ui'
import Icon from './Icons'

// Interactive copy of the KOACH client app's workout logger (portal/workout/ActiveWorkout.jsx and
// WorkoutComplete.jsx): weight and reps steppers, LOG SET, the Rest Time overlay with Skip Rest, the
// End Workout sheet and the Workout Complete summary. Sample data, nothing stored. The coach sets the
// rest per exercise; this demo uses 30 seconds so it moves along.
const EX = { name: 'Back Squat', tag: 'Legs', sets: 4, reps: 5, rest: 30, last: [315, 5] }
const TOTAL_EX = 5
const R = 54
const C = 2 * Math.PI * R

function Stepper({ label, value, set, chips, unit, onUnit }) {
  return (
    <div className="wo-card">
      <small>{label}</small>
      <input
        className="wo-val"
        inputMode="decimal"
        aria-label={label}
        value={value}
        onChange={(e) => set(Math.max(0, parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 0))}
      />
      {unit && <button type="button" className="wo-unit" onClick={onUnit} aria-label={`Units: ${unit}. Switch`}>{unit}</button>}
      <span className="wo-pm">
        <button type="button" onClick={() => set((v) => Math.max(0, v - 1))} aria-label={`${label} minus 1`}>−</button>
        <button type="button" onClick={() => set((v) => v + 1)} aria-label={`${label} plus 1`}>+</button>
      </span>
      <span className="wo-chips">
        {chips.map((c) => <button key={c} type="button" onClick={() => set((v) => v + c)}>+{c}</button>)}
      </span>
    </div>
  )
}

export default function WorkoutDemo() {
  const [logged, setLogged] = useState([]) // [{ w, r }]
  const [weight, setWeight] = useState(EX.last[0])
  const [reps, setReps] = useState(EX.reps)
  const [unit, setUnit] = useState('lbs')
  const [flash, setFlash] = useState(false)
  const [rest, setRest] = useState(null) // seconds left
  const [ending, setEnding] = useState(false)
  const [done, setDone] = useState(false)
  const [stars, setStars] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [say, setSay] = useState('')
  const flashT = useRef(0)
  const allDone = logged.length >= EX.sets
  const cur = Math.min(logged.length, EX.sets - 1)

  // elapsed workout clock, running once the first set is logged
  useEffect(() => {
    if (done || !logged.length) return
    const t = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [done, logged.length])

  useEffect(() => {
    if (rest === null) return
    if (rest <= 0) {
      setRest(null)
      setSay(`Rest over. Set ${logged.length + 1} of ${EX.sets}.`)
      return
    }
    const t = setTimeout(() => setRest((r) => (r === null ? null : r - 1)), 1000)
    return () => clearTimeout(t)
  }, [rest, logged.length])

  useEffect(() => () => clearTimeout(flashT.current), [])

  const logSet = () => {
    if (allDone) return
    const next = [...logged, { w: weight, r: reps }]
    setLogged(next)
    setFlash(true)
    clearTimeout(flashT.current)
    flashT.current = setTimeout(() => setFlash(false), 600)
    if (next.length < EX.sets) {
      setTimeout(() => setRest(EX.rest), 200)
      setSay(`Set ${next.length} logged, ${weight} ${unit} × ${reps}. Rest ${EX.rest} seconds.`)
    } else {
      setSay('All sets complete.')
    }
  }
  const reset = () => {
    setLogged([])
    setWeight(EX.last[0])
    setReps(EX.reps)
    setRest(null)
    setEnding(false)
    setDone(false)
    setStars(0)
    setElapsed(0)
    setSay('Workout reset.')
  }
  const volume = logged.reduce((a, s) => a + s.w * s.r, 0)
  const clock = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <div className="grid place-items-center">
      <Phone className="wo-phone">
        <div className="wo-app">
          {done ? (
            <div className="wo-done">
              <span className="wo-badge" aria-hidden="true">🎉</span>
              <b className="wo-h">Workout Complete! 🎉</b>
              <small>Lower B</small>
              <p className="wo-label">Summary</p>
              <div className="wo-stats">
                <span><i aria-hidden="true">⏱️</i><b>{clock(Math.max(elapsed, 1))}</b><small>Duration</small></span>
                <span><i aria-hidden="true">💪</i><b>1/{TOTAL_EX}</b><small>Exercises</small></span>
                <span><i aria-hidden="true">📋</i><b>{logged.length}</b><small>Sets Logged</small></span>
                <span><i aria-hidden="true">⚖️</i><b>{volume ? `${volume.toLocaleString('en-US')} lbs` : '—'}</b><small>Volume</small></span>
              </div>
              <p className="wo-rate-q">How was this workout?</p>
              <div className="wo-stars" role="radiogroup" aria-label="Rate this workout">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" role="radio" aria-checked={stars === n} aria-label={`${n} star${n > 1 ? 's' : ''}`} data-on={n <= stars ? '' : undefined} onClick={() => setStars(n)}>★</button>
                ))}
              </div>
              <button type="button" className="wo-primary mt-auto" onClick={reset}>Save &amp; Return Home</button>
            </div>
          ) : (
            <>
              <div className="wo-top">
                <button type="button" className="wo-x" onClick={() => setEnding(true)} aria-label="End workout"><Icon name="close" size={16} /></button>
                <b>Lower B</b>
                <span className="num">{clock(elapsed)}</span>
              </div>
              <div className="wo-prog"><i style={{ transform: `scaleX(${(logged.length / EX.sets) / TOTAL_EX + 0.02})` }} /></div>
              <div className="wo-dots" aria-hidden="true">{Array.from({ length: TOTAL_EX }).map((_, i) => <i key={i} data-on={i === 0 ? '' : undefined} />)}</div>

              <div className="wo-body">
                <p className="wo-label">Exercise 1 of {TOTAL_EX}</p>
                <b className="wo-h">{EX.name}</b>
                <span className="wo-meta"><em>{EX.tag}</em>{EX.sets} sets × {EX.reps} reps · {EX.rest}s rest</span>
                <div className="wo-last"><small>Last time</small><b>{EX.last[0]} lbs × {EX.last[1]} reps</b></div>
                <p className="wo-setn">{allDone ? '✓ All sets complete!' : `Set ${cur + 1} of ${EX.sets}`}</p>
                {!allDone && (
                  <>
                    <div className="wo-inputs">
                      <Stepper label="Weight" value={weight} set={setWeight} chips={[2.5, 5, 10]} unit={unit} onUnit={() => setUnit((u) => (u === 'lbs' ? 'kg' : 'lbs'))} />
                      <Stepper label="Reps" value={reps} set={setReps} chips={[1, 2, 5]} />
                    </div>
                    <button type="button" className="wo-log" data-flash={flash ? '' : undefined} onClick={logSet}>{flash ? '✓ Logged!' : 'LOG SET ✓'}</button>
                  </>
                )}
                <p className="wo-label mt-3">Sets</p>
                <div className="wo-sets">
                  {Array.from({ length: EX.sets }).map((_, i) => {
                    const s = logged[i]
                    const now = !allDone && i === cur
                    return (
                      <span key={i} className="wo-set" data-done={s ? '' : undefined} data-now={now ? '' : undefined}>
                        <em>{s ? '✓' : i + 1}</em>
                        {s ? `${s.w} ${unit} × ${s.r} reps` : now ? 'Current set' : 'Upcoming'}
                        {now && <b aria-hidden="true">→</b>}
                      </span>
                    )
                  })}
                </div>
              </div>
              <div className="wo-foot">
                <button type="button" disabled>‹ Prev</button>
                <button type="button" className="wo-next" onClick={() => setEnding(true)}>{allDone ? 'Finish Workout 🎉' : 'Next Exercise ›'}</button>
              </div>

              {rest !== null && (
                <div className="wo-rest" role="dialog" aria-label="Rest timer">
                  <p className="wo-label">Rest Time</p>
                  <small>{EX.rest}s prescribed</small>
                  <span className="wo-ring" data-last={rest <= 3 ? '' : undefined}>
                    <svg width="132" height="132" viewBox="0 0 132 132" aria-hidden="true">
                      <defs>
                        <linearGradient id="wo-grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#2563EB" /><stop offset="100%" stopColor="#7C3AED" /></linearGradient>
                      </defs>
                      <circle cx="66" cy="66" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                      <circle cx="66" cy="66" r={R} fill="none" stroke="url(#wo-grad)" strokeWidth="8" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - rest / EX.rest)} style={{ transition: 'stroke-dashoffset 1s linear' }} />
                    </svg>
                    <b>{rest}</b>
                    <small>sec</small>
                  </span>
                  <div className="wo-next-up">
                    <small>Next up</small>
                    <b>Set {logged.length + 1} of {EX.sets} — try {weight} {unit} × {reps} reps</b>
                  </div>
                  <p className="wo-calm">Stay focused · breathe deep</p>
                  <button type="button" className="wo-skip" onClick={() => setRest(0)}>Skip Rest</button>
                </div>
              )}

              {ending && (
                <div className="wo-scrim" onClick={() => setEnding(false)}>
                  <div className="wo-end" role="dialog" aria-label="End workout" onClick={(e) => e.stopPropagation()}>
                    <i aria-hidden="true" />
                    <b>End Workout?</b>
                    <small>Your progress will be saved.</small>
                    <button type="button" className="wo-danger" onClick={() => { setEnding(false); setRest(null); setDone(true) }}>End Workout</button>
                    <button type="button" className="wo-keep" onClick={() => setEnding(false)}>Keep Going 💪</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Phone>
      <p className="sr-only" aria-live="polite">{say}</p>
    </div>
  )
}
