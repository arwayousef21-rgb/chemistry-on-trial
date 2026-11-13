import { useEffect, useRef } from 'react';
import { Info, Send, X } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { IllustrationSlot } from '@/components/ui';

/**
 * EQUI chat panel shell — side panel on desktop, bottom sheet on phones.
 * Interface only in Stage 2: shows an honest "not connected" notice; the
 * starter prompts and input are visibly disabled.
 */
export function EquiPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-start bg-navy-900/30 md:items-stretch" onClick={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="equi-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-card bg-surface shadow-raised md:m-4 md:max-h-none md:w-[420px] md:rounded-card"
      >
        <header className="flex items-center gap-3 bg-navy-900 px-5 py-4 text-white">
          <IllustrationSlot id="equi-pointing" alt="EQUI" compact className="h-12 w-12 shrink-0 !rounded-pill border-white/40 bg-white/10 !text-white" />
          <h2 id="equi-title" className="flex-1 text-h3">{t.equi.panelTitle}</h2>
          <button ref={closeRef} type="button" onClick={onClose} aria-label={t.equi.close} className="rounded-pill p-2 hover:bg-white/10">
            <X aria-hidden className="h-6 w-6" />
          </button>
        </header>
        <div className="flex-1 space-y-4 overflow-y-auto bg-surface-tint/50 p-5">
          <p className="flex items-start gap-2 rounded-panel bg-[#FFF3D6] p-3 text-[14px] font-semibold text-[#7A4B00]">
            <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
            {t.equi.notConnected}
          </p>
          <div className="max-w-[85%] rounded-panel rounded-ss-sm bg-surface p-4 text-small shadow-card">{t.equi.welcome}</div>
          <ul className="flex flex-wrap gap-2">
            {t.equi.starters.map((s) => (
              <li key={s}>
                <button type="button" disabled className="rounded-pill border border-border-soft bg-surface px-4 py-2 text-[14px] font-semibold text-ink opacity-60">
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <form className="flex items-center gap-2 border-t border-border-soft p-3" onSubmit={(e) => e.preventDefault()}>
          <label className="sr-only" htmlFor="equi-input">{t.equi.inputPlaceholder}</label>
          <input id="equi-input" disabled placeholder={t.equi.inputPlaceholder} className="min-h-[48px] flex-1 rounded-pill border border-border-soft bg-surface-tint px-4 text-small" />
          <button type="submit" disabled aria-label={t.equi.cta} className="flex h-12 w-12 items-center justify-center rounded-pill bg-assistant-cta text-white opacity-50">
            <Send aria-hidden className="h-5 w-5 rtl:-scale-x-100" />
          </button>
        </form>
      </aside>
    </div>
  );
}
