import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Card, Row, Col, Badge } from 'react-bootstrap';
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
  const { setQueryParams } = useQueryParams<{ page?: number }>();
  const [pageNumber, setPageNumber] = useState(1);

  const renderDaysAgo = (job: ExistingJob, classes?: string) => {
    return (
      <div
        className={`${classes} ${
          getDaysPassed(job.postedAt) === 0 ? 'text-success' : ''
        }`}
        style={{ fontSize: '0.9rem', fontWeight: '500' }}
      >
        {getAgoString(job.postedAt)}
      </div>
    );
  };

  useEffect(() => {
    if (page && !isNaN(Number(page))) {
      setPageNumber(Number(page));
      queryClient.invalidateQueries({
        queryKey: [JOBS_QUERIES.JOBS],
      });
    }
  }, [page, queryClient]);

  const handlePageChange = (page: number) => {
    setPageNumber(page);
    setQueryParams({ page });
  };

  if (!jobs.length) {
    return null;
  }

  return (
    <div className="mt-3 mt-md-2">
      {jobs.map((job) => (
        <Card
          key={job.id}
          className="mb-3 job-card"
          as="a"
          href={`/jobs/${job.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Card.Body>
            <Badge className="applied">
              <UserApplied job={job} user={user} />
            </Badge>
            <Row>
              <Col lg={3} md={12}>
                <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap">
                  <h5 className="mb-0 me-2">{job.title}</h5>
                  <div className="text-end d-lg-none">{renderDaysAgo(job)}</div>
                </div>
                <div className="d-flex align-items-center mb-1 text-muted">
                  <GeoAltFill className="me-1" />
                  <span>{job.location}</span>
                </div>
                <div className="mb-1">
                  <RemotePercentage remotePercentage={job.remotePercentage} />
                </div>
                {job.employmentTypes.length > 0 && (
                  <div className="d-flex align-items-center mb-2 text-muted">
                    <SuitcaseLgFill className="me-1" />
                    <span>{job.employmentTypes.join(', ')}</span>
                  </div>
                )}
              </Col>
              <Col lg={7} md={12}>
                <Skills
                  skillsIds={job.requiredSkills}
                  user={isApplicantUser(user) ? user : null}
                  primary
                  className="mb-2"
                />
                <Skills
                  skillsIds={job.optionalSkills}
                  user={isApplicantUser(user) ? user : null}
                  className="mb-1"
                />
              </Col>
              <Col className="d-none d-lg-block">
                {renderDaysAgo(job, 'text-end')}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

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
