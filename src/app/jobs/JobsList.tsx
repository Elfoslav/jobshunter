import React, { useState, useEffect } from 'react'
import {
  useQueryClient,
} from '@tanstack/react-query'
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap'
import { GeoAltFill, GlobeAmericas } from 'react-bootstrap-icons'
import useQueryParams from '../components/useQueryParams'
import Pagination from '../components/Pagination'
import { JOBS_PER_PAGE, JOBS_QUERY_NAME } from '@/lib/consts'
import Skills from './Skills'
import Job from '@/models/Job'
import './JobsList.scss'

interface JobsListProps {
  jobs: Job[],
  totalCount: number,
  page: number
}

const JobsList: React.FC<JobsListProps> = ({ jobs, totalCount, page }) => {
  const queryClient = useQueryClient()
  const { setQueryParams } = useQueryParams<{
    page?: number;
  }>()

  const [pageNumber, setpageNumber] = useState(1)

  useEffect(() => {
    if (page && !isNaN(Number(page))) {
      setpageNumber(Number(page))
      queryClient.invalidateQueries({
        queryKey: [JOBS_QUERY_NAME],
      });
    }
  }, [page])

  const handlePageChange = (page: number) => {
    setpageNumber(page)
    setQueryParams({ page })
  }

  const getDaysPassed = (job: Job): number => {
    const currentDate = new Date();
    const jobDate = job.postedAt;
    const timeDiff = currentDate.getTime() - jobDate.getTime();
    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysPassed;
  }

  const getTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getBeforeString = (job: Job) => {
    const daysPassed = getDaysPassed(job)
    if (daysPassed === 0) {
      return `Today ${getTime(job.postedAt)}`
    }

    if (daysPassed === 1) {
      return `Before ${daysPassed} day`
    }

    return `Before ${daysPassed} days`
  }

  if (!jobs.length) {
    return null
  }

  return (
    <div>
      <ListGroup>
        {jobs.map((job) => (
          <ListGroupItem key={job.id} action href={`/jobs/${job.id}`} className="job-item">
            <div className={`date ${getDaysPassed(job) === 0 ? 'text-success' : ''}`}>
              {getBeforeString(job)}
            </div>
            <Row>
              <Col lg={3}>
                <h4 className="title">{job.title}</h4>
                <div className="d-flex align-items-center mb-1">
                  <GeoAltFill className="me-1"/> {job.location}
                </div>
                {job.isRemote &&
                  <div className="d-flex align-items-center mb-1">
                    <GlobeAmericas className="me-1"/> Remote {job.remotePercentage}%
                  </div>
                }
              </Col>
              <Col lg={7}>
                <Skills skills={job.requiredSkills} primary className="mt-1" />
                <Skills skills={job.requiredSkills} className="mt-2 mb-1" />
              </Col>
              <Col className="d-none d-lg-block">
                <div className={`text-end ${getDaysPassed(job) === 0 ? 'text-success' : ''}`}>
                  {getBeforeString(job)}
                </div>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>

      <div className="mt-3 d-flex justify-content-center">
        <Pagination
          itemsPerPage={JOBS_PER_PAGE}
          totalItems={totalCount}
          currentPage={pageNumber}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default JobsList