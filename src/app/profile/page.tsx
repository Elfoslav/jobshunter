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
  Spinner,
  Button,
} from 'react-bootstrap';
import { useGetJobApplicationsByUserId } from '@/services/job-applications/JobApplicationsService';
import { formatDate } from '@/lib/functions';
import { useGetJobsByIds } from '@/services/jobs/JobsService';
import { ExistingJob } from '@/models/Job';

export default function UserShow() {
  const { user, isLoading: isUserLoading } = useApplicantUser();
  const { data: jobApplications, isLoading: isJobsLoading } =
    useGetJobApplicationsByUserId(user?.id || '');
  const { data: jobs = [] } = useGetJobsByIds(
    jobApplications?.map((item) => item.jobId) || []
  );

  const getJobById = (jobId: string): ExistingJob | undefined => {
    return jobs.find((job) => job.id === jobId);
  };

  if (isUserLoading) {
    return (
      <Container className="mt-2">
        <div style={{ marginLeft: '40px' }}>
          <Spinner animation="border" />
        </div>
        <p>Loading profile...</p>
      </Container>
    );
  }

  return (
    <Container className="mb-4">
      <h2>Your profile</h2>

      {/* User Info Card */}
      <Card className="mb-4 shadow">
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
              Locations: {user?.preferences.locations.join(', ') || 'N/A'}
              <br />
              Remote: {user?.preferences.remotePercentage}% <br />
              Employment Types:{' '}
              {user?.preferences.employmentTypes.join(', ') || 'N/A'}
              <br />
              Salary: ${user?.preferences.salaryMin} – $
              {user?.preferences.salaryMax}
            </Col>
            <Col md={8}>
              <p style={{ whiteSpace: 'pre-line' }}>
                <strong>Bio:</strong> <br />
                {user?.bio}
              </p>
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
          <div className="mt-3">
            <Button variant="warning" href="/profile/edit">
              Edit your profile
            </Button>
          </div>
        </Card.Body>
      </Card>

      {isJobsLoading ? (
        <div>Loading job applications...</div>
      ) : (
        <div className="mt-3">
          <h3>Your Job Applications</h3>
          {jobApplications?.length ? (
            <Card>
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
