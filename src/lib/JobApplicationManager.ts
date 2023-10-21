import JobApplication from "@/models/JobApplication";

class JobApplicationManager {
  private jobApplications: JobApplication[];
  private userId: string;

  constructor(jobApplications: JobApplication[], userId: string) {
    this.jobApplications = jobApplications;
    this.userId = userId;
  }

  canApply(): boolean {
    return !this.jobApplications.some((application) => application.userId === this.userId);
  }
}

export default JobApplicationManager;