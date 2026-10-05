import { useEffect } from 'react'
import { LOGIN_URL } from '../lib/config'

export default function Login() {
  useEffect(() => {
    window.location.replace(LOGIN_URL)
  }, [])
  return (
    <section className="wrap py-24">
      <p className="text-neutral-600">
        Redirecting to the login page. If nothing happens,{' '}
        <a className="text-ink underline" href={LOGIN_URL}>continue to log in</a>.
      </p>
    </section>
  )
}
