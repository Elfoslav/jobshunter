import { User } from '@/models/User';
import applicants from './ApplicantsDummyData';
import companies from './CompaniesDummyData';
import GeneralStore from '../GeneralStore';

const allUsers: User[] = [...applicants, ...companies];
const Store = new GeneralStore<User>('users', allUsers);

export default Store;
