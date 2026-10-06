import { photoUrl } from '../lib/photos'

// Photo layer for a blue stage: sits behind the stage's content with a blue tint so floating
// product pieces stay readable. Renders nothing until a photo exists for the slot (see lib/photos.js).
export default function StagePhoto({ slot, position = '50% 30%' }) {
  const src = photoUrl(slot)
  if (!src) return null
  return (
    <span className="stage-photo" aria-hidden="true">
      <img src={src} alt="" loading="lazy" decoding="async" style={{ objectPosition: position }} />
    </span>
  )
}
