'use client'

import { useSearchParams } from 'next/navigation'
import { Container } from 'react-bootstrap'
import JobsList from './jobs/JobsList'
import { useGetJobs, useGetJobsCount, useGetSkills } from '@/services/JobsService'
import JobsFilter from './jobs/JobsFilter'
import SelectOption from '@/models/SelectOption'

export default function Home() {
  const searchParams = useSearchParams()
  const pageParam = searchParams.get('page') || '1'
  const searchParam = searchParams.get('search') || ''
  const skillsParam = searchParams.get('skills') || ''
  const skillsParamArray = skillsParam ? skillsParam.split(',') : []
  const page = parseInt(pageParam)
  const { data: jobs, isLoading } = useGetJobs(page, searchParam, skillsParamArray)
  const { data: jobsCount } = useGetJobsCount(searchParam, skillsParamArray)
  const { data: skills } = useGetSkills()
  let skillsOptions: SelectOption[] = []

  if (jobs && skills) {
    skillsOptions = skills.map((skill: string) => {
      return { value: skill, label: skill }
    })
  }

  return (
    <div>
      <JobsFilter
        search={searchParam}
        skillsOptions={skillsOptions}
      />
      <Container>
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
