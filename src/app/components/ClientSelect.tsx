'use client';

import dynamic from 'next/dynamic';
import type { Props as SelectProps } from 'react-select';

const Select = dynamic(() => import('react-select'), {
  ssr: false,
  loading: () => (
    <div
      style={{ height: 40 }}
      className="d-flex align-items-center bg-light rounded"
    >
      Loading select...
    </div>
  ),
});

export default function ClientSelect(props: SelectProps) {
  return <Select {...props} />;
}
