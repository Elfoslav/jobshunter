import { ExistingApplicantUser, ExistingCompanyUser, ExistingUser, UserType } from "@/models/User";

export function isApplicantUser(user: ExistingUser | null): user is ExistingApplicantUser {
  return !!user && user.type === UserType.Applicant;
}

export function isCompanyUser(user: ExistingUser | null): user is ExistingCompanyUser {
  return !!user && user.type === UserType.Company;
}

export function isAdminUser(user: ExistingUser | null): user is ExistingCompanyUser {
  return !!user && user.type === UserType.Admin;
}

export function hasRole(user: ExistingUser | null, roles: UserType[]): boolean {
  return !!user && roles.includes(user.type);
}