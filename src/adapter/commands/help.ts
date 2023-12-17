import { Reply, ReplyType } from '../../usecase/types/reply';

export const commandHelp = (): Reply => {
  return {
    type: ReplyType.Error,
    errorText: 'Error: Not Implemented',
  };
};
