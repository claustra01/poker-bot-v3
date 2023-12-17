import { Reply, ReplyType } from '../../domain/types/reply';

export const commandPing = (): Reply => {
  return {
    type: ReplyType.Text,
    contentText: 'pong',
  };
};
