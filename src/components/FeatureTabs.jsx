import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Demo, { stopClock } from '../demos/Demo'
import Icon from './Icons'
import { AiPill, Floaters, TierPill, useParallax } from './fx'
import { Check, Ring, Spark } from '../demos/ui'
import { useRM, usePageHidden } from '../lib/motion'
import { SIGNUP_URL } from '../lib/config'

const card = (node) => <span className="fl-card">{node}</span>
const TABS = [
  {
    id: 'coach', label: 'Coach', scene: 'builder', more: '#cap-plan',
    title: 'Build a program in minutes, then review every line.',
    bullets: [['Describe the client and the AI drafts a full program', true], ['Swap exercises for injuries and equipment'], ['Review and edit before anything is sent']],
    demo: 'Animated demo. A coach types a request for a 12-week hypertrophy program with a bad left knee, clicks Build with AI, and the weekly plan fills in. One exercise is swapped for a knee-friendly one, and the coach sends the reviewed program to the client.',
    float: [<span key="a" className="fl-card fl-ai"><Spark /> AI<i className="ai-sheen" /></span>, card(<><span className="fl-plus"><Check s={10} /></span>Coach reviewed</>)],
  },
  {
    id: 'nutrition', label: 'Nutrition', scene: 'meals', more: '#cap-track',
    title: 'Meal plans built around the macros.',
    bullets: [['AI meal plans built to your client’s targets', true], ['Swap a food and the macros re-count'], ['Food data from USDA FoodData Central']],
    demo: 'Animated demo. Calorie, protein, carb and fat rings fill to target, four meals appear, and swapping rice for potatoes updates the macro totals.',
    float: [card(<><Ring color="#1F7A52" size={22} pct={0.95} /> Protein 180 g</>), card(<>Rice swapped for potatoes</>)],
  },
  {
    id: 'checkins', label: 'Check-ins', scene: 'checkin', more: '#cap-engage',
    title: 'Review check-ins in a queue, not an inbox.',
    bullets: [['Photos, metrics and workouts on one card'], ['An AI-drafted reply with tone options, edited by you', true, 'Pro and up'], ['Send and move straight to the next client']],
    demo: 'Animated demo. A check-in card shows progress photos, weight down 1.4 lb and 6 of 6 workouts. An AI-drafted reply is made warmer, sent, and the next client’s card slides in.',
    float: [card(<><span className="fl-plus">+1</span> check-in</>), <span key="b" className="fl-card fl-ai"><Spark /> Draft reply<i className="ai-sheen" /></span>],
  },
  {
    id: 'app', label: 'Client app', scene: 'app', more: '#cap-engage',
    title: 'A workout logger that stays out of the way.',
    bullets: [['Log weight and reps set by set'], ['A built-in rest timer'], ['New bests flagged as they happen']],
    demo: 'Animated demo of the client phone app. Weight and reps are entered for the last set, the set is checked off, a rest timer counts down and a new best of 325 lb for 5 reps is flagged.',
    float: [card(<><span className="fl-star" />New best: 325 lb</>), card(<>Rest 1:30</>)],
  },
  {
    id: 'business', label: 'Business', scene: 'business', more: '#cap-scale',
    title: 'Payments, scheduling and status in one place.',
    bullets: [['Take payments and subscriptions with Stripe'], ['Schedule check-ins with Zoom, Calendly or Google Calendar'], ['Watch revenue and client status update live']],
    demo: 'Animated demo. A Stripe payment arrives, monthly revenue counts up, a client changes from Trial to Active, and a Zoom check-in fills a calendar slot.',
    float: [card(<><span className="fl-pay">$</span>Payment received</>), card(<>Zoom check-in, 4:00 pm</>)],
  },
]
const FLOAT_POS = [{ right: 12, top: -18 }, { left: -18, bottom: -16 }]
const ADVANCE = 8

export default function FeatureTabs() {
  const rootRef = useRef(null)
  const listRef = useRef(null)
  const indRef = useRef(null)
  const barRef = useRef(null)
  const ctlRef = useRef(null)
  const stageRef = useRef(null)
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const [stopped, setStopped] = useState(false) // the visitor picked a tab
  const [engaged, setEngaged] = useState(false) // hovering or focus inside
  const [paused, setPaused] = useState(false) // pause button
  const [onScreen, setOnScreen] = useState(false)
  const hidden = usePageHidden()
  const reduced = useRM()
  useParallax(stageRef, true, active)

  const activeRef = useRef(0)
  activeRef.current = active
  const go = useCallback((i, user = true) => {
    const a = activeRef.current
    // auto-advance always travels forward (including 05 -> 01); a click slides toward the picked tab
    setDir(!user || i >= a ? 1 : -1)
    setActive(i)
    if (user) setStopped(true)
  }, [])

  // menu links elsewhere on the page pick a tab
  useEffect(() => {
    const on = (e) => {
      const a = e.target.closest?.('a[data-tab]')
      if (!a) return
      const i = TABS.findIndex((t) => t.id === a.dataset.tab)
      if (i >= 0) go(i)
    }
    document.addEventListener('click', on)
    return () => document.removeEventListener('click', on)
  }, [go])

  useEffect(() => {
    const io = new IntersectionObserver((e) => setOnScreen(e[e.length - 1].isIntersecting), { threshold: 0.3 })
    io.observe(rootRef.current)
    return () => io.disconnect()
  }, [])

  // sliding indicator under the active tab (transform only)
  const placeInd = useCallback(() => {
    const el = listRef.current?.querySelector(`#tab-${TABS[active].id}`)
    if (!el || !indRef.current) return
    indRef.current.style.transform = `translateX(${el.offsetLeft}px) scaleX(${el.offsetWidth / 100})`
  }, [active])
  useLayoutEffect(() => {
    placeInd()
    const ro = new ResizeObserver(placeInd)
    ro.observe(listRef.current)
    return () => ro.disconnect()
  }, [placeInd])

  // keep the active tab in view in the horizontally scrolling tab bar (small screens)
  useEffect(() => {
    const el = document.getElementById(`tab-${TABS[active].id}`)
    const box = el?.closest('.tabscroll')
    if (box && box.scrollWidth > box.clientWidth) {
      const b = box.getBoundingClientRect()
      const r = el.getBoundingClientRect()
      box.scrollTo({ left: box.scrollLeft + r.left - b.left - (b.width - r.width) / 2, behavior: reduced ? 'auto' : 'smooth' })
    }
  }, [active, reduced])

  // auto-advance: the active tab's own bar fills (Motion drives it), then the next tab opens
  const running = onScreen && !hidden && !stopped && !engaged && !paused && !reduced
  useEffect(() => {
    stopClock(ctlRef.current)
    ctlRef.current = null
  }, [active])
  useEffect(() => {
    if (stopped) {
      stopClock(ctlRef.current)
      ctlRef.current = null
      return
    }
    if (!running) {
      ctlRef.current?.pause()
      return
    }
    if (ctlRef.current) {
      ctlRef.current.play()
      return
    }
    let off = false
    import('motion').then(({ animate }) => {
      if (off || ctlRef.current || !barRef.current) return
      ctlRef.current = animate(barRef.current, { transform: ['scaleX(0)', 'scaleX(1)'] }, {
        duration: ADVANCE,
        ease: 'linear',
        onComplete: () => !off && go((active + 1) % TABS.length, false),
      })
    })
    return () => {
      off = true
    }
  }, [running, active, stopped, go])

  const onKey = (e) => {
    const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    let n = null
    if (k) n = (active + k + TABS.length) % TABS.length
    if (e.key === 'Home') n = 0
    if (e.key === 'End') n = TABS.length - 1
    if (n === null) return
    e.preventDefault()
    go(n)
    document.getElementById(`tab-${TABS[n].id}`)?.focus()
  }

  const t = TABS[active]
  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocus={() => setEngaged(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setEngaged(false)}
    >
      <div className="tabscroll -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" style={{ scrollbarWidth: 'none' }}>
        <div ref={listRef} role="tablist" aria-label="Product features" onKeyDown={onKey} className="relative mx-auto flex w-max gap-1 border-b border-line">
          {TABS.map((x, i) => {
            const on = i === active
            return (
              <button
                key={x.id}
                id={`tab-${x.id}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls={`panel-${x.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => go(i)}
                className={`tab-btn relative flex h-14 items-center gap-2 px-4 font-display text-[17px] font-bold sm:px-6 sm:text-lg ${on ? 'text-ink' : 'text-mut hover:text-ink'}`}
                style={{ fontStretch: '85%' }}
              >
                <span className={`num text-[13px] ${on ? 'text-red-text' : 'text-mut'}`} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                {x.label}
                <span className="tab-bar" aria-hidden="true">
                  <span key={on ? `on-${active}` : 'off'} ref={on ? barRef : null} style={{ transform: on && (stopped || reduced) ? 'scaleX(1)' : 'scaleX(0)' }} />
                </span>
              </button>
            )
          })}
          <span ref={indRef} className="tab-ind" aria-hidden="true" />
        </div>
      </div>

      {TABS.map((x, i) => (
        <div key={x.id} id={`panel-${x.id}`} role="tabpanel" aria-labelledby={`tab-${x.id}`} hidden={i !== active} className="mt-8">
          {i === active && (
            <div key={active} className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-12 ${dir > 0 ? 'slide-r' : 'slide-l'}`}>
              <div className="lg:col-span-5">
                <h3 className="text-[1.9rem] sm:text-4xl">{t.title}</h3>
                <ul className="mt-6 grid gap-3">
                  {t.bullets.map(([b, ai, tier]) => (
                    <li key={b} className="flex gap-3 text-base leading-snug text-ink sm:text-[17px]">
                      <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-ink text-white"><Icon name="check" size={13} /></span>
                      <span>
                        {b}
                        {(ai || tier) && (
                          <span className="ml-1.5 inline-flex gap-1 align-[2px]">{ai && <AiPill />}{tier && <TierPill>{tier}</TierPill>}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                <a href={t.more} className="mt-7 inline-flex items-center gap-2 text-[15px] font-bold text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-ink">
                  See how it works <Icon name="arrow" size={18} />
                </a>
              </div>
              <div className="lg:col-span-7">
                <div ref={stageRef} className="relative rounded-2xl bg-mist p-3 sm:p-6">
                  <Demo key={t.id} scene={t.scene} label={t.demo} paused={paused} onPausedChange={setPaused} />
                  <Floaters items={t.float.map((node, n) => ({ node, pos: FLOAT_POS[n], depth: n ? 0.05 : -0.04 }))} className={`tab-floaters ${paused ? 'is-paused' : ''}`} />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a href={SIGNUP_URL} className="btn btn-red">Start free trial</a>
        <a href="#pricing" className="btn btn-dark">See pricing</a>
      </div>
    </div>
  )
}
