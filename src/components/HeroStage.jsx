import { useEffect, useRef, useState } from 'react'
import { Av, Check, Phone, Ring, Spark } from '../demos/ui'
import { PauseButton } from '../demos/Demo'
import { Floaters, useParallax } from './fx'

// Hero mockup that follows the rotating audience word. Sample data is fictional.
const EVENTS = [
  'Maya submitted her check-in',
  'Sam logged Upper A, new best',
  'Payment received, Pro plan',
  'Alex uploaded progress photos',
]

function Feed({ live }) {
  const [items, setItems] = useState([])
  const n = useRef(0)
  useEffect(() => {
    if (!live) return
    const add = () => {
      const id = n.current++
      setItems((xs) => [...xs.slice(-1), { id, text: EVENTS[id % EVENTS.length] }])
    }
    const first = setTimeout(add, 1200)
    const t = setInterval(add, 3600)
    return () => {
      clearTimeout(first)
      clearInterval(t)
    }
  }, [live])
  // each pop-in leaves after 4 seconds
  useEffect(() => {
    if (!items.length) return
    const oldest = items[0]
    const t = setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== oldest.id)), 4000)
    return () => clearTimeout(t)
  }, [items])
  useEffect(() => {
    if (!live) setItems([])
  }, [live])
  return (
    <div className="feed">
      {items.map((x) => (
        <div key={x.id} className="feed-item">
          <i className="kd-dotok" />
          <span>{x.text}</span>
        </div>
      ))}
    </div>
  )
}

const CAL = [
  ['Mon', [['p', 'Chris T.'], ['o', 'Sam B.']]],
  ['Tue', [['o', 'Maya R.'], ['p', 'Alex W.']]],
  ['Wed', [['p', 'Priya N.']]],
  ['Thu', [['o', 'Jordan K.'], ['p', 'Chris T.']]],
  ['Fri', [['o', 'Dana L.'], ['o', 'Eli M.']]],
]
const TEAM = [
  ['DL', 'Dana L.', 'Head coach', '24 clients', 'ok ok amber'],
  ['EM', 'Eli M.', 'Strength', '18 clients', 'ok red ok'],
  ['PN', 'Priya N.', 'Nutrition', '21 clients', 'ok ok ok'],
  ['SB', 'Sam B.', 'Hybrid', '12 clients', 'amber ok ok'],
]

const PANES = [
  (
      <div key={0} className="hs-pane">
        <div className="hs-head"><b className="kd-h">Check-ins to review</b><span className="kd-qn"><b className="num">1</b> of 7</span></div>
        <div className="hs-card">
          <div className="kd-cardtop">
            <Av t="MR" tone={1} />
            <span className="kd-rt"><b>Maya R.</b><small>Week 8 check-in</small></span>
            <span className="hs-metric"><b className="num">−1.4 lb</b><small>weight</small></span>
            <span className="hs-metric"><b className="num">6/6</b><small>workouts</small></span>
          </div>
          <div className="kd-photos hs-photos">
            <div className="kd-photo"><i /><span>Week 8 · front</span></div>
            <div className="kd-photo"><i /><span>Week 8 · side</span></div>
          </div>
          <div className="hs-draft">
            <span className="kd-aibadge"><Spark /> AI draft</span>
            <p>Great week, Maya. Six of six sessions and 1.4 lb down. Keep protein steady.</p>
          </div>
        </div>
      </div>
  ),
  (
      <div key={1} className="hs-pane">
        <div className="hs-head">
          <b className="kd-h">This week</b>
          <span className="hs-legend"><i className="hs-p" />In person <i className="hs-o" />Online</span>
        </div>
        <div className="hs-cal">
          {CAL.map(([d, s]) => (
            <div key={d} className="hs-day">
              <small>{d}</small>
              {s.map(([k, n], j) => (
                <span key={j} className={k === 'p' ? 'hs-sp' : 'hs-so'}>{k === 'p' ? n : `Zoom · ${n}`}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
  ),
  (
      <div key={2} className="hs-pane">
        <div className="hs-head"><b className="kd-h">Meal plan · Maya R.</b><span className="kd-aibadge"><Spark /> AI draft</span></div>
        <div className="hs-rings">
          <div className="kd-rg"><Ring color="#16181D" size={74} pct={0.94}><b className="num">2,440</b><small>kcal</small></Ring></div>
          <div className="kd-rg"><Ring color="#1F7A52" size={74} pct={0.95}><b className="num">180</b><small>protein</small></Ring></div>
          <div className="kd-rg"><Ring color="#F2C46B" size={74} pct={0.89}><b className="num">250</b><small>carbs</small></Ring></div>
        </div>
        <div className="hs-meals">
          <div><span>Breakfast</span><b>Egg-white omelette, oats</b><b className="num">582</b></div>
          <div><span>Lunch</span><b>Chicken, rice, greens</b><b className="num">614</b></div>
          <div><span>Dinner</span><b>Salmon, sweet potato</b><b className="num">920</b></div>
        </div>
      </div>
  ),
  (
      <div key={3} className="hs-pane">
        <div className="hs-head"><b className="kd-h">Team · 4 coaches</b><span className="kd-qn">75 clients</span></div>
        <div className="hs-team">
          {TEAM.map(([i, n, r, c, st], j) => (
            <div key={n} className="hs-trow">
              <Av t={i} tone={j % 3} />
              <span className="kd-rt"><b>{n}</b><small>{r}</small></span>
              <small className="hs-cc">{c}</small>
              <span className="hs-cells">{st.split(' ').map((k, m) => <i key={m} className={`kd-cell kd-cell-${k}`} />)}</span>
            </div>
          ))}
        </div>
      </div>
  ),
]

const PHONEPANES = [
  (
      <div key={0} className="hs-ppane">
        <div className="kd-ph"><small>Check-in · Week 8</small><b className="kd-h">Your progress</b></div>
        <div className="kd-photos hs-photos-s"><div className="kd-photo"><i /></div><div className="kd-photo"><i /></div></div>
        <div className="kd-mini"><small>Weight</small><b className="num">−1.4 lb this week</b></div>
        <div className="hs-sent"><Check s={12} /> Check-in submitted</div>
      </div>
  ),
  (
      <div key={1} className="hs-ppane">
        <div className="kd-ph"><small>Today</small><b className="kd-h">2 sessions</b></div>
        <div className="kd-mini"><small>9:00 am · In person</small><b>Lower B at the gym</b></div>
        <div className="kd-mini"><small>4:00 pm · Online</small><b>Zoom check-in</b></div>
      </div>
  ),
  (
      <div key={2} className="hs-ppane">
        <div className="kd-ph"><small>Today’s macros</small><b className="kd-h">1,620 / 2,440 kcal</b></div>
        {[['Protein', '128 / 180 g', 0.71], ['Carbs', '160 / 250 g', 0.64], ['Fat', '52 / 80 g', 0.65]].map(([n, v, p]) => (
          <div key={n} className="hs-bar"><span><b>{n}</b><small>{v}</small></span><i><i style={{ transform: `scaleX(${p})` }} /></i></div>
        ))}
      </div>
  ),
  (
      <div key={3} className="hs-ppane">
        <div className="kd-ph"><small>Your coach</small><b className="kd-h">Dana L.</b></div>
        <div className="kd-mini"><small>Assigned by your team</small><b>Head coach</b></div>
        <div className="kd-mini"><small>Next session</small><b>Thursday · Zoom check-in</b></div>
      </div>
  ),
]

const FLOAT = [
  { pos: { right: 10, top: 26 }, depth: -0.02, node: <span className="fl-card"><span className="fl-plus">+1</span> check-in</span> },
  { pos: { left: 4, bottom: 52 }, depth: -0.03, node: <span className="fl-card"><span className="fl-star" />New best: 325 lb</span> },
  { pos: { left: 172, bottom: 82 }, depth: -0.05, node: <span className="fl-card fl-ai"><Spark /> AI<i className="ai-sheen" /></span> },
  { pos: { left: 150, bottom: 10 }, depth: -0.02, node: <span className="fl-card"><Ring color="#1F7A52" size={22} pct={0.72} /> Protein 128 g</span> },
  { pos: { left: 318, bottom: 40 }, depth: -0.04, node: <span className="fl-card"><span className="fl-pay">$</span>Payment received</span> },
]

export default function HeroStage({ aud, paused, onPause, live }) {
  const ref = useRef(null)
  useParallax(ref)
  const mark = (n) => ({ 'data-on': n === aud ? '' : undefined, 'data-past': n < aud ? '' : undefined })
  return (
    <div ref={ref} className={`kd-stage kd-s-hero hs ${paused ? 'is-paused' : ''}`} data-aud={aud}>
      <div className="kd-browser kd-hero-browser">
        <div className="kd-bar"><i className="kd-dot" /><i className="kd-dot" /><i className="kd-dot" /><span className="kd-url">app.koachai.net</span></div>
        <div className="kd-body" aria-hidden="true">
          <div className="hs-panes">{[0, 1, 2, 3].map((n) => <div key={n} className="hs-slot" {...mark(n)}>{PANES[n]}</div>)}</div>
          <Feed live={live} />
        </div>
        {onPause && <PauseButton paused={paused} onToggle={onPause} fixed />}
      </div>
      <Phone className="kd-hero-phone" aria-hidden="true">
        <div className="kd-pstatus" />
        <div className="hs-pslots">{[0, 1, 2, 3].map((n) => <div key={n} className="hs-slot" {...mark(n)}>{PHONEPANES[n]}</div>)}</div>
      </Phone>
      <Floaters items={FLOAT} className="hs-floaters" />
    </div>
  )
}
