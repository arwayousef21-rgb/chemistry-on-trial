import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { EquiPanel } from './EquiPanel';
import { EquiFloatingButton } from './EquiFloatingButton';

interface EquiValue {
  open: () => void;
  isOpen: boolean;
}

const EquiContext = createContext<EquiValue | null>(null);

/**
 * Keeps EQUI reachable from every screen (ARCHITECTURE_DECISIONS D8).
 * Stage 2 is interface-only: no AI model is connected and nothing is stored.
 * A later stage will also switch EQUI off during formal pre/post-tests.
 */
export function EquiLauncherProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const { pathname } = useLocation();
  const open = useCallback(() => setOpen(true), []);
  // The dashboard has its own EQUI strip (as in the reference), so the floating button is hidden there.
  // EQUI is for students: hidden in the teacher area.
  const showFloating = pathname !== '/' && pathname !== '/teacher' && !isOpen;
  return (
    <EquiContext.Provider value={{ open, isOpen }}>
      {children}
      {showFloating && <EquiFloatingButton onClick={open} />}
      <EquiPanel open={isOpen} onClose={() => setOpen(false)} />
    </EquiContext.Provider>
  );
}

export function useEqui(): EquiValue {
  const ctx = useContext(EquiContext);
  if (!ctx) throw new Error('useEqui must be used inside <EquiLauncherProvider>');
  return ctx;
}
