import EmploymentType from "./enums/EmploymentType";

interface JobBase {
  title: string;
  company: string;
  location: string;
  remotePercentage?: number;
  description: string;
  requiredSkills: Array<string>;
  optionalSkills: Array<string>;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  employmentTypes: EmploymentType[];
  postedAt: Date;
  updatedAt?: Date;
}

// No id before creation
export interface NewJob extends JobBase {
  // No ID yet
}

// Always has id after creation or when editing
export interface ExistingJob extends JobBase {
  id: string;
}