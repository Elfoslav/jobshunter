import JobApplication from '@/models/JobApplication'
import applications from './JobApplicationsDummyData'

import GeneralStore from '../GeneralStore'

const Store = new GeneralStore<JobApplication>('job_applications', applications)

export default Store
