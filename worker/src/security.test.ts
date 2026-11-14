import { describe, expect, it } from 'vitest';
import { clearCookie, readCookie, setCookie } from './cookies';
import { randomToken, sha256Hex, timingSafeEqual } from './crypto';
import { BadRequest, readJson } from './request';

describe('session keys and hashing', () => {
  it('creates long, unique random keys', () => {
    const a = randomToken();
    expect(a).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(randomToken()).not.toBe(a);
  });

  it('hashes deterministically and compares in constant time', async () => {
    expect(await sha256Hex('abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
    expect(await timingSafeEqual('a long passphrase', 'a long passphrase')).toBe(true);
    expect(await timingSafeEqual('a long passphrase', 'a long passphrasf')).toBe(false);
  });
});

describe('cookies', () => {
  it('sets HttpOnly, Secure cookies and reads them back', () => {
    const c = setCookie('em_student', 'tok', 100, 'Lax');
    expect(c).toContain('HttpOnly');
    expect(c).toContain('Secure');
    expect(c).toContain('SameSite=Lax');
    expect(clearCookie('em_student', 'Lax')).toContain('Max-Age=0');
    const req = new Request('http://x/', { headers: { cookie: 'a=1; em_student=tok; b=2' } });
    expect(readCookie(req, 'em_student')).toBe('tok');
    expect(readCookie(req, 'missing')).toBeNull();
  });
});

describe('request checks', () => {
  const post = (body: string, headers: Record<string, string>) =>
    new Request('http://localhost/api/x', { method: 'POST', body, headers });

  it('rejects cross-site origins, non-JSON and oversized bodies', async () => {
    await expect(readJson(post('{}', { 'content-type': 'application/json', origin: 'https://evil.example' }))).rejects.toMatchObject({ status: 403 });
    await expect(readJson(post('a=1', { 'content-type': 'application/x-www-form-urlencoded' }))).rejects.toMatchObject({ status: 415 });
    await expect(readJson(post(JSON.stringify({ x: 'y'.repeat(5000) }), { 'content-type': 'application/json' }))).rejects.toMatchObject({ status: 413 });
    await expect(readJson(post('[1]', { 'content-type': 'application/json' }))).rejects.toBeInstanceOf(BadRequest);
  });

  it('accepts same-origin JSON objects', async () => {
    await expect(readJson(post('{"a":1}', { 'content-type': 'application/json', origin: 'http://localhost' }))).resolves.toEqual({ a: 1 });
  });
});
