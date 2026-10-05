import { Browser, Ring, Spark } from '../ui'
import { rig, eo, fmt, lerp } from '../engine'

export const dur = 7.4

// Planned totals before and after swapping rice for potatoes (kcal = 4P + 4C + 9F, rounded to match).
const TARGET = { kcal: 2600, p: 190, c: 280, f: 90 }
const A = { kcal: 2440, p: 180, c: 250, f: 80 }
const B = { kcal: 2492, p: 181, c: 262, f: 80 }
const LUNCH_A = { kcal: 614, p: 52, c: 70, f: 14 }
const LUNCH_B = { kcal: 666, p: 53, c: 82, f: 14 }

const MEALS = [
  ['Breakfast', 'Egg-white omelette, oats', 'P 40 · C 65 · F 18', '582'],
  ['Lunch', null, null, null],
  ['Snack', 'Greek yogurt, berries', 'P 28 · C 35 · F 8', '324'],
  ['Dinner', 'Salmon, sweet potato, greens', 'P 60 · C 80 · F 40', '920'],
]

export function Markup() {
  return (
    <Browser url="app.koachai.net/nutrition/plan">
      <div className="kd-meal">
        <div className="kd-mh">
          <b className="kd-h">Meal plan · Maya R.</b>
          <span className="kd-aibadge"><Spark /> AI draft</span>
        </div>
        <div className="kd-rings">
          <div className="kd-rg"><Ring k="kcal" color="#16181D" size={92}><b className="num" data-k="kcal">0</b><small>kcal</small></Ring><span>Calories</span></div>
          <div className="kd-rg"><Ring k="p" color="#1F7A52" size={92}><b className="num" data-k="p">0</b><small>g</small></Ring><span>Protein</span></div>
          <div className="kd-rg"><Ring k="c" color="#F2C46B" size={92}><b className="num" data-k="c">0</b><small>g</small></Ring><span>Carbs</span></div>
          <div className="kd-rg"><Ring k="f" color="#4A505C" size={92}><b className="num" data-k="f">0</b><small>g</small></Ring><span>Fat</span></div>
        </div>
        <div className="kd-meals">
          {MEALS.map(([n, d, m, k], i) => (
            <div className="kd-meal-row" key={n} data-k="meal">
              <span className="kd-mtime">{n}</span>
              <span className="kd-mname">
                {i === 1 ? (
                  <>Chicken, <u className="kd-ing" data-k="ing">rice</u>, greens<i className="kd-swapchip" data-k="chip">Swap</i></>
                ) : d}
              </span>
              <span className="kd-mm" data-k={i === 1 ? 'lm' : undefined}>{i === 1 ? 'P 52 · C 70 · F 14' : m}</span>
              <b className="num kd-mk" data-k={i === 1 ? 'lk' : undefined}>{i === 1 ? '614 kcal' : `${k} kcal`}</b>
            </div>
          ))}
        </div>
      </div>
    </Browser>
  )
}

export function create(stage) {
  const { q, qa, put, rot, text, cls } = rig(stage)
  const meals = qa('meal')
  const rings = ['kcal', 'p', 'c', 'f'].map((k) => ({ k, el: q(k), a: q(`${k}-a`), b: q(`${k}-b`) }))
  const [ing, chip, lm, lk] = ['ing', 'chip', 'lm', 'lk'].map(q)

  return {
    measure() {},
    render(t) {
      const fill = eo(t, 0.3, 1.6) // rings count up to the plan
      const sw = eo(t, 5.0, 1.0) // swap: totals re-count
      rings.forEach(({ k, el, a, b }) => {
        const v = lerp(A[k], B[k], sw) * fill
        text(el, fmt(v))
        const frac = Math.min(1, v / TARGET[k])
        const deg = 360 * frac
        rot(a, Math.min(deg, 180))
        rot(b, Math.max(0, deg - 180))
      })
      meals.forEach((m, i) => {
        const p = eo(t, 2.2 + 0.4 * i, 0.4)
        put(m, p, 0, (1 - p) * 10)
      })
      // swap rice for potatoes
      const c = eo(t, 4.6, 0.3)
      put(chip, c)
      cls(chip, 'kd-swapchip-on', t > 4.9)
      const sw2 = t > 5.0
      text(ing, sw2 ? 'potatoes' : 'rice')
      cls(ing, 'kd-ing-on', sw2)
      const L = (k) => lerp(LUNCH_A[k], LUNCH_B[k], sw)
      text(lm, `P ${fmt(L('p'))} · C ${fmt(L('c'))} · F ${fmt(L('f'))}`)
      text(lk, `${fmt(L('kcal'))} kcal`)
    },
  }
}
