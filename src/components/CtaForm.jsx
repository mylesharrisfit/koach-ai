import { SIGNUP_URL } from '../lib/config'

// Plain GET form: the email goes to the app's signup page as ?email=. Nothing is stored here.
export default function CtaForm({ id, note = true, className = '', style, btn = 'btn-brand', light = false }) {
  const submit = (e) => {
    const v = e.currentTarget.elements.email.value.trim()
    if (!v) {
      e.preventDefault()
      window.location.href = SIGNUP_URL
    }
  }
  return (
    <div className={className} style={style}>
      <form action={SIGNUP_URL} method="get" onSubmit={submit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
        <label htmlFor={id} className="sr-only">Your email</label>
        <input
          id={id}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Your email"
          className={`h-12 w-full min-w-0 rounded-full border bg-white px-5 text-[15px] text-ink placeholder:text-mut sm:flex-1 ${light ? 'border-line focus:border-ink' : 'border-white/20'}`}
        />
        <button type="submit" className={`btn !h-12 ${btn}`}>Start free trial</button>
      </form>
      {note && <p className={`cta-note mt-3 text-sm ${light ? 'text-mut' : 'text-[#b9bfca]'}`}>30 days free · cancel anytime</p>}
    </div>
  )
}
