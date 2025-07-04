import { ReactNode } from 'react';
import { User, UserType } from '@/models/User';
import { hasRole } from '@/lib/utils/user';
import ResourceType from '@/models/enums/ResourceType';
import { ExistingCompany } from '@/models/Company';

type Props = {
  user: User | null;
  requiredRole: UserType[];
  resourceType?: ResourceType;
  resourceId?: string;
  children: ReactNode;
};

export default function CanAccess({
  user,
  requiredRole,
  resourceType,
  resourceId,
  children,
}: Props) {
  if (!user || !hasRole(user, requiredRole)) return null;

  // Admin always allowed
  if (user.type === UserType.Admin) return <>{children}</>;

  // If no resource checks needed, just return based on role
  if (!resourceType || !resourceId) {
    return <>{children}</>;
  }

  // Resource-specific checks
  switch (resourceType) {
    case ResourceType.User:
      if (user.id === resourceId) return <>{children}</>;
      break;

    case ResourceType.Company:
      if (
        user.type === UserType.Company &&
        'companyData' in user &&
        (user.companyData as ExistingCompany).id === resourceId
      ) {
        return <>{children}</>;
      }
      break;

    default:
      return null;
  }

  return null;
}
