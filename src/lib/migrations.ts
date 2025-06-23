import Migration from '@/models/Migration';
import { ApplicantUser, UserType } from '@/models/User';
import { createMigration, getMigrations } from '@/services/migrations/MigrationsService';

export const addUserTypeApplicant = async () => {
  if (typeof window === 'undefined') return;

  // Migration identifier, you can use name or id
  const migrationName = 'Add type: UserType.Applicant to users';

  // Check if migration already exists
  const migrations = await getMigrations();
  const migrationExists = migrations.some(m => m.name === migrationName);
  if (migrationExists) {
    console.log(`✅ Migration "${migrationName}" already applied. Skipping.`);
    return;
  }

  const raw = localStorage.getItem('users');
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw) as Omit<ApplicantUser, 'type'>[];

    // Extra safety: skip if already migrated in raw data
    if (parsed.length > 0 && 'type' in parsed[0]) {
      console.log(`✅ Users already have "type" property. Skipping migration.`);
      return;
    }

    const updated = parsed.map((user) => ({
      ...user,
      type: UserType.Applicant,
    }));

    localStorage.setItem('users', JSON.stringify(updated));
    console.log('✅ Migration: added type: UserType.Applicant');

    // Record migration so it doesn't run again
    const newMigration: Migration = {
      id: crypto.randomUUID(),
      name: migrationName,
      createdAt: new Date(),
    };

    await createMigration(newMigration);
    console.log('✅ Migration recorded in MigrationsStore');
  } catch (err) {
    console.error('❌ Failed to migrate users:', err);
  }
};
