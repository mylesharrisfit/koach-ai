import { motion } from 'framer-motion'
import { UserPlus, Wand2, Rocket } from 'lucide-react'
import { SectionHeading, Reveal } from './ui'

const STEPS = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Add your clients',
    body: 'Import your roster in minutes or invite clients to onboard themselves. AI enriches each profile automatically.',
  },
  {
    icon: Wand2,
    step: '02',
    title: 'Let AI do the heavy lifting',
    body: 'Generate programs, meal plans, and check-in schedules in seconds. Review, tweak, and approve — you stay in control.',
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Scale on autopilot',
    body: 'Payments, reminders, and progress tracking run themselves. Coach more clients without more hours.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="How it works"
          title={<>Live in <span className="text-gradient">minutes</span>, not months</>}
          subtitle="No migration headaches. No steep learning curve. Set up your coaching business and let KOACH AI run it."
        />

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={s.step} delay={i * 0.12}>
                  <div className="relative text-center md:text-left">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-ink-800 shadow-glow md:mx-0">
                      <Icon className="h-6 w-6 text-brand-300" />
                      <motion.span
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-ai text-[10px] font-bold text-white"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.12, type: 'spring', stiffness: 300 }}
                      >
                        {i + 1}
                      </motion.span>
                    </div>
                    <div className="mt-5 text-xs font-semibold tracking-widest text-white/35">STEP {s.step}</div>
                    <h3 className="mt-1 text-xl font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{s.body}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
