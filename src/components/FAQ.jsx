import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { SectionHeading, Reveal } from './ui'

const FAQS = [
  {
    q: 'Do I need a credit card to start?',
    a: 'No. You can start free and explore the platform with no card required. Upgrade only when you’re ready to scale.',
  },
  {
    q: 'Can I move my existing clients over?',
    a: 'Yes. Import your roster via CSV in minutes, or invite clients to onboard themselves. On Studio plans we’ll handle migration for you.',
  },
  {
    q: 'Is the AI actually useful, or just a gimmick?',
    a: 'It’s built for real coaching workflows — periodized programs, macro-accurate meal plans, and check-in summaries you can review and edit. You always stay in control.',
  },
  {
    q: 'Can I use my own branding?',
    a: 'Absolutely. On Studio you get white-label branding so your clients experience the app under your own name and logo.',
  },
  {
    q: 'How do payments work?',
    a: 'Payments run through Stripe with subscriptions, invoicing, and automatic retries — so you get paid on time without chasing anyone.',
  },
  {
    q: 'What if I need help?',
    a: 'We offer email support on every plan and priority support on Pro and above, plus guided onboarding for teams.',
  },
]

function Item({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/8">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-white">{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/12 text-white/70"
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-10 text-sm leading-relaxed text-white/55">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <Reveal className="mx-auto mt-12 max-w-2xl">
          <div>
            {FAQS.map((item, i) => (
              <Item key={i} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
