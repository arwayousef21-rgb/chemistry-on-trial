import type { DemoStudent } from '@/data/synthetic/demoStudent';

/**
 * The single interface the screens use to read and save student data (D15).
 * M0 provides only the synthetic demo implementation. The API implementation
 * (Cloudflare Worker + D1) is added in M1 without changing any screen.
 */
export interface DataService {
  /** "demo" = synthetic data in the browser; "api" = the real server (later milestones). */
  readonly mode: 'demo' | 'api';
  /** Data shown on the student dashboard. */
  getDashboard(): DemoStudent;
}
