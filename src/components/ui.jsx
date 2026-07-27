import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { fadeUp, stagger } from '../lib/motion'

// ── Reveal: scroll-triggered fade-up wrapper ────────────────────────────────
export function Reveal({ children, className = '', delay = 0, y = 28 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

// Staggered group + item helpers
export function RevealGroup({ children, className = '', stagger: s = 0.09 }) {
  return (
    <motion.div
      className={className}
      variants={stagger(s)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  )
}
export function RevealItem({ children, className = '' }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  )
}

// ── MagneticButton: primary CTA that leans toward the cursor ────────────────
export function MagneticButton({ children, as = 'button', className = '', ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18 })
  const sy = useSpring(y, { stiffness: 250, damping: 18 })

  function onMove(e) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25)
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  const Comp = motion[as] || motion.button
  return (
    <Comp
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  )
}

// ── Button styles ───────────────────────────────────────────────────────────
export function PrimaryButton({ children, className = '', magnetic = true, as, ...props }) {
  const base =
    'shine group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white ' +
    'bg-gradient-to-r from-brand-400 to-ai shadow-glow transition-transform duration-200 will-change-transform hover:scale-[1.03] active:scale-[0.98]'
  if (magnetic) {
    return (
      <MagneticButton as={as} className={`${base} ${className}`} {...props}>
        {children}
      </MagneticButton>
    )
  }
  const Comp = as === 'a' ? 'a' : 'button'
  return (
    <Comp className={`${base} ${className}`} {...props}>
      {children}
    </Comp>
  )
}

export function GhostButton({ children, className = '', as = 'button', ...props }) {
  const Comp = as === 'a' ? 'a' : 'button'
  return (
    <Comp
      className={
        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ' +
        'text-white/85 border border-white/12 bg-white/[0.03] transition-colors hover:bg-white/[0.07] hover:text-white ' +
        className
      }
      {...props}
    >
      {children}
    </Comp>
  )
}

// ── SectionHeading ──────────────────────────────────────────────────────────
export function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <Reveal>
          <span className="pill mb-4">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-[2.75rem]">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-white/55 sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}

// ── TiltCard: subtle 3D tilt on pointer ─────────────────────────────────────
export function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const trX = useTransform(ry, (v) => v)
  void trX

  function onMove(e) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    ry.set(px * 8)
    rx.set(-py * 8)
  }
  function reset() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
