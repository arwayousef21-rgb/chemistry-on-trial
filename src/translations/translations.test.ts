import { describe, expect, it } from 'vitest';
import { ar } from './ar';
import { en } from './en';

/** Collect every key path, including array lengths, so both languages stay in sync. */
function shape(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) return [`${prefix}[${value.length}]`];
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => shape(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

describe('translations', () => {
  it('Arabic and English define exactly the same keys', () => {
    expect(shape(en).sort()).toEqual(shape(ar).sort());
  });

  it('no translated string is empty', () => {
    const strings = (obj: unknown): string[] =>
      typeof obj === 'string' ? [obj] : obj && typeof obj === 'object' ? Object.values(obj).flatMap(strings) : [];
    for (const s of [...strings(ar), ...strings(en)]) expect(s.trim().length).toBeGreaterThan(0);
  });
});
