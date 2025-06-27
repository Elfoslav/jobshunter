'use client';

import { use } from 'react';
import Image from 'next/image';
import { useGetCompanyById } from '@/services/companies/CompaniesService';
import { useGetJobsByCompanyId } from '@/services/jobs/JobsService';
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Alert,
  Button,
  Badge,
} from 'react-bootstrap';

export default function CompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: company } = useGetCompanyById(id);
  const { data: jobs = [] } = useGetJobsByCompanyId(company ? company.id : '');

  if (!company)
    return (
      <Container className="py-4">
        <Alert variant="danger" className="text-center">
          Company not found or unauthorized.
        </Alert>
      </Container>
    );

  return (
    <Container className="py-4">
      <Row>
        <Col md={12} lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Row className="align-items-center mb-4">
                <Col xs={12} md={2}>
                  {company.logoUrl ? (
                    <div
                      style={{
                        width: '100%',
                        maxWidth: 120,
                        aspectRatio: '1 / 1',
                        position: 'relative',
                      }}
                      className="rounded-circle overflow-hidden border border-tertiary mx-auto"
                    >
                      <Image
                        src={company.logoUrl}
                        alt={`${company.name} logo`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 576px) 80px, 120px"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div
                      className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center mx-auto"
                      style={{
                        width: '100%',
                        maxWidth: 120,
                        aspectRatio: '1 / 1',
                        fontSize: 'clamp(24px, 6vw, 48px)', // font size adjusts between 24px and 48px based on viewport width
                      }}
                    >
                      {company.name.charAt(0)}
                    </div>
                  )}
                </Col>
                <Col xs={12} md={10}>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <Card.Title as="h1" className="mb-1">
                        {company.name}
                      </Card.Title>
                      <Card.Subtitle className="text-muted fst-italic">
                        {company.industry || 'Industry not specified'}
                      </Card.Subtitle>
                    </div>

                    <Button variant="warning" href={`/companies/${id}/edit`}>
                      Edit Company
                    </Button>
                  </div>
                </Col>
              </Row>

              {/* About Us */}
              {company.description && (
                <>
                  <h3 className="border-bottom pb-2 mb-3">About Us</h3>
                  <Card.Text>{company.description}</Card.Text>
                </>
              )}

              {/* Company Info */}
              <h3 className="border-bottom pb-2 mt-4 mb-3">Company Info</h3>
              <ListGroup variant="flush" className="mb-3">
                {company.website && (
                  <ListGroup.Item>
                    Website:{' '}
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      {company.website}
                    </a>
                  </ListGroup.Item>
                )}
                {company.size && (
                  <ListGroup.Item>
                    Size: {company.size} employees
                  </ListGroup.Item>
                )}
                {company.location && (
                  <ListGroup.Item>Location: {company.location}</ListGroup.Item>
                )}
              </ListGroup>

              {/* Tech Stack */}
              {company.techStack && company.techStack.length > 0 && (
                <>
                  <h3 className="border-bottom pb-2 mb-3">Tech Stack</h3>
                  <Card.Text>{company.techStack.join(', ')}</Card.Text>
                </>
              )}

              {/* Social Links */}
              {company.socialLinks && (
                <>
                  <h3 className="border-bottom pb-2 mt-4 mb-3">Social Links</h3>
                  <div className="d-flex gap-3">
                    {company.socialLinks.linkedin && (
                      <a
                        href={company.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary d-flex align-items-center gap-2"
                        aria-label="LinkedIn"
                      >
                        {/* Replace with real icon or SVG */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          aria-hidden="true"
                        >
                          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 8.75h4v12h-4v-12zm7 0h3.6v1.65h.05a3.94 3.94 0 0 1 3.54-1.95c3.79 0 4.5 2.5 4.5 5.75v6.55h-4v-5.8c0-1.38-.03-3.15-1.92-3.15-1.92 0-2.22 1.5-2.22 3.05v5.9h-4v-12z" />
                        </svg>
                        LinkedIn
                      </a>
                    )}
                    {company.socialLinks.twitter && (
                      <a
                        href={company.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-info d-flex align-items-center gap-2"
                        aria-label="Twitter"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          aria-hidden="true"
                        >
                          <path d="M23 3a10.9 10.9 0 0 1-3.14.86A4.48 4.48 0 0 0 22.4.36a9.12 9.12 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.67 0c-2.54 0-4.6 2.13-4.6 4.75 0 .38.04.75.13 1.1-3.82-.2-7.21-2.1-9.48-5A4.92 4.92 0 0 0 2 5.2a4.68 4.68 0 0 1-2.09-.57v.05c0 2.26 1.63 4.14 3.79 4.58a4.44 4.44 0 0 1-2.08.1 4.54 4.54 0 0 0 4.27 3.35A9.14 9.14 0 0 1 1 18.48 12.91 12.91 0 0 0 7 20.46c8.4 0 13-6.9 13-12.86 0-.2 0-.41-.02-.61A9.25 9.25 0 0 0 23 3z" />
                        </svg>
                        Twitter
                      </a>
                    )}
                    {company.socialLinks.facebook && (
                      <a
                        href={company.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary d-flex align-items-center gap-2"
                        aria-label="Facebook"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          aria-hidden="true"
                        >
                          <path d="M22.67 0H1.33C.6 0 0 .6 0 1.33v21.34C0 23.4.6 24 1.33 24h11.48v-9.29H9.69v-3.62h3.12V8.41c0-3.1 1.89-4.8 4.66-4.8 1.32 0 2.46.1 2.79.15v3.24h-1.92c-1.5 0-1.79.7-1.79 1.73v2.26h3.58l-.47 3.62h-3.1V24h6.08c.73 0 1.33-.6 1.33-1.33V1.33c0-.73-.6-1.33-1.33-1.33z" />
                        </svg>
                        Facebook
                      </a>
                    )}
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} lg={4}>
          <Card className="mt-xs-3">
            <Card.Body>
              <h3 className="fs-5 border-bottom pb-3 mb-3">Open Positions</h3>
              {jobs.length > 0 ? (
                <ListGroup variant="flush">
                  {jobs.map((job) => (
                    <ListGroup.Item key={job.id} className="py-2 px-2">
                      <a
                        href={`/jobs/${job.id}`}
                        className="text-decoration-none text-dark"
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="fw-semibold fs-6">{job.title}</div>
                            <small className="text-muted">{job.location}</small>
                          </div>
                          <div>
                            {Array.isArray(job.employmentTypes) ? (
                              job.employmentTypes.map((type) => (
                                <Badge
                                  key={type}
                                  bg="secondary"
                                  className="me-1"
                                >
                                  {type}
                                </Badge>
                              ))
                            ) : (
                              <Badge bg="secondary">
                                {job.employmentTypes}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </a>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="text-muted">
                  No open positions at the moment.
                </div>
              )}
            </Card.Body>
          </Card>

          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="lg"
              href={`/jobs/add`}
              className="mt-3 btn-block"
            >
              Open new position
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
