/**
 * Minimal same-origin API client. M0 exposes only the health check; registration,
 * resume and learning-record calls are added in later milestones.
 */
export interface HealthResponse {
  ok: boolean;
  app: string;
  env: string;
  db: 'ok' | 'unavailable';
  schemaVersion: string | null;
  dataset: string | null;
}

export async function getHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const res = await fetch('/api/health', { signal, headers: { accept: 'application/json' } });
  return (await res.json()) as HealthResponse;
}
