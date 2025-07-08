import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { CSS } from '@dnd-kit/utilities';
import { ApplicantSkill, SkillLevel } from '@/models/Skill';
import SelectOption from '@/models/SelectOption';
import Select from 'react-select';
import { GripVertical } from 'react-bootstrap-icons';

type Props = {
  skill: ApplicantSkill;
  index: number;
  handleRemoveSkill: (index: number) => void;
  handleSkillNameChange: (index: number, newName: string) => void;
  handleSkillLevelChange: (index: number, newLevel: SkillLevel) => void;
  skillsOptions: SelectOption[];
};

const SortableSkillRow: React.FC<Props> = ({
  skill,
  index,
  handleRemoveSkill,
  handleSkillNameChange,
  handleSkillLevelChange,
  skillsOptions,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: skill.name,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '1rem',
    cursor: 'default',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Row className="align-items-center">
        <Col xs={1} className="text-center">
          <span {...listeners} style={{ cursor: 'grab' }}>
            ☰
          </span>
        </Col>
        <Col xs={5}>
          <Select
            options={skillsOptions}
            value={{ value: skill.name, label: skill.name }}
            onChange={(selected) =>
              handleSkillNameChange(index, (selected as SelectOption).value)
            }
          />
        </Col>
        <Col xs={4}>
          <Form.Select
            value={skill.level}
            onChange={(e) =>
              handleSkillLevelChange(index, e.target.value as SkillLevel)
            }
          >
            <option value={SkillLevel.Junior}>Junior</option>
            <option value={SkillLevel.Medior}>Medior</option>
            <option value={SkillLevel.Senior}>Senior</option>
          </Form.Select>
        </Col>
        <Col xs={2}>
          <Button variant="danger" onClick={() => handleRemoveSkill(index)}>
            &times;
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SortableSkillRow;
