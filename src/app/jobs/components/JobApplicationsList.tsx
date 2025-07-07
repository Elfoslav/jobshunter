'use client';

import React from 'react';
import Link from 'next/link';
import { Card, Spinner } from 'react-bootstrap';
import JobApplication from '@/models/JobApplication';
import { formatDate } from '@/lib/functions';
import { useGetApplicantsByIds } from '@/services/users/UsersService';

interface JobApplicationsListProps {
  jobApplications: JobApplication[];
  className?: string;
}

export default function JobApplicationsList({
  jobApplications,
  className,
}: JobApplicationsListProps) {
  const usersIds = jobApplications.map(
    (jobApplication) => jobApplication.userId
  );
  const { data: applicants, isLoading } = useGetApplicantsByIds(usersIds);

  const getApplicantName = (userId: string) => {
    const user = applicants?.find((u) => u.id === userId);
    return user ? user.name : 'Unknown';
  };

  if (!jobApplications.length) return null;

  return (
    <Card className={className}>
      <Card.Body>
        <h3 className="fs-5 mb-3">Job applications</h3>

        {isLoading && <Spinner animation="border" />}

        {jobApplications.map((jobApplication) => (
          <div key={jobApplication.id} className="mb-1">
            <Link
              href={`/applicants/${jobApplication.userId}`}
              className="text-decoration-none"
            >
              <strong>{getApplicantName(jobApplication.userId)}</strong> —{' '}
              {formatDate(jobApplication.createdAt)} | {jobApplication.status}
            </Link>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}
