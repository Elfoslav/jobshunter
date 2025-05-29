'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import JobsStore from './JobsStore'
import { ExistingJob, NewJob } from '@/models/Job'
import { JOBS_PER_PAGE, JOBS_QUERIES } from '@/lib/consts'

const filterJobs = (data: ExistingJob[], searchQuery: string = '', skills: string[] = []): ExistingJob[] => {
  let filteredJobs = data.sort((job1, job2) => job2.postedAt.getTime() - job1.postedAt.getTime())

  if (searchQuery) {
    filteredJobs = filteredJobs.filter((job) => (
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      !!job.requiredSkills.find((item) => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
      !!job.optionalSkills.find((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
    ))
  }

  if (skills.length && skills[0] !== '') {
    filteredJobs = filteredJobs.filter((job) => {
      const jobSkills = [...job.requiredSkills, ...job.optionalSkills]
      return skills.every(skill => jobSkills.includes(skill))
    })
  }

  return filteredJobs
}

const getJobs = async (page: number, searchQuery: string = '', skills: string[]): Promise<ExistingJob[]> => {
  // const response = await axios.get<Job[]>(API_URL)
  // return response.data
  const offset = (page - 1) * JOBS_PER_PAGE
  const data: ExistingJob[] = JobsStore.read()
  let filteredJobs = filterJobs(data, searchQuery, skills)

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

const getJobsCount = async (searchQuery: string, skills: string[]): Promise<number> => {
  const data: ExistingJob[] = JobsStore.read()
  const filteredJobs = filterJobs(data, searchQuery, skills)
  return Promise.resolve(filteredJobs.length)
}

const getSimilarJobs = async (job: ExistingJob | null | undefined): Promise<ExistingJob[]> => {
  if (!job) {
    return Promise.resolve([])
  }

  const jobs: ExistingJob[] = await getJobs(1, '', [])

  let filteredJobs = jobs.filter((_job) => {
    if (_job.id === job.id) {
      // Exclude the job being compared
      return false
    }

    const hasCommonRequiredSkill = _job.requiredSkills.some((requiredSkills) => job.requiredSkills.includes(requiredSkills))
    const hasCommonOptionalSkill = _job.optionalSkills.some((optionalSkills) => job.optionalSkills.includes(optionalSkills))

    return hasCommonRequiredSkill || hasCommonOptionalSkill
  })

  return filteredJobs
}

const getJobById = async (id: string): Promise<ExistingJob | null> => {
  const jobs: ExistingJob[] = JobsStore.read()
  const job = jobs.find((job) => job.id === id) || null

  return Promise.resolve(job)
}

const getJobsByIds = async (ids: string[]): Promise<ExistingJob[]> => {
  const jobs: ExistingJob[] = JobsStore.read()
  const filteredJobs = jobs.filter((job) => ids.includes(job.id))

  return Promise.resolve(filteredJobs)
}

const createJob = async (newJob: NewJob): Promise<void> => {
  // await axios.post(API_URL, newJob)
  // data.push(newJob)

  // Store needs existingJob with ID
  const jobWithId: ExistingJob = {
    ...newJob,
    id: crypto.randomUUID(), // Temporary, Id will be re-created in the store.create
  }

  JobsStore.create(jobWithId)
}

const updateJob = async (updatedJob: ExistingJob): Promise<void> => {
  // await axios.put(`${API_URL}/${updatedJob.id}`, updatedJob)
  JobsStore.update(updatedJob.id, updatedJob)
}

const deleteJob = async (jobId: string): Promise<void> => {
  // await axios.delete(`${API_URL}/${jobId}`)
  JobsStore.delete(jobId)
}

export const useGetJobs = (page: number, searchQuery: string = '', skills: string[] = []) => {
  const result = useQuery<ExistingJob[], unknown>([JOBS_QUERIES.JOBS, page, searchQuery, skills], async () => {
    return await getJobs(page, searchQuery, skills)
  })
  return { ...result, count: result.data?.length }
}

export const useGetJobsCount = (searchQuery: string = '', skills: string[] = []) => {
  const result = useQuery<number, unknown>([JOBS_QUERIES.JOBS_COUNT, searchQuery, skills], () => getJobsCount(searchQuery, skills))
  return { ...result }
}

export const useGetSimilarJobs = (job: ExistingJob | null | undefined) => {
  const result = useQuery<ExistingJob[], unknown>([JOBS_QUERIES.SIMILAR_JOBS, job], () => getSimilarJobs(job))
  return { ...result, count: result.data?.length }
}

export const useGetJobById = (jobId: string) => {
  const result = useQuery<ExistingJob | null, unknown>([JOBS_QUERIES.JOB_BY_ID, jobId], () => getJobById(jobId))
  return result
}

export const useGetJobsByIds = (jobsIds: string[]) => {
  const options = { initialData: [] }
  const result = useQuery<ExistingJob[], unknown>(
    [JOBS_QUERIES.JOB_BY_ID, jobsIds],
    () => getJobsByIds(jobsIds),
    options,
  )
  return result
}

export const useCreateJob = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, NewJob>(createJob, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [JOBS_QUERIES.JOBS] })
    },
  })
}

export const useUpdateJob = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, ExistingJob>(updateJob, {
    onSuccess: () => {
      queryClient.invalidateQueries([])
    },
    onError: (error) => {
      console.error('Error updating job:', error)
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