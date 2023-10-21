import Job from "@/models/Job"
import jobs from './JobsDummyData'
import GeneralStore from '../GeneralStore'

const Store = new GeneralStore<Job>('jobs', jobs)

export default Store