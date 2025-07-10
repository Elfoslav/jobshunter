'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Select, { MultiValue } from 'react-select';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
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
import UrlInput from '@/app/components/UrlInput';
import { ApplicantSkill, SkillLevel } from '@/models/Skill';
import SortableSkillRow from './SortableSkillRow';
import { useQueryClient } from '@tanstack/react-query';
import CreatableSelect from 'react-select/creatable';

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
  const queryClient = useQueryClient();

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
      locations: user?.preferences?.locations ?? [],
      remotePercentage: user?.preferences?.remotePercentage ?? 0,
      employmentTypes: user?.preferences?.employmentTypes ?? [],
      salaryMin: user?.preferences?.salaryMin ?? 0,
      salaryMax: user?.preferences?.salaryMax ?? 0,
    },
    experience: user?.experience ?? [],
    education: user?.education ?? [],
    resumeUrl: user?.resumeUrl ?? '',
    portfolioUrl: user?.portfolioUrl ?? '',
    links: user?.links ?? [],
    languages: user?.languages ?? [],
    availabilityDate: user?.availabilityDate ?? undefined,
    preferredRoles: user?.preferredRoles ?? [],
    softSkills: user?.softSkills ?? [],
    isVisible: user?.isVisible ?? true,
    isOpenToWork: user?.isOpenToWork ?? true,
    registeredAt: user?.registeredAt || new Date(),
    updatedAt: user?.updatedAt || undefined,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex =
        formData.skills?.findIndex((s) => s.name === active.id) || 0;
      const newIndex =
        formData.skills?.findIndex((s) => s.name === over.id) || 0;

      const reordered = arrayMove(formData.skills || [], oldIndex, newIndex);
      setFormData({ ...formData, skills: reordered });
    }
  }

  const getFilteredSkillsOptions = (selectedSkills: ApplicantSkill[]) => {
    const selectedNames = selectedSkills.map((skill) => skill.name);
    return (
      skills
        ?.filter((skill) => !selectedNames.includes(skill.name))
        .map((skill) => ({ value: skill.name, label: skill.name })) || []
    );
  };

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

  const handleSkillNameChange = (index: number, name: string) => {
    const updatedSkills = [...(formData.skills ?? [])];
    updatedSkills[index].name = name;
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleSkillLevelChange = (index: number, level: SkillLevel) => {
    const updatedSkills = [...(formData.skills ?? [])];
    updatedSkills[index].level = level;
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = (formData.skills ?? []).filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleAddSkill = () => {
    const updatedSkills = [...(formData.skills ?? [])];
    updatedSkills.push({ id: '', name: '', level: SkillLevel.Junior });
    setFormData({ ...formData, skills: updatedSkills });
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
          queryClient.invalidateQueries({ queryKey: ['user'] });
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
              <Col md={3} lg={4}>
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
              <Col md={3} lg={4}>
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
                <UrlInput
                  label="Resume URL"
                  name="resumeUrl"
                  value={formData.resumeUrl}
                  onChange={handleInputChange}
                  placeholder="https://your-resume.com"
                />
              </Col>
              <Col md={6} lg={4}>
                <UrlInput
                  label="Portfolio URL"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleInputChange}
                  placeholder="https://your-portfolio.com"
                />
              </Col>
              <Col md={6} lg={4}>
                <Form.Group controlId="availabilityDate">
                  <Form.Label>Availability Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={
                      formData.availabilityDate?.toISOString().split('T')[0] ??
                      ''
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availabilityDate: new Date(e.target.value),
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="preferredRoles">
                  <Form.Label>Preferred Roles</Form.Label>
                  <CreatableSelect
                    isMulti
                    placeholder="e.g. Frontend Developer, UX Designer"
                    value={(formData.preferredRoles || []).map((role) => ({
                      label: role,
                      value: role,
                    }))}
                    onChange={(selected) =>
                      setFormData({
                        ...formData,
                        preferredRoles: selected.map((opt) => opt.value),
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="softSkills">
                  <Form.Label>Soft Skills</Form.Label>
                  <Form.Control
                    type="text"
                    name="softSkills"
                    value={formData.softSkills?.join(', ')}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        softSkills: e.target.value
                          .split(',')
                          .map((s) => s.trim()),
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="links">
                  <Form.Label>Profile Links (comma-separated)</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.links?.map((l) => l.url).join(', ') || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        links: e.target.value
                          .split(',')
                          .map((s) => ({ label: s.trim(), url: s.trim() })),
                      })
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
              <Col md={12} lg={6}>
                <Form.Group controlId="skills">
                  <Form.Label>Skills</Form.Label>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={formData.skills?.map((s) => s.name) || []}
                    >
                      {formData.skills?.map((skill, index) => (
                        <SortableSkillRow
                          key={skill.name}
                          skill={skill}
                          index={index}
                          handleRemoveSkill={handleRemoveSkill}
                          handleSkillNameChange={handleSkillNameChange}
                          handleSkillLevelChange={handleSkillLevelChange}
                          skillsOptions={getFilteredSkillsOptions(
                            formData?.skills || []
                          )}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>

                  <Button variant="outline-primary" onClick={handleAddSkill}>
                    Add Skill
                  </Button>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={6}>
                <Form.Group controlId="isVisible">
                  <Form.Check
                    type="switch"
                    label="Profile Visible to Employers"
                    checked={formData.isVisible}
                    onChange={(e) =>
                      setFormData({ ...formData, isVisible: e.target.checked })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="isOpenToWork">
                  <Form.Check
                    type="switch"
                    label="Open to Work"
                    checked={formData.isOpenToWork}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isOpenToWork: e.target.checked,
                      })
                    }
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
