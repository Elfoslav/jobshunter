import { Suspense } from 'react';
import JobsContent from './components/JobsContent';
import Loading from '@/app/components/Loading';

export default function CompaniesRoute() {
  return (
    <Suspense fallback={<Loading />}>
      <JobsContent />
    </Suspense>
  );
}
