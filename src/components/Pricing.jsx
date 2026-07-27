import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { SectionHeading, RevealGroup, RevealItem, PrimaryButton, GhostButton } from './ui'
import { useSignup } from './SignupModal'
import { cta } from '../lib/config'

const PLANS = [
  {
    name: 'Starter',
    tagline: 'For new online coaches',
    monthly: 0,
    annual: 0,
    freeLabel: 'Free',
    features: ['Up to 5 clients', 'AI program builder', 'Basic check-ins', 'Client mobile app'],
    cta: 'Start free',
  },
  {
    name: 'Pro',
    tagline: 'For growing coaching businesses',
    monthly: 49,
    annual: 39,
    features: [
      'Unlimited clients',
      'AI nutrition & macros',
      'Automated check-ins & reminders',
      'Stripe payments & subscriptions',
      'Progress analytics',
      'Priority support',
    ],
    cta: 'Start free trial',
    featured: true,
  },
  {
    name: 'Studio',
    tagline: 'For teams & gyms',
    monthly: 129,
    annual: 99,
    features: [
      'Everything in Pro',
      'Multiple coach seats',
      'White-label branding',
      'Team analytics & roles',
      'Onboarding & migration',
    ],
    cta: 'Start free trial',
  },
]

export default function Pricing() {
  const { openModal } = useSignup()
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Simple pricing"
          title={<>Pricing that scales <span className="text-gradient">with you</span></>}
          subtitle="Start free. Upgrade when you’re ready. No contracts, cancel anytime."
        />

        {/* Toggle */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-sm ${!annual ? 'text-white' : 'text-white/45'}`}>Monthly</span>
          <button
            onClick={() => setAnnual((v) => !v)}
            className="relative h-7 w-13 rounded-full border border-white/12 bg-white/[0.05] p-0.5"
            style={{ width: 52 }}
            aria-label="Toggle annual pricing"
          >
            <motion.span
              className="block h-6 w-6 rounded-full bg-gradient-to-br from-brand-400 to-ai shadow"
              animate={{ x: annual ? 24 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            />
          </button>
          <span className={`text-sm ${annual ? 'text-white' : 'text-white/45'}`}>
            Annual <span className="text-brand-300">save 20%</span>
          </span>
        </div>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {PLANS.map((p) => {
            const price = annual ? p.annual : p.monthly
            return (
              <RevealItem key={p.name}>
                <div
                  className={
                    'relative flex h-full flex-col rounded-3xl border p-7 transition-transform duration-300 hover:-translate-y-1 ' +
                    (p.featured
                      ? 'border-brand/40 bg-gradient-to-b from-brand/[0.12] to-ai/[0.06] shadow-glow'
                      : 'border-white/8 bg-white/[0.03]')
                  }
                >
                  {p.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-400 to-ai px-3 py-1 text-[11px] font-semibold text-white shadow-glow">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                  <p className="mt-1 text-sm text-white/50">{p.tagline}</p>

                  <div className="mt-5 flex items-end gap-1">
                    <span className="text-4xl font-extrabold text-white">
                      {p.freeLabel && price === 0 ? p.freeLabel : `$${price}`}
                    </span>
                    {price !== 0 && <span className="mb-1 text-sm text-white/45">/mo</span>}
                  </div>
                  {price !== 0 && annual && (
                    <p className="mt-1 text-xs text-white/40">billed annually</p>
                  )}

                  <ul className="mt-6 flex-1 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand-300">
                          <Check className="h-2.5 w-2.5" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7">
                    {p.featured ? (
                      <PrimaryButton
                        as="button"
                        magnetic={false}
                        onClick={() => openModal('pricing-pro')}
                        className="w-full"
                      >
                        {p.cta} <ArrowRight className="h-4 w-4" />
                      </PrimaryButton>
                    ) : (
                      <GhostButton
                        as="button"
                        onClick={() => openModal(`pricing-${p.name.toLowerCase()}`)}
                        className="w-full"
                      >
                        {p.cta}
                      </GhostButton>
                    )}
                  </div>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>

        <p className="mt-8 text-center text-sm text-white/45">
          Need something custom for a large team?{' '}
          <a href={cta('pricing-enterprise')} className="text-brand-300 hover:text-brand-300/80">
            Talk to us →
          </a>
        </p>
      </div>
    </section>
  )
}
