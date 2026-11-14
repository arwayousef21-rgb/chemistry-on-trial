import { describe, expect, it } from 'vitest';
import { demoDataService } from './demoDataService';

describe('demo data service', () => {
  it('serves synthetic data only', () => {
    expect(demoDataService.mode).toBe('demo');
    expect(demoDataService.getDashboard().isSynthetic).toBe(true);
  });
});
