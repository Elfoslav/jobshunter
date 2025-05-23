'use client';

import dynamic from 'next/dynamic';
import type { Props as SelectProps } from 'react-select';

const Select = dynamic(() => import('react-select'), { ssr: false });

export default function ClientSelect(props: SelectProps) {
  return <Select {...props} />;
}
