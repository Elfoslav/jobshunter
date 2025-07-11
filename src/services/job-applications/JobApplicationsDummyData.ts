import JobApplication from '@/models/JobApplication';
import JobApplicationStatus from '@/models/enums/JobApplicationStatus';

const applications: JobApplication[] = [
  {
    id: '1',
    jobId: '1',
    userId: '2',
    coverLetter: 'I am excited to apply for this position...',
    status: JobApplicationStatus.Submitted,
    createdAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    jobId: '1',
    userId: '3',
    coverLetter: 'I have relevant experience and skills for this role...',
    status: JobApplicationStatus.Submitted,
    createdAt: new Date('2023-01-16'),
  },
  {
    id: '3',
    jobId: '1',
    userId: '4',
    coverLetter: 'I have relevant experience and skills for this role...',
    status: JobApplicationStatus.Submitted,
    createdAt: new Date('2023-01-16'),
  },
  {
    id: '4',
    jobId: '1',
    userId: '5',
    coverLetter: 'I have relevant experience and skills for this role...',
    status: JobApplicationStatus.Submitted,
    createdAt: new Date('2023-01-16'),
  },
  {
    id: '5',
    jobId: '1',
    userId: '6',
    coverLetter: 'I have relevant experience and skills for this role...',
    status: JobApplicationStatus.Submitted,
    createdAt: new Date('2023-01-16'),
  },
  {
    id: '6',
    jobId: '2',
    userId: '2',
    coverLetter: 'I believe I would be a great fit for your team...',
    status: JobApplicationStatus.Interview,
    createdAt: new Date('2023-01-17'),
  },
  {
    id: '7',
    jobId: '2',
    userId: '5',
    coverLetter: 'I am passionate about design and user experience...',
    status: JobApplicationStatus.Accepted,
    createdAt: new Date('2023-01-18'),
  },
  {
    id: '8',
    jobId: '3',
    userId: '3',
    coverLetter:
      'I have strong analytical skills and data analysis experience...',
    status: JobApplicationStatus.Offer,
    note: 'Requires further discussion with the candidate.',
    createdAt: new Date('2023-01-19'),
  },
];

export default applications;
