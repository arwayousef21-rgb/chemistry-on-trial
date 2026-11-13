/**
 * Simple decorative SVG elements (allowed as SVG per D12): sparkles and rays.
 * Purely decorative — hidden from assistive technology.
 */
import { colors } from '@/styles/tokens';

export function Sparkle({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M12 1.5c.6 4.6 2.9 6.9 7.5 7.5v.9c-4.6.6-6.9 2.9-7.5 7.5h-.9C10.5 12.8 8.2 10.5 3.6 9.9V9c4.6-.6 6.9-2.9 7.5-7.5z" fill={colors.status.gold} transform="translate(0 2.5)" />
    </svg>
  );
}

/** Three short gold rays, as either side of the banner target. */
export function Rays({ className }: { className?: string }) {
  return (
    <svg aria-hidden width="44" height="68" viewBox="0 0 44 68" className={className}>
      <g stroke={colors.status.gold} strokeWidth="6" strokeLinecap="round">
        <line x1="10" y1="8" x2="26" y2="20" />
        <line x1="6" y1="34" x2="30" y2="34" />
        <line x1="10" y1="60" x2="26" y2="48" />
      </g>
    </svg>
  );
}
