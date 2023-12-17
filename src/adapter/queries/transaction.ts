import { IDatabase } from '../../domain/interfaces/db';

export class TransactionController {
  private pool!: IDatabase;

  setPool(pool: IDatabase): void {
    this.pool = pool;
  }

  async begin(): Promise<void> {
    await this.pool.query(`BEGIN TRANSACTION`).catch((error) => {
      throw error;
    });
  }

  async commit(): Promise<void> {
    await this.pool.query(`COMMIT TRANSACTION`).catch((error) => {
      throw error;
    });
  }

  async rollback(): Promise<void> {
    await this.pool.query(`ROLLBACK TRANSACTION`).catch((error) => {
      throw error;
    });
  }
}

export const transactionController = new TransactionController();
