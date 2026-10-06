import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import CtaForm from './CtaForm'
import HeroStage from './HeroStage'
import Icon from './Icons'
import { Divider } from './fx'
import { useOnScreen, usePageHidden, useRM } from '../lib/motion'

const Tour = lazy(() => import('./Tour'))
const loadTour = () => import('./Tour')
const WORDS = ['online coaches', 'hybrid coaches', 'nutrition coaches', 'small teams']

export default function Hero() {
  const ref = useRef(null)
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hover, setHover] = useState(false)
  const [tour, setTour] = useState(false)
  const rm = useRM()
  const hidden = usePageHidden()
  const onScreen = useOnScreen(ref, 0.1, true)
  const live = !rm && !paused && !hidden && onScreen && !tour
  const advancing = live && !hover

  // the word and the mockup advance together every 4 seconds
  useEffect(() => {
    if (!advancing) return
    const t = setTimeout(() => setI((x) => (x + 1) % WORDS.length), 4000)
    return () => clearTimeout(t)
  }, [advancing, i])

  return (
    <section ref={ref} className="dark-zone glow relative overflow-hidden bg-graphite pb-20 pt-10 text-white sm:pb-28 sm:pt-16">
      <div
        className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-8"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHover(false)}
      >
        <div className="lg:col-span-5">
          <h1 className="text-[2.45rem] !leading-[1.02] !text-white sm:text-[3.5rem] lg:text-[3rem] xl:text-[3.5rem]">
            The all-in-one coaching OS for
            <span className="mt-1 block">
              <span className="inline-grid whitespace-nowrap">
                {WORDS.map((w, n) => (
                  <span key={w} aria-hidden={n !== i} className="hero-word col-start-1 row-start-1" data-on={n === i ? '' : undefined}>
                    {w}
                  </span>
                ))}
              </span>
              <span className="mt-2 block h-1.5 w-20 rounded-full bg-red" aria-hidden="true" />
            </span>
          </h1>
          <p className="lede mt-6 max-w-md">
            Programs, nutrition, check-ins, a client app and payments in one place, with AI that drafts and you review before anything reaches a client.
          </p>
          <CtaForm id="hero-email" className="mt-8" />
          <button
            type="button"
            onClick={() => setTour(true)}
            onPointerEnter={loadTour}
            onFocus={loadTour}
            className="tour-btn mt-6 inline-flex items-center gap-3 rounded-lg py-1 pr-2 text-[15px] font-semibold text-white"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-white/5"><Icon name="play" size={16} className="translate-x-px" /></span>
            Watch the 30-second tour
          </button>
        </div>
        <div className="mx-auto w-full max-w-[720px] lg:col-span-7">
          <div role="group" aria-label={`Product preview for ${WORDS[i]}. Animated mockup of the KOACH coach dashboard and client app with fictional sample data.`}>
            <HeroStage aud={i} paused={paused || rm} onPause={rm ? null : () => setPaused((p) => !p)} live={live} />
          </div>
          <div className="mt-5 flex items-center justify-center gap-1" role="group" aria-label="Choose who the preview shows">
            {WORDS.map((w, n) => (
              <button key={w} type="button" className="hdot" aria-label={`Show ${w}`} aria-pressed={n === i} onClick={() => setI(n)}>
                <i />
              </button>
            ))}
          </div>
        </div>
      </div>
      <Divider fill="#EEF0F2" />
      {tour && (
        <Suspense fallback={null}>
          <Tour onClose={() => setTour(false)} />
        </Suspense>
      )}
    </section>
  )
}
