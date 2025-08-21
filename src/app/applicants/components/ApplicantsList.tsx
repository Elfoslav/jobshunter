import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import {
  GeoAltFill,
  CalendarEvent,
  BriefcaseFill,
} from 'react-bootstrap-icons';
import useQueryParams from '@/app/components/useQueryParams';
import Pagination from '@/app/components/Pagination';
import { ITEMS_PER_PAGE } from '@/lib/consts';
import { ExistingApplicantUser } from '@/models/User';
import { formatDate } from '@/lib/functions';

interface ApplicantsListProps {
  applicants: ExistingApplicantUser[];
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
      <h5 className="mb-3">
        Showing {applicants.length} of {totalCount} applicants
      </h5>
      <div className="d-flex flex-column gap-3">
        {applicants.map((applicant) => (
          <Card
            key={applicant.id}
            as="a"
            href={`/applicants/${applicant.id}`}
            className="text-decoration-none text-dark shadow-sm"
          >
            <Card.Body>
              <Row>
                <Col md={4}>
                  <h5 className="mb-1">{applicant.name}</h5>
                  <div className="text-muted d-flex align-items-center mb-1">
                    <GeoAltFill className="me-1" />
                    {applicant.location}
                  </div>
                  {applicant.createdAt && (
                    <div className="text-muted d-flex align-items-center mb-1">
                      <CalendarEvent className="me-1" />
                      Registered: {formatDate(applicant.createdAt)}
                    </div>
                  )}
                </Col>

                <Col md={4}>
                  <strong>Skills:</strong>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {applicant.skills?.slice(0, 3).map((skill) => (
                      <Badge key={skill.name} bg="primary">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </Col>

                <Col md={4}>
                  <strong>Preferences:</strong>
                  {applicant.preferences ? (
                    <>
                      <div className="text-muted">
                        <BriefcaseFill className="me-1" />
                        {applicant.preferences.employmentTypes.join(', ')}
                      </div>
                      <div className="text-muted">
                        Salary: $
                        {applicant.preferences.salaryMin.toLocaleString()} - $
                        {applicant.preferences.salaryMax.toLocaleString()}
                      </div>
                      <div className="text-muted">
                        Remote: {applicant.preferences.remotePercentage}%
                      </div>
                    </>
                  ) : (
                    <div className="text-muted">No preferences set</div>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="mt-4 d-flex justify-content-center">
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
