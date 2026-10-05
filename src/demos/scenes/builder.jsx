import { Browser, Cursor, Spark, Check } from '../ui'
import { rig, makeCursor, eo, seg } from '../engine'

export const dur = 8.2

const PROMPT = '12-week hypertrophy, 4 days a week, home gym, bad left knee'
const DAYS = [
  ['Mon', 'Lower A', [['Goblet squat', '4×10'], ['Romanian deadlift', '3×10'], ['Hip thrust', '3×12'], ['Calf raise', '3×15']]],
  ['Tue', 'Push', [['Dumbbell bench press', '4×8'], ['Overhead press', '3×10'], ['Incline push-up', '3×12'], ['Triceps extension', '3×12']]],
  ['Thu', 'Pull', [['One-arm row', '4×10'], ['Banded pull-up', '3×8'], ['Rear delt fly', '3×15'], ['Biceps curl', '3×12']]],
  ['Fri', 'Lower B', [['Glute bridge', '4×12'], ['Slider leg curl', '3×12'], ['Side plank', '3×30s'], ['Farmer carry', '3×40 m']]],
]
const SWAP = 'Knee-friendly: box squat'

export function Markup() {
  return (
    <>
      <Browser url="app.koachai.net/programs/new">
        <div className="kd-bld">
          <div className="kd-prompt">
            <div className="kd-pl"><Spark /> Describe the program</div>
            <div className="kd-ptext" data-k="prompt" />
            <div className="kd-pbar">
              <span className="kd-review" data-k="review"><Check s={11} /> Coach review before sending</span>
              <span className="kd-btn kd-btn-dark" data-k="build"><Spark /> Build with AI</span>
            </div>
          </div>
          <div className="kd-weekwrap">
            <div className="kd-week">
              {DAYS.map(([d, n, ex], di) => (
                <div className="kd-day" key={d} data-k="day">
                  <div className="kd-dayh"><b>{d}</b><small>{n}</small></div>
                  {ex.map(([name, sr], ei) => (
                    <div className="kd-ex" key={name} data-k={`ex${di}`}>
                      {di === 0 && ei === 0 && <i className="kd-exfx" data-k="swapfx" />}
                      <span data-k={di === 0 && ei === 0 ? 'swaptext' : undefined}>{name}</span>
                      <b className="num">{sr}</b>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="kd-skel" data-k="skel">
              {Array.from({ length: 4 }).map((_, i) => (
                <div className="kd-skelcol" key={i}>
                  {Array.from({ length: 5 }).map((__, j) => <i key={j} />)}
                </div>
              ))}
              <i className="kd-shim" data-k="shim" />
            </div>
          </div>
          <div className="kd-foot">
            <span className="kd-meta">12 weeks · 4 days a week</span>
            <span className="kd-btn kd-btn-dark" data-k="send">Send to client</span>
          </div>
        </div>
      </Browser>
      <Cursor />
    </>
  )
}

export function create(stage) {
  const { q, qa, put, text, typed } = rig(stage)
  const cur = makeCursor(stage, stage)
  const [prompt, review, build, send, skel, shim, swapfx, swaptext] =
    ['prompt', 'review', 'build', 'send', 'skel', 'shim', 'swapfx', 'swaptext'].map(q)
  const days = qa('day')
  const exs = [0, 1, 2, 3].map((i) => qa(`ex${i}`))
  const clicks = [3.0, 7.1]
  let shimW = 400

  return {
    measure() {
      cur.measure([
        [1.9, stage.querySelector('.kd-week'), 0.7, 0.8],
        [2.9, build, 0.5, 0.5],
        [7.0, send, 0.5, 0.5],
      ])
      shimW = stage.querySelector('.kd-weekwrap').offsetWidth
    },
    render(t) {
      typed(prompt, PROMPT, seg(t, 0.4, 1.9))

      const bp = seg(t, 3.0, 0.2)
      put(build, 1, 0, 0, bp > 0 && bp < 1 ? 0.95 : 1)

      // skeleton shimmer, then days fill in one by one
      const so = eo(t, 3.1, 0.2) * (1 - eo(t, 3.9, 0.3))
      put(skel, so)
      put(shim, so, -120 + (shimW + 240) * seg(t, 3.1, 0.9))
      days.forEach((d, i) => {
        const p = eo(t, 3.8 + 0.45 * i, 0.4)
        put(d, p, 0, (1 - p) * 10)
        exs[i].forEach((e, j) => {
          const pe = eo(t, 3.9 + 0.45 * i + 0.07 * j, 0.3)
          put(e, pe, 0, (1 - pe) * 6)
        })
      })

      // swap one exercise for a knee-friendly one
      const out = eo(t, 5.9, 0.2)
      const inn = eo(t, 6.15, 0.3)
      text(swaptext, t < 6.1 ? 'Goblet squat' : SWAP)
      put(swaptext, t < 6.1 ? 1 - out : inn, 0, t < 6.1 ? 0 : (1 - inn) * 5)
      put(swapfx, inn)

      // review badge pulses once; send
      const bi = eo(t, 6.5, 0.3)
      const pulse = Math.sin(Math.PI * seg(t, 6.7, 0.55))
      put(review, bi, 0, 0, 1 + 0.07 * pulse)
      const sent = eo(t, 7.15, 0.3)
      text(send, sent > 0.5 ? 'Sent to client' : 'Send to client')
      send.classList.toggle('kd-sent', sent > 0.5)
      const sp = seg(t, 7.1, 0.2)
      put(send, 1, 0, 0, sp > 0 && sp < 1 ? 0.95 : 1)

      cur.render(t, clicks, 7.7)
    },
  }
}
