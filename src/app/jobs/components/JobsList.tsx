import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import { GeoAltFill, SuitcaseLgFill } from 'react-bootstrap-icons';
import useQueryParams from '@/app/components/useQueryParams';
import Pagination from '@/app/components/Pagination';
import { ITEMS_PER_PAGE, JOBS_QUERIES } from '@/lib/consts';
import Skills from './Skills';
import { ExistingJob } from '@/models/Job';
import './JobsList.scss';
import { getAgoString, getDaysPassed } from '@/lib/functions';
import { User } from '@/models/User';
import UserApplied from './UserApplied';
import RemotePercentage from './RemotePercentage';
import { isApplicantUser } from '@/lib/utils/user';

interface JobsListProps {
  jobs: ExistingJob[];
  user: User | null;
  totalCount: number;
  page: number;
}

const JobsList: React.FC<JobsListProps> = ({
  jobs,
  user,
  totalCount,
  page,
}) => {
  const queryClient = useQueryClient();
  const { setQueryParams } = useQueryParams<{
    page?: number;
  }>();

  const [pageNumber, setpageNumber] = useState(1);

  useEffect(() => {
    if (page && !isNaN(Number(page))) {
      setpageNumber(Number(page));
      queryClient.invalidateQueries({
        queryKey: [JOBS_QUERIES.JOBS],
      });
    }
  }, [page, queryClient]);

  const handlePageChange = (page: number) => {
    setpageNumber(page);
    setQueryParams({ page });
  };

  if (!jobs.length) {
    return null;
  }

  return (
    <div>
      <ListGroup>
        {jobs.map((job) => {
          return (
            <ListGroupItem
              key={job.id}
              action
              href={`/jobs/${job.id}`}
              className="job-item"
            >
              <div
                className={`date ${getDaysPassed(job.postedAt) === 0 ? 'text-success' : ''}`}
              >
                {getAgoString(job.postedAt)}
              </div>
              <Row>
                <Col lg={3}>
                  <h4 className="title">{job.title}</h4>
                  <div className="d-flex align-items-center mb-1">
                    <GeoAltFill className="me-1" /> {job.location}
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <RemotePercentage remotePercentage={job.remotePercentage} />
                  </div>
                  {job.employmentTypes.length > 0 && (
                    <div className="d-flex mb-1">
                      <SuitcaseLgFill
                        className="mt-1 me-1"
                        style={{ flexShrink: 0 }}
                      />
                      <span>{job.employmentTypes.join(', ')}</span>
                    </div>
                  )}
                </Col>
                <Col lg={7}>
                  <Skills
                    skills={job.requiredSkills}
                    user={isApplicantUser(user) ? user : null}
                    primary
                    className="mt-1"
                  />
                  <Skills
                    skills={job.optionalSkills}
                    user={isApplicantUser(user) ? user : null}
                    className="mt-2 mb-1"
                  />
                </Col>
                <Col className="d-none d-lg-block">
                  <div
                    className={`text-end ${getDaysPassed(job.postedAt) === 0 ? 'text-success' : ''}`}
                  >
                    {getAgoString(job.postedAt)}
                  </div>
                  <div className="text-end text-info">
                    <UserApplied job={job} user={user} />
                  </div>
                </Col>
              </Row>
            </ListGroupItem>
          );
        })}
      </ListGroup>

      <div className="mt-3 d-flex justify-content-center">
        <Pagination
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={totalCount}
          currentPage={pageNumber}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default JobsList;
