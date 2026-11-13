/**
 * Registry of the six priority 3D dashboard assets (ARCHITECTURE_DECISIONS D12;
 * design/3d-illustration-style-guide.md).
 *
 * Each slot has a fixed aspect ratio taken from the reference image, so the
 * real artwork drops into exactly the position and proportions of the
 * placeholder. To activate an asset:
 *   1. Put the exported files in `public/assets/illustrations/<file>`:
 *        <name>.webp, <name>@2x.webp, <name>.png  (transparent background)
 *   2. Set `available: true` below.
 * No flat SVG or emoji may stand in for these assets.
 */

export type AssetId =
  | 'equi-robot'
  | 'remedial-books'
  | 'corrective-target'
  | 'enrichment-rocket'
  | 'lab-glassware'
  | 'science-decor';

export interface AssetSpec {
  /** Path inside public/assets/illustrations/, without extension. */
  file: string;
  /** CSS aspect-ratio of the slot (width / height). */
  aspect: string;
  /** Master size to deliver (transparent PNG). */
  master: { width: number; height: number };
  /** Largest on-screen size in CSS pixels at 1536 px desktop width. */
  display: { width: number; height: number };
  available: boolean;
  alt: { ar: string; en: string };
}

export const ASSETS: Record<AssetId, AssetSpec> = {
  'equi-robot': {
    file: 'robot/equi-pointing',
    aspect: '1 / 1',
    master: { width: 2048, height: 2048 },
    display: { width: 180, height: 180 },
    available: false,
    alt: { ar: 'الروبوت EQUI يشير إلى فقاعة الحوار', en: 'EQUI robot pointing at the speech bubble' },
  },
  'remedial-books': {
    file: 'pathways/remedial-books',
    aspect: '16 / 9',
    master: { width: 2048, height: 1152 },
    display: { width: 250, height: 141 },
    available: false,
    alt: { ar: 'كومة كتب ثلاثية الأبعاد', en: '3D stack of books' },
  },
  'corrective-target': {
    file: 'pathways/corrective-target',
    aspect: '16 / 9',
    master: { width: 2048, height: 1152 },
    display: { width: 250, height: 141 },
    available: false,
    alt: { ar: 'هدف وسهم ثلاثي الأبعاد', en: '3D target with arrow' },
  },
  'enrichment-rocket': {
    file: 'pathways/enrichment-rocket',
    aspect: '16 / 9',
    master: { width: 2048, height: 1152 },
    display: { width: 250, height: 141 },
    available: false,
    alt: { ar: 'صاروخ ثلاثي الأبعاد', en: '3D rocket' },
  },
  'lab-glassware': {
    file: 'chemistry/lab-glassware',
    aspect: '3 / 2',
    master: { width: 2048, height: 1365 },
    display: { width: 200, height: 133 },
    available: false,
    alt: { ar: 'أدوات زجاجية مخبرية', en: 'Laboratory glassware' },
  },
  'science-decor': {
    file: 'ui/science-decor',
    aspect: '2 / 3',
    master: { width: 1365, height: 2048 },
    display: { width: 80, height: 120 },
    available: false,
    alt: { ar: 'عناصر علمية زخرفية', en: 'Decorative science elements' },
  },
};

/** The banner reuses the corrective target artwork (as in the reference). */
export const BANNER_ASSET: AssetId = 'corrective-target';

export const assetUrl = (spec: AssetSpec, variant: '1x' | '2x' | 'png') =>
  `${import.meta.env.BASE_URL}assets/illustrations/${spec.file}${variant === '2x' ? '@2x.webp' : variant === 'png' ? '.png' : '.webp'}`;
