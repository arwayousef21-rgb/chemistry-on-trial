/**
 * Chemistry on Trial — design tokens.
 *
 * Every colour below was sampled from the mandatory reference image
 * `public/reference/primary-dashboard-reference.jpg` (1536×1024 JPEG; values
 * are the dominant colour of each region, accurate to roughly ±4 per channel
 * because of JPEG compression). Two values were adjusted for accessibility
 * with the owner's approval (see `ARCHITECTURE_DECISIONS.md` D12):
 *   - green button  #008A60 → #00845A (white text 4.72:1)
 *   - progress ring #04AC7C → #049870 (3.66:1), #04AC7C kept as highlight
 *
 * This file is the single source of truth: Tailwind (`tailwind.config.ts`)
 * reads it, so components never hard-code colours.
 */

export const colors = {
  navy: {
    900: '#183660', // top navigation bar
    700: '#1E3C66', // navigation hover / subtle variation
  },
  ink: {
    strong: '#1C1650', // banner headline
    DEFAULT: '#0C2858', // panel and section headings, score number
    body: '#100C2C', // body text
    muted: '#4A5578', // secondary text (derived for captions; not in reference)
  },
  surface: {
    DEFAULT: '#FFFFFF', // page and white cards (sampled #FCFCFC)
    tint: '#EAF0FC', // band below the navigation bar
    info: '#DEEAFC', // note card, score-card header
    wave: '#C6DEFC', // decorative background waves
  },
  border: {
    soft: '#DCE0FC', // banner and panel borders
  },
  banner: {
    start: '#C0D8FC', // light blue — reading-start side (right in Arabic, as in the reference)
    end: '#DEDEFC', // lavender — reading-end side
  },
  /** Approved pathway colour mapping (D3). */
  remedial: {
    solid: '#1866B4', // title pill
    button: '#186CC0',
    tint: '#EAF0FC', // card background
    strip: '#CCE4FC', // "what you will find" strip
    border: '#E4ECF8',
  },
  corrective: {
    solid: '#00845A',
    button: '#00845A', // accessibility-adjusted (sampled #008A60)
    tint: '#EAF6F0',
    strip: '#C0F0E4',
    border: '#98E8D0',
    emphasis: '#2C9878', // 2px border of the recommended card in the reference
  },
  enrichment: {
    solid: '#784EAE',
    button: '#6C4890',
    tint: '#F0EAFC',
    strip: '#E4DEFC',
    border: '#E6DEFA',
  },
  status: {
    ring: '#049870', // progress ring (accessibility-adjusted)
    ringHighlight: '#04AC7C',
    check: '#08A074',
    track: '#CCD8E8',
    danger: '#E84C58',
    warning: '#F2A93B', // "developing" marker — not in reference, derived from gold
    gold: '#FCBC40', // star, sparkles, rays
  },
  assistant: {
    cta: '#2472D2', // "Ask the assistant" button
    eye: '#4CECF8', // robot eyes
  },
  illustration: {
    sky: '#9CD0FC',
    blue: '#58B0F4',
    pink: '#F080B0',
    leaf: '#94D0C0',
    red: '#C03030',
  },
} as const;

/** Radii measured from the reference (scaled from 1536 px to a 1440 px layout). */
export const radii = {
  card: '24px',
  panel: '18px',
  strip: '12px',
  pill: '9999px',
} as const;

export const shadows = {
  card: '0 8px 24px rgba(24, 54, 96, 0.08)',
  raised: '0 12px 32px rgba(24, 54, 96, 0.12)',
  button: '0 4px 12px rgba(24, 54, 96, 0.14)',
} as const;

/** Type scale (desktop). Arabic uses slightly taller line-heights (see index.css). */
export const typography = {
  fontFamily: {
    arabic: ['Cairo', 'system-ui', 'sans-serif'],
    latin: ['Inter', 'system-ui', 'sans-serif'],
  },
  fontSize: {
    display: ['36px', { lineHeight: '44px', fontWeight: '800' }],
    h2: ['26px', { lineHeight: '34px', fontWeight: '700' }],
    h3: ['20px', { lineHeight: '28px', fontWeight: '700' }],
    body: ['17px', { lineHeight: '28px', fontWeight: '500' }],
    small: ['15px', { lineHeight: '24px', fontWeight: '500' }],
    score: ['44px', { lineHeight: '48px', fontWeight: '800' }],
  },
} as const;

export const layout = {
  navHeight: '84px', // reference ≈ 92 px at 1536; modest increase from 72 px
  sideColumn: '300px',
  maxWidth: '1536px', // the reference uses the full 1536 px width
  gutterDesktop: '32px',
  gutterMobile: '16px',
} as const;

export type PathwayId = 'remedial' | 'corrective' | 'enrichment';
