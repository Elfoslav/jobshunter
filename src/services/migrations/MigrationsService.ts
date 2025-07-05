'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import MigrationsStore from './MigrationsStore';
import Migration from '@/models/Migration';
import { MIGRATIONS_QUERIES } from '@/lib/consts';

export const getMigrations = async (): Promise<Migration[]> => {
  const data: Migration[] = MigrationsStore.read();
  return Promise.resolve(data);
};

export const getMigrationsCount = async (): Promise<number> => {
  const data: Migration[] = MigrationsStore.read();
  return Promise.resolve(data.length);
};

export const getMigrationById = async (id: string): Promise<Migration | null> => {
  const migrations: Migration[] = MigrationsStore.read();
  const migration = migrations.find((m) => m.id === id) || null;
  return Promise.resolve(migration);
};

export const createMigration = async (newMigration: Migration): Promise<void> => {
  MigrationsStore.create(newMigration);
};

export const useGetMigrations = () => {
  const result = useQuery<Migration[], unknown>({
    queryKey: [MIGRATIONS_QUERIES.MIGRATIONS],
    queryFn: getMigrations,
  });
  return { ...result, count: result.data?.length };
};

export const useGetMigrationsCount = (
  searchQuery: string = '',
  migrationsFilter: string[] = []
) => {
  // Note: searchQuery and migrationsFilter parameters currently unused in queryFn,
  // but included in queryKey for potential cache differentiation.
  return useQuery<number, unknown>({
    queryKey: [MIGRATIONS_QUERIES.MIGRATIONS_COUNT, searchQuery, migrationsFilter],
    queryFn: getMigrationsCount,
  });
};

export const useGetMigrationById = (migrationId: string) => {
  const result = useQuery<Migration | null, unknown>({
    queryKey: [MIGRATIONS_QUERIES.MIGRATION_BY_ID, migrationId],
    queryFn: () => getMigrationById(migrationId),
  });
  return result;
};

export const useCreateMigration = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, Migration>({
    mutationFn: createMigration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MIGRATIONS_QUERIES.MIGRATIONS] });
    },
  });
};
