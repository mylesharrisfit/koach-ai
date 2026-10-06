import Piece from './Pieces'
import { Reveal, ZoomIn } from './fx'
import { photoUrl } from '../lib/photos'

// Editorial photography break between product sections: two photos, one line of copy, product
// pieces floating over the images. Renders nothing until both photos exist (see lib/photos.js).
export default function PhotoBand() {
  const a = photoUrl('band-1')
  const b = photoUrl('band-2')
  if (!a || !b) return null
  return (
    <section aria-label="Training, logged" className="cv bg-white pb-16 sm:pb-24">
      <div className="wrap grid gap-5 md:grid-cols-[7fr_5fr]">
        <ZoomIn kind="card" className="pb-photo pb-tall">
          <img src={a} alt="A runner mid-stride on a city street" loading="lazy" decoding="async" style={{ objectPosition: '50% 45%' }} />
          <Reveal className="pb-copy">
            <p className="eyebrow !bg-white !text-ink">Every session counts</p>
            <h2 className="h-mega mt-4 text-[2.2rem] !text-white sm:text-[3.2rem]">Training happens out there. KOACH keeps up.</h2>
          </Reveal>
        </ZoomIn>
        <ZoomIn kind="card" className="pb-photo">
          <img src={b} alt="" loading="lazy" decoding="async" />
          <div className="pb-pieces" aria-hidden="true">
            <div className="fl-bob"><Piece k="message" /></div>
            <div className="fl-bob" style={{ animationDelay: '-1.4s' }}><Piece k="rest" /></div>
          </div>
        </ZoomIn>
      </div>
    </section>
  )
}
