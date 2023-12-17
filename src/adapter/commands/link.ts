import { Reply, ReplyType } from '../../domain/types/reply';
import { playerController } from '../queries/player';

export const commandLink = async (args: string[]): Promise<Reply> => {
  if (args.length !== 3) {
    return {
      type: ReplyType.Error,
      errorText: `Invalid Arguments: PlayerName, DiscordID`,
    };
  }
  if (!args[2].startsWith('<@') || !args[2].endsWith('>')) {
    return {
      type: ReplyType.Error,
      errorText: `Error: Invalid DiscordID: **${args[2]}**`,
    };
  }
  try {
    const oldData = await playerController.read(args[1]);
    oldData.discordId = args[2];
    const newData = await playerController.update(oldData);
    return {
      type: ReplyType.Text,
      contentText: `Link Successful: **${newData.playerName}** / ${newData.discordId}`,
    };
  } catch (error) {
    return {
      type: ReplyType.Error,
      errorText: `${error}`,
    };
  }
};
