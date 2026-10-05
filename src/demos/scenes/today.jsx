import { Browser } from '../ui'
import { rig, eo, clamp } from '../engine'

export const dur = 6.9

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
// g = on track, a = slipping, r = missed
const GRID = [
  ['Maya R.', 'gagggag'],
  ['Chris T.', 'ggrragg'],
  ['Sam B.', 'gaggagg'],
  ['Priya N.', 'ggagggg'],
  ['Alex W.', 'ggggggg'],
  ['Jordan K.', 'gggggga'],
  ['Dana L.', 'raaaggg'],
  ['Eli M.', 'ggaggag'],
]
// [row, col, callout text]
const TARGETS = [
  [1, 3, 'Missed two sessions in a row. Message Chris.'],
  [4, 5, 'Every session done. Nothing to do for Alex.'],
  [6, 2, 'Three amber days. Check in with Dana.'],
]

export function Markup() {
  return (
    <>
      <Browser url="app.koachai.net/today" className="kd-today-browser">
        <div className="kd-tg">
          <div className="kd-tgh">
            <b className="kd-h">Client status · this week</b>
            <span className="kd-legend">
              <i className="kd-lg kd-lg-ok" />On track
              <i className="kd-lg kd-lg-amb" />Slipping
              <i className="kd-lg kd-lg-red" />Missed
            </span>
          </div>
          <div className="kd-grid">
            <span />
            {DAYS.map((d) => <small key={d} className="kd-dn">{d}</small>)}
            {GRID.map(([name, cells], r) => (
              <div key={name} style={{ display: 'contents' }}>
                <b className="kd-gn">{name}</b>
                {cells.split('').map((c, col) => {
                  const ti = TARGETS.findIndex(([tr, tc]) => tr === r && tc === col)
                  return (
                    <span key={col} className={`kd-gc kd-gc-${c}`} data-k={`col${col}`} data-t={ti >= 0 ? ti : undefined}>
                      {ti >= 0 && <i className="kd-nb">{ti + 1}</i>}
                    </span>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </Browser>
      <div className="kd-callouts">
        {TARGETS.map(([, , txt], i) => (
          <div className="kd-co" key={i} data-k={`co${i}`}>
            <i className="kd-nb kd-nb-s">{i + 1}</i>
            <span>{txt}</span>
          </div>
        ))}
      </div>
      {TARGETS.map((_, i) => (
        <i className="kd-lead" key={i} data-k={`lead${i}`} />
      ))}
    </>
  )
}

export function create(stage) {
  const { q, qa, put } = rig(stage)
  const cols = DAYS.map((_, c) => qa(`col${c}`))
  const cos = [0, 1, 2].map((i) => q(`co${i}`))
  const leads = [0, 1, 2].map((i) => q(`lead${i}`))
  const nbs = [0, 1, 2].map((i) => stage.querySelector(`[data-t="${i}"] .kd-nb`))
  const geo = []

  return {
    measure() {
      const sr = stage.getBoundingClientRect()
      const lines = getComputedStyle(stage).getPropertyValue('--lead').trim() === '1'
      TARGETS.forEach((_, i) => {
        const cell = stage.querySelector(`[data-t="${i}"]`).getBoundingClientRect()
        const co = cos[i].getBoundingClientRect()
        const x1 = co.left - sr.left
        const y1 = co.top - sr.top + co.height / 2
        const x2 = cell.left - sr.left + cell.width / 2
        const y2 = cell.top - sr.top + cell.height / 2
        if (lines) {
          const cr = cos[i].parentElement.getBoundingClientRect()
          cos[i].style.top = `${Math.max(0, y2 - cr.top + sr.top - co.height / 2)}px`
        } else cos[i].style.top = ''
        const y1b = lines ? y2 : y1
        const len = Math.hypot(x2 - x1, y2 - y1b)
        const ang = (Math.atan2(y2 - y1b, x2 - x1) * 180) / Math.PI
        const L = leads[i]
        L.style.left = `${x1}px`
        L.style.top = `${y1b}px`
        L.style.width = `${len}px`
        geo[i] = { ang, on: lines }
      })
    },
    render(t) {
      cols.forEach((cells, c) => {
        const p = eo(t, 0.4 + 0.33 * c, 0.4)
        cells.forEach((el) => put(el, p, 0, 0, 0.6 + 0.4 * p))
      })
      cos.forEach((el, i) => {
        const s = 3.6 + 0.9 * i
        const p = eo(t, s, 0.4)
        put(el, p, (1 - p) * 14)
        put(nbs[i], p, 0, 0, 0.5 + 0.5 * p)
        const g = geo[i]
        const lp = eo(t, s + 0.1, 0.45)
        const L = leads[i]
        if (g) {
          L.style.opacity = g.on ? clamp(lp * 2) : 0
          L.style.transform = `rotate(${g.ang.toFixed(2)}deg) scaleX(${lp.toFixed(3)})`
        }
      })
    },
  }
}
