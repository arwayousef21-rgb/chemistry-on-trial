import { MessageCircle } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { IllustrationSlot } from '@/components/ui';
import { useEqui } from './EquiLauncherProvider';

/**
 * Bottom strip from the reference: the robot mascot pointing at a speech
 * bubble, and the "Ask the assistant" button.
 */
export function EquiStrip() {
  const { t } = useI18n();
  const { open } = useEqui();
  return (
    <section aria-label={t.equi.fullName} className="relative mt-8 flex flex-col items-stretch gap-4 rounded-card bg-gradient-to-l from-surface-tint to-transparent md:flex-row md:items-center md:gap-6 md:ps-2">
      <button
        type="button"
        onClick={open}
        className="order-3 inline-flex min-h-[60px] items-center justify-center gap-3 self-center rounded-pill bg-assistant-cta px-7 text-[19px] font-bold text-white shadow-raised transition hover:-translate-y-0.5 md:order-1 md:self-auto"
      >
        <MessageCircle aria-hidden className="h-8 w-8 fill-white text-assistant-cta" />
        {t.equi.cta}
      </button>
      <div className="relative order-2 flex-1 rounded-card border-2 border-border-soft bg-[#EEEEFC] px-6 py-4 text-center shadow-card">
        <p className="text-[19px] font-semibold text-ink-body">{t.equi.bubbleTitle}</p>
        <p className="text-[18px] text-ink-body">{t.equi.bubbleBody}</p>
        {/* bubble tail pointing at the robot */}
        <span aria-hidden className="absolute -end-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 rotate-45 border-e-2 border-t-2 border-border-soft bg-[#EEEEFC] md:block" />
      </div>
      <IllustrationSlot id="equi-pointing" alt={t.equi.name} className="order-1 h-[150px] w-[150px] shrink-0 self-center md:order-3 md:h-[170px] md:w-[170px]" />
    </section>
  );
}
