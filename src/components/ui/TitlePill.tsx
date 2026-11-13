import type { ReactNode } from 'react';
import type { PathwayId } from '@/styles/tokens';
import { pathwayStyles } from './pathwayStyles';
import { cn } from './cn';

/** Solid rounded heading pill at the top of each pathway card. */
export function TitlePill({ pathway, icon, children, as: Tag = 'h2' }: { pathway: PathwayId; icon?: ReactNode; children: ReactNode; as?: 'h2' | 'h3' }) {
  return (
    <Tag
      className={cn(
        'flex min-h-[60px] items-center justify-center gap-3 rounded-pill px-5 py-2 text-center text-[21px] font-bold leading-tight text-white shadow-button xl:text-[23px]',
        pathwayStyles[pathway].solid,
      )}
    >
      {icon && <span aria-hidden className="flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </Tag>
  );
}
