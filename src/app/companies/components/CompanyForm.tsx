'use client';

import { ExistingCompany } from '@/models/Company';
import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

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
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3">
        <Form.Label>Name *</Form.Label>
        <Form.Control
          required
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Industry</Form.Label>
        <Form.Control
          name="industry"
          value={values.industry}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Logo URL</Form.Label>
        <Form.Control
          name="logoUrl"
          value={values.logoUrl}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          rows={4}
          value={values.description}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Website</Form.Label>
        <Form.Control
          name="website"
          value={values.website}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Company Size</Form.Label>
        <Form.Control
          type="number"
          name="size"
          value={values.size ?? ''}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Location</Form.Label>
        <Form.Control
          name="location"
          value={values.location}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tech Stack (comma-separated)</Form.Label>
        <Form.Control
          name="techStack"
          value={values.techStack?.join(', ') ?? ''}
          onChange={handleTechStackChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>LinkedIn</Form.Label>
        <Form.Control
          name="socialLinks.linkedin"
          value={values.socialLinks?.linkedin ?? ''}
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              socialLinks: { ...prev.socialLinks, linkedin: e.target.value },
            }))
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Twitter</Form.Label>
        <Form.Control
          name="socialLinks.twitter"
          value={values.socialLinks?.twitter ?? ''}
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              socialLinks: { ...prev.socialLinks, twitter: e.target.value },
            }))
          }
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Facebook</Form.Label>
        <Form.Control
          name="socialLinks.facebook"
          value={values.socialLinks?.facebook ?? ''}
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              socialLinks: { ...prev.socialLinks, facebook: e.target.value },
            }))
          }
        />
      </Form.Group>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <Spinner size="sm" animation="border" />
        ) : (
          'Save Changes'
        )}
      </Button>
    </Form>
  );
}
