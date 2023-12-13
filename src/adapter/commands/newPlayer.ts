import { NewPlayer } from '../../usecase/types/player';
import { Reply, ReplyType } from '../../usecase/types/reply';
import { playerController } from '../queries/player';

export const commandNewPlayer = async (args: string[]): Promise<Reply> => {
  switch (args.length) {
    // DiscordIdがないとき
    case 2: {
      const playerData: NewPlayer = {
        playerName: args[1],
      };
      try {
        const player = await playerController.create(playerData);
        return {
          type: ReplyType.Text,
          contentText: `Creation Successful: ${player.playerName}`,
        };
      } catch (error) {
        return {
          type: ReplyType.Error,
          errorText: `Creation Failed: ${error}`,
        };
      }
    }
    // DiscordIdがあるとき
    case 3: {
      const playerData: NewPlayer = {
        playerName: args[1],
        discordId: args[2],
      };
      try {
        const player = await playerController.create(playerData);
        return {
          type: ReplyType.Text,
          contentText: `Creation Successful: ${player.playerName} / ${player.discordId}`,
        };
      } catch (error) {
        return {
          type: ReplyType.Error,
          errorText: `Creation Failed: ${error}`,
        };
      }
    }
    // 構文エラー
    default: {
      return {
        type: ReplyType.Error,
        errorText: `Invalid Arguments: PlayerName, DiscordId (Optional)`,
      };
    }
  }
};
