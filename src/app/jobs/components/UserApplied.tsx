import React from 'react'
import { useGetJobApplicationsByJobId } from '@/services/job-applications/JobApplicationsService'
import JobApplicationManager from '@/lib/JobApplicationManager'
import Job from '@/models/Job'
import User from '@/models/User'

interface UserAppliedProps {
  job: Job,
  user: User | null
}

const UserApplied: React.FC<UserAppliedProps> = ({ job, user }) => {
  const { data: jobApplications } = useGetJobApplicationsByJobId(job?.id || '')

  const jobApplicationManager = new JobApplicationManager(jobApplications || [], user?.id || '')

  const userCanApply = jobApplicationManager.canApply()

  return userCanApply ? null : <span>Applied</span>
}

export default UserApplied
