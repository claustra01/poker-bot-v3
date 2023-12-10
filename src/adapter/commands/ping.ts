import { Reply, ReplyType } from '../../usecase/types/reply';

export const commandPing = (): Reply => {
  return {
    type: ReplyType.Text,
    contentText: 'pong',
  };
};
