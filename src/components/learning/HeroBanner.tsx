import { Card, IllustrationSlot, Rays } from '@/components/ui';

/** Wide gradient banner with the target illustration and gold rays. */
export function HeroBanner({ title, subtitle, illustrationAlt }: { title: string; subtitle: string; illustrationAlt: string }) {
  return (
    <Card tone="banner" className="relative flex flex-col items-center gap-4 overflow-hidden px-6 py-6 text-center md:flex-row md:justify-center md:gap-6 md:px-10">
      <div className="flex items-center gap-1">
        <Rays className="hidden md:block" />
        <IllustrationSlot id="banner-target" alt={illustrationAlt} compact className="h-[96px] w-[96px] shrink-0 md:h-[110px] md:w-[110px]" />
        <Rays className="hidden -scale-x-100 md:block" />
      </div>
      <div className="max-w-[720px]">
        <h1 className="text-[28px] font-extrabold leading-[1.35] text-ink-strong md:text-display">{title}</h1>
        <p className="mt-2 text-[17px] text-ink-body md:text-[20px]">{subtitle}</p>
      </div>
    </Card>
  );
}
