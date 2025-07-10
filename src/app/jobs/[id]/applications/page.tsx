'use client';

import { use, useState } from 'react';
import { Accordion, Badge, Button, Col, Form, Row } from 'react-bootstrap';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  useGetJobApplicationsByJobId,
  useGetJobApplicationsCountByJobId,
} from '@/services/job-applications/JobApplicationsService';
import { ITEMS_PER_PAGE } from '@/lib/consts';
import Pagination from '@/app/components/Pagination';
import { useGetJobById } from '@/services/jobs/JobsService';
import { useGetApplicantsByIds } from '@/services/users/UsersService';
import { formatDate, getApplicationStatusColor } from '@/lib/functions';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import Loading from '@/app/components/Loading';
import JobApplication from '@/models/JobApplication';
import JobApplicationStatus from '@/models/enums/JobApplicationStatus';

export default function JobApplicationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const router = useRouter();
  const [editedApps, setEditedApps] = useState<
    Record<string, Partial<JobApplication>>
  >({});

  const { data: job, isLoading: jobIsLoading } = useGetJobById(id);
  const { data: applications = [], isLoading } = useGetJobApplicationsByJobId(
    id || ''
  );
  const { data: applicationsCount = 0 } = useGetJobApplicationsCountByJobId(
    id || ''
  );
  const usersIds = applications.map((app) => app.userId);
  const { data: applicants } = useGetApplicantsByIds(usersIds);

  const breadcrumbs = [
    { link: '/', title: 'Jobs' },
    { link: `/jobs/${job?.id}`, title: job?.title || '' },
    { title: 'Applications' },
  ];

  const getApplicant = (userId: string) => {
    return applicants?.find((u) => u.id === userId);
  };

  const handleChange = (
    id: string,
    field: keyof JobApplication,
    value: string
  ) => {
    setEditedApps((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`);
  };

  if (isLoading || jobIsLoading) {
    return <Loading />;
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="container mt-4">
        <Accordion>
          {applications.map((app, index) => {
            const applicant = getApplicant(app.userId);
            return (
              <Accordion.Item eventKey={index.toString()} key={app.id}>
                <Accordion.Header>
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <div>
                      <strong>{applicant?.name || 'Unknown'}</strong> &nbsp;
                      <small className="text-muted">
                        {formatDate(app.createdAt)}
                      </small>
                    </div>
                    <Badge
                      bg={getApplicationStatusColor(
                        editedApps[app.id]?.status ?? app.status
                      )}
                      className="me-2"
                    >
                      {editedApps[app.id]?.status ?? app.status}
                    </Badge>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                          value={editedApps[app.id]?.status ?? app.status ?? ''}
                          onChange={(e) =>
                            handleChange(
                              app.id,
                              'status',
                              e.target.value as JobApplicationStatus
                            )
                          }
                        >
                          {Object.values(JobApplicationStatus).map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Note</Form.Label>
                        <Form.Control
                          type="text"
                          value={
                            editedApps[app.id]?.note !== undefined
                              ? editedApps[app.id]?.note
                              : (app.note ?? '')
                          }
                          onChange={(e) =>
                            handleChange(app.id, 'note', e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <hr />

                  <Row>
                    <Col>
                      <strong>Email:</strong> {applicant?.email || 'N/A'} <br />
                      <strong>Phone:</strong> {applicant?.phone || 'N/A'} <br />
                      <strong>Cover Letter:</strong>
                      <p>{app.coverLetter || '—'}</p>
                      {app.cvUrl && (
                        <p>
                          <a
                            href={app.cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View CV
                          </a>
                        </p>
                      )}
                      <Button href={`/applicants/${applicant?.id}`}>
                        View Full Profile
                      </Button>
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>

        <div className="mt-4 d-flex justify-content-center">
          <Pagination
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={applicationsCount}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
