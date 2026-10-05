import Logo from './Logo'
import Icon from './Icons'
import { LOGIN_URL, SIGNUP_URL, SUPPORT_EMAIL, INSTAGRAM_URL } from '../lib/config'

const COLS = [
  ['Product', [
    ['Features', '/#features'],
    ['Pricing', '/#pricing'],
    ['Log in', LOGIN_URL],
    ['Start free trial', SIGNUP_URL],
  ]],
  ['Who it’s for', [
    ['Online coaches', '/#coaching-styles'],
    ['Hybrid coaches', '/#coaching-styles'],
    ['Nutrition coaches', '/#coaching-styles'],
    ['Small teams', '/#coaching-styles'],
  ]],
  ['Compare', [
    ['KOACH vs Trainerize', '/#compare'],
    ['KOACH vs Everfit', '/#compare'],
  ]],
  ['Company', [
    ['About', '/about'],
    [`Contact: ${SUPPORT_EMAIL}`, `mailto:${SUPPORT_EMAIL}`],
  ]],
  ['Legal', [
    ['Privacy', '/privacy'],
    ['Terms', '/terms'],
  ]],
]

export default function Footer() {
  return (
    <footer className="dark-zone border-t border-white/10 bg-graphite text-sm text-[#b9bfca]">
      <div className="wrap py-14">
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
        <p className="mt-12 border-t border-white/10 pt-6 text-xs">© {new Date().getFullYear()} KOACH. All rights reserved.</p>
      </div>
    </footer>
  )
}
