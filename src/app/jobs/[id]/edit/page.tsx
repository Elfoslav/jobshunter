'use client';

import { use } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import JobForm from '@/app/jobs/components/JobForm';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import { useUpdateJob, useGetJobById } from '@/services/jobs/JobsService';
import { ExistingJob } from '@/models/Job';

export default function EditJob({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const { data: job, isLoading } = useGetJobById(id);
  const breadcrumbs = [{ link: '/', title: 'Jobs' }, { title: 'Edit' }];
  const { mutate: updateJob, isLoading: isUpdating } = useUpdateJob();

  const handleEdit = (job: ExistingJob) => {
    const newJob: ExistingJob = {
      ...job,
      postedAt: new Date(),
    };

    updateJob(newJob, {
      onSuccess: () => {
        router.push('/jobs');
      },
      onError: (error) => {
        console.error('Failed to create job:', error);
        // optionally show a toast or error message
      },
    });
  };

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  if (!job) {
    return <Container>No job found with given ID: {id}</Container>;
  }

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      <Container>
        <JobForm onSubmit={handleEdit} isLoading={isUpdating} isEditing />

        {isUpdating && (
          <div className="text-center mt-4">
            <Spinner animation="border" role="status" />
            <div className="mt-2">Updating…</div>
          </div>
        )}
      </Container>
    </div>
  );
}
