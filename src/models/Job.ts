import EmploymentType from "./enums/EmploymentType"

export default interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  isRemote?: boolean;
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