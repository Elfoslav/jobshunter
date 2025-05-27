'use client';

import React, { useState } from 'react';
import Select, { MultiValue, ActionMeta } from 'react-select';
import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import EmploymentType from '@/models/enums/EmploymentType';
import User from '@/models/User';
import { useGetSkills } from '@/services/skills/SkillsService';
import SelectOption from '@/models/SelectOption';
import { useUpdateUser } from '@/services/users/UsersService';
import { useNotification } from '@/app/context/NotificationContext';

interface UserProfileFormProps {
  user?: User;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ user }) => {
  console.log(user);
  const { showNotification } = useNotification();
  const { data: skills } = useGetSkills();
  const updateUserMutation = useUpdateUser();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<User>({
    id: user?.id ?? '',
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    bio: user?.bio ?? '',
    location: user?.location ?? '',
    skills: user?.skills ? [...user.skills] : [],
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

  const skillsOptions = skills
    ? skills.map((skill) => ({
        value: skill.name,
        label: skill.name,
      }))
    : [];

  const defaultSkillsOptions = formData.skills.map((skill) => ({
    value: skill,
    label: skill,
  }));

  const onSkillChange = (
    newValue: unknown,
    actionMeta: ActionMeta<unknown>
  ) => {
    const options = newValue as MultiValue<SelectOption>;
    setFormData({
      ...formData,
      skills: options.map((opt) => opt.value),
    });
  };

  const employmentTypeOptions = Object.values(EmploymentType).map((type) => ({
    value: type as string,
    label: type as string,
  }));

  const defaultEmploymentOptions = formData.preferences.employmentTypes.map(
    (employmentType) => ({
      value: employmentType as string,
      label: employmentType as string,
    })
  );

  const onEmploymentTypeChange = (
    newValue: unknown,
    actionMeta: ActionMeta<unknown>
  ) => {
    const options = newValue as MultiValue<SelectOption>;
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        employmentTypes: options.map((opt) => opt.value as EmploymentType),
      },
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onPreferredRemotePercentageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        remotePercentage: parseFloat(e.target.value),
      },
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setIsSaving(true);
    // Simulate request response
    setTimeout(() => {
      updateUserMutation.mutate(formData, {
        onSuccess() {
          console.log('Succes update', formData);
          setIsSaving(false);
          showNotification('Your profile has been saved!');
        },
      });
    }, 1000);
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col md={6} lg={4}>
            <Form.Group controlId="name" className="mb-2">
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
            <Form.Group controlId="email" className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6} lg={4}>
            <Form.Group controlId="phone" className="mb-2">
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
            <Form.Group controlId="location" className="mb-2">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6} lg={4}>
            <Form.Group controlId="locations" className="mb-2">
              <Form.Label>Preferred Locations</Form.Label>
              <Form.Control
                type="text"
                name="preferences.locations"
                value={formData.preferences.locations.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferences: {
                      ...formData.preferences,
                      locations: e.target.value.split(', ') as string[],
                    },
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col md={6} lg={4}>
            <Form.Group controlId="remotePercentage" className="mb-2">
              <Form.Label>Preferred Remote Percentage</Form.Label>
              <Form.Control
                type="number"
                name="preferences.remotePercentage"
                value={formData.preferences.remotePercentage}
                onChange={onPreferredRemotePercentageChange}
              />
              <Form.Range
                value={formData.preferences.remotePercentage}
                onChange={onPreferredRemotePercentageChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6} lg={4}>
            <Form.Group controlId="skills" className="mb-2">
              <Form.Label>Skills</Form.Label>
              <Select
                defaultValue={defaultSkillsOptions}
                options={skillsOptions}
                closeMenuOnSelect={true}
                isMulti
                onChange={onSkillChange}
              />
            </Form.Group>
          </Col>
          <Col md={6} lg={4}>
            <Form.Group controlId="employmentTypes" className="mb-2">
              <Form.Label>Preferred Employment Types</Form.Label>
              <Select
                defaultValue={defaultEmploymentOptions}
                options={employmentTypeOptions}
                closeMenuOnSelect={true}
                isMulti
                onChange={onEmploymentTypeChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6} lg={4}>
            <Form.Group controlId="salaryMin" className="mb-2">
              <Form.Label>Preferred Minimum Salary ($)</Form.Label>
              <Form.Control
                type="number"
                name="preferences.salaryMin"
                value={formData.preferences.salaryMin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferences: {
                      ...formData.preferences,
                      salaryMin: parseFloat(e.target.value),
                    },
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col md={6} lg={4}>
            <Form.Group controlId="salaryMax" className="mb-2">
              <Form.Label>Preferred Maximum Salary ($)</Form.Label>
              <Form.Control
                type="number"
                name="preferences.salaryMax"
                value={formData.preferences.salaryMax}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferences: {
                      ...formData.preferences,
                      salaryMax: parseFloat(e.target.value),
                    },
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12} lg={8}>
            <Form.Group controlId="bio" className="mb-2">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6} lg={4}>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" disabled={isSaving}>
                {isSaving ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  'Save'
                )}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UserProfileForm;
