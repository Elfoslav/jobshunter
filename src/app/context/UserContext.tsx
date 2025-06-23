'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { ApplicantUser, CompanyUser, User, UserType } from '@/models/User';
import { getUserById } from '@/services/users/UsersService';

// Define the type for the user context
type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
  isLoading: boolean;
};

// Create the UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserById('1');
      setUser(userData || null);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const contextValue: UserContextType = {
    user,
    setUser,
    isLoading,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function isApplicantUser(user: User): user is ApplicantUser {
  return user.type === UserType.Applicant;
}

export function isCompanyUser(user: User): user is CompanyUser {
  return user.type === UserType.Company;
}

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
