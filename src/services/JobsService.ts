'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import JobsStore from './JobsStore'
import Job from '@/models/Job'
import { JOBS_PER_PAGE, JOBS_QUERY_NAME } from '@/lib/consts'

const jobsStore = new JobsStore()

const getJobs = async (page: number, query: string = '', filterName: string = ''): Promise<Job[]> => {
  // const response = await axios.get<Job[]>(API_URL)
  // return response.data
  const offset = (page - 1) * JOBS_PER_PAGE
  const data: Job[] = jobsStore.read()
  let filteredJobs = data.sort((job1, job2) => job2.postedAt.getTime() - job1.postedAt.getTime())
  filteredJobs = filteredJobs.slice(offset, offset + JOBS_PER_PAGE)

  // if (query) {
  //   filteredJobs = data.filter(job => job.name.toLowerCase().includes(query.toLowerCase()))
  // }

  // if (filterName === FILTERS.OLDEST) {
  //   filteredJobs = filteredJobs.sort((a, b) => a.year - b.year)
  // }

  // if (filterName === FILTERS.SMALLEST) {
  //   filteredJobs = filteredJobs.sort((a, b) => a.size - b.size)
  // }

  // if (filterName === FILTERS.CHEAPEST) {
  //   filteredJobs = filteredJobs.sort((a, b) => a.price - b.price)
  // }

  return Promise.resolve(filteredJobs)
}

const getJobsCount = async (): Promise<number> => {
  const data: Job[] = jobsStore.read()
  return Promise.resolve(data.length)
}

const getSimilarJobs = async (job: Job | null | undefined): Promise<Job[]> => {
  if (!job) {
    return Promise.resolve([])
  }

  const jobs: Job[] = await getJobs(1)

  let filteredJobs = jobs.filter((_job) => {
    if (_job.id === job.id) {
      // Exclude the job being compared
      return false;
    }

    const hasCommonRequiredSkill = _job.requiredSkills.some((requiredSkills) => job.requiredSkills.includes(requiredSkills))
    const hasCommonOptionalSkill = _job.optionalSkills.some((optionalSkills) => job.optionalSkills.includes(optionalSkills))

    return hasCommonRequiredSkill || hasCommonOptionalSkill
  })

  return filteredJobs
}

const getJobById = async (id: string): Promise<Job | null> => {
  // const response = await axios.get<Job[]>(API_URL)
  // return response.data
  const jobs: Job[] = jobsStore.read()
  const job = jobs.find((job) => job.id === id) || null

  return Promise.resolve(job)
}

const createJob = async (newJob: Job): Promise<void> => {
  // await axios.post(API_URL, newJob)
  // data.push(newJob)
  jobsStore.create(newJob)
}

const updateJob = async (updatedJob: Job): Promise<void> => {
  // await axios.put(`${API_URL}/${updatedJob.id}`, updatedJob)
  jobsStore.update(updatedJob.id, updatedJob)
}

const deleteJob = async (jobId: string): Promise<void> => {
  // await axios.delete(`${API_URL}/${jobId}`)
  jobsStore.delete(jobId)
}

export const useGetJobs = (page: number, searchQuery: string = '', filterName: string = '') => {
  const result = useQuery<Job[], unknown>([JOBS_QUERY_NAME, page], async () => {
    return await getJobs(page, searchQuery, filterName)
  })
  return { ...result, count: result.data?.length }
}

export const useGetJobsCount = () => {
  const result = useQuery<number, unknown>(['jobs_count'], () => getJobsCount())
  return { ...result }
}

export const useGetSimilarJobs = (job: Job | null | undefined) => {
  const result = useQuery<Job[], unknown>(['similar_jobs', job], () => getSimilarJobs(job))
  return { ...result, count: result.data?.length }
}

export const useGetJobById = (jobId: string) => {
  const result = useQuery<Job | null, unknown>(['job', jobId], () => getJobById(jobId));
  return result;
};

export const useCreateJob = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, Job>(createJob, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [JOBS_QUERY_NAME] })
    },
  })
}

export const useUpdateJob = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, Job>(updateJob, {
    onSuccess: () => {
      queryClient.invalidateQueries([])
    },
  })
}

export const useDeleteJob = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, string>(deleteJob, {
    onSuccess: () => {
      queryClient.invalidateQueries([])
    },
  })
}