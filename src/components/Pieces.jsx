import { Av, Check, Ring, Spark } from '../demos/ui'

// Product UI pulled out of the app and shown as floating pieces (charts, rings, cards). One vocabulary
// for the hero, the category cards, feature pages and menu previews. Sample data is fictional.
const Head = ({ k, t, right }) => (
  <span className="pc-head">
    <small>{k}</small>
    {right}
    {t && <b>{t}</b>}
  </span>
)
const Bars = ({ v }) => (
  <span className="pc-bars" aria-hidden="true">
    {v.map((h, i) => <i key={i} style={{ '--h': h, '--n': i }} />)}
  </span>
)

const P = {
  program: () => (
    <div className="pc pc-w">
      <Head k="Program · Jordan K." t="12-week hypertrophy" />
      {[['Mon', 'Upper A', 'Bench 4×8'], ['Tue', 'Lower A', 'Goblet squat 4×10'], ['Thu', 'Upper B', 'OHP 3×10']].map(([d, n, x]) => (
        <span key={d} className="pc-row"><em>{d}</em><span><b>{n}</b><small>{x}</small></span></span>
      ))}
    </div>
  ),
  aiDraft: () => (
    <div className="pc pc-ai">
      <span className="pc-tag"><Spark /> AI draft<i className="ai-sheen" /></span>
      <p>Great week, Maya. Six of six sessions and 1.4 lb down. Keep protein steady.</p>
      <span className="pc-chips"><i>Warmer</i><i>Shorter</i><i className="on">Send</i></span>
    </div>
  ),
  reviewed: () => (
    <div className="pc pc-pill"><span className="pc-ok"><Check s={11} /></span>Coach reviewed</div>
  ),
  swap: () => (
    <div className="pc">
      <Head k="Swap for left knee" />
      <span className="pc-swap"><s>Barbell back squat</s><b>Box squat</b></span>
    </div>
  ),
  group: () => (
    <div className="pc">
      <Head k="Group program" t="Strength block" />
      <span className="pc-avs"><Av t="MR" tone={1} /><Av t="SB" /><Av t="AW" tone={2} /><Av t="+9" /></span>
    </div>
  ),
  template: () => (
    <div className="pc pc-pill"><span className="pc-dot" />Saved as template</div>
  ),
  macros: () => (
    <div className="pc">
      <Head k="Today’s macros" t="1,620 / 2,440 kcal" />
      <span className="pc-rings">
        <Ring color="#1F5EFF" size={44} pct={0.71}><b className="num">P</b></Ring>
        <Ring color="#F2C46B" size={44} pct={0.64}><b className="num">C</b></Ring>
        <Ring color="#1F7A52" size={44} pct={0.65}><b className="num">F</b></Ring>
      </span>
    </div>
  ),
  meal: () => (
    <div className="pc pc-w">
      <Head k="Lunch · 620 kcal" t="Chicken, rice, greens" />
      <span className="pc-macro"><i style={{ '--p': 0.62 }} /><small>48 g protein</small></span>
    </div>
  ),
  swapFood: () => (
    <div className="pc pc-pill"><span className="pc-dot" />Rice swapped for potatoes</div>
  ),
  setRow: () => (
    <div className="pc pc-w">
      <Head k="Back squat · Set 3 of 4" />
      <span className="pc-set"><b className="num">315</b><small>lb</small><b className="num">5</b><small>reps</small><span className="pc-ok"><Check s={11} /></span></span>
    </div>
  ),
  rest: () => (
    <div className="pc pc-dark pc-pill"><span className="pc-timer" aria-hidden="true" />Rest 1:30</div>
  ),
  newBest: () => (
    <div className="pc pc-pill"><span className="fl-star" />New best: 325 lb × 5</div>
  ),
  message: () => (
    <div className="pc pc-w">
      <Head k="Coach Dana" />
      <span className="pc-msg">How did squats feel?</span>
      <span className="pc-msg pc-msg-out">Knee was fine, added 10 lb.</span>
    </div>
  ),
  brand: () => (
    <div className="pc">
      <span className="pc-brand"><i>DS</i><span><b>Dana Strength</b><small>Your coaching app</small></span></span>
      <span className="pc-swatches" aria-hidden="true"><i style={{ background: '#1F5EFF' }} /><i style={{ background: '#16181D' }} /><i style={{ background: '#F2C46B' }} /><i style={{ background: '#1F7A52' }} /></span>
    </div>
  ),
  checkin: () => (
    <div className="pc pc-w">
      <span className="pc-person"><Av t="MR" tone={1} /><span><b>Maya R.</b><small>Week 8 check-in</small></span><em className="num">−1.4 lb</em></span>
      <span className="pc-photos" aria-hidden="true"><i /><i /></span>
    </div>
  ),
  status: () => (
    <div className="pc">
      <Head k="This week" />
      {[['MR', 'ggggagg'], ['CT', 'ggmmagg'], ['SB', 'gaggagg']].map(([n, s]) => (
        <span key={n} className="pc-grid"><em>{n}</em>{[...s].map((c, i) => <i key={i} className={`pc-c-${c}`} />)}</span>
      ))}
    </div>
  ),
  needs: () => (
    <div className="pc pc-w">
      <Head k="Needs you today" right={<span className="pc-count">2</span>} />
      <span className="pc-person"><Av t="CT" /><span><b>Chris T.</b><small>Missed Wednesday session</small></span></span>
      <span className="pc-person"><Av t="DL" tone={2} /><span><b>Dana L.</b><small>Three amber days</small></span></span>
    </div>
  ),
  revenue: () => (
    <div className="pc pc-w">
      <Head k="Monthly revenue" t="$8,420" right={<span className="pc-up">+12%</span>} />
      <Bars v={[0.35, 0.5, 0.42, 0.6, 0.55, 0.72, 0.68, 0.86, 1]} />
    </div>
  ),
  payment: () => (
    <div className="pc pc-pill"><span className="fl-pay">$</span>Payment received · Pro plan</div>
  ),
  session: () => (
    <div className="pc">
      <Head k="Thursday" />
      <span className="pc-slot"><em>9:00</em><b>Lower B at the gym</b></span>
      <span className="pc-slot pc-slot-on"><em>4:00</em><b>Zoom check-in</b></span>
    </div>
  ),
}

export const PIECE_KEYS = Object.keys(P)
export default function Piece({ k }) {
  const C = P[k]
  return C ? <C /> : null
}
