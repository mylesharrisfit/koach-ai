import { useEffect, useRef, useState } from 'react'
import { PLANS, TRIAL_DAYS } from '../lib/plans'
import { signupUrl } from '../lib/config'
import Icon from './Icons'
import { SectionHead, CtaRow } from './Sections'

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

export default function Pricing() {
  const [interval, setIntervalValue] = useState('monthly')
  const yearly = interval === 'yearly'
  const group = useRef(null)
  const mobile = useIsMobile()
  const plans = mobile ? [PLANS[1], PLANS[0], PLANS[2], PLANS[3]] : PLANS

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
    <section id="pricing" className="bg-mist section">
      <div className="wrap">
        <SectionHead eyebrow="Pricing" title="Simple, flat pricing" center>
          Every plan includes the full coaching platform. Pick the one that fits your roster and how much AI you use.
        </SectionHead>

        <p className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-[15px] font-semibold ring-1 ring-line">
          <Icon name="check" size={18} className="text-ok" /> {TRIAL_DAYS}-day free trial on every plan
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div ref={group} role="radiogroup" aria-label="Billing interval" onKeyDown={onKey} className="inline-flex rounded-lg border border-line bg-white p-1">
            {INTERVALS.map(([v, label]) => (
              <button
                key={v}
                type="button"
                role="radio"
                data-v={v}
                aria-checked={interval === v}
                tabIndex={interval === v ? 0 : -1}
                onClick={() => setIntervalValue(v)}
                className={`h-10 rounded-md px-5 text-[15px] font-semibold transition-colors ${interval === v ? 'bg-graphite text-white' : 'text-mut hover:text-ink'}`}
              >
                {label}
              </button>
            ))}
          </div>
          <span className="text-[15px] font-bold text-red-text">Save ~20%</span>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => {
            const price = yearly ? p.yearly : p.monthly
            return (
              <div key={p.id} className={`card relative flex flex-col p-6 ${p.popular ? 'border-2 border-graphite' : ''}`}>
                {p.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-red px-3 py-1 text-xs font-bold text-white">Most popular</span>
                )}
                <h3 className="text-2xl">{p.name}</h3>
                <p className="mt-1 min-h-[2.75rem] text-sm leading-snug text-mut">{p.note}</p>
                <p className="mt-5 flex items-baseline gap-1">
                  <span className="num text-5xl font-extrabold">${price}</span>
                  <span className="text-mut">/mo</span>
                </p>
                <p className="mt-1 h-5 text-sm text-mut">{yearly ? `Billed yearly ($${p.yearlyTotal.toLocaleString('en-US')}/yr)` : 'Billed monthly'}</p>
                <ul className="mt-6 grid flex-1 content-start gap-3 border-t border-line pt-6 text-[15px]">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5"><Icon name="check" size={18} className="mt-0.5 flex-none text-ok" />{f}</li>
                  ))}
                </ul>
                <a href={signupUrl(p.id, interval)} className={`btn mt-7 ${p.popular ? 'btn-red' : 'btn-dark'}`}>Start free trial</a>
              </div>
            )
          })}
        </div>

        <CtaRow noPricing />
      </div>
    </section>
  )
}
