const COLORS = {
  good: { stroke: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', label: 'Secure' },
  fair: { stroke: '#06b6d4', bg: 'rgba(6, 182, 212, 0.15)', text: '#22d3ee', label: 'Moderate' },
  poor: { stroke: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', label: 'Weak' },
  bad: { stroke: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)', text: '#f87171', label: 'Critical' },
}

function getScoreConfig(s) {
  if (s >= 80) return COLORS.good
  if (s >= 60) return COLORS.fair
  if (s >= 40) return COLORS.poor
  return COLORS.bad
}

function SeverityBar({ label, count, total, color, darkMode }) {
  const pct = total > 0 ? Math.min(100, Math.round((count / total) * 100)) : 0
  return (
    <div className="flex items-center gap-3 py-1">
      <span className={`text-xs font-medium w-16 truncate ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{label}</span>
      <div className={`flex-1 h-2 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className={`text-xs font-mono font-semibold w-8 text-right ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
        {count}
      </span>
    </div>
  )
}

function ScoreGauge({ score = 0, size = 120, label = '', darkMode, children }) {
  const clamped = Math.max(0, Math.min(100, Math.round(score || 0)))
  const config = getScoreConfig(clamped)

  // Scale stroke width proportionally to gauge size
  const strokeWidth = size <= 64 ? 5 : size <= 90 ? 7 : size <= 120 ? 9 : 12
  const radius = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference

  // Typography scale according to size
  const numberClass =
    size <= 64
      ? 'text-base font-bold'
      : size <= 90
      ? 'text-xl font-bold'
      : size <= 120
      ? 'text-3xl font-extrabold'
      : 'text-5xl font-extrabold'

  const labelClass =
    size <= 64
      ? 'hidden'
      : size <= 90
      ? 'text-[9px] font-semibold tracking-wider uppercase'
      : 'text-[11px] font-semibold tracking-wider uppercase'

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={darkMode ? '#1e293b' : '#e2e8f0'}
            strokeWidth={strokeWidth}
          />
          {/* Progress fill with animated dashoffset */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={config.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 6px ${config.stroke}50)`,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className={`font-mono tracking-tight ${numberClass}`} style={{ color: config.stroke }}>
            {clamped}
          </span>
          <span className={`mt-0.5 ${labelClass}`} style={{ color: config.text }}>
            {config.label}
          </span>
        </div>
      </div>

      {/* External label only if explicitly provided */}
      {label ? (
        <span className={`text-xs font-medium tracking-tight mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {label}
        </span>
      ) : null}

      {children}
    </div>
  )
}

export { SeverityBar }
export default ScoreGauge
