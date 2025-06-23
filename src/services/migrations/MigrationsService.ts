'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import MigrationsStore from './MigrationsStore';
import Migration from '@/models/Migration';
import { MIGRATIONS_QUERIES } from '@/lib/consts';

export const getMigrations = async (): Promise<Migration[]> => {
  // const response = await axios.get<Migration[]>(API_URL)
  // return response.data
  const data: Migration[] = MigrationsStore.read();

  return Promise.resolve(data);
};

const getMigrationsCount = async (): Promise<number> => {
  const data: Migration[] = MigrationsStore.read();
  return Promise.resolve(data.length);
};

const getMigrationById = async (id: string): Promise<Migration | null> => {
  // const response = await axios.get<Migration[]>(API_URL)
  // return response.data
  const Migrations: Migration[] = MigrationsStore.read();
  const Migration = Migrations.find((Migration) => Migration.id === id) || null;

  return Promise.resolve(Migration);
};

export const createMigration = async (newMigration: Migration): Promise<void> => {
  // await axios.post(API_URL, newMigration)
  // data.push(newMigration)
  MigrationsStore.create(newMigration);
};

export const useGetMigrations = () => {
  const result = useQuery<Migration[], unknown>(
    [MIGRATIONS_QUERIES.MIGRATIONS],
    async () => {
      return await getMigrations();
    }
  );
  return { ...result, count: result.data?.length };
};

export const useGetMigrationsCount = (
  searchQuery: string = '',
  Migrations: string[] = []
) => {
  const result = useQuery<number, unknown>(
    [MIGRATIONS_QUERIES.MIGRATIONS_COUNT, searchQuery, Migrations],
    () => getMigrationsCount()
  );
  return { ...result };
};

export const useGetMigrationById = (MigrationId: string) => {
  const result = useQuery<Migration | null, unknown>(
    [MIGRATIONS_QUERIES.MIGRATION_BY_ID],
    () => getMigrationById(MigrationId)
  );
  return result;
};

export const useCreateMigration = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, Migration>(createMigration, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MIGRATIONS_QUERIES.MIGRATIONS] });
    },
  });
};