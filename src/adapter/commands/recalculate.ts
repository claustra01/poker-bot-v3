import { Reply, ReplyType } from '../../usecase/types/reply';

export const commandRecalculate = (): Reply => {
  return {
    type: ReplyType.Error,
    errorText: 'Error: Not Implemented',
  };
};
