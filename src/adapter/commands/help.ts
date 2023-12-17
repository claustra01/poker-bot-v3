import { Reply, ReplyType } from '../../application/types/reply';

export const commandHelp = (): Reply => {
  return {
    type: ReplyType.Error,
    errorText: 'Error: Not Implemented',
  };
};
