import JobApplicationStatus from "./enums/JobApplicationStatus"

export default interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  coverLetter: string;
  status: JobApplicationStatus;
  note?: string;
  createdAt: Date;
}