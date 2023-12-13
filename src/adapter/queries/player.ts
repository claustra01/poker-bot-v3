import { IController } from '../../usecase/interfaces/controller';
import { IDatabase } from '../../usecase/interfaces/db';
import { NewPlayer, Player } from '../../usecase/types/player';
import {
  parsePlayer,
  parsePlayerList,
} from '../../usecase/functions/parseJson';

export class PlayerController implements IController<Player, NewPlayer> {
  private pool!: IDatabase;

  setPool(pool: IDatabase): void {
    this.pool = pool;
  }

  async create(newData: NewPlayer): Promise<Player> {
    const result = await this.pool
      .query(
        `INSERT INTO players (player_name, discord_id) VALUES ($1, $2) RETURNING *`,
        [newData.playerName, newData.discordId || '']
      )
      .catch((error) => {
        throw error;
      });
    return parsePlayer(result[0]);
  }

  async read(id: string): Promise<Player> {
    const result = await this.pool
      .query(`SELECT * FROM players WHERE player_name = $1`, [id])
      .catch((error) => {
        throw error;
      });
    return parsePlayer(result[0]);
  }

  async readAll(): Promise<Player[]> {
    const result = await this.pool
      .query(`SELECT * FROM players`)
      .catch((error) => {
        throw error;
      });
    return parsePlayerList(result);
  }

  async update(replaceData: Player): Promise<Player> {
    const result = await this.pool
      .query(
        `UPDATE players SET discord_id = $2, current_rate = $3, max_rate = $4, 
      game_count = $5, first_win_count = $6, second_win_count = $7, third_win_count = $8 
      WHERE player_name = $1 RETURNING *`,
        [
          replaceData.playerName,
          replaceData.discordId || '',
          replaceData.currentRate.toString(),
          replaceData.maxRate.toString(),
          replaceData.gameCount.toString(),
          replaceData.firstWinCount.toString(),
          replaceData.secondWinCount.toString(),
          replaceData.thirdWinCount.toString(),
        ]
      )
      .catch((error) => {
        throw error;
      });
    return parsePlayer(result[0]);
  }

  async delete(id: string): Promise<Player> {
    const result = await this.pool
      .query(`DELETE FROM players WHERE player_name = $1 RETURNING *`, [id])
      .catch((error) => {
        throw error;
      });
    return parsePlayer(result[0]);
  }
}

export const playerController = new PlayerController();