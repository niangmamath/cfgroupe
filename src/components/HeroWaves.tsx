export default function HeroWaves() {
  return (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <filter id="wave-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <linearGradient id="wave-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--blue-600)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--blue-600)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--blue-600)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="wave-fade-2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--cream)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--cream)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--cream)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g filter="url(#wave-soft)">
        <path
          d="M -100 180 C 250 60, 500 300, 850 160 C 1050 90, 1200 140, 1350 90"
          fill="none"
          stroke="url(#wave-fade)"
          strokeWidth="70"
        />
        <path
          d="M -100 420 C 200 520, 480 260, 780 400 C 980 490, 1150 380, 1350 430"
          fill="none"
          stroke="url(#wave-fade-2)"
          strokeWidth="90"
        />
        <path
          d="M -100 560 C 300 640, 600 460, 900 580 C 1080 650, 1200 590, 1350 610"
          fill="none"
          stroke="url(#wave-fade)"
          strokeWidth="55"
        />
      </g>
    </svg>
  );
}
