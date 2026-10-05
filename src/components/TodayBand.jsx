import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Browser } from '../demos/ui'
import Icon from './Icons'
import { Divider, SpotCard } from './fx'
import { CtaRow, SectionHead } from './Sections'
import { useSeen } from '../lib/motion'

// Interactive weekly status grid. Sample data is fictional.
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const SESS = ['Upper A', 'Lower A', 'Upper B', 'Lower B', 'Full body', 'Mobility', 'Walk']
const ROWS = [
  ['MR', 'Maya R.', 'gagggag'],
  ['CT', 'Chris T.', 'ggrragg'],
  ['SB', 'Sam B.', 'gaggagg'],
  ['PN', 'Priya N.', 'ggagggg'],
  ['AW', 'Alex W.', 'ggggggg'],
  ['JK', 'Jordan K.', 'gggggga'],
  ['DL', 'Dana L.', 'raaaggg'],
  ['EM', 'Eli M.', 'ggaggag'],
]
const TARGETS = [
  [1, 3, 'Missed two sessions in a row. Message Chris.'],
  [4, 5, 'Every session done. Nothing to do for Alex.'],
  [6, 2, 'Three amber days. Check in with Dana.'],
]
const LABEL = { g: 'On track', a: 'Slipping', r: 'Missed' }
const tip = (k, c) => (k === 'g' ? `Logged ${SESS[c]} · 6/6 sets` : k === 'r' ? `Missed ${SESS[c]}` : c === 4 ? 'Check-in late' : `Partial ${SESS[c]} · 3/6 sets`)
const targetAt = (r, c) => TARGETS.findIndex(([tr, tc]) => tr === r && tc === c)

function ClientCard({ r, onClose }) {
  const [ini, name, cells] = ROWS[r]
  const count = (k) => cells.split('').filter((x) => x === k).length
  const t = TARGETS.find(([tr]) => tr === r)
  return (
    <SpotCard className="tg-card" role="region" aria-label={`${name}, this week`}>
      <div className="flex items-center gap-3">
        <span className="kd-av kd-av1 !h-10 !w-10 !text-sm">{ini}</span>
        <div className="flex-1">
          <p className="font-display text-xl font-bold text-white" style={{ fontStretch: '85%' }}>{name}</p>
          <p className="text-sm text-[#b9bfca]">This week · sample client</p>
        </div>
        <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-white hover:bg-white/10" aria-label={`Close ${name}`}>
          <Icon name="close" size={18} />
        </button>
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[['g', 'On track'], ['a', 'Slipping'], ['r', 'Missed']].map(([k, l]) => (
          <div key={k} className="rounded-lg bg-white/5 px-2 py-2.5">
            <dt className="text-xs text-[#b9bfca]">{l}</dt>
            <dd className="num text-2xl font-extrabold text-white">{count(k)}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-[15px] leading-snug text-white">{t ? t[2] : 'Steady week. Nothing urgent.'}</p>
      <p className="mt-2 text-sm text-[#b9bfca]">Next session: {SESS[4]} on Friday</p>
    </SpotCard>
  )
}

export default function TodayBand() {
  const [seenRef, seen] = useSeen()
  const stage = useRef(null)
  const grid = useRef(null)
  const [sel, setSel] = useState(null)
  const [hot, setHot] = useState(null) // [r, c] with tooltip
  const [focus, setFocus] = useState([0, 0])
  const [geo, setGeo] = useState({ wide: false, co: [], lead: [] })
  const [tipPos, setTipPos] = useState(null)

  const measure = useCallback(() => {
    const st = stage.current
    if (!st) return
    const wide = matchMedia('(min-width: 1024px)').matches
    if (!wide) return setGeo({ wide: false, co: [], lead: [] })
    const sr = st.getBoundingClientRect()
    const side = st.querySelector('.tg-side').getBoundingClientRect()
    const co = []
    const lead = []
    TARGETS.forEach(([r, c], i) => {
      const cell = st.querySelector(`[data-rc="${r}-${c}"]`).getBoundingClientRect()
      const y = cell.top - sr.top + cell.height / 2
      const x2 = cell.left - sr.left + cell.width / 2
      const x1 = side.left - sr.left
      const box = st.querySelector(`[data-co="${i}"]`)
      co.push(Math.max(0, y - (box?.offsetHeight || 56) / 2 - (side.top - sr.top)))
      lead.push({ left: x2, top: y, width: x1 - x2 })
    })
    setGeo({ wide: true, co, lead })
  }, [])
  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(() => measure())
    ro.observe(stage.current)
    return () => ro.disconnect()
  }, [measure])

  const showTip = (r, c, el) => {
    const g = grid.current.getBoundingClientRect()
    const b = el.getBoundingClientRect()
    setHot([r, c])
    setTipPos({ left: b.left - g.left + b.width / 2, top: b.top - g.top })
  }
  const onKey = (e) => {
    const [r, c] = focus
    const mv = { ArrowRight: [0, 1], ArrowLeft: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0] }[e.key]
    let n = null
    if (mv) n = [Math.min(7, Math.max(0, r + mv[0])), Math.min(6, Math.max(0, c + mv[1]))]
    if (e.key === 'Home') n = [r, 0]
    if (e.key === 'End') n = [r, 6]
    if (e.key === 'Escape') return setHot(null)
    if (!n) return
    e.preventDefault()
    setFocus(n)
    grid.current.querySelector(`[data-rc="${n[0]}-${n[1]}"]`)?.focus()
  }

  return (
    <section id="today" ref={seenRef} className="dark-zone glow relative bg-graphite pb-24 pt-16 text-white sm:pb-32 sm:pt-24">
      <div className="wrap">
        <SectionHead eyebrow="Today" title={<span className="!text-white">Who needs you, in one screen</span>}>
          Every client’s week as green, amber or missed. Hover or tap a day to see what happened, or pick a client to open their week.
        </SectionHead>
        <div ref={stage} className="tg-stage mt-12" data-in={seen ? '' : undefined} data-sel={sel ?? undefined}>
          <Browser url="app.koachai.net/today" className="tg-frame">
            <div className="tg-head">
              <b className="kd-h">Client status · this week</b>
              <span className="kd-legend">
                <i className="kd-lg kd-lg-ok" />On track
                <i className="kd-lg kd-lg-amb" />Slipping
                <i className="kd-lg kd-lg-red" />Missed
              </span>
            </div>
            <div className="tg-gridwrap" ref={grid} onPointerLeave={() => setHot(null)}>
              <div role="grid" aria-label="Client status by day, sample data" className="tg-grid" onKeyDown={onKey}>
                <div role="row" className="tg-row">
                  <span role="columnheader" className="tg-corner"><span className="sr-only">Client</span></span>
                  {DAYS.map((d) => <span key={d} role="columnheader" className="kd-dn">{d}</span>)}
                </div>
                {ROWS.map(([, name, cells], r) => (
                  <div role="row" key={name} className={`tg-row ${sel === r ? 'tg-row-on' : ''}`}>
                    <span role="rowheader" className="tg-name">
                      <button type="button" aria-pressed={sel === r} onClick={() => setSel(sel === r ? null : r)}>{name}</button>
                    </span>
                    {cells.split('').map((k, c) => {
                      const t = targetAt(r, c)
                      const on = hot && hot[0] === r && hot[1] === c
                      return (
                        <div
                          key={c}
                          role="gridcell"
                          data-rc={`${r}-${c}`}
                          tabIndex={focus[0] === r && focus[1] === c ? 0 : -1}
                          aria-label={`${name}, ${DAYS[c]}: ${LABEL[k]}. ${tip(k, c)}`}
                          aria-describedby={on ? 'tg-tip' : undefined}
                          className={`tg-cell kd-gc kd-gc-${k}`}
                          style={{ '--c': c }}
                          onPointerEnter={(e) => showTip(r, c, e.currentTarget)}
                          onFocus={(e) => {
                            setFocus([r, c])
                            showTip(r, c, e.currentTarget)
                          }}
                          onBlur={() => setHot(null)}
                          onClick={(e) => (on ? setHot(null) : showTip(r, c, e.currentTarget))}
                        >
                          {t >= 0 && <i className="kd-nb tg-nb" style={{ '--k': t }} aria-hidden="true">{t + 1}</i>}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
              {hot && tipPos && (
                <div id="tg-tip" role="tooltip" className="tg-tip" style={{ left: tipPos.left, top: tipPos.top }}>
                  <b>{ROWS[hot[0]][1]} · {DAYS[hot[1]]}</b>
                  {tip(ROWS[hot[0]][2][hot[1]], hot[1])}
                </div>
              )}
            </div>
          </Browser>

          <div className="tg-side">
            <ol className="tg-callouts" aria-label="What to do today">
              {TARGETS.map(([, , txt], i) => (
                <li key={i} data-co={i} className="kd-co tg-co" style={{ '--k': i, top: geo.wide ? geo.co[i] : undefined }}>
                  <i className="kd-nb kd-nb-s" aria-hidden="true">{i + 1}</i>
                  <span>{txt}</span>
                </li>
              ))}
            </ol>
            {sel != null && <ClientCard key={sel} r={sel} onClose={() => setSel(null)} />}
          </div>
          {geo.wide && geo.lead.map((l, i) => <i key={i} className="tg-lead" style={{ left: l.left, top: l.top, width: l.width, '--k': i }} aria-hidden="true" />)}
        </div>
        <CtaRow dark />
      </div>
      <Divider fill="#FFFFFF" />
    </section>
  )
}
