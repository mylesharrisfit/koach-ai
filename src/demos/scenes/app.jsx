import { Phone, Check } from '../ui'
import { rig, eo, seg, fmt } from '../engine'

export const dur = 6.8

export function Markup() {
  return (
    <Phone className="kd-app-phone">
      <div className="kd-pstatus" />
      <div className="kd-ph">
        <small>Lower B · Week 6</small>
        <b className="kd-h">Back squat</b>
      </div>
      <div className="kd-sets">
        <div className="kd-set kd-set-done"><span>Set 1</span><b className="num">275 lbs × 5</b><i className="kd-tick"><Check s={11} /></i></div>
        <div className="kd-set kd-set-done"><span>Set 2</span><b className="num">295 lbs × 5</b><i className="kd-tick"><Check s={11} /></i></div>
        <div className="kd-set kd-set-input" data-k="set3">
          <span>Set 3</span>
          <span className="kd-inputs">
            <span className="kd-field"><small>lbs</small><b className="num" data-k="w">0</b></span>
            <span className="kd-field kd-field-s"><small>reps</small><b className="num" data-k="r" /></span>
          </span>
          <i className="kd-tick kd-tickbtn" data-k="chk"><Check s={12} /></i>
          <span className="kd-newbest" data-k="best">✓ Logged!</span>
        </div>
      </div>
      <div className="kd-rest kd-rest-app" data-k="rest">
        <small>Rest Time</small>
        <b className="num" data-k="timer">1:30</b>
        <i className="kd-restbar"><i data-k="bar" /></i>
      </div>
      <div className="kd-next">
        <small>Up next</small>
        <b>Romanian deadlift · 3 sets</b>
      </div>
    </Phone>
  )
}

export function create(stage) {
  const { q, put, text, cls } = rig(stage)
  const [set3, w, r, chk, best, rest, timer, bar] = ['set3', 'w', 'r', 'chk', 'best', 'rest', 'timer', 'bar'].map(q)

  return {
    measure() {},
    render(t) {
      const wp = eo(t, 0.8, 0.8)
      text(w, fmt(325 * wp))
      cls(w, 'kd-filled', wp > 0.01)
      text(r, t > 1.9 ? '5' : '')
      const press = seg(t, 2.6, 0.2)
      const done = eo(t, 2.7, 0.3)
      cls(set3, 'kd-set-done', done > 0.5)
      put(chk, done, 0, 0, (press > 0 && press < 1 ? 0.9 : 1) * (0.7 + 0.3 * done))
      const ri = eo(t, 2.9, 0.4)
      put(rest, ri, 0, (1 - ri) * 10)
      const el = Math.max(0, t - 3.2)
      const secs = 90 - Math.floor(el * 8) // sped-up for the demo
      text(timer, `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`)
      bar.style.transform = `scaleX(${(secs / 90).toFixed(3)})`
      const b = eo(t, 3.6, 0.35)
      put(best, b, 0, (1 - b) * 6, 0.85 + 0.15 * b)
    },
  }
}
