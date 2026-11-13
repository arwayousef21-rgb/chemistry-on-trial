import { ar } from './ar';

/** The Arabic file defines the shape; English must provide every key. */
export type Translations = typeof ar;
export type Lang = 'ar' | 'en';

export const dirOf = (lang: Lang): 'rtl' | 'ltr' => (lang === 'ar' ? 'rtl' : 'ltr');
