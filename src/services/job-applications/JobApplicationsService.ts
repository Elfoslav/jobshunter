'use client';

import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import JobApplicationsStore from './JobApplicationsStore';
import JobApplication from '@/models/JobApplication';
import { JOB_APPLICATIONS_QUERIES } from '@/lib/consts';

// ======= Core Fetchers =======
const getJobApplications = async (): Promise<JobApplication[]> => {
  return JobApplicationsStore.read();
};

const getJobApplicationsCount = async (): Promise<number> => {
  return JobApplicationsStore.read().length;
};

export const getJobApplicationById = async (
  id: string
): Promise<JobApplication | null> => {
  const apps = JobApplicationsStore.read();
  return apps.find((app) => app.id === id) || null;
};

export const getJobApplicationsByJobId = async (
  jobId: string
): Promise<JobApplication[]> => {
  return JobApplicationsStore.read().filter((app) => app.jobId === jobId);
};

export const getJobApplicationsByUserId = async (
  userId: string
): Promise<JobApplication[]> => {
  return JobApplicationsStore.read().filter((app) => app.userId === userId);
};

const createJobApplication = async (newApp: JobApplication): Promise<void> => {
  JobApplicationsStore.create(newApp);
};

const updateJobApplication = async (app: JobApplication): Promise<void> => {
  JobApplicationsStore.update(app.id, app);
};

const deleteJobApplication = async (id: string): Promise<void> => {
  JobApplicationsStore.delete(id);
};

// ======= Queries =======
export const useGetJobApplications = () => {
  const result = useSuspenseQuery({
    queryKey: [JOB_APPLICATIONS_QUERIES.JOB_APPLICATIONS],
    queryFn: getJobApplications,
  });

  return {
    ...result,
    count: result.data.length,
  };
};

export const useGetJobApplicationsCount = () => {
  return useQuery({
    queryKey: [JOB_APPLICATIONS_QUERIES.JOB_APPLICATIONS_COUNT],
    queryFn: getJobApplicationsCount,
  });
};

export const useGetJobApplicationById = (applicationId: string) => {
  return useSuspenseQuery({
    queryKey: [JOB_APPLICATIONS_QUERIES.JOB_APPLICATION_BY_ID, applicationId],
    queryFn: () => getJobApplicationById(applicationId),
  });
};

export const useGetJobApplicationsByJobId = (jobId: string) => {
  return useSuspenseQuery({
    queryKey: [JOB_APPLICATIONS_QUERIES.JOB_APPLICATIONS_BY_JOB_ID, jobId],
    queryFn: () => getJobApplicationsByJobId(jobId),
  });
};

export const useGetJobApplicationsByUserId = (userId: string) => {
  return useQuery({
    queryKey: [JOB_APPLICATIONS_QUERIES.JOB_APPLICATIONS_BY_USER_ID, userId],
    queryFn: () => getJobApplicationsByUserId(userId),
  });
};

// ======= Mutations =======
export const useCreateJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJobApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [JOB_APPLICATIONS_QUERIES.JOB_APPLICATIONS],
      });
    },
  });
};

export const useUpdateJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateJobApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [JOB_APPLICATIONS_QUERIES.JOB_APPLICATIONS],
      });
    },
  });
};

export const useDeleteJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJobApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [JOB_APPLICATIONS_QUERIES.JOB_APPLICATIONS],
      });
    },
  });
};
