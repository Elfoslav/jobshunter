'use client';

import Link from 'next/link';
import { use, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Container,
  Button,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { GeoAltFill, GlobeAmericas, CashCoin } from 'react-bootstrap-icons';
import DOMPurify from 'dompurify';
import { useGetJobById, useGetSimilarJobs } from '@/services/jobs/JobsService';
import {
  useCreateJobApplication,
  useGetJobApplicationsByJobId,
} from '@/services/job-applications/JobApplicationsService';
import Skills from '../components/Skills';
import { formatDate, getAgoString, getSingularOrPlural } from '@/lib/functions';
import { useUser } from '@/app/context/UserContext';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import { useNotification } from '@/app/context/NotificationContext';
import ApplicationStatus from '@/models/enums/JobApplicationStatus';
import JobApplicationManager from '@/lib/JobApplicationManager';
import { useQueryClient } from '@tanstack/react-query';
import { JOB_APPLICATIONS_QUERIES } from '@/lib/consts';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const queryClient = useQueryClient();
  const createJobApplication = useCreateJobApplication();
  const { showNotification } = useNotification();
  const { id } = use(params);
  const { data: job, isLoading } = useGetJobById(id);
  const { data: similarJobs } = useGetSimilarJobs(job);
  const { data: jobApplications } = useGetJobApplicationsByJobId(job?.id || '');
  const { user } = useUser();
  const jobAplicationManager = new JobApplicationManager(
    jobApplications,
    user?.id || ''
  );
  let canApply = jobAplicationManager.canApply();
  const [submitting, setSubmitting] = useState(false);
  const breadcrumbs = [
    { link: '/', title: 'Jobs' },
    { title: job?.title || '' },
  ];

  const getUserApplicationDate = () => {
    const userJobApplication = jobApplications.find(
      (item) => item.userId === user?.id
    );
    if (userJobApplication) {
      return formatDate(userJobApplication.createdAt);
    }

    return '';
  };

  const onJobApply = () => {
    if (job && user) {
      setSubmitting(true);

      // Simulate request - response
      setTimeout(() => {
        createJobApplication.mutate(
          {
            id: '',
            jobId: job.id,
            userId: user.id,
            coverLetter: '', // empty for now
            status: ApplicationStatus.Submitted,
            note: '',
            createdAt: new Date(),
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries([
                JOB_APPLICATIONS_QUERIES.JOB_APPLICATIONS_BY_JOB_ID,
                job.id,
              ]);
              setSubmitting(false);
            },
            onError: () => {
              showNotification('An error occured, try again.', 'danger');
              setSubmitting(false);
            },
          }
        );
      }, 600);
    }
  };

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  if (!job) {
    return <Container>No job found with given ID: {params.id}</Container>;
  }

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />

      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h1>{job.title}</h1>
              <div>{job.company}</div>
              <div className="d-flex gap-3">
                <div className="d-flex align-items-center mb-1">
                  <GeoAltFill className="me-1" /> {job.location}
                </div>
                {job.isRemote && (
                  <div className="d-flex align-items-center mb-1">
                    <GlobeAmericas className="me-1" /> Remote{' '}
                    {job.remotePercentage}%
                  </div>
                )}
              </div>

              <div>
                <CashCoin /> ${job.salaryMin} - ${job.salaryMax}
              </div>

              <div className="mt-1 text-bold">
                {job.employmentTypes.map((employmentType, i) => (
                  <span key={i}>
                    {employmentType}
                    {job.employmentTypes.length !== i + 1 ? ', ' : ''}
                  </span>
                ))}
              </div>

              <Skills
                skills={job.requiredSkills}
                user={user}
                primary
                className="mt-2"
              />
              <Skills
                skills={job.optionalSkills}
                user={user}
                className="mt-3 mb-2"
              />

              {similarJobs && similarJobs.length > 0 && (
                <div className="mt-3">
                  <h3 className="text-smaller">Similar jobs</h3>
                  {similarJobs.map((similarJob) => (
                    <div key={similarJob.id}>
                      <Link href={`/jobs/${similarJob.id}`}>
                        {similarJob.title}
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-2">{getAgoString(job.postedAt)}</div>

              <div className="mt-2">
                {jobApplications.length}{' '}
                {getSingularOrPlural('Applicant', jobApplications.length)}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mt-4 mt-md-0">
            <Card.Body>
              <div
                className="mt-1"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(job.description),
                }}
              />

              <Row>
                <Col sm={12} md={7} lg={5}>
                  <div className="d-grid gap-2">
                    {canApply ? (
                      <Button
                        size="lg"
                        onClick={onJobApply}
                        disabled={submitting}
                      >
                        {submitting ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          'Apply for this job'
                        )}
                      </Button>
                    ) : (
                      <Alert variant="primary">
                        Your application has been sent. (
                        {getUserApplicationDate()})
                      </Alert>
                    )}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
