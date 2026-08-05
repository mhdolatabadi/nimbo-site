import { useEffect, useState } from 'react';
import { ADMIN_EVENT, readSession, writeSession } from '../lib/adminAuth';

// Keeps every component that cares (the console, the nav link) on the same session state.
export function useAdminSession() {
  const [open, setOpen] = useState(() => readSession());

  useEffect(() => {
    const sync = () => setOpen(readSession());
    window.addEventListener(ADMIN_EVENT, sync);
    return () => window.removeEventListener(ADMIN_EVENT, sync);
  }, []);

  return [open, writeSession];
}
