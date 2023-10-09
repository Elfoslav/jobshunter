'use client'

import { useSearchParams } from 'next/navigation'
import { Container } from 'react-bootstrap'
import JobsList from './jobs/JobsList'
import { useGetJobs, useGetJobsCount } from '@/services/JobsService'

export default function Home() {
  const searchParams = useSearchParams()
  const pageParam = searchParams.get('page') || '1'
  const page = parseInt(pageParam)
  const { data: jobs, isLoading } = useGetJobs(page)
  const { data: jobsCount } = useGetJobsCount()

  return (
    <div>
      <Container>
        <h2>Jobs List</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : jobs?.length === 0 &&
          <div>No jobs.</div>
        }
      </Container>
      <JobsList jobs={jobs || []} totalCount={jobsCount || 0} page={page} />
    </div>
  )
}
