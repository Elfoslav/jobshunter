import User from '@/models/User';
import { Badge } from 'react-bootstrap'

interface JobsListProps {
  skills: string[],
  user: User | null,
  primary?: boolean,
  className?: string,
}

const Skills: React.FC<JobsListProps> = ({ skills, user, primary, className }) => {

  const getBadgeBg = (skill: string) => {
    if (user?.skills.includes(skill)) {
      return 'success'
    }

    return primary ? 'primary' : 'secondary'
  }

  return (
    <div className={`d-flex gap-1 flex-wrap ${className}`}>
      {skills.map((skill) => (
        <Badge key={skill} bg={getBadgeBg(skill)}>{skill}</Badge>
      ))}
    </div>
  );
};

export default Skills