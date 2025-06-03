'use client';

import { Container, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import JobForm from '../components/JobForm';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import { useCreateJob } from '@/services/jobs/JobsService';
import { ExistingJob, NewJob } from '@/models/Job';

export default function AddJob() {
  const router = useRouter();
  const breadcrumbs = [{ link: '/', title: 'Jobs' }, { title: 'New job' }];
  const { mutate: createJob, isLoading } = useCreateJob();

  const handleAdd = (job: NewJob) => {
    createJob(job, {
      onSuccess: () => {
        router.push('/jobs');
      },
      onError: (error) => {
        console.error('Failed to create job:', error);
        // optionally show a toast or error message
      },
    });
  };

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      <Container>
        <JobForm onSubmit={handleAdd} />

        {isLoading && (
          <div className="text-center mt-4">
            <Spinner animation="border" role="status" />
            <div className="mt-2">Creating job…</div>
          </div>
        )}
      </Container>
    </div>
  );
}
