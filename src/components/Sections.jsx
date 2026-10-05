import Icon from './Icons'
import Demo from '../demos/Demo'
import CtaForm from './CtaForm'
import { Phone, Check } from '../demos/ui'
import { SIGNUP_URL } from '../lib/config'
import { PLANS, INCLUDED } from '../lib/plans'

export const SectionHead = ({ eyebrow, title, children, center, className = '' }) => (
  <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h2 className="mt-2 text-[2rem] sm:text-5xl">{title}</h2>
    {children && <p className="lede mt-4">{children}</p>}
  </div>
)

export const CtaRow = ({ dark, center = true, noPricing }) => (
  <div className={`mt-12 flex flex-col gap-3 sm:flex-row ${center ? 'items-center sm:justify-center' : ''}`}>
    <a href={SIGNUP_URL} className="btn btn-red">Start free trial</a>
    {!noPricing && <a href="#pricing" className={`btn ${dark ? 'btn-outline-dark' : 'btn-dark'}`}>See pricing</a>}
  </div>
)

/* 3. honest proof strip */
const PROOF = [
  ['spark', 'AI in every plan'],
  ['coins', 'Flat pricing, everything included'],
  ['tag', 'Your brand, not ours, in front of clients'],
  ['truck', 'Switching from Trainerize or Everfit? We’ll help you move your clients over.'],
]
export function ProofStrip() {
  return (
    <section aria-label="Why KOACH" className="border-b border-line bg-mist py-8 sm:py-10">
      <ul className="wrap grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PROOF.map(([icon, text]) => (
          <li key={text} className="flex items-start gap-3">
            <span className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-white text-ink ring-1 ring-line"><Icon name={icon} /></span>
            <span className="pt-1.5 font-display text-[17px] font-bold leading-tight text-ink" style={{ fontStretch: '85%' }}>{text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* 5. coach the way you sell */
function MsgPhone() {
  return (
    <div className="kd-stage" style={{ width: 208 }}>
      <Phone style={{ height: 384 }}>
        <div className="kd-pstatus" />
        <div className="kd-ph"><small>Message</small><b className="kd-h">Maya R.</b></div>
        <div className="kd-thread">
          <p className="kd-msg kd-msg-in">How did the squats feel this week?</p>
          <p className="kd-msg kd-msg-out">Good! Knee was fine, added 10 lb.</p>
          <p className="kd-msg kd-msg-in">Great. Let’s keep that load and add a set.</p>
        </div>
        <div className="kd-mini"><small>Next session</small><b>Lower B · Thursday</b><span className="kd-chip kd-chip-ok">Custom program</span></div>
      </Phone>
    </div>
  )
}
function ProgramPhone() {
  return (
    <div className="kd-stage" style={{ width: 208 }}>
      <Phone style={{ height: 384 }}>
        <div className="kd-pstatus" />
        <div className="kd-ph"><small>Group program</small><b className="kd-h">Strength block</b></div>
        <div className="kd-sets">
          <div className="kd-set kd-set-done"><span style={{ width: 'auto' }}>Week 1</span><b className="num">Foundations</b><i className="kd-tick"><Check s={11} /></i></div>
          <div className="kd-set kd-set-done"><span style={{ width: 'auto' }}>Week 2</span><b className="num">Volume</b><i className="kd-tick"><Check s={11} /></i></div>
          <div className="kd-set"><span style={{ width: 'auto' }}>Week 3</span><b className="num">Intensity</b></div>
        </div>
        <div className="kd-mini"><small>Template</small><b>Assigned to the whole group</b></div>
        <div className="kd-mini"><small className="flex items-center gap-1.5"><Icon name="spark" size={12} /> AI-generated plan</small><b>Meal plan from macro targets</b></div>
      </Phone>
    </div>
  )
}

const STYLES = [
  {
    id: 'one', title: '1:1 premium coaching', phone: <MsgPhone />,
    text: 'High-touch coaching for clients who pay for your attention.',
    bullets: ['Custom programs for each client', 'Personal check-ins', 'Direct messaging'],
  },
  {
    id: 'scale', title: 'Scalable programs', phone: <ProgramPhone />,
    text: 'Serve more clients without rebuilding the plan every time.',
    bullets: ['Group programs', 'Templates you reuse', 'AI-generated plans you review'],
  },
]
export function CoachStyles() {
  return (
    <section id="coaching-styles" className="bg-mist section">
      <div className="wrap">
        <SectionHead eyebrow="Online, hybrid, nutrition, small teams" title="Coach the way you sell">
          Run 1:1 coaching, scalable programs, or both from the same account.
        </SectionHead>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {STYLES.map((s) => (
            <article key={s.id} className="card flex flex-col gap-8 p-6 sm:flex-row sm:items-center sm:p-8">
              <div className="flex-1">
                <h3 className="text-[1.7rem] sm:text-3xl">{s.title}</h3>
                <p className="mt-3 text-mut">{s.text}</p>
                <ul className="mt-5 grid gap-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[15px] font-medium"><Icon name="check" size={18} className="mt-0.5 flex-none text-ok" />{b}</li>
                  ))}
                </ul>
                <a href={SIGNUP_URL} className="btn btn-red mt-7">Start free trial</a>
              </div>
              <div className="flex justify-center rounded-xl bg-mist px-6 pb-0 pt-8 sm:w-[270px] sm:flex-none" aria-hidden="true">
                <div className="-mb-px overflow-hidden" style={{ height: 300 }}>{s.phone}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 6. dark band */
const TODAY_POINTS = [
  'Missed two sessions in a row. Message Chris.',
  'Every session done. Nothing to do for Alex.',
  'Three amber days. Check in with Dana.',
]
export function TodayBand() {
  return (
    <section id="today" className="dark-zone bg-graphite section text-white">
      <div className="wrap">
        <SectionHead eyebrow="Today" title={<span className="!text-white">Who needs you, in one screen</span>}>
          Every client’s week as green, amber or missed, so you start the day knowing who to message first.
        </SectionHead>
        <ul className="sr-only">
          {TODAY_POINTS.map((p) => <li key={p}>{p}</li>)}
        </ul>
        <div className="mt-12">
          <Demo
            scene="today"
            label="Animated demo. A weekly client status grid fills in column by column in green, amber and striped red. Three numbered callouts then point to clients who missed sessions, are slipping, or completed everything."
          />
        </div>
        <CtaRow dark />
      </div>
    </section>
  )
}

/* 7. capability grid: only features the app has */
const CAPS = [
  { id: 'plan', title: 'Plan & coach', items: [
    ['clipboard', 'Program builder with exercise library'],
    ['spark', 'AI program builder'],
    ['layers', 'Program templates'],
    ['users', 'Group programs'],
    ['bot', 'AI coaching assistant (Elite and up)'],
  ] },
  { id: 'track', title: 'Track & measure', items: [
    ['leaf', 'Nutrition targets and macro tracking'],
    ['spark', 'AI meal plans'],
    ['camera', 'Check-ins with photos and measurements'],
    ['grid', 'Weekly client status grid'],
    ['chart', 'Revenue, retention and progress reporting'],
  ] },
  { id: 'engage', title: 'Engage', items: [
    ['phone', 'Client mobile app'],
    ['timer', 'Workout logger with rest timer'],
    ['trophy', 'New-best flags on logged sets'],
    ['message', 'Direct messaging'],
    ['spark', 'AI onboarding (Pro and up)'],
  ] },
  { id: 'scale', title: 'Scale', items: [
    ['list', '“Needs you today” list'],
    ['card', 'Stripe payments and subscriptions'],
    ['calendar', 'Zoom, Calendly and Google Calendar'],
    ['seat', 'Team seats (Enterprise)'],
    ['code', 'API access (Enterprise)'],
  ] },
  { id: 'brand', title: 'Your brand', items: [
    ['tag', 'Your logo, colors and coaching name on the client app'],
    ['record', 'Client records, notes and history'],
  ] },
]
export function Capabilities() {
  return (
    <section id="capabilities" className="section">
      <div className="wrap">
        <SectionHead eyebrow="Everything in the plan" title="One system for the whole coaching business" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CAPS.map((c) => (
            <div key={c.id} id={`cap-${c.id}`} className="card p-5">
              <h3 className="text-xl">{c.title}</h3>
              <ul className="mt-5 grid gap-4">
                {c.items.map(([icon, text]) => (
                  <li key={text} className="flex gap-3 text-[15px] leading-snug">
                    <Icon name={icon} size={20} className="mt-px flex-none text-ink" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <CtaRow />
      </div>
    </section>
  )
}

/* 8. integrations: text only, licensing unclear */
const INTEGRATIONS = [
  ['Stripe', 'Payments'],
  ['Zoom', 'Video check-ins'],
  ['Calendly', 'Scheduling'],
  ['Google Calendar', 'Scheduling'],
  ['USDA FoodData Central', 'Nutrition data'],
]
export function Integrations() {
  return (
    <section aria-label="Integrations" className="border-y border-line bg-mist py-12">
      <div className="wrap">
        <p className="text-center font-display text-lg font-bold" style={{ fontStretch: '85%' }}>Works with the tools you already use</p>
        <ul className="mt-6 flex flex-wrap items-stretch justify-center gap-3">
          {INTEGRATIONS.map(([n, d]) => (
            <li key={n} className="rounded-xl border border-line bg-white px-5 py-3 text-center">
              <span className="block font-display text-lg font-bold text-mut" style={{ fontStretch: '85%' }}>{n}</span>
              <span className="block text-sm text-mut">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* 9. everything included in every plan (KOACH only) */
export function Compare() {
  return (
    <section id="compare" className="section">
      <div className="wrap">
        <SectionHead eyebrow="What’s included" title="Everything included in every plan">
          Plans differ by client count and AI usage. The product is the same on all of them.
        </SectionHead>
        <div className="mt-10 overflow-x-auto rounded-xl border border-line" role="region" aria-label="Features included in every plan" tabIndex={0}>
          <table className="w-full border-collapse text-left text-[13px] sm:min-w-[640px] sm:text-[15px]">
            <caption className="sr-only">Features included in every KOACH plan</caption>
            <thead>
              <tr className="bg-graphite text-white">
                <th scope="col" className="p-2.5 sm:p-4"><span className="sr-only">Feature</span></th>
                {PLANS.map((p) => (
                  <th key={p.id} scope="col" className="p-2.5 text-center font-display text-[15px] font-bold sm:p-4 sm:text-lg" style={{ fontStretch: '85%' }}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INCLUDED.map((f) => (
                <tr key={f} className="border-t border-line">
                  <th scope="row" className="p-2.5 font-semibold sm:p-4">{f}</th>
                  {PLANS.map((p) => (
                    <td key={p.id} className="p-2.5 text-center sm:p-4">
                      <Icon name="check" size={20} className="mx-auto text-ok" />
                      <span className="sr-only">Included in {p.name}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

/* 11. FAQ */
const FAQ = [
  ['Can I switch from another app?', 'Yes. Switching from Trainerize or Everfit? You invite your clients by email or link, and we’ll help you move them over.'],
  ['How does the free trial work?', 'Every plan starts with a 30-day free trial. Pick the plan that fits your client count, try it with your own clients, and cancel anytime.'],
  ['Can I cancel anytime?', 'Yes. You can cancel at any time and your access continues to the end of the period you have paid for.'],
  ['Is KOACH white-label?', 'Yes. Your logo, colors and coaching name on the client app.'],
  ['What counts as an AI generation?', 'Generating a program, a meal plan or a set of smart meals counts as one. AI check-in summaries and draft replies don’t count. Your usage resets every billing month, and you can see it in the app.'],
  ['Who owns my data?', 'You do. You own the content you and your clients put into KOACH, and we only host and process it to run the service.'],
  ['How accurate is the AI?', 'AI drafts programs, meal plans and check-in replies, and it can get things wrong. Coaches review and edit everything before it goes to a client, so you stay in charge of what your clients receive.'],
  ['Which tools does it connect to?', 'Stripe for payments, Zoom, Calendly and Google Calendar for scheduling and check-ins, and USDA FoodData Central for nutrition data.'],
]
export function Faq() {
  return (
    <section id="faq" className="section">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHead eyebrow="FAQ" title="Questions coaches ask" />
        <div className="divide-y divide-line border-y border-line">
          {FAQ.map(([q, a]) => (
            <details key={q} className="faq group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-4 font-display text-lg font-bold [&::-webkit-details-marker]:hidden" style={{ fontStretch: '85%' }}>
                {q}
                <Icon name="plus" size={20} className="flex-none transition-transform group-open:rotate-45" />
              </summary>
              <p className="max-w-prose pb-5 leading-relaxed text-mut">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 12. final CTA */
export function FinalCta() {
  return (
    <section className="dark-zone bg-graphite py-16 text-white sm:py-24">
      <div className="wrap grid items-center gap-8 lg:grid-cols-2">
        <h2 className="text-[2.2rem] !text-white sm:text-5xl">Run your coaching business from one place.</h2>
        <CtaForm id="final-email" />
      </div>
    </section>
  )
}
