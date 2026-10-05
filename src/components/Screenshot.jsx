import { useState } from 'react'

// Product screenshot in a plain frame. Drop the PNG into /public/screenshots.
// While the file is missing, a neutral placeholder holds the space.
export default function Screenshot({ src, alt, ratio = '16 / 10', priority = false }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex h-8 items-center gap-1.5 border-b border-neutral-200 bg-white px-3" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-neutral-300" />
        <span className="h-2 w-2 rounded-full bg-neutral-300" />
        <span className="h-2 w-2 rounded-full bg-neutral-300" />
      </div>
      {failed ? (
        <div
          className="flex w-full items-center justify-center px-4 text-center text-xs text-neutral-400"
          style={{ aspectRatio: ratio }}
        >
          Screenshot: {src}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="block w-full"
          style={{ aspectRatio: ratio, objectFit: 'cover', objectPosition: 'top' }}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
