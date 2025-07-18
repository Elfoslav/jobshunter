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
  fallback?: React.ReactNode;
};

export default function CanAccess({
  user,
  requiredRole,
  resourceType,
  resourceId,
  children,
  fallback = null,
}: Props) {
  if (!user || !hasRole(user, requiredRole)) return <>{fallback}</>;

  // Admin always allowed
  if (user.type === UserType.Admin) return <>{children}</>;

  // If no resource checks needed, just return based on role
  if (!resourceType || !resourceId) {
    return <>{children}</>;
  }

  // Resource-specific checks
  switch (resourceType) {
    case ResourceType.User: {
      const hasAccess = user.id === resourceId;
      return <>{hasAccess ? children : fallback}</>;
    }

    case ResourceType.Company: {
      const hasAccess =
        user.type === UserType.Company &&
        'companyData' in user &&
        (user.companyData as ExistingCompany).id === resourceId;

      return <>{hasAccess ? children : fallback}</>;
    }

    default:
      return null;
  }
}
