// The KOACH.AI logo: white wordmark with blue AI for dark backgrounds, ink wordmark for light ones.
export default function Logo({ className = 'h-8', dark = false }) {
  return <img src={dark ? '/koach-logo-dark.webp' : '/koach-logo.webp'} alt="KOACH.AI" width="720" height="237" className={`${className} w-auto`} />
}
