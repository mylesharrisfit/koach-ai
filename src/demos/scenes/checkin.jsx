import { Browser, Cursor, Spark } from '../ui'
import { rig, makeCursor, eo, seg } from '../engine'

export const dur = 8.4

const A = 'Great week, Maya. Six of six sessions and weight is down 1.4 lb, right on plan. Keep protein steady and we will add load to squats next week.'
const B = 'Maya, what a week! Six out of six sessions and 1.4 lb down. You should be really proud. Keep protein steady and we will add some load to squats next week.'

function Photos({ label }) {
  return (
    <div className="kd-photos">
      <div className="kd-photo" data-k="ph"><i /><span>{label} · front</span></div>
      <div className="kd-photo" data-k="ph"><i /><span>{label} · side</span></div>
    </div>
  )
}

export function Markup() {
  return (
    <>
      <Browser url="app.koachai.net/check-ins">
        <div className="kd-ci">
          <div className="kd-cih">
            <b className="kd-h">Check-ins to review</b>
            <span className="kd-qn"><b className="num" data-k="qn">1</b> of 7</span>
          </div>
          <div className="kd-cardwrap">
            <div className="kd-card kd-card1" data-k="card1">
              <div className="kd-cardtop">
                <span className="kd-av kd-av1">MR</span>
                <span className="kd-rt"><b>Maya R.</b><small>Week 8 check-in</small></span>
              </div>
              <Photos label="Week 8" />
              <div className="kd-metrics">
                <div><small>Weight</small><b className="num" data-k="wt">0.0 lb</b></div>
                <div><small>Workouts</small><b className="num" data-k="wo">0/6</b></div>
              </div>
              <div className="kd-reply">
                <div className="kd-rl">
                  <span><Spark /> AI draft reply <i className="kd-plan">Pro and up</i></span>
                  <span className="kd-tone"><i data-k="warm">Warmer</i><i>Shorter</i></span>
                </div>
                <p className="kd-draft" data-k="draft" />
              </div>
              <div className="kd-actions"><span className="kd-btn kd-btn-dark" data-k="send">Send and next</span></div>
            </div>
            <div className="kd-card kd-card2" data-k="card2">
              <div className="kd-cardtop">
                <span className="kd-av kd-av2">CT</span>
                <span className="kd-rt"><b>Chris T.</b><small>Week 5 check-in</small></span>
              </div>
              <Photos label="Week 5" />
              <div className="kd-metrics">
                <div><small>Weight</small><b className="num">−0.6 lb</b></div>
                <div><small>Workouts</small><b className="num">4/5</b></div>
              </div>
              <div className="kd-reply">
                <div className="kd-rl"><span><Spark /> AI draft reply <i className="kd-plan">Pro and up</i></span></div>
                <p className="kd-draft">Good consistency, Chris. Four of five sessions is solid. Let us look at getting the missed day back in.</p>
              </div>
              <div className="kd-actions"><span className="kd-btn kd-btn-dark">Send and next</span></div>
            </div>
          </div>
        </div>
      </Browser>
      <Cursor />
    </>
  )
}

export function create(stage) {
  const { q, qa, put, text, typed, cls } = rig(stage)
  const cur = makeCursor(stage, stage)
  const [card1, card2, wt, wo, draft, warm, send, qn] = ['card1', 'card2', 'wt', 'wo', 'draft', 'warm', 'send', 'qn'].map(q)
  const photos = qa('ph')
  const clicks = [4.4, 7.0]

  return {
    measure() {
      cur.measure([
        [2.0, stage.querySelector('.kd-draft'), 0.8, 0.9],
        [4.3, warm, 0.5, 0.5],
        [6.9, send, 0.5, 0.5],
      ])
    },
    render(t) {
      photos.forEach((p, i) => {
        const e = eo(t, 0.3 + 0.2 * i, 0.5)
        put(p, e, (i ? 28 : -28) * (1 - e))
      })
      const m = eo(t, 1.1, 0.9)
      text(wt, `−${(1.4 * m).toFixed(1)} lb`)
      text(wo, `${Math.round(6 * m)}/6`)

      // AI draft types out; "Warmer" rewrites it
      if (t < 4.4) typed(draft, A, seg(t, 1.9, 1.9))
      else typed(draft, B, seg(t, 4.6, 1.8))
      cls(warm, 'kd-tone-on', t > 4.4)
      const wp = seg(t, 4.4, 0.2)
      put(warm, 1, 0, 0, wp > 0 && wp < 1 ? 0.94 : 1)

      const sp = seg(t, 7.0, 0.2)
      put(send, 1, 0, 0, sp > 0 && sp < 1 ? 0.95 : 1)

      // card slides away, next client's card slides in
      const s = eo(t, 7.15, 0.5)
      put(card1, 1 - s, -44 * s)
      put(card2, s, 44 * (1 - s))
      text(qn, s > 0.5 ? '2' : '1')
      card1.style.pointerEvents = 'none'

      cur.render(t, clicks, 7.7)
    },
  }
}
