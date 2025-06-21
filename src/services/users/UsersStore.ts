import User from '@/models/User';
import users from './UsersDummyData';
import GeneralStore from '../GeneralStore';

const Store = new GeneralStore<User>('users', users);

export default Store;
