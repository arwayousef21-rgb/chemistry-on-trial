import { Card, IllustrationSlot, Rays } from '@/components/ui';
import { BANNER_ASSET } from '@/assets/illustrations';

/** Wide gradient banner: target illustration flanked by gold rays, then title and subtitle. */
export function HeroBanner({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Card tone="banner" className="relative flex flex-col items-center gap-3 overflow-hidden px-6 py-5 text-center md:flex-row md:justify-center md:gap-6 md:px-10">
      <div className="flex items-center gap-1">
        <Rays className="hidden md:block" />
        <IllustrationSlot asset={BANNER_ASSET} compact className="w-[150px] shrink-0 md:w-[170px]" />
        <Rays className="hidden -scale-x-100 md:block" />
      </div>
      <div className="max-w-[760px]">
        <h1 className="text-[28px] font-extrabold leading-[1.35] text-ink-strong md:text-display">{title}</h1>
        <p className="mt-1.5 text-[17px] text-ink-body md:text-[19px]">{subtitle}</p>
      </div>
    </Card>
  );
}
