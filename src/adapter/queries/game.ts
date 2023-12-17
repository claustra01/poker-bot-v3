import { parseGame, parseGameList } from '../../usecase/functions/parseJson';
import { IController } from '../../usecase/interfaces/controller';
import { IDatabase } from '../../usecase/interfaces/db';
import { Game, NewGame } from '../../usecase/types/game';

export class GameController implements IController<Game, NewGame> {
  private pool!: IDatabase;

  setPool(pool: IDatabase): void {
    this.pool = pool;
  }

  async create(newData: NewGame): Promise<Game> {
    const result = await this.pool
      .query(
        `INSERT INTO games (entry_count, stack, date) VALUES ($1, $2, $3) RETURNING *`,
        [
          newData.entryCount.toString(),
          newData.stack.toString(),
          newData.date.toString(),
        ]
      )
      .catch((error) => {
        throw error;
      });
    return parseGame(result[0]);
  }

  async read(id: string): Promise<Game> {
    const result = await this.pool
      .query(`SELECT * FROM games WHERE game_id = $1`, [id])
      .catch((error) => {
        throw error;
      });
    if (result.length === 0) {
      throw new Error(`Game Not Found: ${id}`);
    }
    return parseGame(result[0]);
  }

  async readAll(): Promise<Game[]> {
    const result = await this.pool
      .query(`SELECT * FROM games`)
      .catch((error) => {
        throw error;
      });
    if (result.length === 0) {
      throw new Error(`Game Not Found`);
    }
    return parseGameList(result);
  }

  async update(replaceData: Game): Promise<Game> {
    const result = await this.pool
      .query(
        `UPDATE games SET entry_count = $2, stack = $3, date = $4 WHERE game_id = $1 RETURNING *`,
        [
          replaceData.gameId.toString(),
          replaceData.entryCount.toString(),
          replaceData.stack.toString(),
          replaceData.date.toString(),
        ]
      )
      .catch((error) => {
        throw error;
      });
    return parseGame(result[0]);
  }

  async delete(id: string): Promise<Game> {
    const result = await this.pool
      .query(`DELETE FROM games WHERE game_id = $1 RETURNING *`, [id])
      .catch((error) => {
        throw error;
      });
    return parseGame(result[0]);
  }
}

export const gameController = new GameController();
