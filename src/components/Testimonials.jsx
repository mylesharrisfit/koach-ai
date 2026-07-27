import { Star, Quote } from 'lucide-react'
import { SectionHeading, RevealGroup, RevealItem } from './ui'

const QUOTES = [
  {
    quote:
      'KOACH AI gave me my evenings back. Programs that used to take an hour now take seconds, and my clients think I’m superhuman.',
    name: 'Jordan Reyes',
    role: 'Online Strength Coach',
    initials: 'JR',
  },
  {
    quote:
      'I went from 40 to 110 clients without hiring. The automation around check-ins and payments is genuinely a game changer.',
    name: 'Alicia Monroe',
    role: 'Founder, AM Performance',
    initials: 'AM',
  },
  {
    quote:
      'The AI nutrition and analytics keep clients accountable between sessions. Retention is the best it’s ever been.',
    name: 'Marcus Bell',
    role: 'Physique & Nutrition Coach',
    initials: 'MB',
  },
]

export default function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Trusted by modern coaches"
          title={<>Built for coaches who want to <span className="text-gradient">grow</span></>}
          subtitle="From solo online coaches to full teams — KOACH AI scales with your business."
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {QUOTES.map((q) => (
            <RevealItem key={q.name}>
              <figure className="flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-6">
                <Quote className="h-6 w-6 text-brand-300/60" />
                <div className="mt-3 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/75">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-ai text-xs font-bold text-white">
                    {q.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{q.name}</div>
                    <div className="text-xs text-white/50">{q.role}</div>
                  </div>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
