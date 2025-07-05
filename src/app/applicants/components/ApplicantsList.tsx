import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ListGroup, ListGroupItem, Row, Col, Badge } from 'react-bootstrap';
import {
  GeoAltFill,
  CalendarEvent,
  BriefcaseFill,
} from 'react-bootstrap-icons';
import useQueryParams from '@/app/components/useQueryParams';
import Pagination from '@/app/components/Pagination';
import { ITEMS_PER_PAGE } from '@/lib/consts';
import { ApplicantUser } from '@/models/User';
import { formatDate } from '@/lib/functions';

interface ApplicantsListProps {
  applicants: ApplicantUser[];
  totalCount: number;
  page: number;
}

const ApplicantsList: React.FC<ApplicantsListProps> = ({
  applicants,
  totalCount,
  page,
}) => {
  const queryClient = useQueryClient();
  const { setQueryParams } = useQueryParams<{ page?: number }>();

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (page && !isNaN(Number(page))) {
      setPageNumber(Number(page));
      queryClient.invalidateQueries({ queryKey: ['applicants'] });
    }
  }, [page, queryClient]);

  const handlePageChange = (page: number) => {
    setPageNumber(page);
    setQueryParams({ page });
  };

  if (!applicants.length) return null;

  return (
    <>
      <ListGroup>
        {applicants.map((applicant) => (
          <ListGroupItem
            key={applicant.id}
            href={`/applicants/${applicant.id}`}
            action
          >
            <Row>
              <Col md={4}>
                <h5 className="mb-1">{applicant.name}</h5>
                <div className="text-muted d-flex align-items-center mb-1">
                  <GeoAltFill className="me-1" />
                  {applicant.location}
                </div>
                <div className="text-muted d-flex align-items-center mb-1">
                  <CalendarEvent className="me-1" />
                  Registered: {formatDate(applicant.registeredAt)}
                </div>
              </Col>

              <Col md={4}>
                <div className="mb-2">
                  <strong>Skills:</strong>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {applicant.skills?.slice(0, 3).map((skill) => (
                      <Badge key={skill} bg="primary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Col>

              <Col md={4}>
                <div className="mb-2">
                  <strong>Preferences:</strong>
                  <div className="text-muted">
                    <BriefcaseFill className="me-1" />
                    {applicant.preferences.employmentTypes.join(', ')}
                  </div>
                  <div className="text-muted">
                    Salary: ${applicant.preferences.salaryMin.toLocaleString()}{' '}
                    - ${applicant.preferences.salaryMax.toLocaleString()}
                  </div>
                  <div className="text-muted">
                    Remote: {applicant.preferences.remotePercentage}%
                  </div>
                </div>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>

      <div className="mt-3 d-flex justify-content-center">
        <Pagination
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={totalCount}
          currentPage={pageNumber}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default ApplicantsList;
