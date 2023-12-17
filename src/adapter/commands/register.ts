import { NewPlayer } from '../../domain/types/player';
import { Reply, ReplyType } from '../../domain/types/reply';
import { playerController } from '../queries/player';

export const commandRegister = async (args: string[]): Promise<Reply> => {
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
          contentText: `Creation Successful: **${player.playerName}**`,
        };
      } catch (error) {
        return {
          type: ReplyType.Error,
          errorText: `Error: ${error}`,
        };
      }
    }
    // DiscordIdがあるとき
    case 3: {
      if (!args[2].startsWith('<@') || !args[2].endsWith('>')) {
        return {
          type: ReplyType.Error,
          errorText: `Error: Invalid DiscordID: **${args[2]}**`,
        };
      }
      const playerData: NewPlayer = {
        playerName: args[1],
        discordId: args[2],
      };
      try {
        const player = await playerController.create(playerData);
        return {
          type: ReplyType.Text,
          contentText: `Register Successful: **${player.playerName}** / ${player.discordId}`,
        };
      } catch (error) {
        return {
          type: ReplyType.Error,
          errorText: `Error: ${error}`,
        };
      }
    }
    // 構文エラー
    default: {
      return {
        type: ReplyType.Error,
        errorText: `Invalid Arguments: PlayerName, DiscordID (Optional)`,
      };
    }
  }
};
