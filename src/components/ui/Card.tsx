import type { HTMLAttributes } from 'react';
import { cn } from './cn';

type Tone = 'neutral' | 'info' | 'banner';

const toneClass: Record<Tone, string> = {
  neutral: 'bg-surface border-border-soft',
  info: 'bg-surface-info border-border-soft',
  banner: 'bg-banner-gradient border-border-soft',
};

/** Rounded surface with the reference's soft border and shadow. */
export function Card({ tone = 'neutral', className, ...rest }: HTMLAttributes<HTMLElement> & { tone?: Tone }) {
  return <section className={cn('rounded-card border shadow-card', toneClass[tone], className)} {...rest} />;
}

/** Smaller-radius panel used in the side column. */
export function Panel({ tone = 'neutral', className, ...rest }: HTMLAttributes<HTMLElement> & { tone?: Tone }) {
  return <section className={cn('rounded-panel border shadow-card', toneClass[tone], className)} {...rest} />;
}
