import { ExistingJob } from '@/models/Job';
import EmploymentType from '@/models/enums/EmploymentType';

const currentDate = new Date();
const daysToSubtract = 1;

const jobs: ExistingJob[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'ABC Tech Solutions',
    companyId: '1',
    location: 'San Francisco, CA',
    remotePercentage: 100,
    description: `
      <h2>About Us</h2>
      <p>
        ABC Tech Solutions is an innovative and rapidly growing tech company that is committed to creating cutting-edge digital solutions. We're seeking a highly motivated and experienced Front-end Developer to join our dynamic team. If you are passionate about building stunning and user-friendly web applications using the latest front-end technologies, we want to hear from you!
      </p>

      <h2>Key Responsibilities</h2>
      <ul>
        <li>Collaborate with our talented team to develop and maintain user interfaces for web applications.</li>
        <li>Utilize your expertise in JavaScript, React, HTML, and CSS to build responsive, high-performance, and visually appealing web applications.</li>
        <li>Ensure the codebase is well-structured, maintainable, and scalable.</li>
        <li>Work closely with our design and product teams to turn concepts and designs into working solutions.</li>
        <li>Maintain a high level of code quality through best practices and code reviews.</li>
        <li>Optimize applications for maximum performance and user experience.</li>
        <li>Keep up to date with the latest front-end technologies and industry trends.</li>
      </ul>

      <h2>Requirements</h2>
      <ul>
        <li>Bachelor's degree in Computer Science or related field, or equivalent work experience.</li>
        <li>Proven experience as a Front-end Developer or similar role.</li>
        <li>Strong proficiency in JavaScript, React, HTML, and CSS.</li>
        <li>Familiarity with Git version control.</li>
        <li>Experience with Next.js is a plus.</li>
        <li>Knowledge of responsive web design and mobile-first development.</li>
        <li>Solid understanding of web performance optimization.</li>
        <li>Strong problem-solving skills and attention to detail.</li>
        <li>Excellent communication and teamwork abilities.</li>
      </ul>

      <h2>Why ABC Tech Solutions?</h2>
      <ul>
        <li>Competitive salary and benefits package.</li>
        <li>A collaborative and innovative work environment.</li>
        <li>Opportunities for professional growth and development.</li>
        <li>Cutting-edge projects and exciting challenges.</li>
        <li>Work with a talented and diverse team.</li>
        <li>Work-life balance and flexible hours.</li>
        <li>Fun company events and activities.</li>
      </ul>

      <p>If you're excited to be part of a forward-thinking team and make a meaningful impact with your front-end development skills, we want to meet you! Join us in creating the next generation of web applications that will amaze our users.</p>
    `,
    requiredSkills: [
      'JavaScript',
      'React',
      'HTML',
      'CSS',
      'Git',
      'Next.js',
      'TypeScript',
      'SASS',
      'Webpack',
      'RESTful API',
      'Responsive Web Design',
      'UI/UX Design',
      'Front-end Testing',
      'Performance Optimization',
      'Code Review',
    ],
    optionalSkills: [
      '.NET',
      'Java',
      'Docker',
      'Angular',
      'Vue.js',
      'Nuxt',
      'Python',
      'Ruby',
      'AWS',
      'Node.js',
      'GraphQL',
      'Redux',
      'Material-UI',
      'Adobe Creative Suite',
    ],
    salaryMin: 80000,
    salaryMax: 95000,
    currency: 'CZK',
    employmentTypes: [EmploymentType.FullTime, EmploymentType.Contract],
    postedAt: currentDate,
    isActive: true,
  },
  {
    id: '2',
    title: 'Backend Developer',
    company: 'XYZ Software',
    companyId: '1',
    location: 'New York, NY',
    remotePercentage: 0,
    description: '<p>Join our team as a Backend Developer...</p>',
    requiredSkills: ['JavaScript', 'Node.js', 'Python', 'SQL', 'REST API'],
    optionalSkills: ['AWS', 'Docker', 'Kubernetes'],
    salaryMin: 90000,
    salaryMax: 110000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime, EmploymentType.PartTime],
    postedAt: new Date('2023-09-21'),
    isActive: true,
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'DesignCo',
    companyId: '3',
    location: 'Los Angeles, CA',
    remotePercentage: 80,
    description: '<p>Looking for a creative UI/UX Designer...</p>',
    requiredSkills: ['UI Design', 'UX Design', 'Adobe XD', 'Figma'],
    optionalSkills: ['Illustrator', 'Sketch', 'HTML/CSS'],
    salaryMin: 75000,
    salaryMax: 95000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-22'),
    isActive: true,
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'Data Insights Inc.',
    companyId: '2',
    location: 'Chicago, IL',
    remotePercentage: 0,
    description: '<p>We need a Data Scientist to analyze our data...</p>',
    requiredSkills: ['Python', 'Machine Learning', 'Data Analysis'],
    optionalSkills: ['R', 'TensorFlow', 'Tableau'],
    salaryMin: 85000,
    salaryMax: 105000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-23'),
    isActive: true,
  },
  {
    id: '5',
    title: 'Product Manager',
    company: 'Tech Innovations Ltd.',
    companyId: '2',
    location: 'Austin, TX',
    remotePercentage: 50,
    description: '<p>Join our team as a Product Manager...</p>',
    requiredSkills: ['Product Management', 'Agile', 'Scrum'],
    optionalSkills: ['JIRA', 'Confluence', 'User Research'],
    salaryMin: 95000,
    salaryMax: 120000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-24'),
    isActive: true,
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'Cloud Solutions Inc.',
    companyId: '1',
    location: 'Seattle, WA',
    remotePercentage: 0,
    description:
      '<p>We are seeking a DevOps Engineer to optimize our infrastructure...</p>',
    requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    optionalSkills: ['Terraform', 'Jenkins', 'GitOps'],
    salaryMin: 90000,
    salaryMax: 115000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-25'),
    isActive: true,
  },
  {
    id: '7',
    title: 'Marketing Manager',
    company: 'Digital Marketing Experts',
    companyId: '2',
    location: 'Miami, FL',
    remotePercentage: 99,
    description: '<p>Join our team as a Marketing Manager...</p>',
    requiredSkills: ['Digital Marketing', 'SEO', 'Social Media'],
    optionalSkills: ['Google Ads', 'Content Marketing', 'Email Marketing'],
    salaryMin: 80000,
    salaryMax: 100000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-26'),
    isActive: true,
  },
  {
    id: '8',
    title: 'iOS Developer',
    company: 'App Creations LLC',
    companyId: '3',
    location: 'San Jose, CA',
    remotePercentage: 0,
    description:
      '<p>We are hiring an iOS Developer to work on our mobile apps...</p>',
    requiredSkills: ['Swift', 'iOS Development', 'UIKit'],
    optionalSkills: ['Objective-C', 'Xcode', 'React Native'],
    salaryMin: 85000,
    salaryMax: 105000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-29'),
    isActive: true,
  },
  {
    id: '9',
    title: 'Graphic Designer',
    company: 'Creative Designs Agency',
    companyId: '3',
    location: 'Denver, CO',
    remotePercentage: 0,
    description: '<p>Join our team as a Graphic Designer...</p>',
    requiredSkills: ['Graphic Design', 'Adobe Creative Suite'],
    optionalSkills: ['Illustration', 'Web Design', 'Video Editing'],
    salaryMin: 70000,
    salaryMax: 90000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-30'),
    isActive: true,
  },
  {
    id: '10',
    title: 'QA Engineer',
    company: 'Quality Assurance Inc.',
    companyId: '4',
    location: 'Boston, MA',
    remotePercentage: 0,
    description:
      '<p>We are looking for a QA Engineer to ensure the quality of our software...</p>',
    requiredSkills: ['Quality Assurance', 'Testing', 'Test Automation'],
    optionalSkills: ['Selenium', 'JIRA', 'Continuous Testing'],
    salaryMin: 80000,
    salaryMax: 100000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-28 13:00'),
    isActive: true,
  },
  {
    id: '11',
    title: 'Software Engineer',
    company: 'Tech Solutions Ltd.',
    location: 'Seattle, WA',
    remotePercentage: 0,
    description:
      '<p>Tech Solutions Ltd. is looking for a talented Software Engineer to join our innovative development team. As a Software Engineer, you will have the opportunity to work on cutting-edge projects and contribute to the development of software solutions. If you are passionate about coding and problem-solving, we would love to have you on board.</p>',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'RESTful APIs'],
    optionalSkills: ['TypeScript', 'GraphQL', 'Docker'],
    salaryMin: 90000,
    salaryMax: 110000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-30 14:30'),
    isActive: true,
  },
  {
    id: '12',
    title: 'Web Developer',
    company: 'WebTech Solutions',
    companyId: '1',
    location: 'San Francisco, CA',
    remotePercentage: 0,
    description:
      "<p>WebTech Solutions is seeking a skilled and creative Web Developer to join our dynamic team. As a Web Developer, you will play a pivotal role in designing and developing interactive and user-friendly websites. If you have a passion for web development and enjoy collaborating with cross-functional teams, we'd love to hear from you.</p>",
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    optionalSkills: ['Angular', 'Vue.js', 'SASS', 'Webpack'],
    salaryMin: 70000,
    salaryMax: 90000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-30 15:00'),
    isActive: true,
  },
  {
    id: '13',
    title: 'Data Scientist',
    company: 'Data Insights Co.',
    location: 'New York, NY',
    remotePercentage: 0,
    description:
      "<p>Data Insights Co. is on the lookout for a highly skilled Data Scientist who can turn data into actionable insights. Join our team to work on challenging data analysis projects and create data-driven solutions. If you have a strong background in statistics and machine learning, we'd like to talk to you.</p>",
    requiredSkills: ['Python', 'R', 'Machine Learning', 'Data Analysis'],
    optionalSkills: [
      'Deep Learning',
      'Natural Language Processing',
      'Big Data',
    ],
    salaryMin: 90000,
    salaryMax: 120000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-30 16:30'),
    isActive: true,
  },
  {
    id: '14',
    title: 'UX/UI Designer',
    company: 'Creative Visionaries',
    location: 'Los Angeles, CA',
    remotePercentage: 0,
    description:
      '<p>Creative Visionaries is in search of a talented UX/UI Designer to craft outstanding user experiences. As a Designer, you will collaborate with our team to create visually stunning and intuitive designs. If you have a keen eye for aesthetics and a passion for user-centric design, we want to hear from you.</p>',
    requiredSkills: [
      'Adobe Creative Suite',
      'User-Centered Design',
      'Wireframing',
    ],
    optionalSkills: ['Sketch', 'InVision', 'Interaction Design'],
    salaryMin: 80000,
    salaryMax: 100000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-30 17:00'),
    isActive: true,
  },
];

const jobsWithDynamicDates = jobs.map((job, index) => {
  const newPostedAt = new Date(currentDate);
  newPostedAt.setDate(currentDate.getDate() - index * daysToSubtract);

  return {
    ...job,
    postedAt: newPostedAt,
  };
});

export default jobsWithDynamicDates;
