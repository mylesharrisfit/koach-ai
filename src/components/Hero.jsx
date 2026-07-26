import { motion } from 'framer-motion'
import { ArrowRight, Play, Star, Sparkles } from 'lucide-react'
import { PrimaryButton, GhostButton } from './ui'
import { useSignup } from './SignupModal'
import { cta } from '../lib/config'
import ProductMockup from './ProductMockup'

const word = {
  hidden: { opacity: 0, y: '0.6em' },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function AnimatedHeadline() {
  const line1 = ['The', 'AI', 'Coaching']
  return (
    <h1 className="text-balance text-4xl font-extrabold leading-[1.05] sm:text-6xl md:text-[4.5rem]">
      <motion.span
        className="inline-flex flex-wrap justify-center gap-x-3"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        animate="show"
      >
        {line1.map((w, i) => (
          <span key={i} className="overflow-hidden">
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
          </span>
        ))}
      </motion.span>
      <span className="mt-1 block overflow-hidden">
        <motion.span variants={word} initial="hidden" animate="show" className="text-gradient inline-block">
          Operating System
        </motion.span>
      </span>
    </h1>
  )
}

export default function Hero() {
  const { openModal } = useSignup()

  return (
    <section id="top" className="relative pt-32 sm:pt-40">
      <div className="container-x">
        {/* Announcement pill */}
        <div className="flex justify-center">
          <motion.a
            href="#features"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="pill hover:border-white/20"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <Sparkles className="h-3.5 w-3.5 text-ai-300" />
            New — AI program builder & automated check-ins
          </motion.a>
        </div>

        <div className="mt-7 text-center">
          <AnimatedHeadline />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg"
          >
            KOACH AI runs your entire coaching business in one place — AI-built programs and
            nutrition, automated check-ins, payments, and client management. Spend less time on
            admin, and more time coaching.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <PrimaryButton as="button" onClick={() => openModal('hero')} className="w-full sm:w-auto">
              Start free — no card <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
            <GhostButton as="a" href={cta('hero-demo')} className="w-full sm:w-auto">
              <Play className="h-4 w-4" /> See it in action
            </GhostButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/45"
          >
            <span className="flex items-center gap-1.5">
              <span className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </span>
              Loved by modern coaches
            </span>
            <span>14-day free trial</span>
            <span>Cancel anytime</span>
          </motion.div>
        </div>

        {/* Product preview */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 1200 }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <ProductMockup />
        </motion.div>
      </div>
    </section>
  )
}
