import { Reply, ReplyType } from '../../application/types/reply';

export const commandRecalculate = (): Reply => {
  return {
    type: ReplyType.Error,
    errorText: 'Error: Not Implemented',
  };
};
