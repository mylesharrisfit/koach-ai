import { useState } from 'react'
import { Phone, Check } from '../demos/ui'
import PortalHome from './PortalHome'
import { Reveal, ZoomIn } from './fx'
import Icon from './Icons'
import StagePhoto from './StagePhoto'

// White-label preview: type a coaching name and pick a color, and the client app re-themes as you go.
// Nothing is saved; it is a preview of what the real branding settings change.
const COLORS = [
  ['#2563EB', 'Blue'],
  ['#16181D', 'Black'],
  ['#1F7A52', 'Green'],
  ['#C2410C', 'Orange'],
  ['#7C3AED', 'Violet'],
  ['#BE185D', 'Pink'],
]

export function BrandPreview({ name, color }) {
  return (
    <Phone className="bs-phone">
      <PortalHome brand={color} app={name} />
    </Phone>
  )
}

export default function BrandStudio({ heading = true }) {
  const [name, setName] = useState('Dana Strength')
  const [color, setColor] = useState(COLORS[0][0])
  return (
    <section id="branding" className="cv section bg-white">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          {heading && (
            <Reveal>
              <p className="eyebrow">White-label client app</p>
              <h2 className="h-mega mt-4 text-[2.4rem] sm:text-[3.6rem]">Your brand on your clients’ phones.</h2>
              <p className="lede-xl mt-5 max-w-xl">Your app name, logo, colors and fonts on the client portal. Try it: the preview updates as you type.</p>
            </Reveal>
          )}
          <Reveal i={1} className="mt-8 grid max-w-md gap-6 rounded-3xl bg-mist p-6">
            <div>
              <label htmlFor="bs-name" className="text-sm font-semibold text-mut">App name</label>
              <input
                id="bs-name"
                value={name}
                maxLength={28}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 h-12 w-full rounded-full border border-line bg-white px-5 text-[15px] font-semibold text-ink focus:border-ink"
              />
            </div>
            <fieldset>
              <legend className="text-sm font-semibold text-mut">Brand color</legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {COLORS.map(([c, label]) => (
                  <span key={c}>
                    <input type="radio" name="bs-color" id={`bs-${label}`} className="peer sr-only" checked={color === c} onChange={() => setColor(c)} />
                    <label htmlFor={`bs-${label}`} className="bs-sw grid place-items-center text-white" style={{ background: c }}>
                      <span className="sr-only">{label}</span>
                      {color === c && <Check s={14} />}
                    </label>
                  </span>
                ))}
              </div>
            </fieldset>
            <p className="flex items-center gap-2 text-sm text-mut"><Icon name="shield" size={18} className="flex-none" />A preview only. Your real branding is set in the app.</p>
          </Reveal>
        </div>
        <ZoomIn>
          <div className="stage-blue grid place-items-center py-12" role="img" aria-label={`Client app preview branded as ${name || 'your coaching name'}`}>
            <StagePhoto slot="branding" />
            <div aria-hidden="true"><BrandPreview name={name} color={color} /></div>
          </div>
        </ZoomIn>
      </div>
    </section>
  )
}
