import { demoStudent } from '@/data/synthetic/demoStudent';
import type { DataService } from './DataService';

/** SYNTHETIC demo data only — used in development, previews and the Stage 2 design review. */
export const demoDataService: DataService = {
  mode: 'demo',
  getDashboard: () => demoStudent,
};
