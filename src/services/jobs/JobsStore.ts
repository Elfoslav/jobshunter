import Job from "@/models/Job"
import jobs from './JobsDummyData'

class JobsStore {
  private jobs: Job[] = []

  constructor() {
    if (typeof window !== "undefined") {
      this.jobs = [...jobs, ...JSON.parse(localStorage.getItem('jobs') || '[]')]
    }
  }

  private save(): void {
    if (typeof window !== "undefined") {
      localStorage.setItem('jobs', JSON.stringify(this.jobs))
    }
  }

  create(job: Job) {
    this.jobs.push(job)
    this.save()
  }

  read(): Job[] {
    return [...this.jobs]
  }

  update(id: string, updatedjob: Partial<Job>) {
    const index = this.jobs.findIndex((job) => job.id === id)
    if (index !== -1) {
      this.jobs[index] = { ...this.jobs[index], ...updatedjob }
      this.save()
    }
  }

  delete(id: string) {
    this.jobs = this.jobs.filter((job) => job.id !== id)
    this.save()
  }
}

export default JobsStore