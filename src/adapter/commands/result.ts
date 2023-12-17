import { isValid } from 'date-fns';
import { parse } from 'date-fns/fp';
import { Reply, ReplyType } from '../../usecase/types/reply';

const parseDate = parse(new Date(), 'yyyy-MM-dd');

export const commandResult = (args: string[]): Reply => {
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
  const players = args.slice(4);
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
  if (entryCount != players.length) {
    return {
      type: ReplyType.Error,
      errorText: 'Error: entry count and number of players do not match',
    };
  }
  return {
    type: ReplyType.Error,
    errorText: 'Error: Not Implemented',
  };
};
