import { ApplicantUser, CompanyUser, User, UserType } from "@/models/User";

export function isApplicantUser(user: User | null): user is ApplicantUser {
  return !!user && user.type === UserType.Applicant;
}

export function isCompanyUser(user: User | null): user is CompanyUser {
  return !!user && user.type === UserType.Company;
}

export function isAdminUser(user: User | null): user is CompanyUser {
  return !!user && user.type === UserType.Admin;
}

export function hasRole(user: User | null, roles: UserType[]): boolean {
  return !!user && roles.includes(user.type);
}