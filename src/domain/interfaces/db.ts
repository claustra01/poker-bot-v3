export interface IDatabase {
  connect(): void;
  close(): void;
  query(sql: string, values?: string[]): Promise<unknown[]>;
}
