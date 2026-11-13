import { MessageCircle } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';

/** Persistent floating "Ask EQUI" button for screens without the EQUI strip. */
export function EquiFloatingButton({ onClick }: { onClick: () => void }) {
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-5 end-5 z-40 inline-flex min-h-[56px] items-center gap-3 rounded-pill bg-assistant-cta px-6 text-[18px] font-bold text-white shadow-raised transition hover:-translate-y-0.5"
    >
      <MessageCircle aria-hidden className="h-7 w-7 fill-white text-assistant-cta" />
      {t.equi.cta}
    </button>
  );
}
