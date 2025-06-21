'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import UsersStore from './UsersStore';
import { User, ApplicantUser, CompanyUser, UserType } from '@/models/User';
import { USERS_QUERIES } from '@/lib/consts';

const getUsers = async (): Promise<User[]> => {
  // const response = await axios.get<User[]>(API_URL)
  // return response.data
  const data: User[] = UsersStore.read();

  return Promise.resolve(data);
};

const getUsersCount = async (): Promise<number> => {
  const data: User[] = UsersStore.read();
  return Promise.resolve(data.length);
};

export const getUserById = async (id: string): Promise<User | null> => {
  // const response = await axios.get<User[]>(API_URL)
  // return response.data
  const users: User[] = UsersStore.read();
  const user = users.find((user) => user.id === id) || null;

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
  // await axios.post(API_URL, newUser)
  // data.push(newUser)
  UsersStore.create(newUser);
};

const updateUser = async (updatedUser: User): Promise<void> => {
  // await axios.put(`${API_URL}/${updatedUser.id}`, updatedUser)
  UsersStore.update(updatedUser.id, updatedUser);
};

const deleteUser = async (userId: string): Promise<void> => {
  UsersStore.delete(userId);
};

export const useGetUsers = (
  page: number,
  searchQuery: string = '',
  skills: string[] = []
) => {
  const result = useQuery<User[], unknown>(
    [USERS_QUERIES.USERS, page, searchQuery, skills],
    async () => {
      return await getUsers();
    }
  );
  return { ...result, count: result.data?.length };
};

export const useGetUsersCount = (
  searchQuery: string = '',
  skills: string[] = []
) => {
  const result = useQuery<number, unknown>(
    [USERS_QUERIES.USERS_COUNT, searchQuery, skills],
    () => getUsersCount()
  );
  return { ...result };
};

export const useGetUserById = (userId: string) => {
  const result = useQuery<User | null, unknown>(
    [USERS_QUERIES.USER_BY_ID, userId],
    () => getUserById(userId)
  );
  return result;
};

export const useGetApplicants = () => {
  return useQuery<ApplicantUser[] | null, unknown>(
    [USERS_QUERIES.USERS, UserType.Applicant],
    getApplicants
  );
};

export const useGetCompanies = () => {
  return useQuery<CompanyUser[], null, unknown>(
    [USERS_QUERIES.USERS, UserType.Company],
    getCompanies
  );
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, User>(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERIES.USERS] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, User>(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries([]);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries([]);
    },
  });
};
