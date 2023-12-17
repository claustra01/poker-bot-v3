import { Reply, ReplyType } from '../../domain/types/reply';

export const commandRecalculate = (): Reply => {
  return {
    type: ReplyType.Error,
    errorText: 'Error: Not Implemented',
  };
};
