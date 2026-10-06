import { Browser } from '../ui'
import { rig, eo, fmt, lerp } from '../engine'

export const dur = 6.6

export function Markup() {
  return (
    <Browser url="app.koachai.net/business">
      <div className="kd-biz">
        <div className="kd-bztop">
          <div className="kd-rev">
            <small>Revenue this month</small>
            <b className="num" data-k="rev">$4,731</b>
            <span className="kd-delta" data-k="delta">+$89</span>
          </div>
          <div className="kd-notif" data-k="notif">
            <i className="kd-stripe">Stripe</i>
            <span><b>Payment received · $89.00</b><small>Sam B. · Pro, monthly</small></span>
          </div>
        </div>
        <div className="kd-bzgrid">
          <div className="kd-cal">
            <div className="kd-calh"><b>Thursday</b><small>Check-ins</small></div>
            <div className="kd-slotrow"><span>1:00 pm</span><i className="kd-slotbusy">Program review</i></div>
            <div className="kd-slotrow"><span>2:30 pm</span><i className="kd-slotbusy">Call with Dana L.</i></div>
            <div className="kd-slotrow kd-slotrow-open">
              <span>4:00 pm</span>
              <i className="kd-slotopen" />
              <i className="kd-slotfill" data-k="slot">Zoom check-in, 4:00 pm</i>
            </div>
          </div>
          <div className="kd-clist">
            <div className="kd-calh"><b>Clients</b><small>Status</small></div>
            <div className="kd-crow"><span className="kd-av kd-av1">MR</span><b>Maya R.</b><i className="kd-chip kd-chip-ok">Active</i></div>
            <div className="kd-crow"><span className="kd-av kd-av2">CT</span><b>Chris T.</b><i className="kd-chip kd-chip-ok">Active</i></div>
            <div className="kd-crow">
              <i className="kd-rowfx" data-k="rowfx" />
              <span className="kd-av kd-av0">SB</span><b>Sam B.</b>
              <span className="kd-chipwrap">
                <i className="kd-chip kd-chip-trial" data-k="trial">Trial</i>
                <i className="kd-chip kd-chip-ok kd-chip-over" data-k="active">Active</i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Browser>
  )
}

export function create(stage) {
  const { q, put, text } = rig(stage)
  const [rev, delta, notif, slot, rowfx, trial, active] = ['rev', 'delta', 'notif', 'slot', 'rowfx', 'trial', 'active'].map(q)
  return {
    measure() {},
    render(t) {
      const n = eo(t, 0.6, 0.45)
      put(notif, n, (1 - n) * 40)
      const c = eo(t, 1.5, 1.0)
      text(rev, `$${fmt(lerp(4731, 4820, c))}`)
      put(delta, eo(t, 1.5, 0.3))
      const s = eo(t, 3.2, 0.4)
      put(trial, 1 - s)
      put(active, s)
      put(rowfx, s * (1 - eo(t, 4.2, 0.6)) * 0.9)
      const k = eo(t, 4.6, 0.45)
      slot.style.opacity = k
      slot.style.transform = `scaleX(${(0.6 + 0.4 * k).toFixed(3)})`
    },
  }
}
