export enum SkillLevel {
  Junior = 'Junior',
  Medior = 'Medior',
  Senior = 'Senior',
}

export default interface Skill {
  id: string;
  name: string;
  createdAt?: Date;
}

export interface ApplicantSkill extends Skill {
  level: SkillLevel; // Your enum for Junior, Medior, Senior
}