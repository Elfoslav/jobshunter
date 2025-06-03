import React from 'react';
import { Button } from 'react-bootstrap';

interface BackToJobsBtnProps {
  className?: string;
}

export default function BackToJobsBtn({
  className = 'mt-3 d-md-none d-block',
}: BackToJobsBtnProps) {
  return (
    <Button variant="outline-secondary" className={className} href="/">
      &laquo; Back to jobs
    </Button>
  );
}
