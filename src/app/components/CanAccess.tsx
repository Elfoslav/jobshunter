import { ReactNode } from 'react';
import { hasRole } from '@/lib/utils/user';
import { User, UserType } from '@/models/User';

type Props = {
  user: User | null;
  allowed: UserType[];
  children: ReactNode;
};

export default function CanAccess({ user, allowed, children }: Props) {
  if (!user || !hasRole(user, allowed)) return null;
  return <>{children}</>;
}
