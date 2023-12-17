import {
  parseCalculate,
  parseCalculateList,
} from '../../application/functions/parseJson';
import { IController } from '../../application/interfaces/controller';
import { IDatabase } from '../../application/interfaces/db';
import { Calculate, NewCalculate } from '../../application/types/calculate';

export class CalculateController
  implements IController<Calculate, NewCalculate>
{
  private pool!: IDatabase;

  setPool(pool: IDatabase): void {
    this.pool = pool;
  }

  async create(newData: NewCalculate): Promise<Calculate> {
    const result = await this.pool
      .query(
        `INSERT INTO calculates (game_id, stack, winner_name, winner_rate, winner_is_excluded, loser_name, loser_rate, loser_is_excluded) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [
          newData.gameId.toString(),
          newData.stack.toString(),
          newData.winnerName,
          newData.winnerRate.toString(),
          newData.winnerIsExcluded.toString(),
          newData.loserName,
          newData.loserRate.toString(),
          newData.loserIsExcluded.toString(),
        ]
      )
      .catch((error) => {
        throw error;
      });
    return parseCalculate(result[0]);
  }

  async read(id: string): Promise<Calculate> {
    const result = await this.pool
      .query(`SELECT * FROM calculates WHERE calc_id = $1`, [id])
      .catch((error) => {
        throw error;
      });
    if (result.length === 0) {
      throw new Error(`Calculate Not Found: ${id}`);
    }
    return parseCalculate(result[0]);
  }

  async readAll(): Promise<Calculate[]> {
    const result = await this.pool
      .query(`SELECT * FROM calculates`)
      .catch((error) => {
        throw error;
      });
    if (result.length === 0) {
      throw new Error(`Calculate Not Found`);
    }
    return parseCalculateList(result);
  }

  async update(replaceData: Calculate): Promise<Calculate> {
    const result = await this.pool
      .query(
        `UPDATE calculates SET game_id = $2, stack = $3, winner_name = $4, winner_rate = $5, winner_is_excluded = $6, loser_name = $7, loser_rate = $8, loser_is_excluded = $9 WHERE calc_id = $1 RETURNING *`,
        [
          replaceData.calcId.toString(),
          replaceData.gameId.toString(),
          replaceData.stack.toString(),
          replaceData.winnerName,
          replaceData.winnerRate.toString(),
          replaceData.winnerIsExcluded.toString(),
          replaceData.loserName,
          replaceData.loserRate.toString(),
          replaceData.loserIsExcluded.toString(),
        ]
      )
      .catch((error) => {
        throw error;
      });
    return parseCalculate(result[0]);
  }

  async delete(id: string): Promise<Calculate> {
    const result = await this.pool
      .query(`DELETE FROM calculates WHERE calc_id = $1 RETURNING *`, [id])
      .catch((error) => {
        throw error;
      });
    return parseCalculate(result[0]);
  }
}

export const calculateController = new CalculateController();
