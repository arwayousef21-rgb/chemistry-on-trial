import type { ReactNode } from 'react';
import type { PathwayId } from '@/styles/tokens';
import { pathwayStyles } from './pathwayStyles';
import { cn } from './cn';

/** "مناسب لك" tab that sits above the recommended pathway card. */
export function RecommendedTab({ pathway, children }: { pathway: PathwayId; children: ReactNode }) {
  return (
    <span
      className={cn(
        'absolute -top-5 end-6 rounded-pill px-5 py-1.5 text-small font-bold text-white shadow-button',
        pathwayStyles[pathway].solid,
      )}
    >
      {children}
    </span>
  );
}

type Tone = 'info' | 'warning' | 'success' | 'danger' | 'neutral';
const toneClass: Record<Tone, string> = {
  info: 'bg-surface-info text-ink',
  warning: 'bg-[#FFF3D6] text-[#7A4B00]',
  success: 'bg-corrective-tint text-corrective-solid',
  danger: 'bg-[#FDE7E9] text-[#9B1C26]',
  neutral: 'bg-surface-tint text-ink',
};

/** Small rounded label. */
export function Badge({ tone = 'neutral', icon, children, className }: { tone?: Tone; icon?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-[13px] font-bold', toneClass[tone], className)}>
      {icon && <span aria-hidden className="flex">{icon}</span>}
      {children}
    </span>
  );
}
