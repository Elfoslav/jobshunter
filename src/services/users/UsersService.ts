'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import UsersStore from './UsersStore';
import { User, ApplicantUser, CompanyUser, UserType } from '@/models/User';
import { ITEMS_PER_PAGE, USERS_QUERIES } from '@/lib/consts';
import { isApplicantUser, isCompanyUser } from '@/lib/utils/user';

const USERS_PER_PAGE = ITEMS_PER_PAGE;

const filterApplicantUsers = (
  data: ApplicantUser[],
  searchQuery: string = '',
  skills: string[] = [],
): ApplicantUser[] => {
  let filtered = data.sort((a, b) => (b.registeredAt?.getTime() || 0) - (a.registeredAt?.getTime() || 0));

  if (searchQuery) {
    filtered = filtered.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return filtered;
};

export const getUsers = async (): Promise<User[]> => {
  const data: User[] = UsersStore.read();
  return Promise.resolve(data);
};

const getUsersCount = async (): Promise<number> => {
  const data: User[] = UsersStore.read();
  return Promise.resolve(data.length);
};

export const getUsersById = async (id: string): Promise<User[]> => {
  const users: User[] = UsersStore.read();
  const user = users.filter((user) => user.id === id);
  return Promise.resolve(user);
};

export const getUsersByIds = async (ids: string[]): Promise<User[]> => {
  const users: User[] = UsersStore.read();
  const filteredUsers = users.filter((user) => user.id && ids.includes(user.id));
  return Promise.resolve(filteredUsers);
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

export const getApplicants = async (
  page?: number,
  searchQuery?: string,
  skills?: string[]
): Promise<ApplicantUser[]> => {
  const users = await getUsers();
  const applicants = users.filter(isApplicantUser);

  // If no search query or skills provided, skip filtering
  const filtered = searchQuery || (skills && skills.length > 0)
    ? filterApplicantUsers(applicants, searchQuery || '', skills)
    : applicants;

  // If no page specified, return all
  if (!page) return filtered;

  const offset = (page - 1) * USERS_PER_PAGE;
  return filtered.slice(offset, offset + USERS_PER_PAGE);
};


export const getApplicantsCount = async (
  searchQuery?: string,
  skills?: string[]
): Promise<number> => {
  const users = await getApplicants();
  const filtered = filterApplicantUsers(users, searchQuery, skills)
  return filtered.filter(isApplicantUser).length;
};


export const getApplicantsByIds = async (ids: string[]): Promise<ApplicantUser[]> => {
  const users = await getUsersByIds(ids);
  return users.filter(isApplicantUser);
};

export const getCompaniesUsers = async (): Promise<CompanyUser[]> => {
  const users = await getUsers();
  return users.filter(isCompanyUser);
};

const createUser = async (newUser: User): Promise<User> => {
  return UsersStore.create(newUser);
};

const updateUser = async (updatedUser: User & { id: string }): Promise<User> => {
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
  return useQuery<number, unknown>({
    queryKey: [USERS_QUERIES.USERS_COUNT, searchQuery, skills],
    queryFn: getUsersCount,
  });
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

export const useGetApplicants = (page = 1, searchQuery = '', skills?: string[]) => {
  return useQuery<ApplicantUser[], unknown>({
    queryKey: [USERS_QUERIES.USERS, UserType.Applicant, page, searchQuery, skills],
    queryFn: () => getApplicants(page, searchQuery, skills),
  });
};

export const useGetApplicantsCount = (searchQuery = '', skills?: string[]) => {
  return useQuery<number, unknown>({
    queryKey: [USERS_QUERIES.USERS, UserType.Applicant, searchQuery, skills],
    queryFn: () => getApplicantsCount(searchQuery, skills),
  });
};

export const useGetApplicantsByIds = (ids: string[]) => {
  return useQuery<ApplicantUser[], unknown>({
    queryKey: [USERS_QUERIES.USERS_BY_IDS, UserType.Applicant, ids],
    queryFn: () => getApplicantsByIds(ids),
    enabled: ids.length > 0, // prevent running the query if no ids
  });
};

export const useGetApplicantById = (id: string) => {
  return useQuery<ApplicantUser | null>({
    queryKey: ['applicant', id],
    queryFn: async () => {
      const user = await getUserById(id);
      return user && isApplicantUser(user) ? user : null;
    },
    enabled: !!id, // avoid running the query if id is falsy
  });
};

export const useGetCompaniesUsers = () => {
  return useQuery<CompanyUser[], unknown>({
    queryKey: [USERS_QUERIES.USERS, UserType.Company],
    queryFn: getCompaniesUsers,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, unknown, User>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERIES.USERS] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, unknown, User & { id: string }>({
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
