'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApplicantUser, CompanyUser, User, UserType } from '@/models/User';
import { getUserById } from '@/services/users/UsersService';
import { USERS_QUERIES } from '@/lib/consts';

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const queryClient = useQueryClient();
  const [overrideUser, setOverrideUser] = useState<User | null>(null);

  const { data: fetchedUser, isLoading } = useQuery<User | null>({
    queryKey: [USERS_QUERIES.USER_BY_ID, '1'],
    queryFn: () => getUserById('1'),
  });

  const user = overrideUser ?? fetchedUser ?? null;

  const setUser = useCallback(
    (newUser: User) => {
      setOverrideUser(newUser);
      queryClient.setQueryData([USERS_QUERIES.USER_BY_ID, newUser.id], newUser);
    },
    [queryClient]
  );

  const contextValue: UserContextType = {
    user,
    setUser,
    isLoading,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

// Type guards
export function isApplicantUser(user: User): user is ApplicantUser {
  return user.type === UserType.Applicant;
}

export function isCompanyUser(user: User): user is CompanyUser {
  return user.type === UserType.Company;
}

// Hook accessors
export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export function useApplicantUser(): Omit<UserContextType, 'user'> & {
  user: ApplicantUser | null;
} {
  const { user, setUser, isLoading } = useUser();
  const applicantUser = user && isApplicantUser(user) ? user : null;
  return { user: applicantUser, setUser, isLoading };
}

export function useCompanyUser(): Omit<UserContextType, 'user'> & {
  user: CompanyUser | null;
} {
  const { user, setUser, isLoading } = useUser();
  const companyUser = user && isCompanyUser(user) ? user : null;
  return { user: companyUser, setUser, isLoading };
}
