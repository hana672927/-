interface PerfumeBottleProps {
  className?: string;
  liquidColor?: string;
  capColor?: string;
  label?: string;
}

/** Elegant SVG perfume bottle used as a visual placeholder / floating hero element. */
export function PerfumeBottle({
  className = '',
  liquidColor = '#0A3225',
  capColor = '#D4AF37',
  label = 'V',
}: PerfumeBottleProps) {
  return (
    <svg viewBox="0 0 200 320" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bottleGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0A3225" stopOpacity="0.85" />
          <stop offset="50%" stopColor={liquidColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#041A13" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="capGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E6CA85" />
          <stop offset="50%" stopColor={capColor} />
          <stop offset="100%" stopColor="#9A7A33" />
        </linearGradient>
        <linearGradient id="highlight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* cap */}
      <rect x="82" y="8" width="36" height="30" rx="4" fill="url(#capGrad)" />
      <rect x="78" y="36" width="44" height="14" rx="3" fill="url(#capGrad)" />
      {/* neck */}
      <rect x="88" y="50" width="24" height="18" fill="url(#bottleGlass)" stroke="#D4AF37" strokeOpacity="0.3" strokeWidth="1" />
      {/* body */}
      <path
        d="M50 78 Q50 68 60 68 L140 68 Q150 68 150 78 L150 290 Q150 308 132 308 L68 308 Q50 308 50 290 Z"
        fill="url(#bottleGlass)"
        stroke="#D4AF37"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      {/* glass highlight */}
      <path d="M62 80 L62 290 Q62 296 68 296 L74 296 L74 80 Z" fill="url(#highlight)" opacity="0.6" />
      {/* label */}
      <rect x="70" y="150" width="60" height="80" rx="3" fill="#F8F5EE" fillOpacity="0.08" stroke="#D4AF37" strokeOpacity="0.4" strokeWidth="1" />
      <text x="100" y="195" fontFamily="Cormorant Garamond, serif" fontSize="28" fill="#E6CA85" textAnchor="middle" fontWeight="600">{label}</text>
      <text x="100" y="215" fontFamily="Jost, sans-serif" fontSize="6" fill="#E6CA85" fillOpacity="0.6" textAnchor="middle" letterSpacing="2">MAISON</text>
    </svg>
  );
}
