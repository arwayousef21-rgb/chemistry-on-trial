/** Request checks shared by all state-changing API routes. */

const MAX_BODY_BYTES = 4096;

export class BadRequest extends Error {
  constructor(public code: string, public status = 400) {
    super(code);
  }
}

/**
 * Accepts only same-origin JSON requests with a small body.
 * Requiring application/json + a matching Origin blocks cross-site form submissions.
 */
export async function readJson<T>(request: Request): Promise<T> {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) throw new BadRequest('forbidden_origin', 403);
  if (!(request.headers.get('content-type') ?? '').toLowerCase().startsWith('application/json')) throw new BadRequest('unsupported_media_type', 415);
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) throw new BadRequest('payload_too_large', 413);
  try {
    const value = JSON.parse(text) as unknown;
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('not an object');
    return value as T;
  } catch {
    throw new BadRequest('invalid_json');
  }
}

/** Client address used only as a rate-limit key (never stored with student data). */
export const clientKey = (request: Request) => request.headers.get('cf-connecting-ip') ?? 'local';

export const nowIso = () => new Date().toISOString();
