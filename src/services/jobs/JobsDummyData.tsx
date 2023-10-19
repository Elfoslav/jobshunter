import Job from '@/models/Job'
import EmploymentType from '@/models/enums/EmploymentType'

const currentDate = new Date()
const daysToSubtract = 1

const jobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'ABC Tech Solutions',
    location: 'San Francisco, CA',
    isRemote: true,
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
      'JavaScript', 'React', 'HTML', 'CSS', 'Git', 'Next.js', 'TypeScript',
      'SASS', 'Webpack', 'RESTful API', 'Responsive Web Design', 'UI/UX Design',
      'Front-end Testing', 'Performance Optimization', 'Code Review',
    ],
    optionalSkills: [
      '.NET', 'Java', 'Docker', 'Angular', 'Vue.js', 'Nuxt', 'Python', 'Ruby',
      'AWS', 'Node.js', 'GraphQL', 'Redux', 'Material-UI', 'Adobe Creative Suite',
    ],
    salaryMin: 80000,
    salaryMax: 95000,
    currency: 'CZK',
    employmentTypes: [EmploymentType.FullTime, EmploymentType.Contract],
    postedAt: currentDate,
  },
  {
    id: '2',
    title: 'Backend Developer',
    company: 'XYZ Software',
    location: 'New York, NY',
    description: 'Join our team as a Backend Developer...',
    requiredSkills: ['JavaScript', 'Node.js', 'Python', 'SQL', 'REST API'],
    optionalSkills: ['AWS', 'Docker', 'Kubernetes'],
    salaryMin: 90000,
    salaryMax: 110000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime, EmploymentType.PartTime],
    postedAt: new Date('2023-09-21'),
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'DesignCo',
    location: 'Los Angeles, CA',
    isRemote: true,
    remotePercentage: 80,
    description: 'Looking for a creative UI/UX Designer...',
    requiredSkills: ['UI Design', 'UX Design', 'Adobe XD', 'Figma'],
    optionalSkills: ['Illustrator', 'Sketch', 'HTML/CSS'],
    salaryMin: 75000,
    salaryMax: 95000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-22'),
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'Data Insights Inc.',
    location: 'Chicago, IL',
    description: 'We need a Data Scientist to analyze our data...',
    requiredSkills: ['Python', 'Machine Learning', 'Data Analysis'],
    optionalSkills: ['R', 'TensorFlow', 'Tableau'],
    salaryMin: 85000,
    salaryMax: 105000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-23'),
  },
  {
    id: '5',
    title: 'Product Manager',
    company: 'Tech Innovations Ltd.',
    location: 'Austin, TX',
    isRemote: true,
    remotePercentage: 50,
    description: 'Join our team as a Product Manager...',
    requiredSkills: ['Product Management', 'Agile', 'Scrum'],
    optionalSkills: ['JIRA', 'Confluence', 'User Research'],
    salaryMin: 95000,
    salaryMax: 120000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-24'),
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'Cloud Solutions Inc.',
    location: 'Seattle, WA',
    description: 'We are seeking a DevOps Engineer to optimize our infrastructure...',
    requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    optionalSkills: ['Terraform', 'Jenkins', 'GitOps'],
    salaryMin: 90000,
    salaryMax: 115000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-25'),
  },
  {
    id: '7',
    title: 'Marketing Manager',
    company: 'Digital Marketing Experts',
    location: 'Miami, FL',
    isRemote: true,
    remotePercentage: 99,
    description: 'Join our team as a Marketing Manager...',
    requiredSkills: ['Digital Marketing', 'SEO', 'Social Media'],
    optionalSkills: ['Google Ads', 'Content Marketing', 'Email Marketing'],
    salaryMin: 80000,
    salaryMax: 100000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-26'),
  },
  {
    id: '8',
    title: 'iOS Developer',
    company: 'App Creations LLC',
    location: 'San Jose, CA',
    description: 'We are hiring an iOS Developer to work on our mobile apps...',
    requiredSkills: ['Swift', 'iOS Development', 'UIKit'],
    optionalSkills: ['Objective-C', 'Xcode', 'React Native'],
    salaryMin: 85000,
    salaryMax: 105000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-29'),
  },
  {
    id: '9',
    title: 'Graphic Designer',
    company: 'Creative Designs Agency',
    location: 'Denver, CO',
    description: 'Join our team as a Graphic Designer...',
    requiredSkills: ['Graphic Design', 'Adobe Creative Suite'],
    optionalSkills: ['Illustration', 'Web Design', 'Video Editing'],
    salaryMin: 70000,
    salaryMax: 90000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-30'),
  },
  {
    id: '10',
    title: 'QA Engineer',
    company: 'Quality Assurance Inc.',
    location: 'Boston, MA',
    description: 'We are looking for a QA Engineer to ensure the quality of our software...',
    requiredSkills: ['Quality Assurance', 'Testing', 'Test Automation'],
    optionalSkills: ['Selenium', 'JIRA', 'Continuous Testing'],
    salaryMin: 80000,
    salaryMax: 100000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-28 13:00'),
  },
  {
    id: '11',
    title: 'Software Engineer',
    company: 'Tech Solutions Ltd.',
    location: 'Seattle, WA',
    description: 'Tech Solutions Ltd. is looking for a talented Software Engineer to join our innovative development team. As a Software Engineer, you will have the opportunity to work on cutting-edge projects and contribute to the development of software solutions. If you are passionate about coding and problem-solving, we would love to have you on board.',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'RESTful APIs'],
    optionalSkills: ['TypeScript', 'GraphQL', 'Docker'],
    salaryMin: 90000,
    salaryMax: 110000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-30 14:30')
  },
  {
    id: '12',
    title: 'Web Developer',
    company: 'WebTech Solutions',
    location: 'San Francisco, CA',
    description: 'WebTech Solutions is seeking a skilled and creative Web Developer to join our dynamic team. As a Web Developer, you will play a pivotal role in designing and developing interactive and user-friendly websites. If you have a passion for web development and enjoy collaborating with cross-functional teams, we\'d love to hear from you.',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    optionalSkills: ['Angular', 'Vue.js', 'SASS', 'Webpack'],
    salaryMin: 70000,
    salaryMax: 90000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-30 15:00')
  },
  {
    id: '13',
    title: 'Data Scientist',
    company: 'Data Insights Co.',
    location: 'New York, NY',
    description: 'Data Insights Co. is on the lookout for a highly skilled Data Scientist who can turn data into actionable insights. Join our team to work on challenging data analysis projects and create data-driven solutions. If you have a strong background in statistics and machine learning, we\'d like to talk to you.',
    requiredSkills: ['Python', 'R', 'Machine Learning', 'Data Analysis'],
    optionalSkills: ['Deep Learning', 'Natural Language Processing', 'Big Data'],
    salaryMin: 90000,
    salaryMax: 120000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-30 16:30')
  },
  {
    id: '14',
    title: 'UX/UI Designer',
    company: 'Creative Visionaries',
    location: 'Los Angeles, CA',
    description: 'Creative Visionaries is in search of a talented UX/UI Designer to craft outstanding user experiences. As a Designer, you will collaborate with our team to create visually stunning and intuitive designs. If you have a keen eye for aesthetics and a passion for user-centric design, we want to hear from you.',
    requiredSkills: ['Adobe Creative Suite', 'User-Centered Design', 'Wireframing'],
    optionalSkills: ['Sketch', 'InVision', 'Interaction Design'],
    salaryMin: 80000,
    salaryMax: 100000,
    currency: 'USD',
    employmentTypes: [EmploymentType.FullTime],
    postedAt: new Date('2023-09-30 17:00')
  },
]

const jobsWithDynamicDates = jobs.map((job, index) => {
  const newPostedAt = new Date(currentDate);
  newPostedAt.setDate(currentDate.getDate() - index * daysToSubtract);

  return {
    ...job,
    postedAt: newPostedAt,
  };
});

export default jobsWithDynamicDates