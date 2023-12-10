import { Reply, ReplyType } from '../../usecase/type/reply';

export const commandPing = (): Reply => {
  return {
    type: ReplyType.Text,
    contentText: 'pong',
  };
};
