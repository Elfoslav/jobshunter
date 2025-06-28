'use client';

import { useRouter } from 'next/navigation'; // Add at the top
import { ExistingCompany } from '@/models/Company';
import { useState } from 'react';
import { Form, Button, Alert, Spinner, Row, Col, Card } from 'react-bootstrap';

interface CompanyFormProps {
  initialValues?: Partial<ExistingCompany>;
  onSubmit: (values: any) => Promise<void>;
  isSubmitting?: boolean;
  error?: string | null;
}

export default function CompanyForm({
  initialValues = {
    name: '',
    industry: '',
    logoUrl: '',
    description: '',
    website: '',
    size: undefined,
    location: '',
    techStack: [],
    socialLinks: {},
  },
  onSubmit,
  isSubmitting = false,
  error = null,
}: CompanyFormProps) {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      techStack: e.target.value.split(',').map((s) => s.trim()),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(values);
  };

  return (
    <Card>
      <Card.Header>
        <h2 className="fs-4 mt-1 mb-1">Edit Company profile</h2>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  placeholder="Acme Corp"
                  value={values.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Industry</Form.Label>
                <Form.Control
                  name="industry"
                  placeholder="Software, Marketing, etc."
                  value={values.industry}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Logo URL</Form.Label>
                <Form.Control
                  name="logoUrl"
                  placeholder="https://example.com/logo.png"
                  value={values.logoUrl}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  name="website"
                  placeholder="https://company.com"
                  value={values.website}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              placeholder="Describe your company, culture, and mission..."
              value={values.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Company Size</Form.Label>
                <Form.Control
                  type="number"
                  name="size"
                  placeholder="e.g. 50"
                  value={values.size ?? ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  name="location"
                  placeholder="City, Country"
                  value={values.location}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Tech Stack (comma-separated)</Form.Label>
            <Form.Control
              name="techStack"
              placeholder="React, Node.js, AWS"
              value={values.techStack?.join(', ') ?? ''}
              onChange={handleTechStackChange}
            />
          </Form.Group>

          <hr className="my-4" />

          <h5>Social Links</h5>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>LinkedIn</Form.Label>
                <Form.Control
                  name="socialLinks.linkedin"
                  placeholder="https://linkedin.com/company/..."
                  value={values.socialLinks?.linkedin ?? ''}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      socialLinks: {
                        ...prev.socialLinks,
                        linkedin: e.target.value,
                      },
                    }))
                  }
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Twitter</Form.Label>
                <Form.Control
                  name="socialLinks.twitter"
                  placeholder="https://twitter.com/..."
                  value={values.socialLinks?.twitter ?? ''}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      socialLinks: {
                        ...prev.socialLinks,
                        twitter: e.target.value,
                      },
                    }))
                  }
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Facebook</Form.Label>
                <Form.Control
                  name="socialLinks.facebook"
                  placeholder="https://facebook.com/..."
                  value={values.socialLinks?.facebook ?? ''}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      socialLinks: {
                        ...prev.socialLinks,
                        facebook: e.target.value,
                      },
                    }))
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-2 mt-2">
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    className="me-2"
                  />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>

            <Button
              variant="secondary"
              onClick={() => router.push(`/companies/${values.id}`)}
              disabled={isSubmitting}
            >
              Discard
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
