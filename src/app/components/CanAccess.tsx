import { ReactNode } from 'react';
import { User, UserType } from '@/models/User';
import { hasRole } from '@/lib/utils/user';
import ResourceType from '@/models/enums/ResourceType';
import { ExistingCompany } from '@/models/Company';

type Props = {
  user: User | null;
  userType: UserType[];
  resourceType: ResourceType;
  resourceId: string;
  children: ReactNode;
};

export default function CanAccessResource({
  user,
  userType,
  resourceType,
  resourceId,
  children,
}: Props) {
  if (!user || !hasRole(user, userType)) return null;

  // Admin override
  if (user.type === UserType.Admin) return <>{children}</>;

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
