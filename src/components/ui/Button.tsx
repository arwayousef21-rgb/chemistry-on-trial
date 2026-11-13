import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { PathwayId } from '@/styles/tokens';
import { pathwayStyles } from './pathwayStyles';
import { cn } from './cn';

type Variant = PathwayId | 'assistant' | 'navy' | 'outline';

const variantClass: Record<Variant, string> = {
  remedial: pathwayStyles.remedial.button,
  corrective: pathwayStyles.corrective.button,
  enrichment: pathwayStyles.enrichment.button,
  assistant: 'bg-assistant-cta hover:bg-remedial-solid',
  navy: 'bg-navy-900 hover:bg-navy-700',
  outline: 'bg-surface !text-ink border-2 border-border-soft hover:bg-surface-tint shadow-none',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
  size?: 'md' | 'lg';
  fullWidth?: boolean;
}

/** Fully rounded, solid-colour button with a leading icon (as in the reference). */
export function Button({ variant = 'navy', icon, size = 'lg', fullWidth, className, children, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-3 rounded-pill font-bold text-white shadow-button transition',
        'hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0',
        size === 'lg' ? 'min-h-[54px] px-6 py-2 text-[18px] leading-tight [text-wrap:balance]' : 'min-h-[44px] px-5 text-small',
        fullWidth && 'w-full',
        variantClass[variant],
        className,
      )}
      {...rest}
    >
      {icon && <span aria-hidden className="flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
