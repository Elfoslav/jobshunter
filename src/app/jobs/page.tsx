import { Suspense } from 'react';
import JobsContent from './components/JobsContent';

export default function Jobs() {
  return (
    <Suspense fallback={<div>Loading jobs...</div>}>
      <JobsContent />
    </Suspense>
  );
}
