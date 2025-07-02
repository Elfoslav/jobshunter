import { ApplicantUser, CompanyUser, User, UserType } from "@/models/User";

export function isApplicantUser(user: User): user is ApplicantUser {
  return user.type === UserType.Applicant;
}

export function isCompanyUser(user: User): user is CompanyUser {
  return user.type === UserType.Company;
}

export function isAdminUser(user: User): user is CompanyUser {
  return user.type === UserType.Admin;
}

export function hasRole(user: User, roles: UserType[]): boolean {
  return roles.includes(user.type);
}