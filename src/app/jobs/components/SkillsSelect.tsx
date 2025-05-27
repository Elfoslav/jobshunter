'use client';

import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import skills from '@/services/skills/SkillsDummyData';
import Skill from '@/models/Skill';
import { ActionMeta, MultiValue } from 'react-select';

export type Option = {
  label: string;
  value: string;
};

interface SkillsSelectProps {
  selected: Option[];
  onChange: (
    newValue: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => void;
  [key: string]: any; // Allow any additional props
}

const SkillsSelect: React.FC<SkillsSelectProps> = ({
  selected,
  onChange,
  ...rest
}) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    // Simulate async fetch — replace with real API if needed
    const fetchSkills = async () => {
      const mapped = skills.map((skill: Skill) => ({
        label: skill.name,
        value: skill.name,
      }));
      setOptions(mapped);
    };

    fetchSkills();
  }, []);

  // 🔒 Avoid rendering until options are ready to prevent hydration mismatch
  if (!options.length) return null;

  return (
    <CreatableSelect
      isMulti
      options={options}
      value={selected}
      onChange={onChange}
      placeholder="Select skills"
      closeMenuOnSelect={false}
    />
  );
};

export default SkillsSelect;
