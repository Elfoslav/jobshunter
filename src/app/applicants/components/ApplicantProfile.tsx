import React from 'react';
import {
  Card,
  ListGroup,
  Badge,
  Row,
  Col,
  Button,
  Stack,
} from 'react-bootstrap';
import { ApplicantUser, UserType } from '@/models/User'; // Adjust this import path to your project
import { getSkillClass } from '@/lib/functions';
import CanAccess from '@/app/components/CanAccess';
import { useApplicantUser } from '@/app/context/UserContext';
import DOMPurify from 'dompurify';

interface ApplicantProfileProps {
  applicant: ApplicantUser;
}

const formatDate = (date?: Date) =>
  date
    ? date.toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
    : 'Present';

const ApplicantProfile: React.FC<ApplicantProfileProps> = ({ applicant }) => {
  const { user } = useApplicantUser();
  return (
    <Card className="my-4 shadow-sm">
      <Card.Header as="h3" className="d-flex justify-content-between">
        <div>
          {applicant.name}{' '}
          {applicant.isOpenToWork && <Badge bg="success">Open to Work</Badge>}
        </div>
        <CanAccess
          user={user}
          requiredRole={[UserType.Admin, UserType.Applicant]}
        >
          <Button size="sm" variant="warning" href="/profile/edit">
            Edit your profile
          </Button>
        </CanAccess>
      </Card.Header>

      <Card.Body>
        <Row>
          <Col md={4} className="border-end">
            {/* Contact Info */}
            <h5>Contact</h5>
            <ListGroup variant="flush" className="mb-4">
              <ListGroup.Item>
                <strong>Email:</strong> {applicant.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Phone:</strong> {applicant.phone}
              </ListGroup.Item>
              {applicant.location && (
                <ListGroup.Item>
                  <strong>Location:</strong> {applicant.location}
                </ListGroup.Item>
              )}
              {applicant.availabilityDate && (
                <ListGroup.Item>
                  <strong>Availability:</strong>{' '}
                  {formatDate(applicant.availabilityDate)}
                </ListGroup.Item>
              )}
            </ListGroup>

            {/* Links */}
            {applicant.links && applicant.links.length > 0 && (
              <>
                <h5>Links</h5>
                <ListGroup variant="flush" className="mb-4">
                  {applicant.links.map(({ label, url }) => (
                    <ListGroup.Item key={url}>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {label}
                      </a>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </>
            )}

            {/* Resume & Portfolio */}
            <Stack direction="horizontal" gap={2} className="mb-4">
              {applicant.resumeUrl && (
                <Button
                  variant="outline-primary"
                  href={applicant.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </Button>
              )}
              {applicant.portfolioUrl && (
                <Button
                  variant="outline-secondary"
                  href={applicant.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Portfolio
                </Button>
              )}
            </Stack>
          </Col>

          <Col md={8}>
            {applicant.bio && (
              <>
                <h5>About</h5>
                <div
                  className="mt-1 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      applicant.bio.replace(/\n/g, '<br />')
                    ),
                  }}
                />
              </>
            )}

            {/* Skills */}
            {applicant.skills && applicant.skills.length > 0 && (
              <>
                <h5>Skills</h5>
                <div className="mb-4">
                  {applicant.skills.map(({ name, level }, index) => (
                    <Badge
                      key={index}
                      bg={getSkillClass(level)}
                      className="me-2 mb-2"
                    >
                      {name} ({level})
                    </Badge>
                  ))}
                </div>
              </>
            )}

            {/* Soft Skills */}
            {applicant.softSkills && applicant.softSkills.length > 0 && (
              <>
                <h5>Soft Skills</h5>
                <div className="mb-4">
                  {applicant.softSkills.map((skill) => (
                    <Badge key={skill} bg="info" className="me-2 mb-2">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </>
            )}

            {/* Languages */}
            {applicant.languages && applicant.languages.length > 0 && (
              <>
                <h5>Languages</h5>
                <ListGroup horizontal className="mb-4">
                  {applicant.languages.map(({ name, proficiency }) => (
                    <ListGroup.Item key={name} className="border-0 p-1">
                      {name} ({proficiency})
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </>
            )}

            {/* Experience */}
            {applicant.experience && applicant.experience.length > 0 && (
              <>
                <h5>Experience</h5>
                {applicant.experience.map(
                  ({ role, company, startDate, endDate, description }) => (
                    <Card key={`${role}-${company}`} className="mb-3">
                      <Card.Body>
                        <Card.Title>
                          {role} @ {company}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {formatDate(startDate)} - {formatDate(endDate)}
                        </Card.Subtitle>
                        {description && <Card.Text>{description}</Card.Text>}
                      </Card.Body>
                    </Card>
                  )
                )}
              </>
            )}

            {/* Education */}
            {applicant.education && applicant.education.length > 0 && (
              <>
                <h5>Education</h5>
                {applicant.education.map(
                  ({ degree, institution, startYear, endYear }) => (
                    <Card key={`${degree}-${institution}`} className="mb-3">
                      <Card.Body>
                        <Card.Title>{degree}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {institution} | {startYear} - {endYear}
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  )
                )}
              </>
            )}

            {applicant.preferences && (
              <>
                <h5>Preferences</h5>
                <ListGroup horizontal className="mb-3">
                  <ListGroup.Item>
                    <strong>Preferred Locations:</strong>{' '}
                    {applicant.preferences.locations.join(', ')}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Remote %:</strong>{' '}
                    {applicant.preferences.remotePercentage}%
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Employment Types:</strong>{' '}
                    {applicant.preferences.employmentTypes.join(', ')}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Salary Range:</strong> $
                    {applicant.preferences.salaryMin.toLocaleString()} - $
                    {applicant.preferences.salaryMax.toLocaleString()}
                  </ListGroup.Item>
                </ListGroup>
              </>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ApplicantProfile;
