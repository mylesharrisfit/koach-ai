import { Logo } from './Logo'
import { cta, links } from '../lib/config'

const COLS = [
  {
    title: 'Product',
    items: [
      { label: 'Features', href: '#features' },
      { label: 'How it works', href: '#how' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '#top' },
      { label: 'Contact', href: 'mailto:hello@koachai.net' },
      { label: 'Log in', href: links.login },
      { label: 'Get started', href: cta('footer') },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] py-14">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-2">
            <a href="#top" className="flex items-center gap-2.5">
              <Logo className="h-9 w-9" />
              <span className="text-base font-bold text-white">
                KOACH<span className="text-gradient"> AI</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              The AI coaching operating system. Programs, nutrition, check-ins, and payments —
              one premium platform.
            </p>
            <a
              href={cta('footer-cta')}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-400 to-ai px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
            >
              Start free
            </a>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.href} className="text-sm text-white/50 transition-colors hover:text-white">
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} KOACH AI. All rights reserved.</p>
          <p className="text-xs text-white/40">
            koachai.net · <span className="text-white/55">app.koachai.net</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
