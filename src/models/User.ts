import { Company } from './Company';
import EmploymentType from './enums/EmploymentType';
import { ApplicantSkill } from './Skill';

export enum UserType {
  Admin = 'Admin',
  Company = 'Company',
  Applicant = 'Applicant',
}

export interface BaseUser {
  email: string;
  password?: string; // optional if using external auth
  createdAt?: Date;
  updatedAt?: Date;
  type: UserType;
}

// --- Generic Helpers ---
export type ExistingBaseUser<T extends BaseUser = BaseUser> = T & {
  id: string;
  createdAt: Date;
};

export type NewBaseUser<T extends BaseUser = BaseUser> = Omit<T, 'createdAt'> & {
  id?: never; // new users cannot set id
  createdAt?: Date; // server/store assigns this
};

// --- Shared Value Objects ---
interface Experience {
  company: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear?: number;
}

interface ProfileLink {
  label: string;
  url: string;
}

interface Language {
  name: string;
  proficiency: 'Basic' | 'Intermediate' | 'Fluent' | 'Native';
}

export interface Preferences {
  locations: string[];
  remotePercentage: number;
  employmentTypes: EmploymentType[];
  salaryMin: number;
  salaryMax: number;
}

// --- Users ---
export interface ApplicantUser extends BaseUser {
  name: string;
  phone?: string;
  bio?: string;
  location?: string;
  skills?: ApplicantSkill[];
  preferences?: Preferences;
  experience?: Experience[];
  education?: Education[];
  resumeUrl?: string;
  portfolioUrl?: string;
  links?: ProfileLink[];
  languages?: Language[];
  availabilityDate?: Date;
  preferredRoles?: string[];
  softSkills?: string[];
  isVisible?: boolean;
  isOpenToWork?: boolean;
}

export type NewApplicantUser = NewBaseUser<ApplicantUser>;
export type ExistingApplicantUser = ExistingBaseUser<ApplicantUser>;

export interface CompanyUser extends BaseUser {
  companyData?: Company;
}

export type NewCompanyUser = NewBaseUser<CompanyUser>;
export type ExistingCompanyUser = ExistingBaseUser<CompanyUser>;

// --- Union Types ---
export type NewUser = NewApplicantUser | NewCompanyUser;
export type ExistingUser = ExistingApplicantUser | ExistingCompanyUser;
