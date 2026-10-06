import { useEffect, useRef } from 'react'
import { Av, Check, Phone, Spark } from '../demos/ui'
import { isRM, tween } from '../lib/motion'
import { TierPill } from './fx'

// "A week with KOACH": one coach dashboard and one client phone, five days. Sample data is fictional.
export const STEPS = [
  { day: 'Monday', short: 'Mon', title: 'Build the program with AI', text: 'The coach describes the client and the AI drafts the week. The coach reviews it, sends it, and it lands on the client’s phone.' },
  { day: 'Tuesday', short: 'Tue', title: 'The client logs a workout', text: 'Weight and reps are logged set by set on the phone, with last time’s numbers in view, and the coach sees the session come in.' },
  { day: 'Wednesday', short: 'Wed', title: 'A quiet client gets flagged', text: 'Chris hasn’t checked in for 12 days, so he lands in the Action Center with Send Nudge one tap away.' },
  { day: 'Friday', short: 'Fri', title: 'Check-in day', text: 'Photos and metrics arrive. The coach gets an AI summary and a draft reply to edit before sending.' },
  { day: 'Sunday', short: 'Sun', title: 'Payments arrive', text: 'Client subscriptions renew through Stripe and the month’s revenue ticks up on the dashboard. On the client’s phone, next week is already waiting.' },
]


const d = (ms) => ({ '--d': `${ms}ms` })

export default function WeekDevices({ step, idle = false }) {
  const rev = useRef(null)
  useEffect(() => {
    const el = rev.current
    const f = (v) => {
      el.textContent = `$${Math.round(v).toLocaleString('en-US')}`
    }
    if (step !== 4 || idle || isRM()) {
      f(step === 4 && !idle ? 4909 : 4731)
      return
    }
    f(4731)
    let stop = () => {}
    const t = setTimeout(() => (stop = tween(4731, 4909, 1.4, f)), 700)
    return () => {
      clearTimeout(t)
      stop()
    }
  }, [step, idle])
  const on = (n) => ({ 'data-on': !idle && n === step ? '' : undefined })

  return (
    <div className="kd-stage kd-s-week wk" data-step={step} aria-hidden="true">
      <div className="kd-browser kd-hero-browser wk-laptop">
        <div className="kd-bar"><i className="kd-dot" /><i className="kd-dot" /><i className="kd-dot" /><span className="kd-url">app.koachai.net</span></div>
        <div className="kd-body">
          <div className="wk-pane" {...on(0)}>
            <div className="hs-head"><b className="kd-h">New program · Jordan K.</b><span className="kd-aibadge"><Spark /> AI draft</span></div>
            <div className="wk-prompt">12-week hypertrophy, 4 days a week, home gym</div>
            <div className="wk-list">
              {[['Mon', 'Upper A', 'Bench press 4×8 · One-arm row 4×10'], ['Tue', 'Lower A', 'Goblet squat 4×10 · RDL 3×10'], ['Thu', 'Upper B', 'Overhead press 3×10 · Pull-up 3×8'], ['Fri', 'Lower B', 'Split squat 3×10 · Hip thrust 3×12']].map(([a, b, c], n) => (
                <div key={a} className="wk-row wk-pop" style={d(200 + n * 160)}><b>{a}</b><span><b>{b}</b><small>{c}</small></span></div>
              ))}
            </div>
            <div className="wk-foot">
              <span className="kd-review wk-static"><Check s={11} /> Coach reviewed</span>
              <span className="kd-btn kd-btn-dark wk-swap" style={d(1500)}><span className="wk-a">Send to client</span><span className="wk-b"><Check s={12} /> Sent</span></span>
            </div>
          </div>

          <div className="wk-pane" {...on(1)}>
            <div className="hs-head"><b className="kd-h">Activity · today</b><span className="kd-qn">Tuesday</span></div>
            <div className="wk-list">
              <div className="wk-act wk-pop" style={d(500)}>
                <Av t="JK" tone={1} /><span className="kd-rt"><b>Jordan K. logged Lower B</b><small>Back squat 325 lbs × 5 · 4 of 4 sets</small></span>
              </div>
              <div className="wk-act"><Av t="MR" tone={2} /><span className="kd-rt"><b>Maya R. logged Upper A</b><small>6 of 6 sets</small></span></div>
              <div className="wk-act"><Av t="SB" tone={0} /><span className="kd-rt"><b>Sam B. logged Mobility</b><small>20 minutes</small></span></div>
            </div>
          </div>

          <div className="wk-pane" {...on(2)}>
            <div className="hs-head"><b className="kd-h">Action Center</b><span className="wk-count">2</span></div>
            <div className="wk-acg">
              <small><i className="wk-dot wk-dot-high" />High Priority</small>
              <div className="wk-ac wk-ac-high wk-pop" style={d(500)}>
                <Av t="CT" tone={0} />
                <span className="kd-rt"><b>Chris T. <em className="wk-badge-s">12d</em></b><small>No check-in in 12 days · Flagged 2d ago</small></span>
              </div>
              <span className="wk-pills wk-pop" style={d(900)}><i className="wk-pill-p">Send Nudge</i><i>Log Check-in</i><i>View Profile</i></span>
            </div>
            <div className="wk-acg">
              <small><i className="wk-dot wk-dot-info" />Informational</small>
              <div className="wk-ac wk-ac-info">
                <Av t="MR" tone={2} />
                <span className="kd-rt"><b>Maya R.</b><small>2 unread messages</small></span>
              </div>
            </div>
          </div>

          <div className="wk-pane" {...on(3)}>
            <div className="hs-head"><b className="kd-h">Check-in · Maya R.</b><span className="kd-qn">Friday</span></div>
            <div className="kd-photos hs-photos wk-pop" style={d(150)}>
              <div className="kd-photo"><i /><span>Week 8 · front</span></div>
              <div className="kd-photo"><i /><span>Week 8 · side</span></div>
            </div>
            <div className="wk-ai wk-pop" style={d(700)}>
              <span className="kd-aibadge"><Spark /> AI summary</span>
              <p>6 of 6 workouts, weight down 1.4 lb. Mentioned a sore knee on Thursday.</p>
            </div>
            <div className="wk-ai wk-pop" style={d(1300)}>
              <span className="kd-aibadge"><Spark /> Draft reply</span> <TierPill>Pro and up</TierPill>
              <p>Great week, Maya. Let’s swap Thursday’s lunges for a knee-friendly option.</p>
            </div>
          </div>

          <div className="wk-pane" {...on(4)}>
            <div className="hs-head"><b className="kd-h">Revenue this month</b><span className="kd-qn">Sunday</span></div>
            <div className="wk-rev"><b className="num" ref={rev}>$4,731</b><i className="wk-delta wk-pop" style={d(700)}>+$178</i></div>
            <div className="wk-list">
              {[['JK', 'Jordan K.', '$120.00'], ['CT', 'Chris T.', '$58.00']].map(([i, n, a], k) => (
                <div key={n} className="wk-act wk-pop" style={d(400 + k * 300)}>
                  <Av t={i} tone={k + 1} /><span className="kd-rt"><b>{n}</b><small>Monthly coaching · renewed</small></span><i className="kd-stripe">Stripe</i><b className="num">{a}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Phone className="kd-hero-phone wk-phone">
        <div className="kd-pstatus" />
        <div className="hs-pslots">
          <div className="hs-ppane wk-ppane" {...on(0)}>
            <div className="kd-ph"><small>Hi Jordan</small><b className="kd-h">Today</b></div>
            <div className="wk-new wk-pop" style={d(1900)}><small>New from your coach</small><b>12-week program</b><small>Starts Monday · Upper A</small></div>
            <div className="kd-mini"><small>Up next</small><b>Upper A · Monday</b></div>
          </div>
          <div className="hs-ppane wk-ppane" {...on(1)}>
            <div className="kd-ph"><small>Lower B · Week 1</small><b className="kd-h">Back squat</b></div>
            <div className="kd-sets">
              <div className="kd-set kd-set-done"><span>Set 1</span><b className="num">275 lbs × 5</b><i className="kd-tick"><Check s={11} /></i></div>
              <div className="kd-set kd-set-done"><span>Set 2</span><b className="num">295 lbs × 5</b><i className="kd-tick"><Check s={11} /></i></div>
              <div className="kd-set kd-set-done wk-last">
                <span>Set 3</span><b className="num">325 lbs × 5</b><i className="kd-tick"><Check s={11} /></i>
                <span className="kd-newbest wk-badge" style={d(800)}>✓ Logged!</span>
              </div>
            </div>
          </div>
          <div className="hs-ppane wk-ppane" {...on(2)}>
            <div className="kd-ph"><small>Message</small><b className="kd-h">Your coach</b></div>
            <div className="kd-thread">
              <p className="kd-msg kd-msg-in wk-pop" style={d(1700)}>Hey! Just checking in, haven’t heard from you in a while. How’s everything going? 💪</p>
              <p className="kd-msg kd-msg-out wk-pop" style={d(2400)}>Crazy week, sorry! Checking in tonight.</p>
            </div>
          </div>
          <div className="hs-ppane wk-ppane" {...on(3)}>
            <div className="kd-ph"><small>Check-in · Week 8</small><b className="kd-h">Friday check-in</b></div>
            <div className="kd-photos hs-photos-s"><div className="kd-photo"><i /></div><div className="kd-photo"><i /></div></div>
            <div className="kd-mini"><small>Weight</small><b className="num">182.4 lb</b></div>
            <span className="kd-btn kd-btn-dark wk-swap wk-full" style={d(600)}><span className="wk-a">Submit check-in</span><span className="wk-b"><Check s={12} /> Submitted</span></span>
          </div>
          <div className="hs-ppane wk-ppane" {...on(4)}>
            <div className="kd-ph"><small>Hi Jordan</small><b className="kd-h">Next week is ready</b></div>
            <div className="wk-new wk-pop" style={d(900)}><small>Week 2 · from your coach</small><b>4 sessions</b><small>Starts Monday</small></div>
            <div className="kd-mini wk-pop" style={d(1200)}><small>Monday</small><b>Upper A</b></div>
            <div className="kd-mini wk-pop" style={d(1400)}><small>Tuesday</small><b>Lower A</b></div>
          </div>
        </div>
      </Phone>
    </div>
  )
}
