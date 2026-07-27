// Brand mark — gradient "K" in a rounded matte-black tile.
export function Logo({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="koachLogo" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#0A0A0A" />
      <rect width="64" height="64" rx="16" fill="url(#koachLogo)" opacity="0.14" />
      <path d="M20 16h7v14.5L39.4 16H48L34 33l14 15h-9L27 34.5V48h-7z" fill="url(#koachLogo)" />
    </svg>
  )
}
