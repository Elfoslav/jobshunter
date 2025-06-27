'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import SkillsStore from './SkillsStore';
import Skill from '@/models/Skill';
import { SKILLS_QUERIES } from '@/lib/consts';

const getSkills = async (): Promise<Skill[]> => {
  const data: Skill[] = SkillsStore.read();
  return data;
};

const getSkillsCount = async (): Promise<number> => {
  const data: Skill[] = SkillsStore.read();
  return data.length;
};

const getSkillById = async (id: string): Promise<Skill | null> => {
  const skills: Skill[] = SkillsStore.read();
  return skills.find((skill) => skill.id === id) || null;
};

const createSkill = async (newSkill: Skill): Promise<void> => {
  SkillsStore.create(newSkill);
};

const updateSkill = async (updatedSkill: Skill): Promise<void> => {
  SkillsStore.update(updatedSkill.id, updatedSkill);
};

const deleteSkill = async (skillId: string): Promise<void> => {
  SkillsStore.delete(skillId);
};

export const useGetSkills = () => {
  const result = useQuery({
    queryKey: [SKILLS_QUERIES.SKILLS],
    queryFn: getSkills,
  });

  return {
    ...result,
    count: result.data?.length ?? 0,
  };
};

export const useGetSkillsCount = () => {
  return useQuery({
    queryKey: [SKILLS_QUERIES.SKILLS_COUNT],
    queryFn: getSkillsCount,
  });
};

export const useGetSkillById = (skillId: string) => {
  return useQuery({
    queryKey: [SKILLS_QUERIES.SKILL_BY_ID, skillId],
    queryFn: () => getSkillById(skillId),
    enabled: !!skillId, // skip if undefined/null
  });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SKILLS_QUERIES.SKILLS] });
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SKILLS_QUERIES.SKILLS] });
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SKILLS_QUERIES.SKILLS] });
    },
  });
};
