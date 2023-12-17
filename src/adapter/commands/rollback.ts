import { Reply, ReplyType } from '../../domain/types/reply';

export const commandRollback = (args: string[]): Reply => {
  console.log(args);
  return {
    type: ReplyType.Error,
    errorText: 'Error: Not Implemented',
  };
};
