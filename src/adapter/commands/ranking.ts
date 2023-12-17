import { Reply, ReplyType } from '../../domain/types/reply';
import { playerController } from '../queries/player';

export const commandRanking = async (args: string[]): Promise<Reply> => {
  if (args.length !== 2) {
    return {
      type: ReplyType.Error,
      errorText: `Invalid Arguments: MaxRange`,
    };
  }
  const maxRange = parseInt(args[1]);
  if (isNaN(maxRange)) {
    return {
      type: ReplyType.Error,
      errorText: `Error: MaxRange is not a number`,
    };
  }
  if (maxRange < 1 || maxRange > 10) {
    return {
      type: ReplyType.Error,
      errorText: `Error: MaxRange must be between 1 and 10`,
    };
  }
  try {
    const players = await playerController.readRanking(maxRange);
    let replyText = '';
    players.forEach((player, index) => {
      replyText += `**${index + 1}**. ${
        player.discordId ? player.discordId : player.playerName
      }: `;
      replyText += `**${player.currentRate}**pt\n`;
    });
    return {
      type: ReplyType.Text,
      contentText: replyText,
    };
  } catch (error) {
    return {
      type: ReplyType.Error,
      errorText: `${error}`,
    };
  }
};
