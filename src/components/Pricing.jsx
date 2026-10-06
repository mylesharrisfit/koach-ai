import { useEffect, useRef, useState } from 'react'
import { PLANS, TRIAL_DAYS } from '../lib/plans'
import { signupUrl, SUPPORT_EMAIL } from '../lib/config'
import Icon from './Icons'
import { SectionHead, CtaRow } from './Sections'
import { AiPill, Num, Reveal } from './fx'

// Below 768px Pro is listed first; the DOM order matches so keyboard order matches too.
function useIsMobile() {
  const q = '(max-width: 767px)'
  const [m, setM] = useState(() => window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return m
}

const INTERVALS = [['monthly', 'Monthly'], ['yearly', 'Yearly']]
const SHOWN = 3 // features visible before "Show all features"
const ENTERPRISE_MAIL = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('KOACH Enterprise enquiry')}`

// plan finder: a recommendation only, prices never change
function recommend(n) {
  if (n <= 10) return ['starter', 'Starter fits up to 10 clients']
  if (n <= 75) return ['pro', 'Pro fits up to 75 clients']
  return ['elite', 'Elite fits unlimited clients. Running a team? Enterprise adds team seats']
}
const money = (n) => `$${Math.round(n)}`

export default function Pricing() {
  const [interval, setIntervalValue] = useState('monthly')
  const [clients, setClients] = useState(25)
  const [open, setOpen] = useState({})
  const yearly = interval === 'yearly'
  const group = useRef(null)
  const mobile = useIsMobile()
  const plans = mobile ? [PLANS[1], PLANS[0], PLANS[2], PLANS[3]] : PLANS
  const [rec, recText] = recommend(clients)

  // radio group: arrow keys move and select
  const onKey = (e) => {
    const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]
    if (!k) return
    e.preventDefault()
    const next = INTERVALS[(INTERVALS.findIndex(([v]) => v === interval) + k + 2) % 2][0]
    setIntervalValue(next)
    group.current.querySelector(`[data-v="${next}"]`)?.focus()
  }

  return (
    <section id="pricing" className="cv bg-mist section">
      <div className="wrap">
        <SectionHead eyebrow="Pricing" title="Simple, flat pricing" center>
          Every plan includes the full coaching platform. Pick the one that fits your roster and how much AI you use.
        </SectionHead>

        <Reveal from="up" className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-[15px] font-semibold ring-1 ring-line">
          <Icon name="check" size={18} className="text-ok" /> {TRIAL_DAYS}-day free trial on every plan
        </Reveal>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div ref={group} role="radiogroup" aria-label="Billing interval" onKeyDown={onKey} className="relative inline-flex rounded-lg border border-line bg-white p-1">
            <span className="toggle-pill" style={{ transform: `translateX(${yearly ? 96 : 0}px)` }} aria-hidden="true" />
            {INTERVALS.map(([v, label]) => (
              <button
                key={v}
                type="button"
                role="radio"
                data-v={v}
                aria-checked={interval === v}
                tabIndex={interval === v ? 0 : -1}
                onClick={() => setIntervalValue(v)}
                className={`relative h-10 w-24 rounded-md text-[15px] font-semibold transition-colors ${interval === v ? 'text-white' : 'text-mut hover:text-ink'}`}
              >
                {label}
              </button>
            ))}
          </div>
          <span className="text-[15px] font-bold text-red-text">Save ~20%</span>
        </div>

        <Reveal from="up" className="finder mx-auto mt-8 max-w-xl rounded-xl bg-white p-5 ring-1 ring-line">
          <label htmlFor="finder" className="flex items-baseline justify-between gap-3 font-semibold">
            How many clients do you coach?
            <span className="num text-2xl font-extrabold">{clients >= 150 ? '150+' : clients}</span>
          </label>
          <input
            id="finder"
            type="range"
            min="1"
            max="150"
            value={clients}
            onChange={(e) => setClients(+e.target.value)}
            aria-valuetext={`${clients >= 150 ? '150 or more' : clients} clients. ${recText}`}
            className="finder-range mt-3 w-full"
            style={{ '--p': `${((clients - 1) / 149) * 100}%` }}
          />
          <p className="mt-2 text-[15px] text-mut" aria-live="polite">{recText}. A recommendation only; prices don’t change.</p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p, i) => {
            const price = yearly ? p.yearly : p.monthly
            const isOpen = !!open[p.id]
            const line = (f) => (
              <li key={f} className="flex gap-2.5">
                <Icon name="check" size={18} className="mt-0.5 flex-none text-ok" />
                <span>{f}{/\bAI\b/.test(f) && <span className="ml-1.5 align-[1px]"><AiPill /></span>}</span>
              </li>
            )
            return (
              <Reveal key={p.id} i={i} className={`card plan-card relative flex flex-col p-6 ${p.popular ? 'border-2 border-graphite' : ''}`} data-rec={rec === p.id ? '' : undefined}>
                {p.popular && <span className="absolute -top-3 left-6 rounded-full bg-red px-3 py-1 text-xs font-bold text-white">Most popular</span>}
                {rec === p.id && <span className="rec-badge">Fits your roster</span>}
                <h3 className="text-2xl">{p.name}</h3>
                <p className="mt-1 min-h-[2.75rem] text-sm leading-snug text-mut">{p.note}</p>
                <p className="mt-5 flex items-baseline gap-1">
                  <span className="num text-5xl font-extrabold"><Num value={price} format={money} /></span>
                  <span className="text-mut">/mo</span>
                </p>
                <p className="mt-1 h-5 text-sm text-mut">{yearly ? `Billed yearly ($${p.yearlyTotal.toLocaleString('en-US')}/yr)` : 'Billed monthly'}</p>
                <ul className="mt-6 grid content-start gap-3 border-t border-line pt-6 text-[15px]">{p.features.slice(0, SHOWN).map(line)}</ul>
                {p.features.length > SHOWN && (
                  <>
                    <div id={`more-${p.id}`} className="acc" data-open={isOpen ? '' : undefined}>
                      <div className="acc-in">
                        <ul className="grid gap-3 pt-3 text-[15px]">{p.features.slice(SHOWN).map(line)}</ul>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`more-${p.id}`}
                      onClick={() => setOpen((o) => ({ ...o, [p.id]: !o[p.id] }))}
                      className="mt-3 inline-flex items-center gap-1 self-start rounded-md text-sm font-bold text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-ink"
                    >
                      {isOpen ? 'Hide' : 'Show all features'}
                      <Icon name="chevron" size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </>
                )}
                <div className="mt-auto pt-7">
                  <a href={signupUrl(p.id, interval)} className={`btn w-full ${p.popular ? 'btn-red' : 'btn-dark'}`}>Start free trial</a>
                  {p.id === 'enterprise' && (
                    <a href={ENTERPRISE_MAIL} className="mt-3 block text-center text-sm font-bold text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-ink">Talk to us</a>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
        <CtaRow noPricing />
      </div>
    </section>
  )
}
