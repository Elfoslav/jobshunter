import EmploymentType from './enums/EmploymentType';

interface JobBase {
  title: string;
  company: string;
  companyId?: string;
  location: string;
  remotePercentage: number;
  description: string;
  requiredSkills: string[];
  optionalSkills: string[];
  salaryMin: number;
  salaryMax: number;
  currency: string;
  employmentTypes: EmploymentType[];
  postedAt: Date;
  updatedAt?: Date;
  isActive: boolean;
}

// No id before creation
export interface NewJob extends JobBase {
  // No ID yet
}

// Always has id after creation or when editing
export interface ExistingJob extends JobBase {
  id: string;
}
