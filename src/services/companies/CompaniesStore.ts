import { ExistingCompany } from '@/models/Company';
import companies from './CompaniesDummyData';
import GeneralStore from '../GeneralStore';

const Store = new GeneralStore<ExistingCompany>('companies', companies);

export default Store;
