'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import JobApplicationsStore from './JobApplicationsStore'
import JobApplication from '@/models/JobApplication'
import { JOB_APPLICATIONS_QUERIES } from '@/lib/consts'

const getJobApplications = async (): Promise<JobApplication[]> => {
  // const response = await axios.get<JobApplication[]>(API_URL)
  // return response.data
  const data: JobApplication[] = JobApplicationsStore.read()

  return Promise.resolve(data)
}

const getJobApplicationsCount = async (): Promise<number> => {
  const data: JobApplication[] = JobApplicationsStore.read()
  return Promise.resolve(data.length)
}

export const getJobApplicationById = async (id: string): Promise<JobApplication | null> => {
  // const response = await axios.get<JobApplication[]>(API_URL)
  // return response.data
  const applications: JobApplication[] = JobApplicationsStore.read()
  const application = applications.find((application) => application.id === id) || null

  return Promise.resolve(application)
}

export const getJobApplicationsByJobId = async (jobId: string): Promise<JobApplication[]> => {
  const applications: JobApplication[] = JobApplicationsStore.read()
  const jobApplications = applications.filter((application) => application.jobId === jobId)

  return Promise.resolve(jobApplications)
}

export const getJobApplicationsByUserId = async (userId: string): Promise<JobApplication[]> => {
  const applications: JobApplication[] = JobApplicationsStore.read()
  const jobApplications = applications.filter((application) => application.userId === userId)

  return Promise.resolve(jobApplications)
}

const createJobApplication = async (newJobApplication: JobApplication): Promise<void> => {
  // await axios.post(API_URL, newJobApplication)
  // data.push(newJobApplication)
  JobApplicationsStore.create(newJobApplication)
}

const updateJobApplication = async (updatedJobApplication: JobApplication): Promise<void> => {
  // await axios.put(`${API_URL}/${updatedJobApplication.id}`, updatedJobApplication)
  JobApplicationsStore.update(updatedJobApplication.id, updatedJobApplication)
}

const deleteJobApplication = async (applicationId: string): Promise<void> => {
  JobApplicationsStore.delete(applicationId)
}

export const useGetJobApplications = (page: number, searchQuery: string = '', skills: string[] = []) => {
  const result = useQuery<JobApplication[], unknown>([JOB_APPLICATIONS_QUERIES.JOB_APPLICATIONS, page, searchQuery, skills], async () => {
    return await getJobApplications()
  })
  return { ...result, count: result.data?.length }
}

export const useGetJobApplicationsCount = (searchQuery: string = '', skills: string[] = []) => {
  const result = useQuery<number, unknown>(
    [JOB_APPLICATIONS_QUERIES.JOB_APPLICATIONS_COUNT, searchQuery, skills],
    () => getJobApplicationsCount()
  )
  return { ...result }
}

export const useGetJobApplicationById = (applicationId: string) => {
  const result = useQuery<JobApplication | null, unknown>(
    [JOB_APPLICATIONS_QUERIES.JOB_APPLICATION_BY_ID, applicationId],
    () => getJobApplicationById(applicationId)
  )
  return result
}

export const useGetJobApplicationsByJobId = (jobId: string) => {
  const options = { initialData: [] }
  const result = useQuery<JobApplication[], unknown>(
    [JOB_APPLICATIONS_QUERIES.JOB_APPLICATIONS_BY_JOB_ID, jobId],
    async () => await getJobApplicationsByJobId(jobId),
    options,
  )
  return result
}

export const useGetJobApplicationsByUserId = (userId: string) => {
  const result = useQuery<JobApplication[], unknown>(
    [JOB_APPLICATIONS_QUERIES.JOB_APPLICATIONS_BY_USER_ID, userId],
    async () => await getJobApplicationsByUserId(userId),
  )

  return result
}

export const useCreateJobApplication = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, JobApplication>(createJobApplication, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [JOB_APPLICATIONS_QUERIES.JOB_APPLICATIONS] })
    },
  })
}

export const useUpdateJobApplication = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, JobApplication>(updateJobApplication, {
    onSuccess: () => {
      queryClient.invalidateQueries([])
    },
  })
}

export const useDeleteJobApplication = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, string>(deleteJobApplication, {
    onSuccess: () => {
      queryClient.invalidateQueries([])
    },
  })
}