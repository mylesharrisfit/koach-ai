import { useEffect, useRef, useState } from 'react'
import Icon from './Icons'
import { SUPPORT_EMAIL } from '../lib/config'

// Bottom-right help button: a small popover (scale .98 -> 1, 180ms) with real ways to reach us.
// Esc or a click outside closes it and focus returns to the button.
export default function SupportFab() {
  const [open, setOpen] = useState(false)
  const wrap = useRef(null)
  const btn = useRef(null)
  useEffect(() => {
    if (!open) return
    const key = (e) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      btn.current?.focus()
    }
    const down = (e) => !wrap.current.contains(e.target) && setOpen(false)
    document.addEventListener('keydown', key)
    document.addEventListener('pointerdown', down)
    return () => {
      document.removeEventListener('keydown', key)
      document.removeEventListener('pointerdown', down)
    }
  }, [open])
  const home = location.pathname === '/'
  return (
    <div ref={wrap} className="fab">
      {open && (
        <div id="help-pop" className="fab-pop" role="group" aria-label="Help">
          <p className="px-2 font-display text-lg font-extrabold" style={{ fontStretch: '85%' }}>Questions?</p>
          <p className="px-2 pb-2 text-sm text-mut">Pick whatever’s easiest.</p>
          <a href={`mailto:${SUPPORT_EMAIL}`}><span><Icon name="message" size={18} /></span>Email {SUPPORT_EMAIL}</a>
          <a href={home ? '#faq' : '/#faq'} onClick={() => setOpen(false)}><span><Icon name="list" size={18} /></span>Read the FAQ</a>
          <a href={home ? '#pricing' : '/#pricing'} onClick={() => setOpen(false)}><span><Icon name="coins" size={18} /></span>See plans and pricing</a>
          <a href={`mailto:${SUPPORT_EMAIL}?subject=Switching%20to%20KOACH`}><span><Icon name="truck" size={18} /></span>Switching apps? We’ll help you move</a>
        </div>
      )}
      <button ref={btn} type="button" className="fab-btn" aria-expanded={open} aria-controls="help-pop" aria-label={open ? 'Close help' : 'Help'} onClick={() => setOpen((o) => !o)}>
        <Icon name={open ? 'close' : 'message'} size={22} />
      </button>
    </div>
  )
}
