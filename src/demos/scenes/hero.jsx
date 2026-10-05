import { Browser, Phone, Av, Cell, Cursor, Check } from '../ui'
import { rig, makeCursor, eo, seg } from '../engine'

export const dur = 7.2

const ROWS = [
  ['CT', 'Chris T.', 'Missed Tuesday session', 'red', 'Message'],
  ['MR', 'Maya R.', 'Check-in overdue, 2 days', 'red', 'Review'],
  ['SB', 'Sam B.', 'New message', 'amber', 'Reply'],
  ['PN', 'Priya N.', 'Program ends Friday', 'amber', 'Plan next'],
  ['AW', 'Alex W.', 'Photos uploaded', 'ok', 'Review'],
]

export function Markup() {
  return (
    <>
      <Browser className="kd-hero-browser" url="app.koachai.net/today">
        <div className="kd-dash">
          <div className="kd-dh">
            <b className="kd-h">Needs you today</b>
            <span className="kd-badge-n num" data-k="count">5</span>
          </div>
          <div className="kd-rows">
            {ROWS.map(([i, n, r, kind, tag], idx) => (
              <div className="kd-row" key={n} data-k="row">
                <span className="kd-rowfx" data-k={idx === 1 ? 'fx' : undefined} />
                <Av t={i} tone={idx % 3} />
                <span className="kd-rt">
                  <b>{n}</b>
                  <small>{r}</small>
                </span>
                <span className="kd-status">
                  <span className="kd-cell-wrap">
                    <Cell kind={kind} />
                    {idx === 1 && <Cell kind="ok" className="kd-cell-over" k="cellok" />}
                  </span>
                </span>
                <span className="kd-tagwrap">
                  <span className="kd-tag" data-k={idx === 1 ? 'tag' : undefined}>{tag}</span>
                  {idx === 1 && (
                    <span className="kd-done" data-k="done">
                      <Check s={13} />
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="kd-toast" data-k="toast">
          <i className="kd-dotok" />
          <span>
            <b>Jordan logged Lower B</b>
            <small>just now</small>
          </span>
        </div>
      </Browser>

      <Phone className="kd-hero-phone">
        <div className="kd-pstatus" />
        <div className="kd-ph">
          <small>Lower B · Week 6</small>
          <b className="kd-h">Back squat</b>
        </div>
        <div className="kd-sets">
          <div className="kd-set kd-set-done"><span>Set 1</span><b className="num">275 lb × 5</b><i className="kd-tick"><Check s={11} /></i></div>
          <div className="kd-set kd-set-done"><span>Set 2</span><b className="num">295 lb × 5</b><i className="kd-tick"><Check s={11} /></i></div>
          <div className="kd-set kd-set-now">
            <span>Set 3</span><b className="num">315 lb × 5</b>
            <i className="kd-tick kd-tick3" data-k="tick3"><Check s={11} /></i>
          </div>
        </div>
        <div className="kd-logwrap">
          <div className="kd-logbtn" data-k="log">Log set 3</div>
          <div className="kd-rest" data-k="rest">
            <small>Rest</small>
            <b className="num" data-k="timer">1:30</b>
          </div>
        </div>
        <div className="kd-next">
          <small>Up next</small>
          <b>Romanian deadlift · 3 sets</b>
        </div>
      </Phone>
      <Cursor />
    </>
  )
}

export function create(stage) {
  const { q, qa, put, text, cls } = rig(stage)
  const cur = makeCursor(stage, stage)
  const rows = qa('row')
  const [fx, cellok, tag, done, toast, log, tick3, rest, timer, count] =
    ['fx', 'cellok', 'tag', 'done', 'toast', 'log', 'tick3', 'rest', 'timer', 'count'].map(q)
  const clicks = [4.2]
  const TAP = 4.5

  return {
    measure() {
      cur.measure([
        [2.0, stage.querySelector('.kd-hero-browser'), 0.2, 0.9],
        [3.7, tag, 0.5, 0.5],
      ])
    },
    render(t) {
      rows.forEach((r, i) => {
        const p = eo(t, 0.4 + 0.3 * i, 0.4)
        put(r, p, 0, (1 - p) * 10)
      })
      const res = eo(t, 4.3, 0.4)
      put(fx, res)
      put(cellok, res)
      put(tag, 1 - res)
      put(done, res, 0, 0, 0.6 + 0.4 * res)
      text(count, res > 0.5 ? '4' : '5')

      // phone: tap "Log set 3", rest timer starts
      const tap = seg(t, TAP, 0.2)
      const press = tap > 0 && tap < 1 ? 0.94 : 1
      const logged = eo(t, TAP + 0.1, 0.3)
      put(log, 1 - logged, 0, 0, press)
      put(tick3, logged, 0, 0, 0.6 + 0.4 * logged)
      cls(stage.querySelector('.kd-set-now'), 'kd-set-done', logged > 0.5)
      put(rest, logged, 0, (1 - logged) * 10)
      const secs = 90 - Math.floor(Math.max(0, t - (TAP + 0.4)) * 6) // sped-up demo countdown
      text(timer, `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`)

      // toast slides into the dashboard
      const ti = eo(t, 5.3, 0.4)
      put(toast, ti, (1 - ti) * 28)

      cur.render(t, clicks, 5.8)
    },
  }
}
