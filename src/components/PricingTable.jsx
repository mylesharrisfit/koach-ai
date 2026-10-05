import { useState } from 'react'
import { PLANS, INCLUDED, TRIAL_DAYS } from '../lib/plans'
import { signupUrl } from '../lib/config'

export default function PricingTable() {
  const [interval, setInterval] = useState('monthly')
  const annual = interval === 'annual'

  const tab = (value, label) => (
    <button
      type="button"
      role="tab"
      aria-selected={interval === value}
      onClick={() => setInterval(value)}
      className={`h-9 rounded-md px-4 text-sm font-medium transition-colors ${
        interval === value ? 'bg-ink text-white' : 'text-neutral-600 hover:text-ink'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div role="tablist" aria-label="Billing interval" className="inline-flex rounded-lg border border-neutral-200 p-1">
          {tab('monthly', 'Monthly')}
          {tab('annual', 'Annual')}
        </div>
        <span className="text-sm text-neutral-500">Annual is about 20% less.</span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((p) => {
          const price = annual ? p.annual : p.monthly
          return (
            <div
              key={p.id}
              className={`relative flex flex-col rounded-xl border p-6 ${
                p.popular ? 'border-ink' : 'border-neutral-200'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-lg">{p.name}</h3>
              <p className="mt-1 min-h-[2.75rem] text-sm leading-snug text-neutral-500">{p.note}</p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">${price}</span>
                <span className="text-sm text-neutral-500">/month</span>
              </p>
              <p className="mt-1 h-5 text-xs text-neutral-500">
                {annual ? `Billed $${p.annual * 12} per year` : 'Billed monthly'}
              </p>
              <p className="mt-5 border-t border-neutral-200 pt-5 text-sm font-medium">{p.clients}</p>
              <a
                href={signupUrl(p.id, interval)}
                className={`btn mt-6 ${p.popular ? 'btn-primary' : 'btn-secondary'}`}
              >
                Start free trial
              </a>
            </div>
          )
        })}
      </div>

      <p className="mt-6 text-sm text-neutral-500">{TRIAL_DAYS}-day free trial on every plan. Cancel any time.</p>

      <div className="mt-12 border-t border-neutral-200 pt-8">
        <h3 className="text-base">Every plan includes</h3>
        <ul className="mt-4 grid gap-x-8 gap-y-2 text-sm text-neutral-600 sm:grid-cols-2">
          {INCLUDED.map((i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
