import JobApplicationStatus from './enums/JobApplicationStatus';

export default interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  coverLetter: string;
  status: JobApplicationStatus;
  cvUrl?: string;
  note?: string;
  rating?: number; // 1 - 5 stars
  createdAt: Date;
}
