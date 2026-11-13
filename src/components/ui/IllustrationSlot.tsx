import { Box } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { cn } from './cn';

export type IllustrationId =
  | 'pathway-books'
  | 'pathway-target'
  | 'pathway-rocket'
  | 'banner-target'
  | 'equi-pointing'
  | 'chemistry-flasks';

/**
 * Reserved space for a 3D illustration. Until the approved 3D assets exist,
 * this shows a clearly labelled placeholder — never a flat drawing standing in
 * for the final artwork (ARCHITECTURE_DECISIONS D12). When an asset file is
 * added to `public/assets/illustrations/`, pass its `src` to show it.
 */
export function IllustrationSlot({
  id,
  alt,
  src,
  className,
  compact = false,
}: {
  id: IllustrationId;
  alt: string;
  src?: string;
  className?: string;
  compact?: boolean;
}) {
  const { t } = useI18n();
  if (src) return <img src={src} alt={alt} className={cn('object-contain', className)} loading="lazy" />;
  return (
    <div
      role="img"
      aria-label={`${alt} — ${t.illustration.pending}`}
      data-illustration={id}
      className={cn(
        'flex flex-col items-center justify-center gap-1 rounded-panel border-2 border-dashed border-[#B9C6E4] bg-white/60 text-center text-[#5B6A90]',
        className,
      )}
    >
      <Box aria-hidden className={compact ? 'h-6 w-6' : 'h-8 w-8'} strokeWidth={1.5} />
      {/* Compact slots (avatars, banner) show only the icon; the label stays available to screen readers. */}
      {!compact && <span className="px-2 text-[12px] font-semibold leading-tight">{alt}</span>}
      {!compact && <span className="px-2 text-[11px] leading-tight opacity-80">{t.illustration.pending}</span>}
    </div>
  );
}
