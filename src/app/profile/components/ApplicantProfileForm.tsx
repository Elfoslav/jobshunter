'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Select, { MultiValue } from 'react-select';
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Card,
} from 'react-bootstrap';
import EmploymentType from '@/models/enums/EmploymentType';
import { ApplicantUser, UserType } from '@/models/User';
import { useGetSkills } from '@/services/skills/SkillsService';
import SelectOption from '@/models/SelectOption';
import { useUpdateUser } from '@/services/users/UsersService';
import { useNotification } from '@/app/context/NotificationContext';
import RemotePercentageInput from '@/app/jobs/components/RemotePercentageInput';
import TextEditor from '@/app/components/TextEditor';

interface ApplicantProfileFormProps {
  user?: ApplicantUser;
}

const ApplicantProfileForm: React.FC<ApplicantProfileFormProps> = ({
  user,
}) => {
  const router = useRouter();
  const { showNotification } = useNotification();
  const { data: skills } = useGetSkills();
  const updateUserMutation = useUpdateUser();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<ApplicantUser>({
    id: user?.id ?? '',
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    bio: user?.bio ?? '',
    location: user?.location ?? '',
    skills: user?.skills ? [...user.skills] : [],
    type: user?.type ?? UserType.Applicant,
    preferences: {
      locations: user?.preferences?.locations
        ? [...user.preferences.locations]
        : [],
      remotePercentage: user?.preferences?.remotePercentage ?? 0,
      employmentTypes: user?.preferences?.employmentTypes
        ? [...user.preferences.employmentTypes]
        : [],
      salaryMin: user?.preferences?.salaryMin ?? 0,
      salaryMax: user?.preferences?.salaryMax ?? 0,
    },
    registeredAt: user?.registeredAt || new Date(),
    updatedAt: user?.updatedAt || undefined,
  });

  const skillsOptions =
    skills?.map((skill) => ({ value: skill.name, label: skill.name })) || [];
  const defaultSkillsOptions = formData?.skills?.map((skill) => ({
    value: skill,
    label: skill,
  }));
  const employmentTypeOptions = Object.values(EmploymentType).map((type) => ({
    value: type,
    label: type,
  }));
  const defaultEmploymentOptions = formData?.preferences?.employmentTypes.map(
    (type) => ({ value: type, label: type })
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePreferencesChange = (key: string, value: any) => {
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        [key]: value,
      },
    });
  };

  const onSkillChange = (newValue: unknown) => {
    const options = newValue as MultiValue<SelectOption>;
    setFormData({ ...formData, skills: options.map((opt) => opt.value) });
  };

  const onEmploymentTypeChange = (newValue: unknown) => {
    const options = newValue as MultiValue<SelectOption>;
    handlePreferencesChange(
      'employmentTypes',
      options.map((opt) => opt.value as EmploymentType)
    );
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updateUserMutation.mutate(formData, {
        onSuccess() {
          setIsSaving(false);
          showNotification('Your profile has been updated!');
          router.push('/profile');
        },
      });
    }, 1000);
  };

  return (
    <Container>
      <Card className="shadow-sm">
        <Card.Header className="mb-4">
          <h2 className="fs-4 mt-1 mb-1">Edit Profile</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Row className="g-3">
              <Col md={6} lg={4}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={4}>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={4}>
                <Form.Group controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={4}>
                <Form.Group controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={4}>
                <Form.Group controlId="preferredLocations">
                  <Form.Label>Preferred Locations</Form.Label>
                  <Form.Control
                    type="text"
                    name="preferredLocations"
                    value={formData.preferences.locations.join(', ')}
                    onChange={(e) =>
                      handlePreferencesChange(
                        'locations',
                        e.target.value.split(',').map((s) => s.trim())
                      )
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={4}>
                <RemotePercentageInput
                  value={formData.preferences.remotePercentage}
                  onChange={(e) =>
                    handlePreferencesChange(
                      'remotePercentage',
                      parseFloat(e.target.value)
                    )
                  }
                />
              </Col>
              <Col md={6} lg={4}>
                <Form.Group controlId="skills">
                  <Form.Label>Skills</Form.Label>
                  <Select
                    defaultValue={defaultSkillsOptions}
                    options={skillsOptions}
                    isMulti
                    onChange={onSkillChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={4}>
                <Form.Group controlId="employmentTypes">
                  <Form.Label>Preferred Employment Types</Form.Label>
                  <Select
                    defaultValue={defaultEmploymentOptions}
                    options={employmentTypeOptions}
                    isMulti
                    onChange={onEmploymentTypeChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={4}>
                <Form.Group controlId="salaryMin">
                  <Form.Label>Min Salary ($)</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.preferences.salaryMin}
                    onChange={(e) =>
                      handlePreferencesChange(
                        'salaryMin',
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6} lg={4}>
                <Form.Group controlId="salaryMax">
                  <Form.Label>Max Salary ($)</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.preferences.salaryMax}
                    onChange={(e) =>
                      handlePreferencesChange(
                        'salaryMax',
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="bio">
                  <Form.Label>Bio</Form.Label>
                  <TextEditor
                    text={formData.bio}
                    onBlur={(val) => setFormData({ ...formData, bio: val })}
                  />
                </Form.Group>
              </Col>
              <Col md={12} className="d-flex gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSaving}
                  className="mt-3 px-4"
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: '120px',
                      textAlign: 'center',
                    }}
                  >
                    {isSaving ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      'Save Changes'
                    )}
                  </span>
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  disabled={isSaving}
                  className="mt-3 px-4"
                  onClick={() => router.push('/profile')}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ApplicantProfileForm;
