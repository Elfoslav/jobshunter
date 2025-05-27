'use client';

import { useSearchParams } from 'next/navigation';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import JobsList from './components/JobsList';
import { useGetJobs, useGetJobsCount } from '@/services/jobs/JobsService';
import { useGetSkills } from '@/services/skills/SkillsService';
import JobsFilter from './components/JobsFilter';
import SelectOption from '@/models/SelectOption';
import Skill from '@/models/Skill';
import { useUser } from '@/app/context/UserContext';

export default function Jobs() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page') || '1';
  const searchParam = searchParams.get('search') || '';
  const skillsParam = searchParams.get('skills') || '';
  const skillsParamArray = skillsParam ? skillsParam.split(',') : [];
  const page = parseInt(pageParam);
  const { data: jobs, isLoading } = useGetJobs(
    page,
    searchParam,
    skillsParamArray
  );
  const { data: jobsCount } = useGetJobsCount(searchParam, skillsParamArray);
  const { data: skills } = useGetSkills();
  let skillsOptions: SelectOption[] = [];

  if (jobs && skills) {
    skillsOptions = skills.map((skill: Skill) => {
      return { value: skill.name, label: skill.name };
    });
  }

  return (
    <div>
      <Row>
        <Col md={9} lg={7}>
          <JobsFilter search={searchParam} skillsOptions={skillsOptions} />
        </Col>
        <Col md={3} lg={5} className="d-flex justify-content-end">
          <Button className="mt-2 mb-3" href="/jobs/add">
            Post a job
          </Button>
        </Col>
      </Row>

      <Container>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          jobs?.length === 0 && <div>No jobs.</div>
        )}
      </Container>

      <JobsList
        jobs={jobs || []}
        user={user}
        totalCount={jobsCount || 0}
        page={page}
      />
    </div>
  );
}
