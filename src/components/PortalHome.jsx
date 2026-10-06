import { Ring } from '../demos/ui'
import Icon from './Icons'

// Copy of the client portal's Home tab (portal/PortalHome.jsx in the app), sized for a phone mockup.
// brand: the coach's primary color (white-label). Sample data is fictional.
const TABS = [['Home', 'grid'], ['Train', 'timer'], ['Schedule', 'calendar'], ['Progress', 'chart'], ['Community', 'users'], ['Coach', 'message']]

export default function PortalHome({ name = 'Maya', brand = '#2563EB', app }) {
  return (
    <div className="ph" style={{ '--brand': brand }}>
      <div className="ph-scroll">
        {app && (
          <div className="ph-brand">
            <span className="ph-logo">{app.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') || 'K'}</span>
            <b>{app.trim() || 'Your coaching app'}</b>
          </div>
        )}
        <div className="ph-hi">
          <span>
            <b>Good morning, {name}! 👋</b>
            <small>Let’s make today count 💪</small>
          </span>
          <i className="ph-av">{name[0]}</i>
        </div>
        <div className="ph-today">
          <small>TODAY</small>
          <b>Lower B</b>
          <span className="ph-meta">🏋️ 6 exercises · ⏱ ~45 min</span>
          <span className="ph-start">Start Workout →</span>
        </div>
        <div className="ph-card">
          <span className="ph-row"><b>Daily Goals</b><small>2 of 3 complete</small></span>
          <span className="ph-rings">
            {[['Move', 1], ['Eat', 1], ['Hydrate', 0.6]].map(([l, p]) => (
              <span key={l}><Ring color={l === 'Move' ? brand : l === 'Eat' ? '#22C55E' : '#3B82F6'} size={38} pct={p} /><small>{l}</small></span>
            ))}
          </span>
        </div>
        <div className="ph-chips">
          <span><small>Streak</small><b>🔥 12</b></span>
          <span><small>Weight</small><b>182.4</b></span>
          <span><small>This week</small><b>3/4</b></span>
        </div>
        <div className="ph-card ph-coach">
          <small>Your Coach</small>
          <b>Nice work on Tuesday. Keep the momentum going 🔥</b>
        </div>
      </div>
      <nav className="ph-tabs" aria-hidden="true">
        {TABS.map(([l, i], n) => <span key={l} data-on={n === 0 ? '' : undefined}><Icon name={i} size={14} />{l}</span>)}
      </nav>
    </div>
  )
}
