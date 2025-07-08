import { Company } from './Company';
import EmploymentType from './enums/EmploymentType';
import { ApplicantSkill } from './Skill';

export enum UserType {
  Admin = 'Admin',
  Company = 'Company',
  Applicant = 'Applicant',
}

interface BaseUser {
  id: string;
  email: string;
  registeredAt: Date;
  updatedAt?: Date;
  type: UserType;
}

// Experience
interface Experience {
  company: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

// Education
interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear?: number;
}

// External link
interface ProfileLink {
  label: string;
  url: string;
}

interface Language {
  name: string;
  proficiency: 'Basic' | 'Intermediate' | 'Fluent' | 'Native';
}

export interface ApplicantUser extends BaseUser {
  name: string;
  phone: string;
  bio: string;
  location?: string;
  skills?: ApplicantSkill[];
  preferences: {
    locations: string[];
    remotePercentage: number;
    employmentTypes: EmploymentType[];
    salaryMin: number;
    salaryMax: number;
  };
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

export interface CompanyUser extends BaseUser {
  companyData: Company;
}

export type User = ApplicantUser | CompanyUser;
