// The supplied KOACH.AI logo (white wordmark with red AI), for use on graphite.
export default function Logo({ className = 'h-8' }) {
  return <img src="/koach-logo.webp" alt="KOACH.AI" width="720" height="237" className={`${className} w-auto`} />
}
