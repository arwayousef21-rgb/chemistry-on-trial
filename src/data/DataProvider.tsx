import { createContext, useContext, type ReactNode } from 'react';
import type { DataService } from './DataService';
import { demoDataService } from './demoDataService';

const DataContext = createContext<DataService>(demoDataService);

/** Supplies the active data service to every screen (demo in M0). */
export function DataProvider({ service = demoDataService, children }: { service?: DataService; children: ReactNode }) {
  return <DataContext.Provider value={service}>{children}</DataContext.Provider>;
}

export function useDataService(): DataService {
  return useContext(DataContext);
}
