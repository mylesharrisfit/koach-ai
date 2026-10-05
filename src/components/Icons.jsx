import { drawable } from './fx'

// One icon set: 24px grid, 1.5px stroke, round joins.
const P = {
  clipboard: <><rect x="5" y="4.5" width="14" height="16" rx="2.5" /><path d="M9 4.5h6V7H9zM8.5 12h7M8.5 16h4.5" /></>,
  spark: <path d="M12 3.5l1.9 5.4 5.4 1.9-5.4 1.9L12 18.1l-1.9-5.4-5.4-1.9 5.4-1.9L12 3.5zM19 16.5l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6.6-1.8z" />,
  layers: <path d="M12 4l8 4.2-8 4.2-8-4.2L12 4zM4 12.2l8 4.2 8-4.2M4 16.4l8 4.2 8-4.2" />,
  users: <><circle cx="9" cy="8.5" r="3" /><path d="M3.5 19c.5-3 2.6-4.5 5.5-4.5s5 1.5 5.5 4.5M15.5 5.8a3 3 0 010 5.4M17 14.8c1.9.5 3 2 3.5 4.2" /></>,
  bot: <><rect x="4" y="8.5" width="16" height="11" rx="3" /><path d="M12 8.5V5M9 13.5v1M15 13.5v1" /><circle cx="12" cy="4" r="1" /></>,
  leaf: <path d="M5 19c0-8 4-13 14-14 0 9-4.5 14-12 14M5 19c2.5-4 5-6.5 8.5-8.5" />,
  camera: <><path d="M4 8.5h3l1.5-2.5h7L17 8.5h3V19H4z" /><circle cx="12" cy="13.4" r="3.1" /></>,
  grid: <><rect x="4" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" /></>,
  chart: <path d="M4 20V4M4 20h16M8 16v-4M12.5 16V8M17 16v-6" />,
  phone: <><rect x="7" y="3" width="10" height="18" rx="2.5" /><path d="M11 17.5h2" /></>,
  timer: <><circle cx="12" cy="13.5" r="6.8" /><path d="M12 10v3.7l2.4 1.4M9.5 3.5h5" /></>,
  trophy: <path d="M8 4h8v5a4 4 0 01-8 0V4zM8 6H5.5a2.5 2.5 0 002.8 3.6M16 6h2.5a2.5 2.5 0 01-2.8 3.6M12 13v4M8.5 20h7M10 17h4" />,
  message: <path d="M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v7a2.5 2.5 0 01-2.5 2.5H11l-4 3.5V16h-.5A2.5 2.5 0 014 13.5v-7z" />,
  card: <><rect x="3.5" y="6" width="17" height="12" rx="2.5" /><path d="M3.5 10.5h17M7 15h3" /></>,
  calendar: <><rect x="4" y="5.5" width="16" height="14.5" rx="2.5" /><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" /></>,
  seat: <><circle cx="10" cy="8.5" r="3.2" /><path d="M4 19.5c.5-3.2 2.7-5 6-5M17 13v6M14 16h6" /></>,
  code: <path d="M9 8l-4.5 4L9 16M15 8l4.5 4-4.5 4M13.5 5l-3 14" />,
  tag: <><path d="M4 12.5V5h7.5l8.5 8.5-7.5 7.5L4 12.5z" /><circle cx="8.5" cy="9.5" r="1" /></>,
  record: <><rect x="5" y="3.5" width="14" height="17" rx="2.5" /><circle cx="12" cy="10" r="2.4" /><path d="M7.5 17c.7-2 2.3-3 4.5-3s3.8 1 4.5 3" /></>,
  swap: <path d="M5 8h13l-3-3M19 16H6l3 3" />,
  list: <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />,
  arrow: <path d="M5 12h14M13.5 6.5L19 12l-5.5 5.5" />,
  chevron: <path d="M6.5 9.5l5.5 5.5 5.5-5.5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  instagram: <><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><path d="M16.8 7.2h.01" /></>,
  shield: <path d="M12 3.5l7 2.5v5.5c0 4.2-2.8 7.3-7 9-4.2-1.7-7-4.8-7-9V6l7-2.5zM9 12l2.2 2.2L15.5 10" />,
  truck: <path d="M3.5 7h11v9h-11zM14.5 10h3.5l2.5 3v3h-6M7 18.5a1.6 1.6 0 100-.01M17 18.5a1.6 1.6 0 100-.01" />,
  play: <path d="M8 5.5v13a.8.8 0 0 0 1.2.7l10.3-6.5a.8.8 0 0 0 0-1.4L9.2 4.8A.8.8 0 0 0 8 5.5Z" />,
  pause: <path d="M8.5 5.5v13M15.5 5.5v13" />,
  coins: <><ellipse cx="12" cy="7" rx="7" ry="3" /><path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" /></>,
}

export default function Icon({ name, size = 20, className = '', draw = false, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
      className={`${draw ? 'ico-draw ' : ''}${className}`}
    >
      {draw ? drawable(P[name]) : P[name]}
    </svg>
  )
}
