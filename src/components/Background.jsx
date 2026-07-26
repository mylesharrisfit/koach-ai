import { motion } from 'framer-motion'

// Ambient aurora + grid backdrop. Fixed, non-interactive, sits behind content.
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(37,99,235,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_90%_10%,rgba(124,58,237,0.14),transparent_55%)]" />

      {/* Floating aurora blobs */}
      <motion.div
        className="absolute -left-40 top-[-10%] h-[38rem] w-[38rem] rounded-full bg-brand/20 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-40 top-[20%] h-[34rem] w-[34rem] rounded-full bg-ai/20 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Fine grid */}
      <div className="grid-bg absolute inset-0 opacity-70" />

      {/* Vignette to seat content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_100%,rgba(8,9,12,0.9),transparent_70%)]" />
    </div>
  )
}
