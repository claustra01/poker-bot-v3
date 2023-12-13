import { IDatabase } from './db';

export interface IController<T, Tc> {
  setPool(pool: IDatabase): void;
  create(newData: Tc): Promise<T>;
  read(id: string): Promise<T>;
  readAll(): Promise<T[]>;
  update(replaceData: T): Promise<T>;
  delete(id: string): Promise<T>;
}
