'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { ExistingJob } from '@/models/Job';

interface SimilarJobsProps {
  similarJobs: ExistingJob[];
  className?: string;
}

export default function SimilarJobsCard({
  similarJobs,
  className,
}: SimilarJobsProps) {
  if (!similarJobs.length) return null;

  return (
    <Card className={className}>
      <Card.Body>
        <h3 className="fs-5 mb-3">Similar Jobs</h3>
        {similarJobs.map((job) => (
          <div key={job.id} className="mb-1">
            <Link href={`/jobs/${job.id}`} className="text-decoration-none">
              {job.title}
            </Link>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}
