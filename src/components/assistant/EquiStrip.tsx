import { MessageCircle } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { IllustrationSlot } from '@/components/ui';
import { useEqui } from './EquiLauncherProvider';

/**
 * Bottom strip from the reference: the "Ask EQUI" button, the speech bubble and
 * the robot mascot. On desktop the robot rises above the strip's top edge, as
 * in the reference, keeping the strip itself compact.
 */
export function EquiStrip() {
  const { t } = useI18n();
  const { open } = useEqui();
  return (
    <section
      aria-label={t.equi.fullName}
      className="relative flex flex-col items-stretch gap-4 rounded-card bg-surface-tint/70 p-4 md:!mt-8 md:flex-row md:items-center md:gap-6 md:py-3 md:pe-[180px] md:ps-4"
    >
      <button
        type="button"
        onClick={open}
        className="order-3 inline-flex min-h-[58px] shrink-0 items-center justify-center gap-3 self-center rounded-pill bg-assistant-cta px-7 text-[19px] font-bold text-white shadow-raised transition hover:-translate-y-0.5 md:order-1"
      >
        <MessageCircle aria-hidden className="h-8 w-8 fill-white text-assistant-cta" />
        {t.equi.cta}
      </button>
      <div className="relative order-2 flex-1 rounded-card border-2 border-border-soft bg-[#EEEEFC] px-6 py-3 text-center shadow-card">
        <p className="text-[18px] font-semibold text-ink-body">{t.equi.bubbleTitle}</p>
        <p className="text-[17px] text-ink-body">{t.equi.bubbleBody}</p>
        <span aria-hidden className="absolute -end-[11px] top-1/2 hidden h-5 w-5 -translate-y-1/2 rotate-45 border-e-2 border-t-2 border-border-soft bg-[#EEEEFC] md:block rtl:-rotate-45" />
      </div>
      <IllustrationSlot
        asset="equi-robot"
        mirrorInLtr
        className="order-1 w-[140px] self-center md:absolute md:-bottom-2 md:end-3 md:order-3 md:w-[158px]"
      />
    </section>
  );
}
