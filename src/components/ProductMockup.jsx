import { motion } from 'framer-motion'
import { Dumbbell, Apple, MessageSquare, TrendingUp, CheckCircle2, Sparkles } from 'lucide-react'

// A stylized, self-contained preview of the KOACH AI app dashboard.
// Pure markup (no screenshots) so it stays crisp and on-brand.
export default function ProductMockup() {
  return (
    <div className="relative w-full">
      {/* Glow behind the window */}
      <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand/30 to-ai/30 blur-3xl opacity-60" />

      <div className="glass overflow-hidden rounded-[1.5rem] shadow-glow">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <div className="ml-3 flex-1 rounded-md bg-white/[0.04] px-3 py-1 text-[11px] text-white/40">
            app.koachai.net/dashboard
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 p-4">
          {/* Sidebar */}
          <div className="col-span-3 hidden flex-col gap-1.5 sm:flex">
            {[
              { icon: TrendingUp, label: 'Overview', active: true },
              { icon: Dumbbell, label: 'Programs' },
              { icon: Apple, label: 'Nutrition' },
              { icon: MessageSquare, label: 'Check-ins' },
            ].map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={
                  'flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] font-medium ' +
                  (active ? 'bg-white/[0.06] text-white' : 'text-white/45')
                }
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </div>
            ))}
          </div>

          {/* Main */}
          <div className="col-span-12 space-y-3 sm:col-span-9">
            {/* Stat row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { k: 'Active clients', v: '128', d: '+12%' },
                { k: 'Retention', v: '94%', d: '+5%' },
                { k: 'MRR', v: '$24.6k', d: '+18%' },
              ].map((s, i) => (
                <motion.div
                  key={s.k}
                  className="rounded-xl border border-white/8 bg-white/[0.03] p-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className="text-[10px] text-white/45">{s.k}</div>
                  <div className="mt-1 text-lg font-bold text-white">{s.v}</div>
                  <div className="text-[10px] font-medium text-emerald-400">{s.d}</div>
                </motion.div>
              ))}
            </div>

            {/* Chart */}
            <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-medium text-white/70">Client progress</span>
                <span className="pill !px-2 !py-0.5 !text-[9px]">
                  <Sparkles className="h-2.5 w-2.5 text-ai-300" /> AI insights
                </span>
              </div>
              <svg viewBox="0 0 320 90" className="h-24 w-full">
                <defs>
                  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#3B82F6" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0 70 C 40 60, 60 40, 90 44 S 150 30, 180 26 S 250 20, 320 8"
                  fill="none"
                  stroke="url(#chartLine)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: 'easeInOut' }}
                />
                <defs>
                  <linearGradient id="chartLine" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#60A5FA" />
                    <stop offset="1" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
                <path d="M0 70 C 40 60, 60 40, 90 44 S 150 30, 180 26 S 250 20, 320 8 V90 H0 Z" fill="url(#area)" />
              </svg>
            </div>

            {/* AI task row */}
            <motion.div
              className="flex items-center gap-2 rounded-xl border border-white/8 bg-gradient-to-r from-brand/10 to-ai/10 p-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-300" />
              <span className="text-[11px] text-white/70">
                AI generated 12 personalized programs & sent 34 check-in reminders this morning.
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating chips */}
      <motion.div
        className="glass absolute -left-4 top-1/3 hidden rounded-2xl px-3 py-2 shadow-card sm:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-2">
          <Dumbbell className="h-4 w-4 text-brand-300" />
          <span className="text-[11px] font-medium text-white/80">Program built in 8s</span>
        </div>
      </motion.div>
      <motion.div
        className="glass absolute -right-3 bottom-8 hidden rounded-2xl px-3 py-2 shadow-card sm:block"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-white/80">Payment received</span>
          <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">
            +$180
          </span>
        </div>
      </motion.div>
    </div>
  )
}
