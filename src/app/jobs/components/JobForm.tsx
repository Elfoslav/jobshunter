'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';
import EmploymentType from '@/models/enums/EmploymentType';
import SkillsSelect from './SkillsSelect';
import { MultiValue } from 'react-select';
import { Option } from './SkillsSelect';
import { ExistingJob } from '@/models/Job';
import './JobForm.scss';
import RemotePercentageInput from './RemotePercentageInput';
import TextEditor from '@/app/components/TextEditor';

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
    remotePercentage: 0,
    postedAt: new Date(),
    ...initialData,
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onRemotePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      remotePercentage: parseFloat(e.target.value),
    });
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
    <Form onSubmit={handleSubmit} className="mt-4 mb-4">
      <Card className="mb-4">
        <Card.Header>Job Details</Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group controlId="title">
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
              <Form.Group controlId="company">
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
            <Col md={6}>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  name="location"
                  type="text"
                  placeholder="e.g. New York, NY"
                  value={formData.location}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group controlId="description">
                <Form.Label>Job Description</Form.Label>
                {/* <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  placeholder="Describe the responsibilities, qualifications, and expectations..."
                  value={formData.description}
                  onChange={handleChange}
                /> */}
                <TextEditor
                  text={formData.description}
                  onChange={(val) =>
                    setFormData({ ...formData, description: val })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>Skills</Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group controlId="requiredSkills">
                <Form.Label>Required Skills</Form.Label>
                <SkillsSelect
                  selected={getSelectedSkills(formData.requiredSkills)}
                  onChange={handleSkillsChange('requiredSkills')}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="optionalSkills">
                <Form.Label>Nice to Have Skills</Form.Label>
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
          <Row className="g-3">
            <Col md={4}>
              <Form.Group controlId="salaryMin">
                <Form.Label>Minimum Monthly Salary</Form.Label>
                <Form.Control
                  name="salaryMin"
                  type="number"
                  value={formData.salaryMin}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="salaryMax">
                <Form.Label>Maximum Monthly Salary</Form.Label>
                <Form.Control
                  name="salaryMax"
                  type="number"
                  value={formData.salaryMax}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="currency">
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
            <Col md={8}>
              <Form.Group>
                <Form.Label>Employment Types</Form.Label>
                <div className="d-flex flex-wrap gap-3">
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
                </div>
              </Form.Group>
            </Col>
            <Col md={4}>
              <RemotePercentageInput
                value={formData.remotePercentage}
                onChange={onRemotePercentageChange}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="text-center">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-100 w-lg-50"
          disabled={isLoading}
        >
          {isEditing ? 'Update Job' : 'Publish Job'}
        </Button>
      </div>
    </Form>
  );
}
