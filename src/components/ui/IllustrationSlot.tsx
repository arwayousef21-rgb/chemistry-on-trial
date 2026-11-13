import { Box } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { ASSETS, assetUrl, type AssetId } from '@/assets/illustrations';
import { cn } from './cn';

/**
 * Fixed-proportion slot for one of the six priority 3D assets.
 *
 * - When the asset is marked available in `src/assets/illustrations.ts`, it
 *   renders the real artwork (WebP 1×/2× with PNG fallback).
 * - Until then it shows a clearly labelled placeholder of exactly the same
 *   size and aspect ratio — never a flat drawing standing in for the artwork.
 *
 * Size the slot with a width class; the height follows the asset's aspect ratio.
 */
export function IllustrationSlot({
  asset,
  className,
  compact = false,
  decorative = false,
  mirrorInLtr = false,
}: {
  asset: AssetId;
  className?: string;
  /** Icon-only placeholder for small slots (avatars). */
  compact?: boolean;
  /** Purely decorative assets are hidden from screen readers. */
  decorative?: boolean;
  /** Flip the artwork horizontally in the English (LTR) layout, e.g. EQUI pointing toward the bubble. */
  mirrorInLtr?: boolean;
}) {
  const { t, lang } = useI18n();
  const spec = ASSETS[asset];
  const alt = spec.alt[lang];
  const style = { aspectRatio: spec.aspect };

  if (spec.available) {
    return (
      <picture className={cn('block', mirrorInLtr && 'ltr:-scale-x-100', className)} style={style}>
        <source type="image/webp" srcSet={`${assetUrl(spec, '1x')} 1x, ${assetUrl(spec, '2x')} 2x`} />
        <img
          src={assetUrl(spec, 'png')}
          alt={decorative ? '' : alt}
          width={spec.display.width}
          height={spec.display.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </picture>
    );
  }

  return (
    <div
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : `${alt} — ${t.illustration.pending}`}
      data-asset={asset}
      style={style}
      className={cn(
        'flex flex-col items-center justify-center gap-1 overflow-hidden rounded-panel border-2 border-dashed border-[#B9C6E4] bg-white/60 text-center text-[#5B6A90]',
        className,
      )}
    >
      <Box aria-hidden className={compact ? 'h-5 w-5' : 'h-7 w-7'} strokeWidth={1.5} />
      {!compact && (
        <>
          <span className="px-2 text-[12px] font-semibold leading-tight">{alt}</span>
          <span className="px-2 text-[11px] leading-tight opacity-80">{t.illustration.pending}</span>
        </>
      )}
    </div>
  );
}
