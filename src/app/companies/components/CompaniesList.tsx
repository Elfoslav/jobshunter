import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Card, Row, Col, Image as RBImage } from 'react-bootstrap';
import { GeoAltFill, Building } from 'react-bootstrap-icons';
import useQueryParams from '@/app/components/useQueryParams';
import Pagination from '@/app/components/Pagination';
import { ITEMS_PER_PAGE } from '@/lib/consts';
import { ExistingCompany } from '@/models/Company';

interface CompaniesListProps {
  companies: ExistingCompany[];
  totalCount: number;
  page: number;
}

const CompaniesList: React.FC<CompaniesListProps> = ({
  companies,
  totalCount,
  page,
}) => {
  const queryClient = useQueryClient();
  const { setQueryParams } = useQueryParams<{ page?: number }>();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (page && !isNaN(Number(page))) {
      setPageNumber(Number(page));
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    }
  }, [page, queryClient]);

  const handlePageChange = (page: number) => {
    setPageNumber(page);
    setQueryParams({ page });
  };

  if (!companies.length) return null;

  return (
    <div>
      <h5 className="mb-3">
        Showing {companies.length} of {totalCount} companies
      </h5>
      {companies.map((company) => (
        <Card
          key={company.id}
          className="mb-3 shadow-sm"
          as="a"
          href={`/companies/${company.id}`}
        >
          <Card.Body>
            <Row>
              <Col
                lg={2}
                className="d-flex align-items-center justify-content-center"
              >
                {company.logoUrl ? (
                  <RBImage
                    src={company.logoUrl}
                    alt={`${company.name} logo`}
                    roundedCircle
                    style={{ width: 60, height: 60, objectFit: 'cover' }}
                  />
                ) : (
                  <Building size={40} className="text-muted" />
                )}
              </Col>

              <Col lg={6}>
                <h4 className="mb-1">{company.name}</h4>
                {company.description && (
                  <p className="text-muted mb-1">{company.description}</p>
                )}
                <div className="d-flex align-items-center text-muted">
                  <GeoAltFill className="me-1" />
                  {company.location || 'Remote'}
                </div>
              </Col>

              <Col lg={4}>
                <p className="mb-1">
                  <strong>Industry:</strong> {company.industry || 'N/A'}
                </p>
                <p className="mb-0">
                  <strong>Team Size:</strong> {company.size || 'N/A'}
                </p>
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

export default CompaniesList;
