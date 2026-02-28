import { getScoreColor, getScoreLabel } from '../lib/scores';

interface Props {
  score: number;
  size?: number;
  showLabel?: boolean;
}

export function ScoreRing({ score, size = 52, showLabel = false }: Props) {
  const { hex } = getScoreColor(score);
  const strokeWidth = 3.5;
  const r = (size / 2) - strokeWidth - 1;
  const circumference = 2 * Math.PI * r;
  const filled = (score / 10) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Track */}
        <svg
          width={size}
          height={size}
          className="-rotate-90 absolute inset-0"
          style={{ overflow: 'visible' }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#27272a"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={hex}
            strokeWidth={strokeWidth}
            strokeDasharray={`${filled} ${circumference}`}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 4px ${hex}66)` }}
          />
        </svg>
        {/* Number */}
        <span
          className="relative z-10 font-bold tabular-nums leading-none"
          style={{
            color: hex,
            fontSize: size < 40 ? '11px' : size < 56 ? '14px' : '18px',
          }}
        >
          {score}
        </span>
      </div>
      {showLabel && (
        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: hex }}>
          {getScoreLabel(score)}
        </span>
      )}
    </div>
  );
}
