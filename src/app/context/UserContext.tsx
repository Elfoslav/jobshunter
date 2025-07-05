'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApplicantUser, CompanyUser, User, UserType } from '@/models/User';
import { getUserById } from '@/services/users/UsersService';
import { isApplicantUser, isCompanyUser } from '@/lib/utils/user';
import { ExistingCompany } from '@/models/Company';

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  login: (userId: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

const LOCAL_STORAGE_KEY = 'loggedInUserId';

export function UserProvider({ children }: UserProviderProps) {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load userId from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setUserId(stored);
    }
    setIsInitialized(true);
  }, []);

  // Fetch full user object using userId
  const { data: user = null, isLoading } = useQuery<User | null>({
    queryKey: ['user', userId],
    queryFn: () => (userId ? getUserById(userId) : Promise.resolve(null)),
    enabled: !!userId, // only fetch when userId exists
  });

  const login = useCallback((id: string) => {
    setUserId(id);
    localStorage.setItem(LOCAL_STORAGE_KEY, id);
  }, []);

  const logout = useCallback(() => {
    if (userId) {
      queryClient.removeQueries({ queryKey: ['user', userId] });
    }
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setUserId(null);
  }, [queryClient, userId]);

  return (
    <UserContext.Provider
      value={{ user, login, logout, isLoading, isInitialized }}
    >
      {children}
    </UserContext.Provider>
  );
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
  const { user, login, logout, isLoading, isInitialized } = useUser();
  const applicantUser = user && isApplicantUser(user) ? user : null;
  return { user: applicantUser, login, logout, isLoading, isInitialized };
}

export function useCompanyUser(): Omit<UserContextType, 'user'> & {
  user: (CompanyUser & { companyData: ExistingCompany }) | null;
} {
  const { user, login, logout, isLoading, isInitialized } = useUser();

  if (user && isCompanyUser(user)) {
    const companyUser = user as CompanyUser & { companyData: ExistingCompany };
    return { user: companyUser, login, logout, isLoading, isInitialized };
  }

  return { user: null, login, logout, isLoading, isInitialized };
}
