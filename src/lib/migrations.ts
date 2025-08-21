import Migration from '@/models/Migration';
import { ExistingApplicantUser, UserType } from '@/models/User';
import { createMigration, getMigrations } from '@/services/migrations/MigrationsService';
import { getSkills } from '@/services/skills/SkillsService';

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
    const parsed = JSON.parse(raw) as Omit<ExistingApplicantUser, 'type'>[];

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

export const updateUserSkillsToObjectFormat = async () => {
  if (typeof window === 'undefined') return;

  const migrationName = 'Update user.skills from string to object using skill IDs';

  const migrations = await getMigrations();
  const migrationExists = migrations.some(m => m.name === migrationName);
  if (migrationExists) {
    console.log(`✅ Migration "${migrationName}" already applied. Skipping.`);
    return;
  }

  const raw = localStorage.getItem('users');
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw) as any[];

    const skills = await getSkills(); // <-- Fetch all available skills

    // Only apply if skills are in string[] format
    const needsMigration = parsed.some(user =>
      Array.isArray(user.skills) && typeof user.skills[0] === 'string'
    );

    if (!needsMigration) {
      console.log('✅ No users need skill migration. Skipping.');
      return;
    }

    const updated = parsed.map(user => {
      if (Array.isArray(user.skills) && typeof user.skills[0] === 'string') {
        const updatedSkills = user.skills.map((name: string) => {
          const matchedSkill = skills.find(skill => skill.name === name);
          return {
            id: matchedSkill?.id ?? crypto.randomUUID(),
            name,
            level: 'Junior', // Default level
          };
        });
        return { ...user, skills: updatedSkills };
      }
      return user;
    });

    localStorage.setItem('users', JSON.stringify(updated));
    console.log('✅ Migration: updated user.skills with proper IDs');

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

export const removeJobs = async () => {
  if (typeof window === 'undefined') return;

  const migrationName = 'Remove Jobs';

  const migrations = await getMigrations();
  const migrationExists = migrations.some(m => m.name === migrationName);
  if (migrationExists) {
    console.log(`✅ Migration "${migrationName}" already applied. Skipping.`);
    return;
  }

  localStorage.removeItem('jobs');
  console.log('✅ Migration: Removed existing jobs');

  const newMigration: Migration = {
    id: crypto.randomUUID(),
    name: migrationName,
    createdAt: new Date(),
  };

  await createMigration(newMigration);
  console.log('✅ Migration recorded in MigrationsStore');
};
