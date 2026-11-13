import { useId } from 'react';
import { colors } from '@/styles/tokens';

/**
 * Circular score ring. Ring colour #049870 (accessibility-adjusted) with the
 * reference's brighter #04AC7C as a highlight along the arc.
 */
export function ProgressRing({ value, size = 168, label }: { value: number; size?: number; label: string }) {
  const gradientId = `ring-${useId().replace(/:/g, '')}`;
  const stroke = size * 0.1;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, value));
  const offset = c * (1 - clamped / 100);
  return (
    <div className="relative" style={{ width: size, height: size }} role="img" aria-label={label}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={colors.status.ring} />
            <stop offset="100%" stopColor={colors.status.ringHighlight} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={colors.status.track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <span className="equation absolute inset-0 flex items-center justify-center text-score text-ink" aria-hidden>
        {clamped}%
      </span>
    </div>
  );
}
