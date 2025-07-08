'use client';

import { useEffect } from 'react';
import {
  addUserTypeApplicant,
  updateUserSkillsToObjectFormat,
  removeJobs,
} from '@/lib/migrations';

export function ClientMigrations() {
  useEffect(() => {
    addUserTypeApplicant();
    updateUserSkillsToObjectFormat();
    removeJobs();
  }, []);

  return null;
}
