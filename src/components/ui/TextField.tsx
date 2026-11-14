import { useId, type InputHTMLAttributes } from 'react';
import { cn } from './cn';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  hint?: string;
  error?: string;
  /** Email and phone numbers are always typed left-to-right, even in Arabic. */
  ltr?: boolean;
}

/** Labelled text input in the approved visual language (rounded, soft border, visible focus). */
export function TextField({ label, hint, error, ltr, className, ...rest }: TextFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={id} className="block text-[16px] font-bold text-ink">
        {label}
      </label>
      <input
        id={id}
        dir={ltr ? 'ltr' : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined}
        className={cn(
          'min-h-[52px] w-full rounded-strip border-2 bg-surface px-4 text-[17px] text-ink-body shadow-sm transition placeholder:text-ink-muted/60',
          ltr && 'text-left [unicode-bidi:plaintext] rtl:text-right',
          error ? 'border-status-danger' : 'border-border-soft focus:border-remedial-solid',
        )}
        {...rest}
      />
      {hint && !error && (
        <p id={hintId} className="text-[13px] text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-[14px] font-semibold text-[#B3261E]">
          {error}
        </p>
      )}
    </div>
  );
}
