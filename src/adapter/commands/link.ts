import { Reply, ReplyType } from '../../application/types/reply';
import { playerController } from '../queries/player';

export const commandLink = async (args: string[]): Promise<Reply> => {
  if (args.length !== 3) {
    return {
      type: ReplyType.Error,
      errorText: `Invalid Arguments: PlayerName, DiscordId`,
    };
  }
  try {
    const oldData = await playerController.read(args[1]);
    oldData.discordId = args[2];
    const newData = await playerController.update(oldData);
    return {
      type: ReplyType.Text,
      contentText: `Link Successful: ${newData.playerName} / ${newData.discordId}`,
    };
  } catch (error) {
    return {
      type: ReplyType.Error,
      errorText: `${error}`,
    };
  }
};
