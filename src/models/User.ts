import EmploymentType from './enums/EmploymentType';

export enum UserType {
  Company = 'Company',
  Applicant = 'Applicant',
}

interface BaseUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  registeredAt: Date;
  updatedAt?: Date;
  type: UserType;
}

export interface ApplicantUser extends BaseUser {
  type: UserType.Applicant;
  bio: string;
  skills: string[];
  preferences: {
    locations: string[];
    remotePercentage: number;
    employmentTypes: EmploymentType[];
    salaryMin: number;
    salaryMax: number;
  };
}

export interface CompanyUser extends BaseUser {
  type: UserType.Company;
  companyName: string;
  website?: string;
  description?: string;
  logoUrl?: string;
  industry?: string;
  size?: number; // e.g. number of employees
}

export type User = ApplicantUser | CompanyUser;
