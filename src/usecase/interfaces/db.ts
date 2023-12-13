export interface IDatabase {
  connect(): void;
  close(): void;
  query(sql: string): Promise<unknown>;
}
