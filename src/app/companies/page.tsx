import { Suspense } from 'react';
import CompaniesContent from './components/CompaniesContent';
import Loading from '@/app/components/Loading';

export default function CompaniesRoute() {
  return (
    <Suspense fallback={<Loading />}>
      <CompaniesContent />
    </Suspense>
  );
}
