'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import User from '@/models/User';
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

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
