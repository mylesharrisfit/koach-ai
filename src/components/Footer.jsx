import { useState } from 'react'
import Logo from './Logo'
import { setUserPaused, systemReduced } from '../lib/motion'
import Icon from './Icons'
import { LOGIN_URL, SIGNUP_URL, SUPPORT_EMAIL, INSTAGRAM_URL } from '../lib/config'
import { FEATURES, featureUrl } from '../lib/features'

const COLS = [
  ['Features', Object.values(FEATURES).map((f) => [f.nav, featureUrl(f.slug)])],
  ['Who it’s for', [
    ['Online coaches', '/#coaching-styles'],
    ['Hybrid coaches', '/#coaching-styles'],
    ['Nutrition coaches', '/#coaching-styles'],
    ['Small teams', '/#coaching-styles'],
  ]],
  ['Plans', [
    ['Pricing', '/#pricing'],
    ['What’s in each plan', '/#compare'],
    ['Start free trial', SIGNUP_URL],
    ['Sign in', LOGIN_URL],
  ]],
  ['Company', [
    ['About', '/about'],
    ['FAQ', '/#faq'],
    [`Contact: ${SUPPORT_EMAIL}`, `mailto:${SUPPORT_EMAIL}`],
  ]],
  ['Legal', [
    ['Privacy', '/privacy'],
    ['Terms', '/terms'],
  ]],
]

// One switch to stop every animation on the site (WCAG 2.2.2), on top of the OS reduced-motion setting.
function MotionToggle() {
  const [off, setOff] = useState(false)
  if (systemReduced()) return <p className="text-xs">Animations are off (system setting).</p>
  return (
    <button
      type="button"
      aria-pressed={off}
      onClick={() => {
        setUserPaused(!off)
        setOff(!off)
      }}
      className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10"
    >
      {off ? 'Play animations' : 'Pause animations'}
    </button>
  )
}

export default function Footer() {
  return (
    <footer className="cv dark-zone bg-ink text-sm text-[#b9bfca]">
      <div className="wrap py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_3fr]">
          <div className="max-w-xs">
            <Logo className="h-9" />
            <p className="mt-4 leading-relaxed">The coaching OS for online coaches.</p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg py-1 text-white hover:underline"
            >
              <Icon name="instagram" size={20} />
              <span>Instagram @koachaiapp</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {COLS.map(([h, items]) => (
              <div key={h}>
                <h2 className="text-[15px] !font-bold text-white" style={{ fontStretch: '85%' }}>{h}</h2>
                <ul className="mt-4 grid gap-3">
                  {items.map(([t, href]) => (
                    <li key={t}>
                      <a href={href} className="break-words hover:text-white hover:underline">{t}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs">
          <p>© {new Date().getFullYear()} KOACH. All rights reserved.</p>
          <MotionToggle />
        </div>
      </div>
    </footer>
  )
}
