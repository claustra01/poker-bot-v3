import { isValid } from 'date-fns';
import { parse } from 'date-fns/fp';
import { Player } from '../../usecase/types/player';
import { Reply, ReplyType } from '../../usecase/types/reply';
import { playerController } from '../queries/player';

const parseDate = parse(new Date(), 'yyyy-MM-dd');

export const commandResult = async (args: string[]): Promise<Reply> => {
  if (args.length < 8) {
    return {
      type: ReplyType.Error,
      errorText:
        'Invalid Arguments: Date, EntryCount, Stack, Players...(4 or more)',
    };
  }

  const date = parseDate(args[1]);
  const entryCount = parseInt(args[2]);
  const stack = parseInt(args[3]);
  const playerNameList = args.slice(4);
  const playerList: Player[] = [];

  // validation
  if (!isValid(date) || date.getFullYear() < 2000) {
    return {
      type: ReplyType.Error,
      errorText: 'Error: Invalid date format: YYYY-MM-DD',
    };
  }
  if (isNaN(entryCount) || isNaN(stack)) {
    return {
      type: ReplyType.Error,
      errorText: 'Error: entry count and stack must be numbers',
    };
  }
  if (entryCount != playerNameList.length) {
    return {
      type: ReplyType.Error,
      errorText: 'Error: entry count and number of players do not match',
    };
  }
  for (let i = 0; i < playerNameList.length; i++) {
    try {
      const player = await playerController.readByDiscordOrName(
        playerNameList[i]
      );
      playerList.push(player);
    } catch (error) {
      return {
        type: ReplyType.Error,
        errorText: `${error}`,
      };
    }
  }

  // insert data

  return {
    type: ReplyType.Error,
    errorText: 'Error: Not Implemented',
  };
};
