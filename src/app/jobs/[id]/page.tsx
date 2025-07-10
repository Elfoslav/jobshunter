'use client';

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
import { GeoAltFill, CashCoin } from 'react-bootstrap-icons';
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
import { useRouter } from 'next/navigation';
import RemotePercentage from '../components/RemotePercentage';
import SimilarJobs from '../components/SimilarJobs';
import BackToJobsBtn from '../components/BackToJobsBtn';
import Link from 'next/link';
import Loading from '@/app/components/Loading';
import { isApplicantUser } from '@/lib/utils/user';
import CanAccess from '@/app/components/CanAccess';
import { UserType } from '@/models/User';
import ResourceType from '@/models/enums/ResourceType';
import JobApplicationsPreview from '../components/JobApplicationsPreview';

export default function JobsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const queryClient = useQueryClient();
  const createJobApplication = useCreateJobApplication();
  const { showNotification } = useNotification();
  const { id } = use(params);
  const { data: job, isLoading } = useGetJobById(id);
  const { data: similarJobs } = useGetSimilarJobs(job);
  const { data: jobApplications = [] } = useGetJobApplicationsByJobId(
    job?.id || ''
  );
  const { user } = useUser();
  const router = useRouter();
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
      const jobId = job.id;

      if (!jobId) {
        console.error('Job ID is missing. Cannot create application.');
        return;
      }

      setSubmitting(true);

      // Simulate request - response
      setTimeout(() => {
        createJobApplication.mutate(
          {
            id: '',
            jobId,
            userId: user.id,
            coverLetter: '', // empty for now
            status: ApplicationStatus.Submitted,
            note: '',
            createdAt: new Date(),
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: [
                  JOB_APPLICATIONS_QUERIES.JOB_APPLICATIONS_BY_JOB_ID,
                  job.id,
                ],
              });
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
    return <Loading />;
  }

  if (!job) {
    return <Container>No job found with given ID: {id}</Container>;
  }

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />

      <Container className="mb-4">
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                {/* Header: Company, Title, PostedAt */}
                <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                  <div>
                    <h3 className="fs-4 mb-0">
                      <Link href={`/companies/${job.companyId}`}>
                        {job.company}
                      </Link>
                    </h3>
                  </div>
                  <small className="text-muted">
                    {getAgoString(job.postedAt)}
                  </small>
                </div>

                {/* Location + Remote */}
                <div className="d-flex flex-wrap gap-3 mb-2 text-muted">
                  <div className="d-flex align-items-center">
                    <GeoAltFill className="me-1" />
                    {job.location}
                  </div>
                  <div className="d-flex align-items-center">
                    <RemotePercentage remotePercentage={job.remotePercentage} />
                  </div>
                </div>

                {/* Salary */}
                <div className="mb-2">
                  <CashCoin className="me-1 text-success" />
                  <strong>
                    {job.salaryMin} - {job.salaryMax} {job.currency}
                  </strong>{' '}
                  / month
                </div>

                {/* Employment Types */}
                <div className="mb-2">
                  <strong>Type: </strong>
                  <span className="text-muted">
                    {job.employmentTypes.join(', ')}
                  </span>
                </div>

                <h3 className="fs-5">Required skills:</h3>
                <Skills skillsIds={job.requiredSkills} user={user} primary />

                <h3 className="fs-5 mt-2">Nice to have skills:</h3>
                <Skills skillsIds={job.optionalSkills} user={user} />

                {/* Applications Count */}
                <div className="text-muted mt-2">
                  <strong>{jobApplications.length}</strong>{' '}
                  {getSingularOrPlural('Applicant', jobApplications.length)}
                </div>
              </Card.Body>
            </Card>

            <CanAccess
              user={user}
              requiredRole={[UserType.Admin, UserType.Company]}
              resourceType={ResourceType.Company}
              resourceId={job.companyId}
            >
              {jobApplications && jobApplications.length > 0 && (
                <JobApplicationsPreview
                  className="mt-4"
                  jobApplications={jobApplications.slice(0, 3)}
                  totalApplicationsCount={jobApplications.length}
                  jobId={job.id}
                />
              )}
            </CanAccess>

            {similarJobs && similarJobs.length > 0 && (
              <SimilarJobs
                className="mt-4 d-none d-md-block"
                similarJobs={similarJobs}
              />
            )}

            <BackToJobsBtn className="mt-3 d-none d-md-block" />
          </Col>
          <Col md={8}>
            <Card className="mt-4 mt-md-0">
              <Card.Body>
                <div
                  className="mt-1 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      job.description.replace(/\n/g, '<br />')
                    ),
                  }}
                />

                <Row>
                  {isApplicantUser(user) && (
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
                  )}
                  <CanAccess
                    user={user}
                    requiredRole={[UserType.Admin, UserType.Company]}
                    resourceType={ResourceType.Company}
                    resourceId={job.companyId}
                  >
                    <Col sm={12} md={5} lg={7}>
                      <div className="d-grid d-md-inline-block mt-3 mt-md-0">
                        <Button
                          size="lg"
                          variant="warning"
                          onClick={() => router.push(`/jobs/${id}/edit`)}
                        >
                          Edit
                        </Button>
                      </div>
                    </Col>
                  </CanAccess>
                </Row>
              </Card.Body>
            </Card>

            {similarJobs && similarJobs.length > 0 && (
              <SimilarJobs
                className="mt-4 d-md-none d-block"
                similarJobs={similarJobs}
              />
            )}

            <BackToJobsBtn className="mt-3 d-md-none d-block" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
