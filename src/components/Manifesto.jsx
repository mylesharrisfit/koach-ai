import { useEffect, useState } from 'react'
import Icon from './Icons'
import { Reveal } from './fx'
import { useRM, useSeen } from '../lib/motion'
import { photoUrl } from '../lib/photos'
import { SIGNUP_URL } from '../lib/config'

// Everfit-style brand block: a blue panel with a staggered uppercase headline and typewriter copy,
// next to giant "ONE( photo )APP" type whose window cycles through photos.
const COPY = 'Programs, nutrition, check-ins, payments and your own client app in one place. AI drafts the work. You make the call. Your logo on every screen your clients see.'
const FRAME = ['cat-nutrition', 'feature-client-app', 'branding', 'workout'].filter(photoUrl)

function Typed({ text }) {
  const [ref, seen] = useSeen()
  const rm = useRM()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen || rm) return
    const id = setInterval(() => setN((x) => (x >= text.length ? (clearInterval(id), x) : x + 2)), 28)
    return () => clearInterval(id)
  }, [seen, rm, text])
  const shown = rm ? text.length : n
  return (
    <p ref={ref} className="mf-mono">
      <span className="mf-reserve">{text}</span>
      <span className="mf-typed" aria-hidden="true">
        {text.slice(0, shown)}
        {shown < text.length && <i className="mf-caret" />}
      </span>
    </p>
  )
}

export default function Manifesto() {
  return (
    <section aria-labelledby="mf-h" className="cv bg-white pb-16 sm:pb-24">
      <div className="wrap">
        <div className="mf">
          <div className="mf-l">
            <h2 id="mf-h" className="mf-h">
              <Reveal as="span" from="left" className="mf-line">Less admin.</Reveal>
              <Reveal as="span" from="right" i={1} className="mf-line mf-in">More coaching.</Reveal>
              <Reveal as="span" from="left" i={2} className="mf-line mf-gap"><span>Your</span><span>brand.</span></Reveal>
            </h2>
            <Typed text={COPY} />
            <a href={SIGNUP_URL} className="mf-cta">
              <span className="mf-arrow"><Icon name="arrow" size={26} /></span>
              <span className="mf-bar">Start your 30 days</span>
            </a>
          </div>
          <div className="mf-r" aria-hidden="true">
            <div className="mf-top"><span>Plan / Coach / Grow</span><span>All in one.</span></div>
            <div className="mf-big">
              <span>One(</span>
              <span className="mf-frame">
                <i className="mf-strip mf-strip-a" />
                <i className="mf-strip mf-strip-b" />
                <span className="mf-win">
                  {FRAME.map((s, i) => <img key={s} src={photoUrl(s)} alt="" loading="lazy" decoding="async" style={{ '--n': i, '--c': FRAME.length }} />)}
                </span>
              </span>
              <span>)App</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
