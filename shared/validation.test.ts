import { describe, expect, it } from 'vitest';
import { normalizeEgyptianMobile, normalizeEmail, normalizeFullName, toWesternDigits, validateRegistration, validateResume } from './validation';

describe('Egyptian mobile numbers', () => {
  it.each([
    ['01012345678', '01012345678'],
    ['011 2345 6789', '01123456789'],
    ['012-3456-7890', '01234567890'],
    ['+201512345678', '01512345678'],
    ['00201012345678', '01012345678'],
    ['201012345678', '01012345678'],
    ['٠١٠١٢٣٤٥٦٧٨', '01012345678'],
    ['(010) 1234 5678', '01012345678'],
  ])('accepts %s', (input, expected) => {
    expect(normalizeEgyptianMobile(input)).toBe(expected);
  });

  it.each(['01312345678', '0101234567', '010123456789', '0221234567', 'abc', '+44 7700 900123', ''])('rejects %s', (input) => {
    expect(normalizeEgyptianMobile(input)).toBeNull();
  });

  it('converts Eastern Arabic digits too', () => {
    expect(toWesternDigits('۰۱۲')).toBe('012');
  });
});

describe('email and name', () => {
  it('normalises email case and spaces', () => {
    expect(normalizeEmail('  Student.One@Example.COM ')).toBe('student.one@example.com');
    expect(normalizeEmail('not-an-email')).toBeNull();
    expect(normalizeEmail('a@b')).toBeNull();
  });

  it('requires at least two words of letters', () => {
    expect(normalizeFullName('  محمد   أحمد ')).toBe('محمد أحمد');
    expect(normalizeFullName('Sara Ali')).toBe('Sara Ali');
    expect(normalizeFullName('محمد')).toBeNull();
    expect(normalizeFullName('Sara 123')).toBeNull();
    expect(normalizeFullName('<script> alert')).toBeNull();
  });
});

describe('registration and resume validation', () => {
  it('returns normalised values when everything is valid', () => {
    const r = validateRegistration({ fullName: 'طالب تجريبي', email: 'T@example.com', phone: '+20 100 000 0001', consent: true });
    expect(r).toEqual({ ok: true, value: { fullName: 'طالب تجريبي', email: 't@example.com', phone: '01000000001' } });
  });

  it('reports every field problem, including missing consent', () => {
    const r = validateRegistration({ fullName: '', email: 'x', phone: '0130', consent: false });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors).toEqual({ fullName: 'required', email: 'invalid', phone: 'invalid', consent: 'required' });
  });

  it('resume needs only a valid email and phone', () => {
    expect(validateResume({ email: 'a@example.com', phone: '01000000001' })).toEqual({ ok: true, email: 'a@example.com', phone: '01000000001' });
    expect(validateResume({ email: '', phone: '' }).ok).toBe(false);
  });
});
