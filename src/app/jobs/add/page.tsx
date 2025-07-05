'use client';

import { Container, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import JobForm from '../components/JobForm';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import { useCreateJob } from '@/services/jobs/JobsService';
import { NewJob } from '@/models/Job';
import { useCompanyUser } from '@/app/context/UserContext';

export default function AddJob() {
  const router = useRouter();
  const { user } = useCompanyUser();
  const breadcrumbs = [{ link: '/', title: 'Jobs' }, { title: 'New job' }];
  const { mutate: createJob, isPending } = useCreateJob();

  const handleAdd = (job: NewJob) => {
    // TODO: do it on the server when it's available
    job.companyId = user?.companyData.id;
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

        {isPending && (
          <div className="text-center mt-4">
            <Spinner animation="border" role="status" />
            <div className="mt-2">Creating job…</div>
          </div>
        )}
      </Container>
    </div>
  );
}
