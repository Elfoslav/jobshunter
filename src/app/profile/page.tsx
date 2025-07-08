'use client';

import Link from 'next/link';
import { useApplicantUser } from '../context/UserContext';
import { Card, Container, ListGroup } from 'react-bootstrap';
import { useGetJobApplicationsByUserId } from '@/services/job-applications/JobApplicationsService';
import { formatDate } from '@/lib/functions';
import { useGetJobsByIds } from '@/services/jobs/JobsService';
import { ExistingJob } from '@/models/Job';
import Loading from '../components/Loading';
import ApplicantProfile from '../applicants/components/ApplicantProfile';

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
      <ApplicantProfile applicant={user} />

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
