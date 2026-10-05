import { useState } from 'react'
import Icon from './Icons'
import CtaForm from './CtaForm'
import { Phone, Check, Ring } from '../demos/ui'
import { AiPill, Divider, Reveal, TierPill } from './fx'
import { SIGNUP_URL } from '../lib/config'
import { PLANS, INCLUDED } from '../lib/plans'

export const SectionHead = ({ eyebrow, title, children, center, className = '' }) => (
  <Reveal from="up" className={`${center ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h2 className="mt-2 text-[2rem] sm:text-5xl">{title}</h2>
    {children && <p className="lede mt-4">{children}</p>}
  </Reveal>
)

export const CtaRow = ({ dark, center = true, noPricing }) => (
  <Reveal from="up" className={`mt-12 flex flex-col gap-3 sm:flex-row ${center ? 'items-center sm:justify-center' : ''}`}>
    <a href={SIGNUP_URL} className="btn btn-red">Start free trial</a>
    {!noPricing && <a href="#pricing" className={`btn ${dark ? 'btn-outline-dark' : 'btn-dark'}`}>See pricing</a>}
  </Reveal>
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
    <section aria-label="Why KOACH" className="bg-mist pb-10 pt-6 sm:pb-12 sm:pt-8">
      <ul className="wrap grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PROOF.map(([icon, text], i) => (
          <Reveal as="li" key={text} i={i} className="flex items-start gap-3">
            <span className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-white text-ink ring-1 ring-line"><Icon name={icon} /></span>
            <span className="pt-1.5 font-display text-[17px] font-bold leading-tight text-ink" style={{ fontStretch: '85%' }}>{text}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/* 5. coach the way you sell: three client-app screens fanned out per card */
const MiniPhone = ({ children }) => (
  <Phone className="fan-phone">
    <div className="kd-pstatus" />
    {children}
  </Phone>
)
const SCREENS = {
  one: [
    <MiniPhone key="a">
      <div className="kd-ph"><small>Message</small><b className="kd-h">Coach Dana</b></div>
      <div className="kd-thread">
        <p className="kd-msg kd-msg-in">How did squats feel?</p>
        <p className="kd-msg kd-msg-out">Knee was fine, added 10 lb.</p>
      </div>
    </MiniPhone>,
    <MiniPhone key="b">
      <div className="kd-ph"><small>Built for Maya</small><b className="kd-h">Lower B</b></div>
      <div className="kd-sets">
        <div className="kd-set kd-set-done"><b className="num">Box squat</b><i className="kd-tick"><Check s={10} /></i></div>
        <div className="kd-set kd-set-done"><b className="num">Hip thrust</b><i className="kd-tick"><Check s={10} /></i></div>
        <div className="kd-set"><b className="num">Leg curl</b></div>
      </div>
    </MiniPhone>,
    <MiniPhone key="c">
      <div className="kd-ph"><small>Check-in</small><b className="kd-h">Week 8</b></div>
      <div className="kd-photos hs-photos-s"><div className="kd-photo"><i /></div><div className="kd-photo"><i /></div></div>
      <div className="hs-sent"><Check s={11} /> Submitted</div>
    </MiniPhone>,
  ],
  scale: [
    <MiniPhone key="a">
      <div className="kd-ph"><small>Group program</small><b className="kd-h">Strength block</b></div>
      <div className="kd-sets">
        <div className="kd-set kd-set-done"><b className="num">Week 1</b><i className="kd-tick"><Check s={10} /></i></div>
        <div className="kd-set kd-set-done"><b className="num">Week 2</b><i className="kd-tick"><Check s={10} /></i></div>
        <div className="kd-set"><b className="num">Week 3</b></div>
      </div>
    </MiniPhone>,
    <MiniPhone key="b">
      <div className="kd-ph"><small>Template</small><b className="kd-h">Fat loss, 3 days</b></div>
      <div className="kd-mini"><small>Assigned to</small><b>The whole group</b></div>
      <div className="kd-mini"><small>Starts</small><b>Monday</b></div>
    </MiniPhone>,
    <MiniPhone key="c">
      <div className="kd-ph"><small>AI meal plan</small><b className="kd-h">Today</b></div>
      <div className="fan-rings">
        <Ring color="#1F7A52" size={46} pct={0.8}><b className="num">180</b></Ring>
        <Ring color="#F2C46B" size={46} pct={0.7}><b className="num">250</b></Ring>
      </div>
      <div className="kd-mini"><small>Lunch</small><b>Chicken, rice, greens</b></div>
    </MiniPhone>,
  ],
}
const STYLES = [
  { id: 'one', title: '1:1 premium coaching', text: 'High-touch coaching for clients who pay for your attention.', bullets: [['Custom programs for each client'], ['Personal check-ins'], ['Direct messaging']] },
  { id: 'scale', title: 'Scalable programs', text: 'Serve more clients without rebuilding the plan every time.', bullets: [['Group programs'], ['Templates you reuse'], ['AI-generated plans you review', true]] },
]
export function CoachStyles() {
  return (
    <section id="coaching-styles" className="cv bg-mist section">
      <div className="wrap">
        <SectionHead eyebrow="Online, hybrid, nutrition, small teams" title="Coach the way you sell">
          Run 1:1 coaching, scalable programs, or both from the same account.
        </SectionHead>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {STYLES.map((s, i) => (
            <Reveal as="article" key={s.id} i={i} className="card fan-card flex flex-col p-6 sm:p-8">
              <h3 className="text-[1.7rem] sm:text-3xl">{s.title}</h3>
              <p className="mt-3 text-mut">{s.text}</p>
              <ul className="mt-5 grid gap-2.5">
                {s.bullets.map(([b, ai]) => (
                  <li key={b} className="flex items-center gap-2.5 text-[15px] font-medium"><Icon name="check" size={18} className="flex-none text-ok" />{b}{ai && <AiPill />}</li>
                ))}
              </ul>
              <div className="fan" aria-hidden="true">
                {SCREENS[s.id].map((p, n) => <div key={n} className={`fan-p fan-p${n}`}>{p}</div>)}
              </div>
              <a href={SIGNUP_URL} className="btn btn-red mt-6 self-start">Start free trial</a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 7. capability grid: only features the app has. ai = AI-powered, tier = plan needed */
const CAPS = [
  { id: 'plan', title: 'Plan & coach', items: [
    ['clipboard', 'Program builder with exercise library'],
    ['spark', 'AI program builder', true],
    ['layers', 'Program templates'],
    ['users', 'Group programs'],
    ['bot', 'AI coaching assistant', true, 'Elite and up'],
  ] },
  { id: 'track', title: 'Track & measure', items: [
    ['leaf', 'Nutrition targets and macro tracking'],
    ['spark', 'AI meal plans', true],
    ['camera', 'Check-ins with photos and measurements'],
    ['grid', 'Weekly client status grid'],
    ['chart', 'Revenue, retention and progress reporting'],
  ] },
  { id: 'engage', title: 'Engage', items: [
    ['phone', 'Client mobile app'],
    ['timer', 'Workout logger with rest timer'],
    ['trophy', 'New-best flags on logged sets'],
    ['message', 'Direct messaging'],
    ['spark', 'AI onboarding', true, 'Pro and up'],
  ] },
  { id: 'scale', title: 'Scale', items: [
    ['list', '“Needs you today” list'],
    ['card', 'Stripe payments and subscriptions'],
    ['calendar', 'Zoom, Calendly and Google Calendar'],
    ['seat', 'Team seats', false, 'Enterprise'],
    ['code', 'API access', false, 'Enterprise'],
  ] },
  { id: 'brand', title: 'Your brand', items: [
    ['tag', 'Your logo, colors and coaching name on the client app'],
    ['record', 'Client records, notes and history'],
  ] },
]
export function Capabilities() {
  return (
    <section id="capabilities" className="cv section">
      <div className="wrap">
        <SectionHead eyebrow="Everything in the plan" title="One system for the whole coaching business" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CAPS.map((c, i) => (
            <Reveal key={c.id} i={i} id={`cap-${c.id}`} className="card cap-card p-5">
              <h3 className="text-xl">{c.title}</h3>
              <ul className="mt-5 grid gap-4">
                {c.items.map(([icon, text, ai, tier], j) => (
                  <li key={text} className="flex gap-3 text-[15px] leading-snug">
                    <Icon name={icon} size={20} draw className="mt-px flex-none text-ink" style={{ '--j': j }} />
                    <span>
                      {text}
                      {(ai || tier) && (
                        <span className="ml-1.5 inline-flex flex-wrap gap-1 align-[1px]">
                          {ai && <AiPill />}
                          {tier && <TierPill>{tier}</TierPill>}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <CtaRow />
      </div>
    </section>
  )
}

/* 8. dual marquee: integrations (text only, licensing unclear) and real features */
const INTEGRATIONS = ['Stripe', 'Zoom', 'Calendly', 'Google Calendar', 'USDA FoodData Central']
const FEATURES = ['AI program builder', 'AI meal plans', 'Check-ins', 'Progress photos', 'Client app', 'Workout logger', 'Rest timer', 'Stripe billing', 'Zoom check-ins', 'Direct messaging', 'Group programs', 'Templates', 'Macro tracking', 'White-label client app', 'Revenue reporting']
function MqRow({ items, reps = 1, dir, label, chip }) {
  const all = Array.from({ length: reps }).flatMap(() => items)
  return (
    <div className="mq-row" data-dir={dir}>
      <div className="mq-track">
        {[0, 1].map((g) => (
          <ul key={g} className="mq-group" aria-label={g ? undefined : label} aria-hidden={g ? true : undefined}>
            {all.map((x, n) => (
              <li key={n} className={`${chip} ${n >= items.length ? 'mq-rep' : ''}`} aria-hidden={!g && n >= items.length ? true : undefined}>{x}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
export function Marquees() {
  const [paused, setPaused] = useState(false)
  return (
    <section aria-label="Integrations and features" className="cv mq border-y border-line bg-mist py-12" data-paused={paused ? '' : undefined}>
      <div className="wrap flex items-center justify-between gap-4">
        <p className="font-display text-lg font-bold" style={{ fontStretch: '85%' }}>Works with the tools you already use</p>
        <button type="button" className="mq-btn" onClick={() => setPaused((p) => !p)} aria-pressed={paused} aria-label={paused ? 'Play scrolling lists' : 'Pause scrolling lists'}>
          <Icon name={paused ? 'play' : 'pause'} size={14} />
        </button>
      </div>
      <div className="mt-6 grid gap-3">
        <MqRow items={INTEGRATIONS} reps={3} dir="left" label="Integrations" chip="mq-int" />
        <MqRow items={FEATURES} dir="right" label="Features" chip="mq-chip" />
      </div>
    </section>
  )
}

/* 9. everything included in every plan (KOACH only) */
export function Compare() {
  return (
    <section id="compare" className="cv section">
      <div className="wrap">
        <SectionHead eyebrow="What’s included" title="Everything included in every plan">
          Plans differ by client count and AI usage. The product is the same on all of them.
        </SectionHead>
        <Reveal className="mt-10 overflow-x-auto rounded-xl border border-line" role="region" aria-label="Features included in every plan" tabIndex={0}>
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
                  <th scope="row" className="p-2.5 font-semibold sm:p-4">{f}{/^AI\b/.test(f) && <span className="ml-1.5 align-[1px]"><AiPill /></span>}</th>
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
        </Reveal>
      </div>
    </section>
  )
}

/* 11. FAQ: smooth height animation, one button per question */
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
function FaqItem({ q, a, n }) {
  const [open, setOpen] = useState(false)
  return (
    <Reveal i={n} className="py-1">
      <h3 className="!text-lg">
        <button type="button" id={`faq-q${n}`} aria-expanded={open} aria-controls={`faq-a${n}`} onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 rounded-lg py-4 text-left">
          {q}
          <Icon name="plus" size={20} className={`faq-plus flex-none ${open ? 'is-open' : ''}`} />
        </button>
      </h3>
      <div id={`faq-a${n}`} role="region" aria-labelledby={`faq-q${n}`} className="acc" data-open={open ? '' : undefined}>
        <div className="acc-in">
          <p className="max-w-prose pb-5 leading-relaxed text-mut">{a}</p>
        </div>
      </div>
    </Reveal>
  )
}
export function Faq() {
  return (
    <section id="faq" className="cv section">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHead eyebrow="FAQ" title="Questions coaches ask" />
        <div className="divide-y divide-line border-y border-line">
          {FAQ.map(([q, a], n) => <FaqItem key={q} q={q} a={a} n={n} />)}
        </div>
      </div>
    </section>
  )
}

/* 12. final CTA */
export function FinalCta() {
  return (
    <section id="get-started" className="dark-zone glow relative bg-graphite pb-16 pt-24 text-white sm:pb-24 sm:pt-32">
      <Divider fill="#FFFFFF" top />
      <div className="wrap grid items-center gap-8 lg:grid-cols-2">
        <Reveal from="left"><h2 className="text-[2.2rem] !text-white sm:text-5xl">Run your coaching business from one place.</h2></Reveal>
        <Reveal from="right"><CtaForm id="final-email" /></Reveal>
      </div>
    </section>
  )
}
