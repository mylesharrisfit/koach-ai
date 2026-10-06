import { useEffect, useRef, useState } from 'react'
import { Reveal, AiPill } from './fx'
import { SectionHead } from './Sections'
import Icon from './Icons'

// Interactive copy of the dashboard's Run My Day (dashboard/RunMyDayCenter.jsx in the app): what
// needs the coach today, grouped Urgent / This week / When you can (as in the app), each card with its next
// step. Sample clients, nothing stored. Action pills say what they open in the app; Resolve clears a card.
const GROUPS = [
  ['critical', 'Urgent'],
  ['high', 'This week'],
  ['info', 'When you can'],
]
const ITEMS = [
  { id: 1, g: 'critical', n: 'Jordan K.', badge: 'No Program', sub: 'No workout program assigned', ago: 3, acts: [['Assign Program', 'dumbbell'], ['View Profile']] },
  { id: 2, g: 'critical', n: 'Chris T.', badge: '23d', sub: 'No check-in in 23 days', ago: 13, acts: [['Send Nudge'], ['Log Check-in'], ['View Profile']] },
  { id: 3, g: 'high', n: 'Dana L.', badge: '12d', sub: 'No check-in in 12 days', ago: 2, acts: [['Send Nudge'], ['Log Check-in'], ['View Profile']] },
  { id: 4, g: 'high', n: 'Sam B.', badge: 'Payment', sub: '$89 · Payment failed', ago: 1, acts: [['Send Invoice'], ['View Profile']] },
  { id: 5, g: 'info', n: 'Maya R.', badge: null, sub: '3 unread messages', ago: 0, acts: [['Reply']] },
]
const OPENS = {
  'Send Nudge': (n) => `Opens Messages to ${n} with a check-in nudge ready to send`,
  'Log Check-in': (n) => `Opens a check-in to log for ${n}`,
  'View Profile': (n) => `Opens ${n}’s profile`,
  'Assign Program': (n) => `Opens Programs on ${n}’s profile`,
  'Send Invoice': (n) => `Opens a new invoice for ${n}`,
  Reply: (n) => `Opens your thread with ${n}`,
}
const initials = (n) => n.split(' ').map((w) => w[0]).join('').slice(0, 2)

export default function ActionCenter() {
  const [items, setItems] = useState(ITEMS)
  const [leaving, setLeaving] = useState(new Set())
  const [open, setOpen] = useState({ critical: true, high: true, info: true })
  const [resolved, setResolved] = useState(0)
  const [toast, setToast] = useState(null)
  const tid = useRef(0)
  const timers = useRef([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const resolve = (id) => {
    setLeaving((s) => new Set(s).add(id))
    timers.current.push(setTimeout(() => {
      setItems((xs) => xs.filter((x) => x.id !== id))
      setLeaving((s) => { const n = new Set(s); n.delete(id); return n })
      setResolved((r) => r + 1)
    }, 260))
  }
  const act = (label, name) => setToast({ id: ++tid.current, msg: OPENS[label](name) })
  const reset = () => {
    setItems(ITEMS)
    setResolved(0)
  }

  return (
    <section id="today" className="dark-zone glow relative bg-graphite section text-white">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <SectionHead eyebrow="Run My Day" title={<span className="!text-white">Who needs you, sorted for you</span>}>
            Missed check-ins, clients without a program, failed payments and unread messages, grouped by priority with the next step on every card. Try it: press an action, or hover a card and resolve it.
          </SectionHead>
          <p className="mt-5 text-sm text-[#b9bfca]">Sample clients. Nothing you do here is stored.</p>
        </div>
        <Reveal from="zoom" className="ac">
          <div className="ac-head">
            <b>Run My Day</b>
            <span className="ac-count">{items.length}</span>
            <AiPill />
            <span className="ac-done"><Icon name="check" size={13} />{resolved} resolved today</span>
          </div>
          {items.length === 0 ? (
            <div className="ac-empty">
              <b>All caught up! 🎉</b>
              <button type="button" className="btn btn-dark !h-10" onClick={reset}>Reset the demo</button>
            </div>
          ) : (
            <div className="ac-groups">
              {GROUPS.map(([g, label]) => {
                const list = items.filter((x) => x.g === g)
                if (!list.length) return null
                return (
                  <div key={g} className={`ac-g ac-${g}`}>
                    <button type="button" className="ac-gh" aria-expanded={open[g]} onClick={() => setOpen((o) => ({ ...o, [g]: !o[g] }))}>
                      <i className="ac-dot" />
                      <span>{label}</span>
                      <em>{list.length}</em>
                      <Icon name="chevron" size={14} className={`transition-transform duration-200 ${open[g] ? 'rotate-180' : ''}`} />
                    </button>
                    <div className="m-acc" data-open={open[g] ? '' : undefined}>
                      <div>
                        {list.map((x) => (
                          <div key={x.id} className="ac-card" data-leaving={leaving.has(x.id) ? '' : undefined}>
                            <div className="ac-card-in">
                              <span className="ac-av">{initials(x.n)}</span>
                              <div className="min-w-0 flex-1">
                                <p className="ac-name">{x.n}{x.badge && <em>{x.badge}</em>}</p>
                                <p className="ac-sub">{x.sub}</p>
                                <p className="ac-ago">{x.ago === 0 ? 'Flagged today' : `Flagged ${x.ago}d ago`}</p>
                                <div className="ac-pills">
                                  {x.acts.map(([a], k) => (
                                    <button key={a} type="button" className={k === 0 ? 'ac-pill ac-pill-p' : 'ac-pill'} onClick={() => act(a, x.n)}>{a}</button>
                                  ))}
                                  <button type="button" className="ac-resolve" onClick={() => resolve(x.id)} aria-label={`Resolve ${x.n}`}>
                                    <Icon name="check" size={12} />Resolve
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          {toast && <p key={toast.id} className="ac-toast" role="status">{toast.msg}</p>}
        </Reveal>
      </div>
    </section>
  )
}
