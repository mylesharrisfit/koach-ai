import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Logo } from './Logo'
import { PrimaryButton, GhostButton } from './ui'
import { useSignup } from './SignupModal'
import { cta } from '../lib/config'

const NAV = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export default function Nav() {
  const { openModal } = useSignup()
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : ''
  }, [mobile])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4"
    >
      <div
        className={
          'flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 sm:px-5 ' +
          (scrolled ? 'glass shadow-card' : 'border border-transparent')
        }
      >
        <a href="#top" className="flex items-center gap-2.5" aria-label="KOACH AI home">
          <Logo className="h-8 w-8" />
          <span className="text-[15px] font-bold tracking-tight text-white">
            KOACH<span className="text-gradient"> AI</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-white/65 transition-colors hover:bg-white/5 hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <GhostButton as="a" href={cta('nav-login')} className="!px-4 !py-2">
            Log in
          </GhostButton>
          <PrimaryButton as="button" onClick={() => openModal('nav')} magnetic={false} className="!px-5 !py-2">
            Start free <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </div>

        <button
          className="rounded-full p-2 text-white md:hidden"
          onClick={() => setMobile((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass absolute inset-x-4 top-[4.5rem] rounded-3xl p-4 md:hidden"
          >
            <div className="flex flex-col">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMobile(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/5"
                >
                  {n.label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
                <GhostButton as="a" href={cta('nav-mobile-login')}>
                  Log in
                </GhostButton>
                <PrimaryButton
                  as="button"
                  magnetic={false}
                  onClick={() => {
                    setMobile(false)
                    openModal('nav-mobile')
                  }}
                >
                  Start free <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
