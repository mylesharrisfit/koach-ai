import { useEffect, useState } from 'react'

// 'loading' | 'ok' | 'missing'
export function useImageStatus(src) {
  const [status, setStatus] = useState('loading')
  useEffect(() => {
    const img = new Image()
    img.onload = () => setStatus('ok')
    img.onerror = () => setStatus('missing')
    img.src = src
  }, [src])
  return status
}

// Product screenshot in a plain frame. Renders nothing if the file is missing.
export default function Screenshot({ src, alt, ratio = '16 / 10', priority = false }) {
  const status = useImageStatus(src)
  if (status === 'missing') return null
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex h-8 items-center gap-1.5 border-b border-neutral-200 bg-white px-3" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-neutral-300" />
        <span className="h-2 w-2 rounded-full bg-neutral-300" />
        <span className="h-2 w-2 rounded-full bg-neutral-300" />
      </div>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="block w-full"
        style={{ aspectRatio: ratio, objectFit: 'cover', objectPosition: 'top' }}
      />
    </div>
  )
}
