import { isApplicantUser } from '@/lib/utils/user';
import Skill from '@/models/Skill';
import { ExistingUser } from '@/models/User';
import { useGetSkills } from '@/services/skills/SkillsService';
import { Badge } from 'react-bootstrap';

interface JobsListProps {
  skillsIds: string[];
  user: ExistingUser | null;
  primary?: boolean;
  className?: string;
}

const Skills: React.FC<JobsListProps> = ({
  skillsIds,
  user,
  primary,
  className,
}) => {
  const { data: allSkills } = useGetSkills();
  const skills =
    allSkills?.filter((skill) => skillsIds?.includes(skill.id)) || [];

  const getBadgeBg = (skill: Skill) => {
    if (
      user &&
      isApplicantUser(user) &&
      user.skills?.some((s) => s.name === skill.name)
    ) {
      return 'success';
    }

    return primary ? 'primary' : 'secondary';
  };

  return (
    <div className={`d-flex gap-1 flex-wrap ${className}`}>
      {skills.map((skill) => (
        <Badge key={skill.id} bg={getBadgeBg(skill)}>
          {skill.name}
        </Badge>
      ))}
    </div>
  );
};

export default Skills;
