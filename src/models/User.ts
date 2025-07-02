import { Company } from './Company';
import EmploymentType from './enums/EmploymentType';

export enum UserType {
  Admin = 'Admin',
  Company = 'Company',
  Applicant = 'Applicant',
}

interface BaseUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredAt: Date;
  updatedAt?: Date;
  type: UserType;
}

export interface ApplicantUser extends BaseUser {
  bio: string;
  skills?: string[];
  location?: string;
  preferences: {
    locations: string[];
    remotePercentage: number;
    employmentTypes: EmploymentType[];
    salaryMin: number;
    salaryMax: number;
  };
}

export interface CompanyUser extends BaseUser {
  companyData: Company;
}

export type User = ApplicantUser | CompanyUser;
