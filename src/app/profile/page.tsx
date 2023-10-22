'use client'

import Link from 'next/link'
import { useUser } from '../context/UserContext'
import { Card, Container, ListGroup } from 'react-bootstrap'
import { useGetJobApplicationsByUserId } from '@/services/job-applications/JobApplicationsService'
import { formatDate } from '@/lib/functions'
import { useGetJobsByIds } from '@/services/jobs/JobsService'
import Job from '@/models/Job'

export default function UserShow() {
  const { user } = useUser()
  const { data: jobApplications, isLoading } = useGetJobApplicationsByUserId(user?.id || '')
  const { data: jobs } = useGetJobsByIds(jobApplications?.map(item => item.jobId) || [])

  const getJobById = (jobId: string): Job | undefined => {
    return jobs.find(job => job.id === jobId)
  }

  return (
    <Container>
      <h2>Your profile</h2>
      <div>This page is not ready, yet.</div>
      <div>
        But you can edit your profile&nbsp;
        <Link href="/profile/edit">
          here
        </Link>
        .
      </div>

      {isLoading ? (
        <div>Loading job applications...</div>
      ) : (
        <div className="mt-3">
          <h3>Your Job Applications</h3>
          <Card>
            <ListGroup variant="flush">
              {jobApplications?.map(jobApplication => {
                const job = getJobById(jobApplication.jobId);
                return (
                  <ListGroup.Item key={jobApplication.id}>
                    <div className="d-flex justify-content-between">
                      <h5>
                        <Link href={`/jobs/${job?.id}`}>
                          {job ? job.title : 'Job not found'}
                        </Link>
                      </h5>
                      <div>Applied on: {formatDate(jobApplication.createdAt)}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5>
                          {job?.company}
                        </h5>
                      </div>
                      <div>
                        <div>Status: <b>{jobApplication.status}</b></div>
                      </div>
                    </div>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Card>
        </div>
      )}
    </Container>
  )
}
