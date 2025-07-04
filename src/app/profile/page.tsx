'use client';

import Link from 'next/link';
import { useApplicantUser } from '../context/UserContext';
import {
  Card,
  Row,
  Col,
  Badge,
  Container,
  ListGroup,
  Button,
} from 'react-bootstrap';
import { useGetJobApplicationsByUserId } from '@/services/job-applications/JobApplicationsService';
import { formatDate } from '@/lib/functions';
import { useGetJobsByIds } from '@/services/jobs/JobsService';
import { ExistingJob } from '@/models/Job';
import Loading from '../components/Loading';
import DOMPurify from 'dompurify';
import CanAccess from '../components/CanAccess';
import { UserType } from '@/models/User';

export default function UserProfile() {
  const { user, isLoading: isUserLoading, isInitialized } = useApplicantUser();
  const { data: jobApplications, isLoading: isJobsLoading } =
    useGetJobApplicationsByUserId(user?.id || '');
  const { data: jobs = [] } = useGetJobsByIds(
    jobApplications?.map((item) => item.jobId) || []
  );

  const getJobById = (jobId: string): ExistingJob | undefined => {
    return jobs.find((job) => job.id === jobId);
  };

  if (!isInitialized || isUserLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Container>No user found.</Container>;
  }

  return (
    <Container className="mb-4 mx-0">
      {/* User Info Card */}
      <Card className="mb-4 shadow">
        <Card.Header>
          <h2 className="fs-4 mt-1 mb-1">Your profile</h2>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <h4>{user?.name}</h4>
              <p>
                {user?.registeredAt && (
                  <>
                    <strong>Registered:</strong> {formatDate(user.registeredAt)}
                    <br />
                  </>
                )}
                {user?.updatedAt && (
                  <>
                    <strong>Updated:</strong> {formatDate(user.updatedAt)}
                    <br />
                  </>
                )}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
                <br />
                <strong>Phone:</strong> {user?.phone}
                <br />
                <strong>Location:</strong> {user?.location}
              </p>
              <strong>Preferences:</strong>
              <br />
              Locations: {user?.preferences?.locations.join(', ') || 'N/A'}
              <br />
              Remote: {user?.preferences?.remotePercentage}% <br />
              Employment Types:{' '}
              {user?.preferences?.employmentTypes.join(', ') || 'N/A'}
              <br />
              Salary: ${user?.preferences?.salaryMin} – $
              {user?.preferences?.salaryMax}
            </Col>
            <Col md={8}>
              <strong>Bio:</strong> <br />
              <div
                className="mt-1 mb-4"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    user?.bio?.replace(/\n/g, '<br />') || ''
                  ),
                }}
              />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <strong>Skills:</strong>{' '}
              {user?.skills?.length ? (
                user.skills.map((skill) => (
                  <Badge bg="primary" key={skill} className="me-1">
                    {skill}
                  </Badge>
                ))
              ) : (
                <span>None</span>
              )}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col></Col>
          </Row>

          <CanAccess
            user={user}
            requiredRole={[UserType.Admin, UserType.Applicant]}
          >
            <div className="mt-2">
              <Button variant="warning" href="/profile/edit">
                Edit your profile
              </Button>
            </div>
          </CanAccess>
        </Card.Body>
      </Card>

      {isJobsLoading ? (
        <div>Loading job applications...</div>
      ) : (
        <div className="mt-3">
          {jobApplications?.length ? (
            <Card>
              <Card.Header>
                <h3 className="fs-4 mt-1 mb-1">Your Job Applications</h3>
              </Card.Header>
              <ListGroup variant="flush">
                {jobApplications?.map((jobApplication) => {
                  const job = getJobById(jobApplication.jobId);
                  return (
                    <ListGroup.Item key={jobApplication.id}>
                      <div className="d-flex justify-content-between">
                        <h5>
                          <Link href={`/jobs/${job?.id}`}>
                            {job ? job.title : 'Job not found'}
                          </Link>
                        </h5>
                        <div>
                          Applied on: {formatDate(jobApplication.createdAt)}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div>
                          <h5>{job?.company}</h5>
                        </div>
                        <div>
                          <div>
                            Status: <b>{jobApplication.status}</b>
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card>
          ) : (
            <p>No applications.</p>
          )}
        </div>
      )}
    </Container>
  );
}
