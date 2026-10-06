import { SUPPORT_EMAIL } from '../lib/config'

export default function About() {
  return (
    <section className="wrap py-16 sm:py-24">
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl">About KOACH</h1>
        <p className="lede mt-6">
          KOACH AI is the coaching OS for online coaches: programs, nutrition, check-ins, client app and billing in one place, with AI in every plan.
          It’s built and run from Melbourne, Florida by people who coach clients online every day, so every feature has to save a coach real time.
        </p>
        <p className="lede mt-4">
          Questions? <a className="font-semibold text-ink underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </div>
    </section>
  )
}
