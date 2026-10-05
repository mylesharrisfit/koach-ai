import { useCallback, useEffect, useRef, useState } from 'react'
import Demo, { useReducedMotion, stopClock } from '../demos/Demo'
import Icon from './Icons'
import { SIGNUP_URL } from '../lib/config'

const TABS = [
  {
    id: 'coach', label: 'Coach', scene: 'builder', more: '#cap-plan',
    title: 'Build a program in minutes, then review every line.',
    bullets: ['Describe the client and the AI drafts a full program', 'Swap exercises for injuries and equipment', 'Review and edit before anything is sent'],
    demo: 'Animated demo. A coach types a request for a 12-week hypertrophy program with a bad left knee, clicks Build with AI, and the weekly plan fills in. One exercise is swapped for a knee-friendly one, and the coach sends the reviewed program to the client.',
  },
  {
    id: 'nutrition', label: 'Nutrition', scene: 'meals', more: '#cap-track',
    title: 'Meal plans built around the macros.',
    bullets: ['AI meal plans built to your client’s targets', 'Swap a food and the macros re-count', 'Food data from USDA FoodData Central'],
    demo: 'Animated demo. Calorie, protein, carb and fat rings fill to target, four meals appear, and swapping rice for potatoes updates the macro totals.',
  },
  {
    id: 'checkins', label: 'Check-ins', scene: 'checkin', more: '#cap-engage',
    title: 'Review check-ins in a queue, not an inbox.',
    bullets: ['Photos, metrics and workouts on one card', 'An AI-drafted reply with tone options, edited by you', 'Send and move straight to the next client'],
    demo: 'Animated demo. A check-in card shows progress photos, weight down 1.4 lb and 6 of 6 workouts. An AI-drafted reply is made warmer, sent, and the next client’s card slides in.',
  },
  {
    id: 'app', label: 'Client app', scene: 'app', more: '#cap-engage',
    title: 'A workout logger that stays out of the way.',
    bullets: ['Log weight and reps set by set', 'A built-in rest timer', 'New bests flagged as they happen'],
    demo: 'Animated demo of the client phone app. Weight and reps are entered for the last set, the set is checked off, a rest timer counts down and a new best of 325 lb for 5 reps is flagged.',
  },
  {
    id: 'business', label: 'Business', scene: 'business', more: '#cap-scale',
    title: 'Payments, scheduling and status in one place.',
    bullets: ['Take payments and subscriptions with Stripe', 'Schedule check-ins with Zoom, Calendly or Google Calendar', 'Watch revenue and client status update live'],
    demo: 'Animated demo. A Stripe payment arrives, monthly revenue counts up, a client changes from Trial to Active, and a Zoom check-in fills a calendar slot.',
  },
]
const ADVANCE = 8

export default function FeatureTabs() {
  const rootRef = useRef(null)
  const barRef = useRef(null)
  const ctlRef = useRef(null)
  const [active, setActive] = useState(0)
  const [stopped, setStopped] = useState(false) // user clicked / used the keyboard
  const [engaged, setEngaged] = useState(false) // hovering or focus inside
  const [paused, setPaused] = useState(false) // pause button
  const [onScreen, setOnScreen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const reduced = useReducedMotion()

  const select = useCallback((i, user = true) => {
    setActive(i)
    if (user) setStopped(true)
  }, [])

  // menu links elsewhere on the page pick a tab
  useEffect(() => {
    const on = (e) => {
      const a = e.target.closest?.('a[data-tab]')
      if (!a) return
      const i = TABS.findIndex((t) => t.id === a.dataset.tab)
      if (i >= 0) select(i)
    }
    document.addEventListener('click', on)
    return () => document.removeEventListener('click', on)
  }, [select])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver((e) => setOnScreen(e[e.length - 1].isIntersecting), { threshold: 0.3 })
    io.observe(rootRef.current)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    const on = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', on)
    return () => document.removeEventListener('visibilitychange', on)
  }, [])

  // auto-advance: a thin bar fills under the active tab (Motion drives it), then the next tab opens
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
        onComplete: () => !off && setActive((a) => (a + 1) % TABS.length),
      })
    })
    return () => {
      off = true
    }
  }, [running, active, stopped])

  // keep the active tab in view in the horizontally scrolling tab bar (small screens)
  useEffect(() => {
    const el = document.getElementById(`tab-${TABS[active].id}`)
    const box = el?.closest('.tabscroll')
    if (box && box.scrollWidth > box.clientWidth) {
      box.scrollTo({ left: el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' })
    }
  }, [active, reduced])

  const onKey = (e) => {
    const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    let n = null
    if (k) n = (active + k + TABS.length) % TABS.length
    if (e.key === 'Home') n = 0
    if (e.key === 'End') n = TABS.length - 1
    if (n === null) return
    e.preventDefault()
    select(n)
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
        <div role="tablist" aria-label="Product features" onKeyDown={onKey} className="flex min-w-max gap-1 border-b border-line sm:min-w-0 sm:justify-center">
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
                onClick={() => select(i)}
                className={`relative h-12 px-4 font-display text-[17px] font-bold sm:px-6 sm:text-lg ${on ? 'text-ink' : 'text-mut hover:text-ink'}`}
                style={{ fontStretch: '85%' }}
              >
                {x.label}
                <span className={`absolute inset-x-0 bottom-[-1px] h-[3px] overflow-hidden rounded-full ${on ? 'bg-line' : ''}`} aria-hidden="true">
                  {on && (
                    <span
                      key={active}
                      ref={barRef}
                      className="block h-full origin-left bg-ink"
                      style={{ transform: stopped || reduced ? 'scaleX(1)' : 'scaleX(0)' }}
                    />
                  )}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {TABS.map((x, i) => (
        <div key={x.id} id={`panel-${x.id}`} role="tabpanel" aria-labelledby={`tab-${x.id}`} hidden={i !== active} className="mt-8">
          {i === active && (
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <h3 className="text-[1.9rem] sm:text-4xl">{t.title}</h3>
                <ul className="mt-6 grid gap-3">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-base leading-snug text-ink sm:text-[17px]">
                      <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-ink text-white"><Icon name="check" size={13} /></span>
                      {b}
                    </li>
                  ))}
                </ul>
                <a href={t.more} className="mt-7 inline-flex items-center gap-2 text-[15px] font-bold text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-ink">
                  See how it works <Icon name="arrow" size={18} />
                </a>
              </div>
              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-mist p-3 sm:p-6">
                  <Demo key={t.id} scene={t.scene} label={t.demo} paused={paused} onPausedChange={setPaused} />
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
