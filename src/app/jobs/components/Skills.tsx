import { Badge } from 'react-bootstrap'

interface JobsListProps {
  skills: string[],
  primary?: boolean,
  className?: string,
}

const Skills: React.FC<JobsListProps> = ({ skills, primary, className }) => {
  return (
    <div className={`d-flex gap-1 flex-wrap ${className}`}>
      {skills.map((skill) => (
        <Badge key={skill} bg={primary ? 'primary' : 'secondary'}>{skill}</Badge>
      ))}
    </div>
  );
};

export default Skills