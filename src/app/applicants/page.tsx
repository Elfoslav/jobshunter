import { Suspense } from 'react';
import ApplicantsContent from './components/ApplicantsContent';
import Loading from '@/app/components/Loading';

export default function CompaniesRoute() {
  return (
    <Suspense fallback={<Loading />}>
      <ApplicantsContent />
    </Suspense>
  );
}
