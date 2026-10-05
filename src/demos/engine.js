// Seekable scene helpers. A scene is render(t): it sets opacity/transform (and text for typing and
// counting) from scratch for time t, so pausing, looping and the reduced-motion final frame are the
// same code path. Motion's animate() only drives the clock (see Demo.jsx).
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
export const ease = (x) => 1 - Math.pow(1 - x, 3) // ease-out
export const seg = (t, s, d = 0.4) => clamp((t - s) / d)
export const eo = (t, s, d = 0.4) => ease(seg(t, s, d))
export const lerp = (a, b, p) => a + (b - a) * p
export const fmt = (n) => Math.round(n).toLocaleString('en-US')

export function rig(root) {
  const q = (k) => root.querySelector(`[data-k="${k}"]`)
  const qa = (k) => Array.from(root.querySelectorAll(`[data-k="${k}"]`))

  // opacity + translate + scale in one write; skipped when unchanged
  const put = (el, o = 1, x = 0, y = 0, s = 1) => {
    if (!el) return
    const key = `${o.toFixed(3)}|${x.toFixed(1)}|${y.toFixed(1)}|${s.toFixed(3)}`
    if (el._k === key) return
    el._k = key
    el.style.opacity = o
    el.style.transform = x || y || s !== 1 ? `translate3d(${x}px,${y}px,0) scale(${s})` : 'none'
  }
  const rot = (el, deg) => {
    if (!el) return
    const v = deg.toFixed(2)
    if (el._r === v) return
    el._r = v
    el.style.transform = `rotate(${v}deg)`
  }
  const text = (el, s) => {
    if (el && el.textContent !== s) el.textContent = s
  }
  const typed = (el, str, p) => {
    if (!el) return
    text(el, str.slice(0, Math.round(str.length * p)))
    el.classList.toggle('kd-caret', p > 0 && p < 1)
  }
  const cls = (el, name, on) => el && el.classList.toggle(name, !!on)
  return { q, qa, put, rot, text, typed, cls }
}

const MOVE = 0.9

// Fake cursor: path = [[arrivalTime, element, ox, oy], ...]; positions are measured once (and on resize)
// with every element at rest, relative to the stage, so only transform changes while playing.
export function makeCursor(stage, root) {
  const cur = root.querySelector('[data-k="cursor"]')
  const rip = root.querySelector('[data-k="ripple"]')
  let pts = []
  return {
    measure(path) {
      const sr = stage.getBoundingClientRect()
      pts = path.map(([t, el, ox = 0.5, oy = 0.5]) => {
        const r = el.getBoundingClientRect()
        return { t, x: r.left - sr.left + r.width * ox, y: r.top - sr.top + r.height * oy }
      })
    },
    render(t, clicks, hideAt) {
      if (!pts.length || !cur) return
      let { x, y } = pts[0]
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1]
        const b = pts[i]
        const start = Math.max(a.t, b.t - MOVE)
        if (t >= start) {
          const p = eo(t, start, b.t - start)
          x = lerp(a.x, b.x, p)
          y = lerp(a.y, b.y, p)
        }
      }
      const o = eo(t, pts[0].t - 0.3, 0.3) * (1 - eo(t, hideAt, 0.3))
      const key = `${o.toFixed(2)}|${x.toFixed(1)}|${y.toFixed(1)}`
      if (cur._k !== key) {
        cur._k = key
        cur.style.opacity = o
        cur.style.transform = `translate3d(${x}px,${y}px,0)`
      }
      let ro = 0
      let rs = 0.3
      for (const c of clicks) {
        const d = (t - c) / 0.5
        if (d >= 0 && d <= 1) {
          ro = 0.5 * (1 - d)
          rs = 0.3 + 1.2 * ease(d)
        }
      }
      if (rip) {
        rip.style.opacity = ro
        rip.style.transform = `scale(${rs})`
      }
    },
  }
}
