import { ExistingBaseUser, ExistingUser } from '@/models/User';
import users from './UsersDummyData';
import GeneralStore from '../GeneralStore';

const Store = new GeneralStore<ExistingBaseUser<ExistingUser>>('users', users);

export default Store;
