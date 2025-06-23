import GeneralStore from '../GeneralStore';

type Migration = {
  id: string;
  name: string;
};

const Store = new GeneralStore<Migration>('migrations', []);

export default Store;
