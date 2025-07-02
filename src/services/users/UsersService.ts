'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import UsersStore from './UsersStore';
import { User, ApplicantUser, CompanyUser, UserType } from '@/models/User';
import { USERS_QUERIES } from '@/lib/consts';

export const getUsers = async (): Promise<User[]> => {
  const data: User[] = UsersStore.read();
  return Promise.resolve(data);
};

const getUsersCount = async (): Promise<number> => {
  const data: User[] = UsersStore.read();
  return Promise.resolve(data.length);
};

export const getUserById = async (id: string): Promise<User | null> => {
  const users: User[] = UsersStore.read();
  const user = users.find((user) => user.id === id) || null;
  return Promise.resolve(user);
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const users: User[] = UsersStore.read();
  const user = users.find((user) => user.email === email) || null;
  return Promise.resolve(user);
};

export const getApplicants = async (): Promise<ApplicantUser[]> => {
  const users = await getUsers();
  return users.filter((u): u is ApplicantUser => u.type === UserType.Applicant);
};

export const getCompanies = async (): Promise<CompanyUser[]> => {
  const users = await getUsers();
  return users.filter((u): u is CompanyUser => u.type === UserType.Company);
};

const createUser = async (newUser: User): Promise<void> => {
  UsersStore.create(newUser);
};

const updateUser = async (updatedUser: User): Promise<User> => {
  UsersStore.update(updatedUser.id, updatedUser);
  return Promise.resolve(updatedUser);
};

const deleteUser = async (userId: string): Promise<void> => {
  UsersStore.delete(userId);
};

export const useGetUsers = (
  page: number,
  searchQuery: string = '',
  skills: string[] = []
) => {
  const result = useQuery<User[], unknown>({
    queryKey: [USERS_QUERIES.USERS, page, searchQuery, skills],
    queryFn: getUsers,
  });
  return { ...result, count: result.data?.length };
};

export const useGetUsersCount = (
  searchQuery: string = '',
  skills: string[] = []
) => {
  const result = useQuery<number, unknown>({
    queryKey: [USERS_QUERIES.USERS_COUNT, searchQuery, skills],
    queryFn: getUsersCount,
  });
  return { ...result };
};

export const useGetUserById = (userId: string) => {
  return useQuery<User | null, unknown>({
    queryKey: [USERS_QUERIES.USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
  });
};

export const useGetUserByEmail = (email: string) => {
  return useQuery<User | null, unknown>({
    queryKey: [USERS_QUERIES.USER_BY_EMAIL, email],
    queryFn: () => getUserByEmail(email),
  });
};

export const useGetApplicants = () => {
  return useQuery<ApplicantUser[], unknown>({
    queryKey: [USERS_QUERIES.USERS, UserType.Applicant],
    queryFn: getApplicants,
  });
};

export const useGetCompanies = () => {
  return useQuery<CompanyUser[], unknown>({
    queryKey: [USERS_QUERIES.USERS, UserType.Company],
    queryFn: getCompanies,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, User>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERIES.USERS] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, unknown, User>({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      if (updatedUser?.id) {
        queryClient.invalidateQueries({ queryKey: [USERS_QUERIES.USER_BY_ID, updatedUser.id] });
      }
      queryClient.invalidateQueries({ queryKey: [USERS_QUERIES.USERS] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERIES.USERS] });
    },
  });
};
