import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Check, Ring, Spark } from '../demos/ui'
import { rig, clamp, eo, seg, lerp, fmt } from '../demos/engine'
import { PauseButton } from '../demos/Demo'
import { useOnScreen, usePageHidden, useRM } from '../lib/motion'
import { photoUrl } from '../lib/photos'
import { Reveal } from './fx'

// The showreel: one continuous film of the product, Everfit style. It plays on its own whenever it is
// on screen (nothing to click), loops, and moves from screen to screen without cuts: the camera
// pushes into a button and the next screen lands out of it, cards hand over to each other, and the
// photo behind crossfades with a slow zoom. Like the demos, render(t) sets everything for time t, so
// pausing, jumping to a chapter and the reduced-motion still frame share one code path.
// Sample data is fictional.

const CH = [
  { id: 'ai', label: 'AI drafts the program', photo: 'band-2', a: 0, rest: 3.2 },
  { id: 'plan', label: 'You review the calendar', photo: 'cta', a: 5.6, rest: 5.2 },
  { id: 'food', label: 'Meal plans to the macro', photo: 'feature-nutrition-2', a: 12.2, rest: 3.4 },
  { id: 'insight', label: 'Check-ins with insight', photo: 'feature-check-ins', a: 18.8, rest: 5.4 },
  { id: 'app', label: 'Your client app', photo: 'feature-client-app-0', a: 25.2, rest: 5.0 },
  { id: 'biz', label: 'Payments and growth', photo: 'feature-business', a: 31.4, rest: 4.8 },
]
const TOTAL = 37.6
CH.forEach((c, i) => (c.d = (CH[i + 1]?.a ?? TOTAL) - c.a))

// design canvases, scaled to the stage width
const WIDE = { w: 1100, h: 640 }
const NARROW = { w: 520, h: 650 }

const PROMPT = 'Maya, 12 weeks of hypertrophy, 4 days a week, home gym, bad left knee'
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const WEEK = [
  ['Lower A', [['Goblet squat', '3 × 10'], ['Romanian deadlift', '3 × 10']]],
  ['Push', [['DB bench press', '4 × 8'], ['Overhead press', '3 × 10']]],
  null,
  ['Pull', [['One-arm row', '4 × 10'], ['Banded pull-up', '3 × 8']]],
  ['Lower B', [['Glute bridge', '4 × 12'], ['Slider leg curl', '3 × 12']]],
  null,
]
const WEEK2 = WEEK.map((d) => d && [d[0], d[1].map(([n, s]) => [n, s.replace(/× (\d+)/, (_, r) => `× ${+r + 2}`)])])
const MEALS = ['Breakfast', 'Lunch', 'Snack', 'Dinner']
const MACROS = [['Protein', 168, 180, '#2563EB'], ['Carbs', 210, 250, '#1F7A52'], ['Fat', 62, 70, '#F2C46B']]
const MISSED = new Set([9, 17])
const TODAY = 24
const REPLY = 'Six of six again, Maya. Down 1.4 lb and right on plan. Squats go up 5 lb next week.'
const CARDS = [
  ['cat-coaching', 'Program', 'Hypertrophy, 12 weeks'],
  ['style-one', '1:1', 'Coaching with Dana'],
  ['cat-nutrition', 'Meal plan', 'High protein, 7 days'],
  ['feature-coaching-0', 'Program', 'Field speed'],
  ['style-scale', 'Group', 'Run club, 8 weeks'],
  ['workout', 'Today', 'Lower B'],
  ['cat-client-app', 'Program', 'Swim base'],
  ['feature-client-app', 'Program', 'Conditioning'],
]
const BARS = [0.34, 0.42, 0.38, 0.5, 0.47, 0.58, 0.55, 0.64, 0.7, 0.68, 0.82, 1]
const PAYMENTS = [['CT', 'Chris T.', '1:1 coaching', '$199'], ['AP', 'Ana P.', 'Run club', '$49'], ['JK', 'Jordan K.', 'Meal plan', '$89']]

const Bg = ({ slot }) => {
  const src = photoUrl(slot)
  return <i className="rl-bg" data-k="bg">{src && <img src={src} alt="" loading="lazy" decoding="async" />}</i>
}

function Markup() {
  return (
    <>
      {/* 1. AI assistant */}
      <div className="rl-scene">
        <div className="rl-card rl-ai" data-k="ai">
          <span className="rl-chip"><Spark /> AI assistant</span>
          <i className="rl-orb" />
          <b className="rl-ai-h">Let’s build a program</b>
          <small className="rl-ai-s">I draft it. You review every line before it’s sent.</small>
          <div className="rl-field"><p data-k="prompt" /></div>
          <div className="rl-ai-row">
            <span className="rl-ghost">Use a template</span>
            <span className="rl-gen" data-k="gen"><Spark /> Build with AI<i className="rl-sheen" /></span>
          </div>
        </div>
      </div>

      {/* 2. program calendar */}
      <div className="rl-scene">
        <div className="rl-card rl-cal" data-k="cal">
          <div className="rl-calh">
            <span className="rl-calic" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="5.5" width="16" height="14.5" rx="2.5" /><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" /></svg>
            </span>
            <span className="rl-calt"><b>Program calendar</b><small>Maya R. · 12-week hypertrophy</small></span>
            <span className="rl-seg">
              <i className="rl-segpill" data-k="pill" />
              <span data-k="seg0">1 Week</span><span data-k="seg1">2 Weeks</span><span>4 Weeks</span>
            </span>
          </div>
          <div className="rl-days">{DAYS.map((d, i) => <span key={d} className={WEEK[i] ? '' : 'rl-rest'}>{d}</span>)}</div>
          {[WEEK, WEEK2].map((wk, w) => (
            <div className="rl-week" key={w} data-k={`wk${w}`}>
              <span className="rl-wkl">Week {w + 1}</span>
              {wk.map((d, i) => (
                <div key={i} className={`rl-day ${d ? '' : 'rl-rest'}`}>
                  <small>Day {i + 1}</small>
                  {d ? (
                    <div className="rl-wo" data-k={`b${w}`}>
                      <b>{d[0]}</b>
                      {d[1].map(([n, s], j) => (
                        <span key={n} className="rl-ex">
                          <em>{s.split(' ')[0]}x</em>
                          {w === 0 && i === 0 && j === 0 ? (
                            <span className="rl-swap"><s data-k="old">{n}</s><span data-k="new">Box squat <i className="rl-aitag"><Spark /> Knee-friendly</i></span></span>
                          ) : (
                            <span>{n}</span>
                          )}
                          <small>{s}</small>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <i className="rl-restl">Rest</i>
                  )}
                </div>
              ))}
            </div>
          ))}
          <span className="rl-toast" data-k="toast"><span className="rl-okc"><Check s={11} /></span> Reviewed and sent to Maya</span>
        </div>
      </div>

      {/* 3. nutrition */}
      <div className="rl-scene">
        <div className="rl-card rl-food" data-k="food">
          <div className="rl-foodh">
            <span className="kd-av kd-av1">MR</span>
            <span className="rl-goal"><b>Drop 6 lb before the meet</b><small>13 days to go</small></span>
            <span className="rl-gen rl-genm" data-k="genm"><Spark /> Generate meals<i className="rl-sheen" /></span>
          </div>
          <div className="rl-foodg">
            <div className="rl-panel">
              <b>Meal categories</b>
              <span className="rl-chips">{MEALS.map((m) => <i key={m} data-k="meal">{m}</i>)}</span>
            </div>
            <div className="rl-panel rl-macro">
              <b>Macro goals</b>
              <div className="rl-macrog">
                <Ring k="rk" color="#2563EB" size={118}><b className="num" data-k="kcal">0</b><small>/ 2,400 kcal</small></Ring>
                <div className="rl-mbars">
                  {MACROS.map(([n, , goal, c], i) => (
                    <span key={n} style={{ '--c': c }}>
                      <small>{n}</small>
                      <b className="num"><span data-k={`m${i}`}>0</span><em> / {goal} g</em></b>
                      <i><i data-k={`mb${i}`} /></i>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="rl-panel rl-diet">
              <b>Dietary information</b>
              {['Protein first, 180 g a day', 'No dairy', '30-minute meals'].map((x) => (
                <span key={x} data-k="diet"><Check s={11} /> {x}</span>
              ))}
              <small className="rl-usda">Food data: USDA FoodData Central</small>
            </div>
          </div>
        </div>
      </div>

      {/* 4. check-in insight */}
      <div className="rl-scene">
        <div className="rl-card rl-ins" data-k="ins">
          <div className="rl-tabs"><span className="on">Insight</span><span>Check-ins</span><span>Photos</span></div>
          <b className="rl-ins-h">Maya is on a roll.</b>
          <div className="rl-stats">
            <span><i className="rl-si rl-si-fire">🔥</i><b className="num" data-k="st0">0</b><em>days</em><small>Current streak</small></span>
            <span><i className="rl-si rl-si-bolt">⚡</i><b className="num" data-k="st1">0/6</b><em /><small>Workouts this week</small></span>
            <span><i className="rl-si rl-si-tgt">◎</i><b className="num" data-k="st2">0.0</b><em>lb</em><small>Down this week</small></span>
          </div>
          <div className="rl-insg">
            <div className="rl-month">
              <b>October 2026</b>
              <div className="rl-dow">{['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => <span key={d}>{d}</span>)}</div>
              <div className="rl-dates">
                {[0, 1, 2].map((n) => <span key={`x${n}`} />)}
                {Array.from({ length: 31 }, (_, n) => (
                  <span key={n} data-k="date" className={n + 1 === TODAY ? 'rl-today' : ''}>{n + 1}</span>
                ))}
              </div>
            </div>
            <div className="rl-adh">
              <small>Today · 24 Oct</small>
              <Ring k="ra" color="#2563EB" size={128}><b className="num" data-k="adh">0%</b><small>adherence</small></Ring>
            </div>
          </div>
          <div className="rl-draft" data-k="draft">
            <span className="rl-draftl"><Spark /> AI draft reply <i>Pro and up</i></span>
            <p data-k="reply" />
            <span className="rl-review">Review</span>
          </div>
        </div>
      </div>

      {/* 5. client app */}
      <div className="rl-scene">
        <div className="rl-track" data-k="track">
          {CARDS.map(([slot, tag, title]) => {
            const src = photoUrl(slot)
            return (
              <span key={slot} className="rl-pcard">
                {src && <img src={src} alt="" loading="lazy" decoding="async" />}
                <small>{tag}</small>
                <b>{title}</b>
              </span>
            )
          })}
        </div>
        <div className="rl-phone kd-phone" data-k="phone">
          <div className="kd-screen">
            <i className="kd-notch" />
            <div className="kd-pstatus" />
            <div className="rl-scr" data-k="home">
              <small className="rl-muted">Tuesday</small>
              <b className="rl-hi">Good morning, Maya 👋</b>
              <div className="rl-today-c">
                <small>Today · 5 exercises · ~45 min</small>
                <b>Lower B</b>
                <span>Start workout</span>
              </div>
              <div className="rl-minis">
                <span><small>Streak</small><b className="num">🔥 27</b></span>
                <span><small>Macros</small><b className="num">1,620</b></span>
              </div>
              <div className="rl-coach"><small>Your coach</small><p>Nice work on Tuesday. Keep the momentum going 🔥</p></div>
            </div>
            <div className="rl-scr rl-log" data-k="log">
              <small className="rl-muted">Lower B · Week 6</small>
              <b className="rl-hi">Back squat</b>
              <span className="rl-set rl-set-d"><span>Set 1</span><b className="num">275 lbs × 5</b><i><Check s={10} /></i></span>
              <span className="rl-set rl-set-d"><span>Set 2</span><b className="num">295 lbs × 5</b><i><Check s={10} /></i></span>
              <span className="rl-set rl-set-in" data-k="set3"><span>Set 3</span><b className="num"><span data-k="lw">0</span> lbs × <span data-k="lr">0</span></b><i data-k="lchk"><Check s={10} /></i></span>
              <span className="rl-best" data-k="best">🏆 New best: 325 lbs</span>
              <div className="rl-restc" data-k="rest"><small>Rest time</small><b className="num" data-k="timer">1:30</b><i><i data-k="rbar" /></i></div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. business */}
      <div className="rl-scene">
        <div className="rl-card rl-biz" data-k="biz">
          <div className="rl-bizh"><b>Business</b><span className="rl-tabs"><span className="on">October</span><span>Year</span></span></div>
          <div className="rl-bizg">
            <div className="rl-rev">
              <small>Revenue this month</small>
              <b className="num" data-k="rev">$0</b>
              <em className="rl-up">▲ 18% vs September</em>
              <div className="rl-bars">{BARS.map((h, i) => <i key={i} data-k="bar" style={{ '--h': h }} />)}</div>
            </div>
            <div className="rl-pays">
              <small>Payments · Stripe</small>
              {PAYMENTS.map(([av, n, p, amt], i) => (
                <span key={n} className="rl-pay" data-k="pay">
                  <span className={`kd-av ${i ? 'kd-av2' : 'kd-av1'}`}>{av}</span>
                  <span className="rl-payt"><b>{n}</b><small>{p}</small></span>
                  <b className="num">+{amt}</b>
                </span>
              ))}
              <span className="rl-status"><span className="kd-av">CT</span><span className="rl-payt"><b>Chris T.</b><small>Client status</small></span><em data-k="stat">Trial</em></span>
              <span className="rl-slot" data-k="slot"><i>4:00</i> Zoom check-in with Ana P.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// position of el's centre relative to anc's centre, from layout offsets (unaffected by transforms)
function offsetIn(el, anc) {
  let x = el.offsetWidth / 2
  let y = el.offsetHeight / 2
  let n = el
  while (n && n !== anc) {
    x += n.offsetLeft
    y += n.offsetTop
    n = n.offsetParent
  }
  return { x: x - anc.offsetWidth / 2, y: y - anc.offsetHeight / 2 }
}
const inout = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

function createReel(root) {
  const { q, qa, put, rot, text, typed, cls } = rig(root)
  const bgs = qa('bg')
  const [ai, gen, prompt, cal, pill, seg0, seg1, wk1, old, nu, toast] = ['ai', 'gen', 'prompt', 'cal', 'pill', 'seg0', 'seg1', 'wk1', 'old', 'new', 'toast'].map(q)
  const b0 = qa('b0')
  const b1 = qa('b1')
  const [food, genm, kcal, rkA, rkB] = ['food', 'genm', 'kcal', 'rk-a', 'rk-b'].map(q)
  const meals = qa('meal')
  const diet = qa('diet')
  const mv = MACROS.map((_, i) => q(`m${i}`))
  const mb = MACROS.map((_, i) => q(`mb${i}`))
  const [ins, st0, st1, st2, adh, raA, raB, draft, reply] = ['ins', 'st0', 'st1', 'st2', 'adh', 'ra-a', 'ra-b', 'draft', 'reply'].map(q)
  const dates = qa('date')
  const [track, phone, home, log, lw, lr, lchk, best, rest, timer, rbar, set3] = ['track', 'phone', 'home', 'log', 'lw', 'lr', 'lchk', 'best', 'rest', 'timer', 'rbar', 'set3'].map(q)
  const [biz, rev, stat, slot] = ['biz', 'rev', 'stat', 'slot'].map(q)
  const bars = qa('bar')
  const pays = qa('pay')
  let zGen = { x: 0, y: 0 }
  let zMeal = { x: 0, y: 0 }
  let pillX = [0, 0]
  let pillW = [0, 0]

  const ring = (a, b, frac) => {
    const deg = 360 * clamp(frac)
    rot(a, Math.min(deg, 180))
    rot(b, Math.max(0, deg - 180))
  }
  // push the camera into a point of a card: the point travels to the centre as the card scales up
  const zoomTo = (el, z, S, pt, o = 1) => {
    const s = 1 + (S - 1) * z
    put(el, o, -pt.x * s * z, -pt.y * s * z, s)
  }
  // local time inside a chapter; the first chapter also starts while the last one ends (the loop)
  const local = (t, c) => {
    let u = t - c.a
    if (u > TOTAL / 2) u -= TOTAL
    return u
  }

  return {
    measure() {
      zGen = offsetIn(gen, ai)
      zMeal = offsetIn(genm, food)
      pillX = [seg0.offsetLeft, seg1.offsetLeft]
      pillW = [seg0.offsetWidth, seg1.offsetWidth]
    },
    render(t) {
      // photos: the incoming one fades in on top with a slow zoom, the outgoing one waits under it
      CH.forEach((c, i) => {
        const u = local(t, c)
        const el = bgs[i]
        const o = eo(u, -0.7, 0.7) * (1 - seg(u, c.d + 0.35, 0.05))
        el.style.zIndex = u > -0.7 && u < 0.6 ? 3 : 1
        put(el, o, 0, 0, 1.14 - 0.12 * clamp((u + 0.7) / (c.d + 1.2)))
      })

      // 1. AI assistant: prompt types, the camera pushes into "Build with AI"
      {
        const u = local(t, CH[0])
        const p = eo(u, -0.4, 0.9)
        typed(prompt, PROMPT, seg(u, 0.6, 2.2))
        cls(gen, 'rl-hot', u > 2.9)
        const press = seg(u, 3.4, 0.22)
        const z = inout(seg(u, 3.6, 1.4))
        const o = p * (1 - eo(u, 4.85, 0.5))
        if (z > 0) zoomTo(ai, z, 3.3, zGen, o)
        else put(ai, o, 0, (1 - p) * 40, 0.94 + 0.06 * p)
        put(gen, 1, 0, 0, press > 0 && press < 1 ? 0.94 : 1)
      }

      // 2. calendar lands out of the zoom, fills, grows to two weeks, swaps an exercise
      {
        const c = CH[1]
        const u = local(t, c)
        const p = eo(u, -0.35, 0.9)
        const x = eo(u, c.d - 0.45, 0.6)
        const s = (1.1 - 0.1 * p) * (1 + 0.025 * seg(u, 0.6, 5.4)) - 0.04 * x
        put(cal, p * (1 - x), 0, -36 * x, s)
        b0.forEach((b, i) => {
          const e = eo(u, 0.35 + 0.1 * i, 0.45)
          put(b, e, 0, (1 - e) * 16, 0.96 + 0.04 * e)
        })
        const pp = eo(u, 2.2, 0.5)
        if (pill) {
          pill.style.transform = `translateX(${lerp(pillX[0], pillX[1], pp).toFixed(1)}px)`
          pill.style.width = `${lerp(pillW[0], pillW[1], pp).toFixed(1)}px`
        }
        cls(seg0, 'on', pp < 0.5)
        cls(seg1, 'on', pp >= 0.5)
        put(wk1, eo(u, 2.35, 0.4))
        b1.forEach((b, i) => {
          const e = eo(u, 2.5 + 0.1 * i, 0.45)
          put(b, e, 0, (1 - e) * 16, 0.96 + 0.04 * e)
        })
        const so = eo(u, 3.8, 0.25)
        const si = eo(u, 4.05, 0.4)
        put(old, 1 - so, 0, -6 * so)
        put(nu, si, 0, 6 * (1 - si))
        const tp = eo(u, 4.9, 0.45)
        put(toast, tp, 0, -14 * (1 - tp), 0.94 + 0.06 * tp)
      }

      // 3. nutrition: rings and bars count to the plan, meal tabs step through, zoom into "Generate meals"
      {
        const c = CH[2]
        const u = local(t, c)
        const p = eo(u, -0.35, 0.9)
        const f = eo(u, 0.7, 2.0)
        text(kcal, fmt(2210 * f))
        ring(rkA, rkB, (2210 / 2400) * f)
        MACROS.forEach(([, v, goal], i) => {
          const e = eo(u, 0.8 + 0.15 * i, 1.8)
          text(mv[i], fmt(v * e))
          if (mb[i]) mb[i].style.transform = `scaleX(${((v / goal) * e).toFixed(3)})`
        })
        const mi = Math.min(3, Math.floor(seg(u, 0.6, 3.2) * 4))
        meals.forEach((m, i) => cls(m, 'on', i === mi))
        diet.forEach((d, i) => {
          const e = eo(u, 1.1 + 0.3 * i, 0.4)
          put(d, e, (1 - e) * -12)
        })
        cls(genm, 'rl-hot', u > 3.3)
        const press = seg(u, 4.0, 0.22)
        put(genm, 1, 0, 0, press > 0 && press < 1 ? 0.94 : 1)
        const z = inout(seg(u, 4.3, 1.5))
        const o = p * (1 - eo(u, 5.75, 0.45))
        if (z > 0) zoomTo(food, z, 3.1, zMeal, o)
        else put(food, o, 0, (1 - p) * 40, 0.95 + 0.05 * p)
      }

      // 4. check-in insight: stats count, the month fills day by day, an AI reply drafts itself
      {
        const c = CH[3]
        const u = local(t, c)
        const p = eo(u, -0.35, 0.9)
        const x = eo(u, c.d - 0.5, 0.6)
        put(ins, p * (1 - x), -70 * x, 0, (1.1 - 0.1 * p) * (1 - 0.03 * x))
        const m = eo(u, 0.6, 1.4)
        text(st0, String(Math.round(27 * m)))
        text(st1, `${Math.round(6 * m)}/6`)
        text(st2, (1.4 * m).toFixed(1))
        const filled = seg(u, 0.7, 2.4) * TODAY
        dates.forEach((d, i) => {
          const day = i + 1
          const on = day <= filled && day <= TODAY
          cls(d, MISSED.has(day) ? 'rl-miss' : 'rl-done', on)
        })
        const a = eo(u, 1.2, 1.8)
        ring(raA, raB, 0.92 * a)
        text(adh, `${Math.round(92 * a)}%`)
        const dp = eo(u, 3.4, 0.5)
        put(draft, dp, 0, 24 * (1 - dp))
        typed(reply, REPLY, seg(u, 3.7, 1.6))
      }

      // 5. client app: program cards glide past, the phone rises, a set is logged
      {
        const c = CH[4]
        const u = local(t, c)
        const p = eo(u, -0.3, 0.9)
        const x = eo(u, c.d - 0.5, 0.6)
        put(track, eo(u, -0.5, 0.8) * (1 - x), -60 * (u + 0.5))
        put(phone, p * (1 - x), 0, (1 - p) * 170 + 50 * x)
        const sw = eo(u, 2.0, 0.4)
        put(home, 1 - sw, -24 * sw)
        put(log, sw, 24 * (1 - sw))
        const w = eo(u, 2.5, 0.8)
        text(lw, fmt(325 * w))
        text(lr, u > 3.3 ? '5' : '0')
        const done = u > 3.7
        cls(set3, 'rl-set-d', done)
        const press = seg(u, 3.6, 0.2)
        put(lchk, 1, 0, 0, press > 0 && press < 1 ? 0.85 : 1)
        const b = eo(u, 3.85, 0.35)
        put(best, b, 0, 0, 0.7 + 0.3 * b)
        const r = eo(u, 4.3, 0.4)
        put(rest, r, 0, 16 * (1 - r))
        const left = 90 - Math.max(0, u - 4.5) * 9
        text(timer, `1:${String(Math.max(0, Math.round(left - 60))).padStart(2, '0')}`)
        if (rbar) rbar.style.transform = `scaleX(${clamp(left / 90).toFixed(3)})`
      }

      // 6. business: revenue counts, bars grow, payments arrive, a trial converts; the camera pulls back
      {
        const c = CH[5]
        const u = local(t, c)
        const p = eo(u, -0.35, 0.9)
        const x = eo(u, c.d - 0.6, 0.7)
        put(biz, p * (1 - x), 0, (1 - p) * 40, 1 - 0.08 * x)
        text(rev, `$${fmt(12480 * eo(u, 0.5, 2.0))}`)
        bars.forEach((b, i) => {
          const e = eo(u, 0.5 + 0.07 * i, 0.55)
          b.style.transform = `scaleY(${(0.04 + 0.96 * e).toFixed(3)})`
        })
        pays.forEach((r, i) => {
          const e = eo(u, 1.4 + 0.6 * i, 0.45)
          put(r, e, 30 * (1 - e))
        })
        const on = u > 3.5
        text(stat, on ? 'Active' : 'Trial')
        cls(stat, 'on', on)
        const sl = eo(u, 4.0, 0.45)
        put(slot, sl, 0, 12 * (1 - sl))
      }
    },
  }
}

export default function Showreel() {
  const secRef = useRef(null)
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const fillRef = useRef([])
  const reelRef = useRef(null)
  const tRef = useRef(0)
  const [narrow, setNarrow] = useState(false)
  const [ch, setCh] = useState(0)
  const [paused, setPaused] = useState(false)
  const rm = useRM()
  const hidden = usePageHidden()
  const onScreen = useOnScreen(stageRef, 0.25)
  const playing = !rm && !paused && !hidden && onScreen

  const chRef = useRef(0)
  const draw = useCallback(() => {
    const t = tRef.current
    reelRef.current?.render(t)
    let i = CH.length - 1
    while (i > 0 && t < CH[i].a) i--
    CH.forEach((c, n) => {
      const el = fillRef.current[n]
      if (el) el.style.transform = `scaleX(${n < i ? 1 : n === i ? clamp((t - c.a) / c.d).toFixed(4) : 0})`
    })
    if (i !== chRef.current) {
      chRef.current = i
      setCh(i)
    }
  }, [])

  // fit the design canvas to the stage; small screens get the tall canvas
  useLayoutEffect(() => {
    const stage = stageRef.current
    const fit = () => {
      const n = stage.clientWidth < 640
      setNarrow(n)
      const k = stage.clientWidth / (n ? NARROW : WIDE).w
      canvasRef.current.style.transform = `scale(${k})`
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(stage)
    return () => ro.disconnect()
  }, [])

  // build once; re-measure when the canvas layout changes or the fonts arrive
  useLayoutEffect(() => {
    const reel = (reelRef.current ||= createReel(stageRef.current))
    reel.measure()
    if (rm) tRef.current = CH[chRef.current].a + CH[chRef.current].rest
    draw()
    let off = false
    document.fonts?.ready.then(() => {
      if (off) return
      reel.measure()
      draw()
    })
    return () => {
      off = true
    }
  }, [narrow, rm, draw])

  useEffect(() => {
    if (!playing) return
    let raf = 0
    let last = performance.now()
    const step = (now) => {
      tRef.current = (tRef.current + Math.min(0.1, (now - last) / 1000)) % TOTAL
      last = now
      draw()
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [playing, draw])

  const jump = (n) => {
    tRef.current = rm ? CH[n].a + CH[n].rest : CH[n].a + 0.001
    draw()
  }

  return (
    <section ref={secRef} id="showreel" aria-labelledby="showreel-h" className="bg-white pb-16 pt-6 sm:pb-24 sm:pt-10">
      <div className="wrap">
        <Reveal as="h2" from="up" id="showreel-h" className="h-caps max-w-5xl text-[2.5rem] sm:text-[4rem] lg:text-[5.1rem]">
          The coaching OS that runs the busywork for you
        </Reveal>
        <p className="sr-only">
          A looping film of KOACH with sample data. The AI assistant drafts a 12-week program from a short description, the
          program calendar fills in and an exercise is swapped for a knee-friendly one, a meal plan is generated to the client’s
          macros, a check-in shows a 27-day streak with an AI-drafted reply, the client logs a new best in the app, and payments
          and revenue update on the business dashboard.
        </p>
        <div ref={stageRef} className={`rl-stage mt-8 sm:mt-12 ${narrow ? 'rl-n' : ''} ${rm ? 'rl-still' : ''}`}>
          <div className="rl-bgs" aria-hidden="true">{CH.map((c) => <Bg key={c.id} slot={c.photo} />)}</div>
          <div ref={canvasRef} className="rl-canvas" aria-hidden="true" style={narrow ? { width: NARROW.w, height: NARROW.h } : { width: WIDE.w, height: WIDE.h }}>
            <Markup />
          </div>
          <div className="rl-hud" aria-hidden="true">
            <span className="rl-cap" key={ch}><b className="num">{String(ch + 1).padStart(2, '0')}</b> {CH[ch].label}</span>
            <span className="rl-sample">Sample data</span>
          </div>
          {!rm && <PauseButton paused={paused} onToggle={() => setPaused((p) => !p)} fixed />}
        </div>
        <div className="rl-chapters" role="group" aria-label="Showreel chapters">
          {CH.map((c, n) => (
            <button key={c.id} type="button" onClick={() => jump(n)} aria-current={n === ch ? 'step' : undefined} aria-label={`Chapter ${n + 1}: ${c.label}`}>
              <i><i ref={(el) => (fillRef.current[n] = el)} /></i>
              <span><b className="num">{String(n + 1).padStart(2, '0')}</b> {c.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
