import { Reply, ReplyType } from '../domain/reply';

export const commandPing = (): Reply => {
  return {
    type: ReplyType.Text,
    contentText: 'pong',
  };
};
