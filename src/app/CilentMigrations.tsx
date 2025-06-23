'use client';

import { useEffect } from 'react';
import { addUserTypeApplicant } from '@/lib/migrations';

export function ClientMigrations() {
  useEffect(() => {
    addUserTypeApplicant();
  }, []);

  return null;
}
