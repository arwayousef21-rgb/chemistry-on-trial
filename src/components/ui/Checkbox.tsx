import { useId, type ReactNode } from 'react';

/** Large, accessible checkbox with a wrapping label. */
export function Checkbox({ checked, onChange, children, error }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode; error?: string }) {
  const id = useId();
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[15px] leading-[1.7] text-ink-body">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[#1866B4]"
        />
        <span>{children}</span>
      </label>
      {error && (
        <p role="alert" className="text-[14px] font-semibold text-[#B3261E]">
          {error}
        </p>
      )}
    </div>
  );
}
