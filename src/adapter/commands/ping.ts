import { Reply, ReplyType } from '../../application/types/reply';

export const commandPing = (): Reply => {
  return {
    type: ReplyType.Text,
    contentText: 'pong',
  };
};
