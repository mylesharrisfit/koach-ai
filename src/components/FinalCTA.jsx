import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PrimaryButton, GhostButton, Reveal } from './ui'
import { useSignup } from './SignupModal'
import { cta } from '../lib/config'

export default function FinalCTA() {
  const { openModal } = useSignup()
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-16">
            {/* Animated glow */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand/40 to-ai/40 blur-[100px]"
              animate={{ opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
                Ready to coach more and <span className="text-gradient">work less?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/60 sm:text-lg">
                Join the coaches building smarter businesses with KOACH AI. Start free today —
                it takes under a minute.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <PrimaryButton as="button" onClick={() => openModal('final-cta')} className="w-full sm:w-auto">
                  Start free — no card <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
                <GhostButton as="a" href={cta('final-login')} className="w-full sm:w-auto">
                  Log in
                </GhostButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
