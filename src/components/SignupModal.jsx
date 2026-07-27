import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowRight, Check, Sparkles } from 'lucide-react'
import { links, cta } from '../lib/config'
import { PrimaryButton } from './ui'

const SignupContext = createContext(null)

export function useSignup() {
  const ctx = useContext(SignupContext)
  if (!ctx) throw new Error('useSignup must be used within <SignupProvider>')
  return ctx
}

const PERKS = [
  '14-day free trial — no card required',
  'AI program & nutrition builder',
  'Automated check-ins & payments',
]

export function SignupProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [source, setSource] = useState('modal')
  const [email, setEmail] = useState('')

  const openModal = useCallback((src = 'modal') => {
    setSource(src)
    setOpen(true)
  }, [])
  const close = useCallback(() => setOpen(false), [])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  // Exit-intent + timed trigger (only once per session)
  useEffect(() => {
    if (sessionStorage.getItem('koach_seen_modal')) return
    let fired = false
    const fire = (src) => {
      if (fired) return
      fired = true
      sessionStorage.setItem('koach_seen_modal', '1')
      openModal(src)
    }
    const onLeave = (e) => {
      if (e.clientY <= 0) fire('exit-intent')
    }
    const timer = setTimeout(() => fire('timed'), 32000)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [openModal])

  function submit(e) {
    e.preventDefault()
    const url = new URL(links.signup)
    if (email) url.searchParams.set('email', email)
    url.searchParams.set('utm_campaign', source)
    window.location.href = url.toString()
  }

  return (
    <SignupContext.Provider value={{ open, openModal, close }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Start your free trial"
              className="glass relative z-10 w-full max-w-md overflow-hidden rounded-3xl p-7 shadow-glow"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Aurora glow inside modal */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-ai/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-brand/30 blur-3xl" />

              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-full p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative">
                <span className="pill mb-4">
                  <Sparkles className="h-3.5 w-3.5 text-ai-300" /> Start free
                </span>
                <h3 className="text-2xl font-bold leading-tight">
                  Run your coaching business on <span className="text-gradient">autopilot</span>
                </h3>
                <p className="mt-2 text-sm text-white/55">
                  Join coaches scaling with KOACH AI. Create your account in under 60 seconds.
                </p>

                <ul className="mt-5 space-y-2.5">
                  {PERKS.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-white/75">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/20 text-brand-300">
                        <Check className="h-3 w-3" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <form onSubmit={submit} className="mt-6 space-y-3">
                  <input
                    type="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@yourgym.com"
                    className="w-full rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-brand/60"
                  />
                  <PrimaryButton as="button" type="submit" magnetic={false} className="w-full">
                    Create my account <ArrowRight className="h-4 w-4" />
                  </PrimaryButton>
                </form>

                <p className="mt-4 text-center text-xs text-white/40">
                  Already coaching with us?{' '}
                  <a href={cta('modal-login')} className="text-brand-300 hover:text-brand-300/80">
                    Log in
                  </a>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SignupContext.Provider>
  )
}
