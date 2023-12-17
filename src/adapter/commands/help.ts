import { Reply, ReplyType } from '../../domain/types/reply';

export const commandHelp = (): Reply => {
  return {
    type: ReplyType.Error,
    errorText: 'Error: Not Implemented',
  };
};
