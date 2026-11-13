import type { ReactNode } from 'react';
import type { PathwayId } from '@/styles/tokens';
import { pathwayStyles } from './pathwayStyles';
import { cn } from './cn';

/** Tinted header strip, e.g. "ماذا ستجد هنا؟". */
export function SectionStrip({ pathway, children }: { pathway?: PathwayId; children: ReactNode }) {
  return (
    <h3 className={cn('rounded-strip px-4 py-1.5 text-center text-h3 text-ink', pathway ? pathwayStyles[pathway].strip : 'bg-surface-info')}>
      {children}
    </h3>
  );
}
