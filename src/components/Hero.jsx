import { useEffect, useRef, useState } from 'react'
import CtaForm from './CtaForm'
import Icon from './Icons'
import Piece from './Pieces'
import { useParallax, ZoomIn } from './fx'
import { PauseButton } from '../demos/Demo'
import { Phone } from '../demos/ui'
import PortalHome from './PortalHome'
import { useOnScreen, usePageHidden, useRM } from '../lib/motion'
import { photoUrl } from '../lib/photos'

// Everfit-style photo column behind the phone: photos of different widths drifting upward forever
const STRIP = [['hero', 72], ['cat-client-app', 92], ['style-one', 58], ['feature-client-app-0', 80], ['band-1', 64], ['cat-coaching', 86]]
function PhotoStrip() {
  const items = STRIP.filter(([slot]) => photoUrl(slot))
  if (!items.length) return null
  return (
    <span className="hc-strip">
      <span className="hc-strip-in">
        {[0, 1].map((g) => items.map(([slot, w]) => (
          <img key={`${g}${slot}`} src={photoUrl(slot)} alt="" loading={g ? 'lazy' : undefined} decoding="async" style={{ width: `${w}%` }} />
        )))}
      </span>
    </span>
  )
}

// The audience word rolls vertically; the matching product piece in the collage lights up with it.
const WORDS = ['online coaches', 'hybrid coaches', 'nutrition coaches', 'small teams']
const PIECES = [
  { k: 'checkin', pos: { left: 0, top: 46 }, depth: -0.03, aud: 0 },
  { k: 'session', pos: { right: -14, top: 22 }, depth: 0.04, aud: 1, sm: 'hide' },
  { k: 'macros', pos: { right: -18, top: 214 }, depth: -0.05, aud: 2 },
  { k: 'team', pos: { right: -6, bottom: 40 }, depth: 0.05, aud: 3, sm: 'hide' },
  { k: 'revenue', pos: { left: -6, bottom: 22 }, depth: -0.02, sm: 'hide' },
  { k: 'newBest', pos: { left: 20, top: 248 }, depth: 0.03 },
]

export default function Hero() {
  const ref = useRef(null)
  const stageRef = useRef(null)
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hover, setHover] = useState(false)
  const rm = useRM()
  const hidden = usePageHidden()
  const onScreen = useOnScreen(ref, 0.1, true)
  const advancing = !rm && !paused && !hidden && onScreen && !hover
  useParallax(stageRef, !paused)

  useEffect(() => {
    if (!advancing) return
    const t = setTimeout(() => setI((x) => (x + 1) % WORDS.length), 3200)
    return () => clearTimeout(t)
  }, [advancing, i])

  return (
    <section ref={ref} className={`hero-mesh relative overflow-hidden bg-white pb-16 pt-10 sm:pb-24 sm:pt-16 ${paused ? 'is-paused' : ''}`}>
      <span className="hero-blobs" aria-hidden="true"><i /><i /><i /></span>
      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6">
          <p className="hero-in eyebrow">AI coaching OS · 30 days free</p>
          <h1 className="hero-in h-mega mt-5 text-[2.9rem] sm:text-[4.4rem] lg:text-[4.1rem] xl:text-[4.9rem]" style={{ '--i': 1 }}>
            <span className="sr-only">The all-in-one coaching OS for online coaches, hybrid coaches, nutrition coaches and small teams</span>
            <span aria-hidden="true">
              The coaching OS for{' '}
              <span className="hero-roll">
                <span style={{ transform: `translateY(${-i * 1.02}em)` }}>
                  {WORDS.map((w) => <span key={w}>{w}</span>)}
                </span>
              </span>
            </span>
          </h1>
          <p className="hero-in lede-xl mt-6 max-w-lg" style={{ '--i': 2 }}>
            Programs, nutrition, check-ins, a client app and payments in one place, with AI that drafts and you review before anything reaches a client.
          </p>
          <CtaForm id="hero-email" className="hero-in mt-8" style={{ '--i': 3 }} light />
          <div className="hero-in mt-6 flex flex-wrap items-center gap-x-6 gap-y-3" style={{ '--i': 4 }}>
            <a href="#showreel" className="reel-link inline-flex items-center gap-3 rounded-full py-1 pr-2 text-[15px] font-semibold text-ink">
              <span className="reel-live" aria-hidden="true"><i /></span>
              Watch it run, no clicks needed
              <Icon name="chevron" size={18} className="reel-chev" />
            </a>
            <div className="flex items-center gap-1" role="group" aria-label="Choose who the preview shows">
              {WORDS.map((w, n) => (
                <button key={w} type="button" className="hdot hdot-light" aria-label={`Show ${w}`} aria-pressed={n === i} onClick={() => setI(n)}>
                  <i />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          className="lg:col-span-6"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <ZoomIn kind="hero">
            <div
              ref={stageRef}
              className={`hc hero-zoom ${paused || rm ? 'is-paused' : ''}`}
              data-focus=""
              role="group"
              aria-label={`Product preview for ${WORDS[i]}: the KOACH client app with check-in, schedule, macro, team and revenue cards. Fictional sample data.`}
            >
              <div className="stage-blue" aria-hidden="true"><PhotoStrip /></div>
              <div className="hc-phone" aria-hidden="true">
                <Phone><PortalHome /></Phone>
              </div>
              {PIECES.map((p, n) => (
                <div
                  key={p.k}
                  className="hc-piece"
                  style={{ ...p.pos, '--n': n }}
                  data-depth={p.depth}
                  data-on={p.aud === i ? '' : undefined}
                  data-sm={p.sm}
                  aria-hidden="true"
                >
                  <div className="fl-bob" style={{ animationDelay: `${-n * 1.1}s` }}>
                    <div className="hc-f"><Piece k={p.k} /></div>
                  </div>
                </div>
              ))}
              {!rm && <PauseButton paused={paused} onToggle={() => setPaused((x) => !x)} fixed />}
            </div>
          </ZoomIn>
        </div>
      </div>
    </section>
  )
}
