import EmploymentType from "./enums/EmploymentType"

export default interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  skills: Array<string>;
  preferences: {
    locations: string[]; // Locations where the user prefers to work
    remotePercentage: number; // Preferred remote work percentage
    employmentTypes: EmploymentType[]; // Preferred employment types
    salaryMin: number; // Minimum preferred salary
    salaryMax: number; // Maximum preferred salary
  };
  registeredAt: Date;
  updatedAt?: Date;
}