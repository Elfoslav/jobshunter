import { Suspense } from 'react';
import ApplicantsContent from './components/ApplicantsContent';
import Loading from '@/app/components/Loading';

export default function ApplicantsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ApplicantsContent />
    </Suspense>
  );
}
