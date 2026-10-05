import { SUPPORT_EMAIL } from '../lib/config'

export default function About() {
  return (
    <section className="wrap py-16 sm:py-24">
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl">About KOACH</h1>
        <p className="lede mt-6">
          KOACH is the all-in-one coaching OS for online coaches: programs, nutrition, check-ins, a client app and payments in one place,
          with AI that drafts and the coach reviews before anything reaches a client.
        </p>
        <p className="lede mt-4">
          Questions? Write to <a className="font-semibold text-ink underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </div>
    </section>
  )
}
