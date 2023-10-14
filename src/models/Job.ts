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
  employmentTypes: ('Full-Time' | 'Part-Time' | 'Contract' | 'Temporary' | 'Internship')[];
  postedAt: Date;
  updatedAt?: Date;
}