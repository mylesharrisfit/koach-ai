import { useEffect, useRef, useState } from 'react'
import Icon from './Icons'
import CtaForm from './CtaForm'
import Piece from './Pieces'
import { Phone, Check, Ring } from '../demos/ui'
import { AiPill, Reveal, TierPill, ZoomIn } from './fx'
import { SIGNUP_URL } from '../lib/config'
import { PLANS, PLAN_ROWS, inPlan } from '../lib/plans'
import { CATEGORIES, FEATURES, featureUrl } from '../lib/features'
import { FAQ } from '../data/faq'
import { useRM } from '../lib/motion'
import StagePhoto from './StagePhoto'

export const SectionHead = ({ eyebrow, title, children, center, className = '', wide }) => (
  <div className={`${center ? 'mx-auto text-center' : ''} ${wide ? 'max-w-4xl' : 'max-w-3xl'} ${className}`}>
    {eyebrow && <Reveal as="p" from="pop" className="eyebrow">{eyebrow}</Reveal>}
    <Reveal as="h2" from="up" i={1} className="h-mega mt-4 text-[2.4rem] sm:text-[3.6rem] lg:text-[4rem]">{title}</Reveal>
    {children && <Reveal as="p" from="up" i={2} className={`lede-xl mt-5 ${center ? 'mx-auto' : ''} max-w-2xl`}>{children}</Reveal>}
  </div>
)

export const CtaRow = ({ dark, center = true, noPricing }) => (
  <Reveal from="up" className={`mt-12 flex flex-col gap-3 sm:flex-row ${center ? 'items-center sm:justify-center' : ''}`}>
    <a href={SIGNUP_URL} className="btn btn-brand">Start free trial</a>
    {!noPricing && <a href="#pricing" className={`btn ${dark ? 'btn-outline-dark' : 'btn-dark'}`}>See pricing</a>}
  </Reveal>
)

/* 3. "works with" logo marquee (integrations as text: logo licensing unclear) + honest proof points */
const INTEGRATIONS = ['Stripe', 'Zoom', 'Calendly', 'Google Calendar', 'USDA FoodData Central']
const PROOF = [
  ['spark', 'AI in every plan'],
  ['coins', 'Flat pricing, everything included'],
  ['tag', 'Your brand, not ours, in front of clients'],
  ['truck', 'Switching from Trainerize or Everfit? We’ll help you move your clients over.'],
]
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
export function LogoStrip() {
  const [paused, setPaused] = useState(false)
  return (
    <section aria-label="Integrations and why KOACH" className="mq logo-mq border-y border-line bg-white py-10" data-paused={paused ? '' : undefined}>
      <div className="wrap flex items-center justify-between gap-4">
        <p className="text-[15px] font-semibold text-mut">Works with the tools you already use</p>
        <button type="button" className="mq-btn" onClick={() => setPaused((p) => !p)} aria-pressed={paused} aria-label={paused ? 'Play scrolling list' : 'Pause scrolling list'}>
          <Icon name={paused ? 'play' : 'pause'} size={14} />
        </button>
      </div>
      <div className="mt-5">
        <MqRow items={INTEGRATIONS} reps={3} dir="left" label="Integrations" chip="mq-int" />
      </div>
      <ul className="wrap mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PROOF.map(([icon, text], i) => (
          <Reveal as="li" key={text} i={i} className="ico-host flex items-start gap-3">
            <span className="ico-tile grid h-10 w-10 flex-none place-items-center rounded-full bg-ink text-white"><Icon name={icon} size={20} /></span>
            <span className="pt-2 text-[15px] font-semibold leading-snug text-ink">{text}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/* 4. service categories: one card per kind of coaching, product pieces floating over a soft stage */
export function Categories() {
  return (
    <section id="categories" className="section bg-mist">
      <div className="wrap">
        <SectionHead eyebrow="One app" title="Everything your coaching needs" center>
          Training, nutrition, check-ins and the client app, built to work together.
        </SectionHead>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((slug, i) => {
            const f = FEATURES[slug]
            return (
              <Reveal as="a" key={slug} i={i} href={featureUrl(slug)} className="cat group">
                <div className="cat-vis stage-soft !rounded-none" aria-hidden="true">
                  <StagePhoto slot={`cat-${slug}`} />
                  {f.pieces.map((k) => <div key={k}><Piece k={k} /></div>)}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <h3 className="flex flex-wrap items-center gap-2 text-2xl">{f.card}{f.ai && <AiPill />}</h3>
                  <p className="text-[15px] leading-relaxed text-mut">{f.cardText}</p>
                  <span className="mt-auto flex items-center justify-between pt-4 text-[15px] font-bold">
                    Explore
                    <span className="cat-arrow"><Icon name="arrow" size={18} /></span>
                  </span>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
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
      <div className="kd-ph"><small>Template</small><b className="kd-h">Strength block</b></div>
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
  { id: 'one', tag: 'High-ticket', title: '1:1 premium coaching', sub: 'One-to-one. Personalized.', text: 'High-touch coaching for clients who pay for your attention.', bullets: [['Custom programs for each client'], ['Personal check-ins'], ['Direct messaging']] },
  { id: 'scale', tag: 'Low-ticket, high volume', title: 'Scalable programs', sub: 'One-to-many. Built to scale.', text: 'Serve more clients without rebuilding the plan every time.', bullets: [['Coaching packages with their own page'], ['Templates you reuse'], ['AI-generated plans you review', true]] },
]
export function CoachStyles() {
  return (
    <section id="coaching-styles" className="cv bg-white section">
      <div className="wrap">
        <SectionHead eyebrow="Online, hybrid, nutrition, small teams" title="Coach the way you sell">
          Run 1:1 coaching, scalable programs, or both from the same account.
        </SectionHead>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {STYLES.map((s, i) => (
            <Reveal as="article" key={s.id} i={i} className={`fan-card flex flex-col rounded-3xl p-6 sm:p-10 ${i ? 'style-dark' : 'bg-white ring-1 ring-line'}`}>
              <p className={`eyebrow self-start ${i ? '!bg-white !text-ink' : ''}`}>{s.tag}</p>
              <h3 className="h-mega mt-4 text-[2rem] sm:text-[2.6rem]">{s.title}</h3>
              <p className={`mt-2 text-lg font-semibold sm:text-xl ${i ? '!text-ai-light' : '!text-brand-text'}`}>{s.sub}</p>
              <p className="mt-3 text-mut">{s.text}</p>
              <ul className="mt-5 grid gap-2.5">
                {s.bullets.map(([b, ai]) => (
                  <li key={b} className="flex items-center gap-2.5 text-[15px] font-medium"><span className={`grid h-6 w-6 flex-none place-items-center rounded-full text-white ${i ? 'bg-ai' : 'bg-brand'}`}><Icon name="check" size={14} /></span>{b}{ai && <AiPill />}</li>
                ))}
              </ul>
              <div className="fan" aria-hidden="true">
                <StagePhoto slot={`style-${s.id}`} />
                {SCREENS[s.id].map((p, n) => <div key={n} className={`fan-p fan-p${n}`}>{p}</div>)}
              </div>
              <a href={SIGNUP_URL} className={`btn mt-6 self-start ${i ? 'btn-white' : 'btn-brand'}`}>Start free trial</a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 6. editorial statement: each word lights up as it scrolls past the middle of the screen */
const STATEMENT = 'Programs, nutrition, check-ins, payments and your own client app in one place. Less admin. More coaching.'
const HL = new Set(['Less', 'admin.', 'More', 'coaching.'])
export function Statement() {
  const ref = useRef(null)
  const rm = useRM()
  useEffect(() => {
    const el = ref.current
    if (rm || !el) return
    const words = [...el.querySelectorAll('.stmt-w')]
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      if (r.bottom < 0 || r.top > innerHeight) return
      // 0 when the block's top reaches 85% of the viewport, 1 when its bottom reaches 45%
      const p = (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.4)
      const lit = p * words.length * 1.15
      words.forEach((w, n) => w.style.setProperty('--on', Math.max(0, Math.min(1, lit - n)).toFixed(2)))
    }
    const on = () => (raf ||= requestAnimationFrame(update))
    addEventListener('scroll', on, { passive: true })
    update()
    return () => {
      removeEventListener('scroll', on)
      cancelAnimationFrame(raf)
      words.forEach((w) => w.style.removeProperty('--on'))
    }
  }, [rm])
  return (
    <section aria-label="Why KOACH" className="cv section bg-white">
      <div className="wrap">
        <p ref={ref} className="h-mega max-w-5xl text-[2.3rem] sm:text-[3.6rem] lg:text-[4.6rem]">
          {STATEMENT.split(' ').map((w, n) => (
            <span key={n} className={`stmt-w ${HL.has(w) ? 'hl' : ''}`}>{w} </span>
          ))}
        </p>
      </div>
    </section>
  )
}

/* 7. four capability areas (Plan & coach / Motivate & measure / Engage / Scale): icons + short copy.
   Only features the app has. ai = AI-powered, tier = plan needed */
const PILLARS = [
  { id: 'plan', icon: 'clipboard', title: 'Plan & coach', text: 'Programs and nutrition, drafted by AI and finished by you.', link: 'coaching', items: [
    ['clipboard', 'Program builder with exercise library'],
    ['spark', 'AI program builder', true],
    ['layers', 'Program templates'],
    ['bot', 'AI coaching assistant', true, 'Elite and up'],
  ] },
  { id: 'track', icon: 'chart', title: 'Motivate & measure', text: 'See who is on track and what changed this week.', link: 'nutrition', items: [
    ['leaf', 'Nutrition targets and macro tracking'],
    ['spark', 'AI meal plans', true],
    ['camera', 'Check-ins with photos and measurements'],
    ['chart', 'Adherence tracking with streaks and trends'],
  ] },
  { id: 'engage', icon: 'message', title: 'Engage', text: 'An app your clients open every day, and you in their pocket.', link: 'client-app', items: [
    ['phone', 'Client mobile app'],
    ['timer', 'Workout logger with rest timer'],
    ['trophy', 'New-best flags on logged sets'],
    ['message', 'Direct messaging'],
    ['spark', 'AI onboarding, check-in summaries and drafted replies', true, 'Pro and up'],
  ] },
  { id: 'scale', icon: 'card', title: 'Scale', text: 'Get paid, stay organised and grow under your own brand.', link: 'business', items: [
    ['list', 'Action Center: who needs you today'],
    ['card', 'Stripe payments and subscriptions'],
    ['calendar', 'Zoom, Calendly and Google Calendar'],
    ['tag', 'Your logo, colors and coaching name on the client app'],
    ['seat', 'Invite coaches to your team', false, 'Enterprise'],
  ] },
]
export function Capabilities() {
  return (
    <section id="capabilities" className="cv section bg-mist">
      <div className="wrap">
        <SectionHead eyebrow="Everything in the plan" title="One system for the whole coaching business" />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PILLARS.map((c, i) => (
            <Reveal key={c.id} i={i} id={`cap-${c.id}`} className="pillar">
              <div className="flex items-start justify-between gap-4">
                <span className="pillar-n"><Icon name={c.icon} size={22} /></span>
                <span className="num text-sm text-mut">0{i + 1}</span>
              </div>
              <div>
                <h3 className="h-mega text-[1.9rem] sm:text-[2.3rem]">{c.title}</h3>
                <p className="mt-2 text-[15px] text-mut">{c.text}</p>
              </div>
              <ul className="grid gap-3 border-t border-line pt-5">
                {c.items.map(([icon, text, ai, tier], j) => (
                  <li key={text} className="flex gap-3 text-[15px] leading-snug">
                    <Icon name={icon} size={20} draw className="mt-px flex-none text-brand-text" style={{ '--j': j }} />
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
              <a href={featureUrl(c.link)} className="mt-auto inline-flex items-center gap-2 self-start text-[15px] font-bold text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-brand">
                Learn more <Icon name="arrow" size={18} />
              </a>
            </Reveal>
          ))}
        </div>
        <CtaRow />
      </div>
    </section>
  )
}

/* 9. what's in each plan (KOACH only) */
export function Compare() {
  return (
    <section id="compare" className="cv section">
      <div className="wrap">
        <SectionHead eyebrow="Compare plans" title="What’s in each plan">
          Every plan includes the full coaching platform. Higher plans add more clients, more AI generations and more AI tools.
        </SectionHead>
        <Reveal from="zoom" className="mt-10 overflow-x-auto rounded-xl border border-line shadow-[0_24px_48px_-28px_rgba(31,94,255,0.45)]" role="region" aria-label="What’s in each plan" tabIndex={0}>
          <table className="w-full border-collapse text-left text-[13px] sm:min-w-[640px] sm:text-[15px]">
            <caption className="sr-only">Features by KOACH plan</caption>
            <thead>
              <tr className="bg-graphite text-white [background-image:linear-gradient(90deg,#1b1e24,#1b2a55)]">
                <th scope="col" className="p-2.5 sm:p-4"><span className="sr-only">Feature</span></th>
                {PLANS.map((p) => (
                  <th key={p.id} scope="col" className="p-2.5 text-center font-display text-[15px] font-bold sm:p-4 sm:text-lg" style={{ fontStretch: '85%' }}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLAN_ROWS.map((row) => (
                <tr key={row.f} className="border-t border-line">
                  <th scope="row" className="p-2.5 font-semibold sm:p-4">
                    {row.f}
                    {/\bAI\b/.test(row.f) && <span className="ml-1.5 align-[1px]"><AiPill /></span>}
                  </th>
                  {PLANS.map((p) =>
                    inPlan(row, p.id) ? (
                      <td key={p.id} className="p-2.5 text-center sm:p-4">
                        <Icon name="check" size={20} className="mx-auto text-ok" />
                        <span className="sr-only">Included in {p.name}</span>
                      </td>
                    ) : (
                      <td key={p.id} className="p-2.5 text-center text-mut sm:p-4">
                        <span aria-hidden="true">–</span>
                        <span className="sr-only">Not included in {p.name}</span>
                      </td>
                    ),
                  )}
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
function FaqItem({ q, a, n, id }) {
  const [open, setOpen] = useState(false)
  return (
    <Reveal i={n} className="py-1">
      <h3 className="!text-lg">
        <button type="button" id={`${id}-q${n}`} aria-expanded={open} aria-controls={`${id}-a${n}`} onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 rounded-lg py-4 text-left">
          {q}
          <Icon name="plus" size={20} className={`faq-plus flex-none ${open ? 'is-open' : ''}`} />
        </button>
      </h3>
      <div id={`${id}-a${n}`} role="region" aria-labelledby={`${id}-q${n}`} className="acc" data-open={open ? '' : undefined}>
        <div className="acc-in">
          <p className="max-w-prose pb-5 leading-relaxed text-mut">{a}</p>
        </div>
      </div>
    </Reveal>
  )
}
export function Faq({ only, id = 'faq' }) {
  const items = only ? FAQ.filter(([q]) => only.includes(q)) : FAQ
  return (
    <section id={id} className="cv section">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHead eyebrow="FAQ" title="Questions coaches ask" />
        <div className="divide-y divide-line border-y border-line">
          {items.map(([q, a], n) => <FaqItem key={q} q={q} a={a} n={n} id={id} />)}
        </div>
      </div>
    </section>
  )
}

/* 12. final CTA */
export function FinalCta() {
  return (
    <section id="get-started" className="bg-white px-3 pb-3 sm:px-6 sm:pb-6">
      <ZoomIn kind="band" className="dark-zone cta-band glow glow-blue relative overflow-hidden rounded-[28px] py-16 text-white sm:py-24">
        <StagePhoto slot="cta" position="70% 35%" />
        <div className="wrap grid items-center gap-8 lg:grid-cols-2">
          <div>
            <Reveal as="p" from="pop" className="eyebrow !bg-white/15 !text-white">30 days free</Reveal>
            <Reveal as="h2" from="zoom-out" i={1} className="mt-3 text-[2.2rem] !text-white sm:text-5xl">Run your coaching business from one place.</Reveal>
          </div>
          <Reveal from="zoom" i={2}><CtaForm id="final-email" btn="btn-white" /></Reveal>
        </div>
      </ZoomIn>
    </section>
  )
}
