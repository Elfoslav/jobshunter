'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import UsersStore from './UsersStore'
import User from '@/models/User'
import { USERS_QUERY_NAME } from '@/lib/consts'

const usersStore = new UsersStore()

const getUsers = async (): Promise<User[]> => {
  // const response = await axios.get<User[]>(API_URL)
  // return response.data
  const data: User[] = usersStore.read()

  return Promise.resolve(data)
}

const getUsersCount = async (): Promise<number> => {
  const data: User[] = usersStore.read()
  return Promise.resolve(data.length)
}

export const getUserById = async (id: string): Promise<User | null> => {
  // const response = await axios.get<User[]>(API_URL)
  // return response.data
  const users: User[] = usersStore.read()
  const user = users.find((user) => user.id === id) || null

  return Promise.resolve(user)
}

const createUser = async (newUser: User): Promise<void> => {
  // await axios.post(API_URL, newUser)
  // data.push(newUser)
  usersStore.create(newUser)
}

const updateUser = async (updatedUser: User): Promise<void> => {
  // await axios.put(`${API_URL}/${updatedUser.id}`, updatedUser)
  usersStore.update(updatedUser.id, updatedUser)
}

const deleteUser = async (userId: string): Promise<void> => {
  usersStore.delete(userId)
}

export const useGetUsers = (page: number, searchQuery: string = '', skills: string[] = []) => {
  const result = useQuery<User[], unknown>([USERS_QUERY_NAME, page, searchQuery, skills], async () => {
    return await getUsers()
  })
  return { ...result, count: result.data?.length }
}

export const useGetUsersCount = (searchQuery: string = '', skills: string[] = []) => {
  const result = useQuery<number, unknown>(['users_count', searchQuery, skills], () => getUsersCount())
  return { ...result }
}

export const useGetUserById = (userId: string) => {
  const result = useQuery<User | null, unknown>(['user', userId], () => getUserById(userId));
  return result;
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, User>(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_NAME] })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, User>(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries([])
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, string>(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries([])
    },
  })
}