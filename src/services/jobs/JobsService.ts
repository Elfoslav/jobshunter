'use client';

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import JobsStore from './JobsStore';
import { ExistingJob, NewJob } from '@/models/Job';
import { ITEMS_PER_PAGE, JOBS_QUERIES } from '@/lib/consts';

const filterJobs = (
  data: ExistingJob[],
  searchQuery: string = '',
  skills: string[] = []
): ExistingJob[] => {
  let filteredJobs = data.sort(
    (job1, job2) => job2.postedAt.getTime() - job1.postedAt.getTime()
  );

  if (searchQuery) {
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        !!job.requiredSkills.find((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        !!job.optionalSkills.find((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }

  if (skills.length && skills[0] !== '') {
    filteredJobs = filteredJobs.filter((job) => {
      const jobSkills = [...job.requiredSkills, ...job.optionalSkills];
      return skills.every((skill) => jobSkills.includes(skill));
    });
  }

  return filteredJobs;
};

const getJobs = async (
  page: number,
  searchQuery: string = '',
  skills: string[]
): Promise<ExistingJob[]> => {
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const data: ExistingJob[] = JobsStore.read();
  let filteredJobs = filterJobs(data, searchQuery, skills);
  filteredJobs = filteredJobs.slice(offset, offset + ITEMS_PER_PAGE);
  return filteredJobs;
};

const getJobsCount = async (
  searchQuery: string,
  skills: string[]
): Promise<number> => {
  const data: ExistingJob[] = JobsStore.read();
  const filteredJobs = filterJobs(data, searchQuery, skills);
  return filteredJobs.length;
};

const getSimilarJobs = async (
  job: ExistingJob | null | undefined
): Promise<ExistingJob[]> => {
  if (!job) return [];
  const jobs: ExistingJob[] = await getJobs(1, '', []);
  return jobs.filter((_job) => {
    if (_job.id === job.id) return false;
    const hasCommonRequiredSkill = _job.requiredSkills.some((s) => job.requiredSkills.includes(s));
    const hasCommonOptionalSkill = _job.optionalSkills.some((s) => job.optionalSkills.includes(s));
    return hasCommonRequiredSkill || hasCommonOptionalSkill;
  });
};

const getJobById = async (id: string): Promise<ExistingJob | null> => {
  const jobs: ExistingJob[] = JobsStore.read();
  return jobs.find((job) => job.id === id) || null;
};

const getJobsByIds = async (ids: string[]): Promise<ExistingJob[]> => {
  const jobs: ExistingJob[] = JobsStore.read();
  return jobs.filter((job) => ids.includes(job.id));
};

const getJobsByCompanyId = async (companyId: string): Promise<ExistingJob[]> => {
  const jobs: ExistingJob[] = JobsStore.read();
  return jobs.filter((job) => job.companyId === companyId);
};

const createJob = async (newJob: NewJob): Promise<void> => {
  const jobWithId: ExistingJob = {
    ...newJob,
    id: crypto.randomUUID(),
  };
  JobsStore.create(jobWithId);
};

const updateJob = async (updatedJob: ExistingJob): Promise<void> => {
  JobsStore.update(updatedJob.id, updatedJob);
};

const deleteJob = async (jobId: string): Promise<void> => {
  JobsStore.delete(jobId);
};

export const useGetJobs = (
  page: number,
  searchQuery = '',
  skills: string[] = []
): UseQueryResult<ExistingJob[], unknown> & { count: number } => {
  const result = useQuery({
    queryKey: [JOBS_QUERIES.JOBS, page, searchQuery, skills],
    queryFn: () => getJobs(page, searchQuery, skills),
  });

  return {
    ...result,
    count: result.data?.length ?? 0,
  };
};

export const useGetJobsCount = (
  searchQuery: string = '',
  skills: string[] = []
): UseQueryResult<number, unknown> => {
  return useQuery({
    queryKey: [JOBS_QUERIES.JOBS_COUNT, searchQuery, skills],
    queryFn: () => getJobsCount(searchQuery, skills),
  });
};

export const useGetSimilarJobs = (job: ExistingJob | null | undefined): UseQueryResult<ExistingJob[], unknown> & { count: number } => {
  const result = useQuery({
    queryKey: [JOBS_QUERIES.SIMILAR_JOBS, job],
    queryFn: () => getSimilarJobs(job),
  });
  return { ...result, count: result.data?.length || 0 };
};

export const useGetJobById = (jobId: string): UseQueryResult<ExistingJob | null, unknown> => {
  return useQuery({
    queryKey: [JOBS_QUERIES.JOB_BY_ID, jobId],
    queryFn: () => getJobById(jobId),
  });
};

export const useGetJobsByIds = (jobsIds: string[]): UseQueryResult<ExistingJob[], unknown> => {
  return useQuery({
    queryKey: [JOBS_QUERIES.JOBS_BY_IDS, jobsIds],
    queryFn: () => getJobsByIds(jobsIds),
    initialData: [],
  });
};

export const useGetJobsByCompanyId = (companyId: string): UseQueryResult<ExistingJob[], unknown> => {
  return useQuery({
    queryKey: [JOBS_QUERIES.JOBS_BY_COMPANY_ID, companyId],
    queryFn: () => getJobsByCompanyId(companyId),
    initialData: [],
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, NewJob>({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [JOBS_QUERIES.JOBS] });
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateJob,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error('Error updating job:', error);
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
