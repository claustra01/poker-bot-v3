import { Reply, ReplyType } from '../../usecase/types/reply';

export const commandResult = (args: string[]): Reply => {
  console.log(args);
  return {
    type: ReplyType.Error,
    errorText: 'Error: Not Implemented',
  };
};
