const ITEMS = [
  'AI Program Builder',
  'Automated Check-ins',
  'Nutrition & Macros',
  'Stripe Payments',
  'Client CRM',
  'Progress Analytics',
  'Branded Client App',
  'Smart Reminders',
]

export default function TrustBar() {
  return (
    <section aria-label="Platform capabilities" className="relative mt-24 border-y border-white/[0.06] py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-900 to-transparent" />
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-3 whitespace-nowrap px-8">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-400 to-ai" />
              <span className="text-sm font-medium text-white/50">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
