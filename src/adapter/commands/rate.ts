import { Reply, ReplyType } from '../../usecase/types/reply';
import { playerController } from '../queries/player';

export const commandRate = async (args: string[]): Promise<Reply> => {
  if (args.length !== 2) {
    return {
      type: ReplyType.Error,
      errorText: `Invalid Arguments: PlayerName|DiscordId`,
    };
  }
  try {
    const player = await playerController.readByDiscordOrName(args[1]);
    let replyText = `${
      player.discordId ? player.discordId : player.playerName
    }'s `;
    replyText += `rate: ${player.currentRate}pt `;
    replyText += `(max: ${player.maxRate}pt) / ${player.gameCount}game\n`;
    replyText += `${':first_place:'.repeat(player.firstWinCount)}`;
    replyText += `${':second_place:'.repeat(player.secondWinCount)}`;
    replyText += `${':third_place:'.repeat(player.thirdWinCount)}`;
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
