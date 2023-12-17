import { Client } from 'pg';
import { IDatabase } from '../domain/interfaces/db';

export class PgPool implements IDatabase {
  private client: Client;

  constructor() {
    this.client = new Client({
      host: process.env.POSTGRES_HOST || '',
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB || '',
      user: process.env.POSTGRES_USER || '',
      password: process.env.POSTGRES_PASSWORD || '',
      ssl: true,
    });
  }

  public connect(): void {
    this.client.connect();
    console.log('Connected to Postgres');
  }

  public close(): void {
    this.client.end();
    console.log('Connection Closed');
  }

  public async query(sql: string, values?: string[]): Promise<unknown[]> {
    const result = await this.client.query(sql, values).catch((error) => {
      throw error;
    });
    return result.rows;
  }
}
