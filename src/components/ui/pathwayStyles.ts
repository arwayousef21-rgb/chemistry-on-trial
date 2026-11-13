import type { PathwayId } from '@/styles/tokens';

/**
 * Tailwind classes for each approved pathway colour (ARCHITECTURE_DECISIONS D3).
 * Written out in full so Tailwind can detect them.
 */
export const pathwayStyles: Record<
  PathwayId,
  { solid: string; button: string; tint: string; strip: string; border: string; emphasisBorder: string; text: string }
> = {
  remedial: {
    solid: 'bg-remedial-solid',
    button: 'bg-remedial-button hover:bg-remedial-solid',
    tint: 'bg-remedial-tint',
    strip: 'bg-remedial-strip',
    border: 'border-remedial-border',
    emphasisBorder: 'border-remedial-solid',
    text: 'text-remedial-solid',
  },
  corrective: {
    solid: 'bg-corrective-solid',
    button: 'bg-corrective-button hover:brightness-95',
    tint: 'bg-corrective-tint',
    strip: 'bg-corrective-strip',
    border: 'border-corrective-border',
    emphasisBorder: 'border-corrective-emphasis',
    text: 'text-corrective-solid',
  },
  enrichment: {
    solid: 'bg-enrichment-solid',
    button: 'bg-enrichment-button hover:bg-enrichment-solid',
    tint: 'bg-enrichment-tint',
    strip: 'bg-enrichment-strip',
    border: 'border-enrichment-border',
    emphasisBorder: 'border-enrichment-solid',
    text: 'text-enrichment-solid',
  },
};
