// Mock-UI building blocks shared by the animated demos. Sample data is fictional.
export const Check = ({ s = 12 }) => (
  <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8.5l3.2 3.2L13 4.5" />
  </svg>
)

export function Browser({ url = 'app.koachai.net', className = '', children, ...rest }) {
  return (
    <div className={`kd-browser ${className}`} {...rest}>
      <div className="kd-bar">
        <i className="kd-dot" />
        <i className="kd-dot" />
        <i className="kd-dot" />
        <span className="kd-url">{url}</span>
      </div>
      <div className="kd-body">{children}</div>
    </div>
  )
}

export function Phone({ className = '', children, ...rest }) {
  return (
    <div className={`kd-phone ${className}`} {...rest}>
      <div className="kd-screen">
        <i className="kd-notch" />
        {children}
      </div>
    </div>
  )
}

export const Av = ({ t, tone = 0 }) => <span className={`kd-av kd-av${tone}`}>{t}</span>

// status: stacked layers so a cell can crossfade (striped red = missed, amber, green)
export const Cell = ({ k, kind = 'red', className = '' }) => (
  <span className={`kd-cell kd-cell-${kind} ${className}`} data-k={k} />
)

export const Cursor = () => (
  <div className="kd-cursor" data-k="cursor">
    <span className="kd-ripple" data-k="ripple" />
    <svg width="18" height="22" viewBox="0 0 18 22" aria-hidden="true">
      <path d="M2 1.5v15l4-3.7 2.8 6.2 2.6-1.1-2.8-6.1H14L2 1.5Z" fill="#16181D" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  </div>
)

// Progress ring built from two clipped half-rings that rotate, so the fill animates with transform only.
export const Ring = ({ k, color, size = 84, children }) => (
  <div className="kd-ring" style={{ '--c': color, '--s': `${size}px` }}>
    <i className="kd-ring-track" />
    <i className="kd-ring-clip kd-ring-r">
      <i className="kd-ring-band kd-ring-bl" data-k={`${k}-a`} />
    </i>
    <i className="kd-ring-clip kd-ring-l">
      <i className="kd-ring-band kd-ring-br" data-k={`${k}-b`} />
    </i>
    <span className="kd-ring-in">{children}</span>
  </div>
)

export const Spark = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
    <path d="M8 1.5l1.5 4.2 4.2 1.5-4.2 1.5L8 12.9l-1.5-4.2L2.3 7.2l4.2-1.5L8 1.5Z" />
  </svg>
)
