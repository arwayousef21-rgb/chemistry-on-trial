/**
 * JSON responses for the API. Every response is non-cacheable and carries
 * basic security headers. No CORS headers are sent: the API is same-origin only.
 */
const SECURITY_HEADERS: Record<string, string> = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'no-referrer',
};

export function json(body: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...SECURITY_HEADERS, ...extra } });
}

/** Stable error codes; the interface translates them into Arabic or English. */
export function error(status: number, code: string, extra: Record<string, string> = {}): Response {
  return json({ ok: false, error: code }, status, extra);
}
