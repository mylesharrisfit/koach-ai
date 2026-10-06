import { useEffect, useRef, useState } from 'react'
import { Phone, Check } from '../demos/ui'
import Icon from './Icons'

// Interactive client-app demo with sample data: check off a set, the rest timer slides up (and can be
// minimised), a toast says when to go again, a new best is flagged, then finish the workout.
// Nothing is stored. The rest is shortened to 15 seconds so the demo moves along.
const PLAN = [315, 315, 320, 325]
const REPS = 5
const BEST = 320 // previous best for 5 reps
const REST = 15
const R = 46
const C = 2 * Math.PI * R

const blank = () => PLAN.map((w) => ({ w: String(w), r: String(REPS), done: false }))

export default function WorkoutDemo() {
  const [sets, setSets] = useState(blank)
  const [rest, setRest] = useState(null) // seconds left, or null
  const [mini, setMini] = useState(false)
  const [toast, setToast] = useState(null)
  const [finished, setFinished] = useState(false)
  const [say, setSay] = useState('')
  const toastId = useRef(0)
  const setsRef = useRef(sets)
  setsRef.current = sets
  const next = sets.findIndex((s) => !s.done)
  const allDone = next === -1

  useEffect(() => {
    if (rest === null) return
    if (rest <= 0) {
      setRest(null)
      setMini(false)
      const n = setsRef.current.findIndex((s) => !s.done)
      const msg = n >= 0 ? `Rest over. Time for set ${n + 1}.` : 'Rest over.'
      setToast({ id: ++toastId.current, msg })
      setSay(msg)
      return
    }
    const t = setTimeout(() => setRest((r) => (r === null ? null : r - 1)), 1000)
    return () => clearTimeout(t)
  }, [rest])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const edit = (i, key, v) => setSets((xs) => xs.map((s, n) => (n === i ? { ...s, [key]: v.replace(/[^0-9]/g, '').slice(0, 3) } : s)))
  const complete = (i) => {
    if (i !== next) return
    setSets((xs) => xs.map((s, n) => (n === i ? { ...s, done: true } : s)))
    const last = i === PLAN.length - 1
    if (!last) {
      setRest(REST)
      setMini(false)
      setSay(`Set ${i + 1} logged. Rest timer started, ${REST} seconds.`)
    } else {
      setRest(null)
      setSay(`Set ${i + 1} logged. All sets done.`)
    }
  }
  const isBest = (s) => s.done && +s.w > BEST && +s.r >= REPS
  const volume = sets.reduce((a, s) => a + (s.done ? +s.w * +s.r : 0), 0)
  const bests = sets.filter(isBest).length
  const reset = () => {
    setSets(blank())
    setRest(null)
    setFinished(false)
    setSay('Workout reset.')
  }
  const mmss = (x) => `0:${String(Math.max(0, x)).padStart(2, '0')}`

  return (
    <div className="grid place-items-center">
      <Phone className="wo-phone">
        <div className="kd-pstatus" />
        {finished ? (
          <div className="wo-done">
            <span className="wo-badge"><Check s={30} /></span>
            <div>
              <b className="block font-display text-[22px] font-extrabold" style={{ fontStretch: '85%' }}>Workout logged</b>
              <small>Lower B · Back squat</small>
            </div>
            <div className="wo-stats">
              <span><b>{sets.length}</b><small>sets</small></span>
              <span><b>{volume.toLocaleString('en-US')}</b><small>lb volume</small></span>
              <span><b>{bests}</b><small>new best{bests === 1 ? '' : 's'}</small></span>
            </div>
            {bests > 0 && <span className="pc pc-pill"><span className="fl-star" />New best: {sets.filter(isBest).at(-1).w} lb × {REPS}</span>}
            <button type="button" className="wo-finish mt-auto w-full" onClick={reset}>Log it again</button>
          </div>
        ) : (
          <div className="wo">
            {toast && <span key={toast.id} className="wo-toast" aria-hidden="true"><Icon name="timer" size={14} />{toast.msg}</span>}
            <div className="kd-ph"><small>Lower B · Exercise 1 of 5</small><b className="kd-h">Back squat</b></div>
            <div className="wo-ex">
              <span className="wo-vid" aria-hidden="true"><Icon name="play" size={16} /></span>
              <span className="flex flex-col"><b>4 × 5</b><small>Rest {REST} s in this demo · previous best {BEST} lb</small></span>
            </div>
            <div className="wo-head" aria-hidden="true"><span>Set</span><span>lb</span><span>Reps</span><span /></div>
            {sets.map((s, i) => (
              <div key={i} className="wo-row relative" data-next={i === next ? '' : undefined} data-done={s.done ? '' : undefined}>
                <em>{i + 1}</em>
                <input className="wo-in" inputMode="numeric" aria-label={`Set ${i + 1} weight in pounds`} value={s.w} disabled={s.done} onChange={(e) => edit(i, 'w', e.target.value)} />
                <input className="wo-in" inputMode="numeric" aria-label={`Set ${i + 1} reps`} value={s.r} disabled={s.done} onChange={(e) => edit(i, 'r', e.target.value)} />
                <button
                  type="button"
                  className="wo-check"
                  aria-pressed={s.done}
                  aria-label={s.done ? `Set ${i + 1} logged` : `Log set ${i + 1}`}
                  disabled={s.done || i !== next}
                  onClick={() => complete(i)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 4.5" /></svg>
                </button>
                {isBest(s) && <span className="wo-best"><span className="fl-star" />New best</span>}
              </div>
            ))}
            <button type="button" className="wo-finish" disabled={!allDone || rest !== null} onClick={() => setFinished(true)}>Finish workout</button>

            {rest !== null && !mini && (
              <div className="wo-sheet" role="group" aria-label="Rest timer">
                <span className="text-xs font-bold text-white/70">Rest · next: set {next + 1}</span>
                <span className="wo-ring" data-last={rest <= 3 ? '' : undefined}>
                  <svg width="108" height="108" viewBox="0 0 108 108" aria-hidden="true">
                    <circle cx="54" cy="54" r={R} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="8" />
                    <circle cx="54" cy="54" r={R} fill="none" stroke="#5b8cff" strokeWidth="8" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - rest / REST)} style={{ transition: 'stroke-dashoffset 1s linear' }} />
                  </svg>
                  <b>{mmss(rest)}</b>
                </span>
                <span className="wo-sbtns">
                  <button type="button" onClick={() => setRest((r) => Math.min(59, r + 15))}>+15 s</button>
                  <button type="button" onClick={() => setRest(0)}>Skip</button>
                  <button type="button" onClick={() => setMini(true)} aria-label="Minimise rest timer"><Icon name="chevron" size={16} className="mx-auto" /></button>
                </span>
              </div>
            )}
            {rest !== null && mini && (
              <button type="button" className="wo-mini" onClick={() => setMini(false)} aria-label={`Rest timer, ${rest} seconds left. Expand`}>
                <span className="pc-timer" aria-hidden="true" />Rest {mmss(rest)}
              </button>
            )}
          </div>
        )}
      </Phone>
      <p className="sr-only" aria-live="polite">{say}</p>
    </div>
  )
}
