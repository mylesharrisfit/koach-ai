import {
  Dumbbell,
  Apple,
  MessageSquare,
  CreditCard,
  Users,
  LineChart,
  Bot,
  Smartphone,
} from 'lucide-react'
import { SectionHeading, RevealGroup, RevealItem, TiltCard } from './ui'

const FEATURES = [
  {
    icon: Bot,
    title: 'AI Program Builder',
    body: 'Generate periodized training programs tailored to each client’s goals, equipment, and history in seconds — then fine-tune with a click.',
    span: 'lg:col-span-2',
    accent: true,
  },
  {
    icon: Apple,
    title: 'Nutrition & Macros',
    body: 'Auto-build meal plans, track macros, and hit targets with a real food database.',
  },
  {
    icon: MessageSquare,
    title: 'Automated Check-ins',
    body: 'Weekly check-ins, photos, and InBody data collected and summarized for you.',
  },
  {
    icon: CreditCard,
    title: 'Payments on autopilot',
    body: 'Stripe-powered subscriptions, invoicing, and dunning — get paid without chasing.',
  },
  {
    icon: Users,
    title: 'Client CRM',
    body: 'Every client’s lifecycle, notes, and history in one organized, searchable place.',
  },
  {
    icon: LineChart,
    title: 'Progress Analytics',
    body: 'See retention, revenue, and results at a glance with AI-surfaced insights.',
    span: 'lg:col-span-2',
    accent: true,
  },
]

function Card({ f }) {
  const Icon = f.icon
  return (
    <TiltCard className={`h-full ${f.span || ''}`}>
      <div
        className={
          'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 p-6 transition-colors duration-300 hover:border-white/16 ' +
          (f.accent ? 'bg-gradient-to-br from-brand/[0.08] to-ai/[0.06]' : 'bg-white/[0.03]')
        }
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400/20 to-ai/20 text-brand-300 ring-1 ring-white/10">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold text-white">{f.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55">{f.body}</p>
      </div>
    </TiltCard>
  )
}

export default function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Everything in one platform"
          title={<>Replace 6 tools with <span className="text-gradient">one</span></>}
          subtitle="KOACH AI unifies programming, nutrition, communication, payments, and analytics — so your whole business runs from a single dashboard."
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <RevealItem key={f.title} className={f.span || ''}>
              <Card f={f} />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Extra strip */}
        <RevealGroup className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <RevealItem>
            <div className="flex h-full items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-6">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400/20 to-ai/20 text-brand-300 ring-1 ring-white/10">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Branded client app</h3>
                <p className="mt-1 text-sm text-white/55">Your clients get a polished mobile experience under your brand.</p>
              </div>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="flex h-full items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-6">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400/20 to-ai/20 text-brand-300 ring-1 ring-white/10">
                <Dumbbell className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Exercise library</h3>
                <p className="mt-1 text-sm text-white/55">Thousands of demos, or add your own — with video and coaching cues.</p>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}
