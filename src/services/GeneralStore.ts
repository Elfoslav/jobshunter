import { dateReviver } from '@/lib/functions';

interface EntityWithId {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type NewEntity<T extends EntityWithId> = Omit<T, 'id' | 'createdAt'> & {
  id?: string;
  createdAt?: Date;
};

class GeneralStore<T extends EntityWithId> {
  private data: T[] = [];
  private storeName: string;

  constructor(storeName: string, defaultData: T[]) {
    this.storeName = storeName;

    if (typeof window !== 'undefined') {
      const localData = JSON.parse(
        localStorage.getItem(storeName) || '[]',
        dateReviver
      );
      const mergedData = localData.concat(
        defaultData.filter(
          (item: T) =>
            !localData.some((localItem: T) => localItem.id === item.id)
        )
      );
      this.data = mergedData;
    }
  }

  private save(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storeName, JSON.stringify(this.data));
    }
  }

  private getLatestId() {
    // Extract all numeric IDs, find the maximum, and increment it
    const latestId =
      Math.max(...this.data.map((item) => parseInt(item.id, 10)), -1) + 1;
    return latestId.toString();
  }

  create(item: NewEntity<T>): T {
    const newItem: T = {
      ...item,
      id: this.getLatestId(),
    } as T;

    this.data.push(newItem);
    this.save();
    return newItem;
  }

  read(): T[] {
    return [...this.data];
  }

  update(id: string, updatedItem: Partial<T>) {
    const index = this.data.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...updatedItem };
      this.save();
    }
  }

  delete(id: string) {
    this.data = this.data.filter((item) => item.id !== id);
    this.save();
  }
}

export default GeneralStore;
