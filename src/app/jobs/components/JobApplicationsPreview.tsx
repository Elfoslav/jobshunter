'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Card, Spinner, Badge } from 'react-bootstrap';
import JobApplication from '@/models/JobApplication';
import { formatDate, getApplicationStatusColor } from '@/lib/functions';
import { useGetApplicantsByIds } from '@/services/users/UsersService';

interface JobApplicationsPreviewProps {
  jobApplications: JobApplication[];
  totalApplicationsCount: number;
  jobId: string;
  className?: string;
}

export default function JobApplicationsPreview({
  jobApplications,
  totalApplicationsCount,
  jobId,
  className,
}: JobApplicationsPreviewProps) {
  const usersIds = jobApplications.map((app) => app.userId);
  const { data: applicants, isLoading } = useGetApplicantsByIds(usersIds);

  const getApplicantName = (userId: string): string => {
    const user = applicants?.find((u) => u.id === userId);
    return user ? user.name : 'Unknown';
  };

  if (!jobApplications.length) return null;

  return (
    <Card className={className}>
      <Card.Body>
        <h5 className="mb-4">
          Recent Applications ({jobApplications.length} of{' '}
          {totalApplicationsCount})
        </h5>

        {isLoading && (
          <div className="d-flex justify-content-center my-3">
            <Spinner animation="border" />
          </div>
        )}

        <div className="d-flex flex-column gap-1">
          {jobApplications.map((app) => (
            <div
              key={app.id}
              className="d-flex justify-content-between align-items-start"
            >
              <div className="flex-grow-1">
                <Link
                  href={`/applicants/${app.userId}`}
                  className="fw-semibold text-decoration-none"
                >
                  {getApplicantName(app.userId)}
                </Link>
                <div className="text-muted small">
                  {formatDate(app.createdAt)}
                </div>
              </div>

              <Badge bg={getApplicationStatusColor(app.status)}>
                {app.status}
              </Badge>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Link href={`/jobs/${jobId}/applications`} passHref>
            <Button>View All Applications</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}
