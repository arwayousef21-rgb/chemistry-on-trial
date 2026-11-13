import type { Config } from 'tailwindcss';
import { colors, radii, shadows, typography, layout } from './src/styles/tokens';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: colors as unknown as Record<string, string>,
      borderRadius: radii,
      boxShadow: shadows,
      fontFamily: {
        arabic: [...typography.fontFamily.arabic],
        latin: [...typography.fontFamily.latin],
      },
      fontSize: typography.fontSize as unknown as Record<string, [string, Record<string, string>]>,
      height: { nav: layout.navHeight },
      width: { side: layout.sideColumn },
      maxWidth: { page: layout.maxWidth },
      backgroundImage: {
        'banner-gradient': `linear-gradient(to var(--reading-end), ${colors.banner.start}, ${colors.banner.end})`,
      },
    },
  },
  plugins: [],
} satisfies Config;
