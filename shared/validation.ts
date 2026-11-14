/**
 * Student registration rules, shared by the browser and the server (D15).
 * The server always re-checks; the browser uses the same rules for instant feedback.
 */

export type FieldError = 'required' | 'invalid' | 'too_long';

const ARABIC_INDIC = '٠١٢٣٤٥٦٧٨٩';
const EASTERN_ARABIC = '۰۱۲۳۴۵۶۷۸۹';

/** Converts Arabic-Indic and Eastern Arabic digits to Western digits. */
export function toWesternDigits(input: string): string {
  return input.replace(/[٠-٩۰-۹]/g, (d) => {
    const i = ARABIC_INDIC.indexOf(d);
    return String(i >= 0 ? i : EASTERN_ARABIC.indexOf(d));
  });
}

/**
 * Normalises an Egyptian mobile number to the 11-digit local form "01XXXXXXXXX".
 * Accepts 01…, +201…, 00201…, 201…, with spaces, dashes or brackets, and Arabic digits.
 * Valid mobile prefixes: 010, 011, 012, 015.
 */
export function normalizeEgyptianMobile(input: string): string | null {
  let d = toWesternDigits(input).replace(/[\s\-().]/g, '');
  if (d.startsWith('+')) d = d.slice(1);
  if (d.startsWith('0020')) d = '0' + d.slice(4);
  else if (d.startsWith('20') && d.length === 12) d = '0' + d.slice(2);
  return /^01[0125]\d{8}$/.test(d) ? d : null;
}

/** Lower-cases and trims an email; returns null if the format is not plausible. */
export function normalizeEmail(input: string): string | null {
  const e = input.trim().toLowerCase();
  if (e.length > 254) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) ? e : null;
}

/** Trims and collapses spaces; requires at least two words of letters (Arabic or Latin). */
export function normalizeFullName(input: string): string | null {
  const n = input.trim().replace(/\s+/g, ' ');
  if (n.length < 3 || n.length > 80) return null;
  if (!/^[\p{L}\p{M}' .-]+$/u.test(n)) return null;
  const words = n.split(' ').filter((w) => /\p{L}/u.test(w));
  return words.length >= 2 ? n : null;
}

export interface RegistrationInput {
  fullName: string;
  email: string;
  phone: string;
  consent: boolean;
}

export interface NormalizedRegistration {
  fullName: string;
  email: string;
  phone: string;
}

export type RegistrationErrors = Partial<Record<'fullName' | 'email' | 'phone' | 'consent', FieldError>>;

export function validateRegistration(input: RegistrationInput): { ok: true; value: NormalizedRegistration } | { ok: false; errors: RegistrationErrors } {
  const errors: RegistrationErrors = {};
  const fullName = input.fullName?.trim() ? normalizeFullName(input.fullName) : null;
  const email = input.email?.trim() ? normalizeEmail(input.email) : null;
  const phone = input.phone?.trim() ? normalizeEgyptianMobile(input.phone) : null;
  if (!input.fullName?.trim()) errors.fullName = 'required';
  else if (!fullName) errors.fullName = input.fullName.trim().length > 80 ? 'too_long' : 'invalid';
  if (!input.email?.trim()) errors.email = 'required';
  else if (!email) errors.email = 'invalid';
  if (!input.phone?.trim()) errors.phone = 'required';
  else if (!phone) errors.phone = 'invalid';
  if (input.consent !== true) errors.consent = 'required';
  if (Object.keys(errors).length > 0 || !fullName || !email || !phone) return { ok: false, errors };
  return { ok: true, value: { fullName, email, phone } };
}

export function validateResume(input: { email: string; phone: string }): { ok: true; email: string; phone: string } | { ok: false; errors: Partial<Record<'email' | 'phone', FieldError>> } {
  const errors: Partial<Record<'email' | 'phone', FieldError>> = {};
  const email = input.email?.trim() ? normalizeEmail(input.email) : null;
  const phone = input.phone?.trim() ? normalizeEgyptianMobile(input.phone) : null;
  if (!input.email?.trim()) errors.email = 'required';
  else if (!email) errors.email = 'invalid';
  if (!input.phone?.trim()) errors.phone = 'required';
  else if (!phone) errors.phone = 'invalid';
  if (!email || !phone) return { ok: false, errors };
  return { ok: true, email, phone };
}
