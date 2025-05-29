import { ExistingJob } from "@/models/Job"
import jobs from './JobsDummyData'
import GeneralStore from '../GeneralStore'

const Store = new GeneralStore<ExistingJob>('jobs', jobs)

export default Store