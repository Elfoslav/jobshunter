import { Suspense } from 'react';
import CompaniesContent from './components/ApplicantsContent';
import Loading from '@/app/components/Loading';

export default function CompaniesRoute() {
  return (
    <Suspense fallback={<Loading />}>
      <CompaniesContent />
    </Suspense>
  );
}
