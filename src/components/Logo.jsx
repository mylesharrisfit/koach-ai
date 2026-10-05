import { useState } from 'react'

// variant "dark": dark logo for light backgrounds. variant "white": white logo for dark backgrounds.
// Falls back to a plain wordmark if the PNG is not present in /public.
export default function Logo({ variant = 'dark', className = 'h-7' }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <span className={`text-lg font-semibold tracking-tight ${variant === 'white' ? 'text-white' : 'text-ink'}`}>
        KOACH<span className="text-accent"> AI</span>
      </span>
    )
  }
  return (
    <img
      src={`/koach-logo-${variant}.png`}
      alt="KOACH AI"
      className={`${className} w-auto`}
      onError={() => setFailed(true)}
    />
  )
}
