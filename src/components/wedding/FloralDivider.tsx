interface FloralDividerProps {
  className?: string;
  lineWidth?: string;
}

const c = "hsl(65, 20%, 50%)";

const FloralDivider = ({ className = "", lineWidth = "80px" }: FloralDividerProps) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <div className="h-px flex-shrink-0" style={{ width: lineWidth, background: c, opacity: 0.45 }} />
    <svg width="56" height="14" viewBox="0 0 56 14" fill="none" aria-hidden="true">
      {/* Left leaf */}
      <path
        d="M2,7 Q8,1.5 14,7 Q8,12.5 2,7 Z"
        stroke={c} strokeWidth="0.7" fill="none" opacity="0.65"
      />
      {/* Left dot */}
      <circle cx="17.5" cy="7" r="1.1" fill={c} opacity="0.6" />
      {/* Center diamond */}
      <path
        d="M22,7 L28,2 L34,7 L28,12 Z"
        stroke={c} strokeWidth="0.9" fill="none" opacity="0.8"
      />
      <circle cx="28" cy="7" r="1.4" fill={c} opacity="0.7" />
      {/* Right dot */}
      <circle cx="38.5" cy="7" r="1.1" fill={c} opacity="0.6" />
      {/* Right leaf */}
      <path
        d="M54,7 Q48,1.5 42,7 Q48,12.5 54,7 Z"
        stroke={c} strokeWidth="0.7" fill="none" opacity="0.65"
      />
    </svg>
    <div className="h-px flex-shrink-0" style={{ width: lineWidth, background: c, opacity: 0.45 }} />
  </div>
);

export default FloralDivider;
