'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Col, Row, Card, Stack } from 'react-bootstrap';
import EmploymentType from '@/models/enums/EmploymentType';
import SkillsSelect from './SkillsSelect';
import { MultiValue } from 'react-select';
import { Option } from './SkillsSelect';
import { ExistingJob } from '@/models/Job';

interface JobFormProps {
  initialData?: ExistingJob;
  onSubmit: (job: ExistingJob) => void;
  isLoading?: boolean;
  isEditing?: boolean;
}

export default function JobForm({
  initialData,
  onSubmit,
  isLoading = false,
  isEditing = false,
}: JobFormProps) {
  const [formData, setFormData] = useState<ExistingJob>({
    id: '',
    title: '',
    company: '',
    location: '',
    description: '',
    requiredSkills: [],
    optionalSkills: [],
    salaryMin: 0,
    salaryMax: 0,
    currency: 'USD',
    employmentTypes: [],
    postedAt: new Date(),
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getSelectedSkills = (skills: string[]) =>
    skills.map((skill) => ({ label: skill, value: skill }));

  const handleSkillsChange =
    (type: 'requiredSkills' | 'optionalSkills') =>
    (newValue: MultiValue<Option>) => {
      setFormData((prev) => ({
        ...prev,
        [type]: newValue.map((option) => option.value),
      }));
    };

  const handleEmploymentTypeChange = (type: EmploymentType) => {
    const exists = formData.employmentTypes.includes(type);
    const updated = exists
      ? formData.employmentTypes.filter((t) => t !== type)
      : [...formData.employmentTypes, type];

    setFormData({ ...formData, employmentTypes: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', formData);

    onSubmit(formData);

    if (isEditing) {
      router.push(`/jobs/${formData.id}`); // assuming you have `id` in the data
    } else {
      router.push('/jobs');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Card className="mb-4">
        <Card.Header>Job Details</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="e.g. Backend Developer"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  name="company"
                  type="text"
                  placeholder="e.g. XYZ Software"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="location"
              type="text"
              placeholder="e.g. New York, NY"
              value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Job Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="description"
              placeholder="Describe the responsibilities, qualifications, and expectations..."
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>Skills</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="requiredSkills">
                <Form.Label>Required Skills</Form.Label>
                <SkillsSelect
                  selected={getSelectedSkills(formData.requiredSkills)}
                  onChange={handleSkillsChange('requiredSkills')}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="optionalSkills">
                <Form.Label>Nice to have skills</Form.Label>
                <SkillsSelect
                  selected={getSelectedSkills(formData.optionalSkills)}
                  onChange={handleSkillsChange('optionalSkills')}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>Salary & Employment</Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="salaryMin">
                <Form.Label>Minimum monthly salary</Form.Label>
                <Form.Control
                  name="salaryMin"
                  type="number"
                  value={formData.salaryMin}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="salaryMax">
                <Form.Label>Maximum monthly salary</Form.Label>
                <Form.Control
                  name="salaryMax"
                  type="number"
                  value={formData.salaryMax}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="currency">
                <Form.Label>Currency</Form.Label>
                <Form.Control
                  name="currency"
                  type="text"
                  placeholder="e.g. USD, EUR"
                  value={formData.currency}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Employment Types</Form.Label>
            <Stack direction="horizontal" gap={3} className="flex-wrap">
              {Object.values(EmploymentType).map((type) => (
                <Form.Check
                  key={type}
                  type="checkbox"
                  label={type}
                  id={`employment-${type}`}
                  checked={formData.employmentTypes.includes(type)}
                  onChange={() => handleEmploymentTypeChange(type)}
                />
              ))}
            </Stack>
          </Form.Group>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-center">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-100 w-lg-50"
        >
          Publish
        </Button>
      </div>
    </Form>
  );
}
