import Screenshot from '../components/Screenshot'
import PricingTable from '../components/PricingTable'
import { signupUrl } from '../lib/config'

const FEATURES = [
  {
    title: 'Programming',
    body: 'Build training programs from an exercise library, or have the builder draft one from a client’s goal, equipment and history. Edit anything before it goes out.',
    img: '/screenshots/programs.png',
    alt: 'Program builder showing a weekly training plan',
  },
  {
    title: 'Check-ins',
    body: 'Clients submit weekly check-ins with photos and measurements from the mobile app. You see who is on track and who needs a message.',
    img: '/screenshots/checkins.png',
    alt: 'Check-in review screen with client photos and measurements',
  },
  {
    title: 'Clients and payments',
    body: 'One record per client: plan, notes, history, billing. Subscriptions and invoices run through Stripe, so you stop chasing payments.',
    img: '/screenshots/clients.png',
    alt: 'Client list with plan and payment status',
  },
]

const REPLACES = [
  ['Trainerize or Everfit', 'Programs, workouts and the client app.'],
  ['Notion or spreadsheets', 'Client records, notes and check-in tracking.'],
  ['separate invoicing', 'Subscriptions and payments, in the same place as the client.'],
]

export default function Home() {
  return (
    <>
      <section className="wrap pb-16 pt-16 sm:pb-24 sm:pt-24">
        <h1 className="max-w-3xl text-4xl leading-[1.05] sm:text-6xl">
          Coaching software for online fitness coaches.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
          KOACH AI handles programming, nutrition, check-ins, client records and payments in one
          place. It replaces Trainerize or Everfit, plus the Notion pages and spreadsheets around them.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={signupUrl('pro', 'monthly')} className="btn btn-primary">Start free trial</a>
          <a href="/pricing" className="btn btn-secondary">See pricing</a>
        </div>
        <p className="mt-4 text-sm text-neutral-500">30-day free trial. Plans from $29 a month.</p>
        <div className="mt-14">
          <Screenshot src="/screenshots/dashboard.png" alt="KOACH AI coach dashboard" priority />
        </div>
      </section>

      <section id="features" className="scroll-mt-16 border-t border-neutral-200 py-16 sm:py-24">
        <div className="wrap">
          <p className="eyebrow">Features</p>
          <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">Everything you use to run a client roster.</h2>
          <div className="mt-14 space-y-20 sm:space-y-28">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                <div className={`lg:col-span-4 ${i % 2 ? 'lg:order-2' : ''}`}>
                  <h3 className="text-2xl">{f.title}</h3>
                  <p className="mt-3 leading-relaxed text-neutral-600">{f.body}</p>
                </div>
                <div className={`lg:col-span-8 ${i % 2 ? 'lg:order-1' : ''}`}>
                  <Screenshot src={f.img} alt={f.alt} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-20 max-w-2xl leading-relaxed text-neutral-600">
            Also included: nutrition targets and macro tracking, a mobile app for your clients, and
            reporting on revenue, retention and client progress.
          </p>
        </div>
      </section>

      <section className="border-t border-neutral-200 py-16 sm:py-24">
        <div className="wrap">
          <p className="eyebrow">Who it is for</p>
          <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
            Coaches who sell training or nutrition online and are tired of juggling tools.
          </h2>
          <dl className="mt-12 divide-y divide-neutral-200 border-y border-neutral-200">
            {REPLACES.map(([a, b]) => (
              <div key={a} className="grid gap-1 py-5 sm:grid-cols-3 sm:gap-8">
                <dt className="font-medium">Replaces {a}</dt>
                <dd className="text-neutral-600 sm:col-span-2">{b}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-16 border-t border-neutral-200 py-16 sm:py-24">
        <div className="wrap">
          <p className="eyebrow">Pricing</p>
          <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">Priced by roster size.</h2>
          <p className="mt-3 max-w-xl text-neutral-600">Start with a 30-day free trial. Pick the plan that fits your client count.</p>
          <div className="mt-10">
            <PricingTable />
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-white sm:py-24">
        <div className="wrap">
          <h2 className="max-w-xl text-3xl text-white sm:text-4xl">Try it with your own clients.</h2>
          <p className="mt-3 text-neutral-400">30 days free. No setup call needed.</p>
          <a href={signupUrl('pro', 'monthly')} className="btn btn-primary mt-8">Start free trial</a>
        </div>
      </section>
    </>
  )
}
