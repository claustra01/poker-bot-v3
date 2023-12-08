import { Reply, ReplyType } from '../domain/reply';

export const generateReply = (reply: Reply, line: number): string => {
  switch (reply.type) {
    case ReplyType.Text: {
      return reply.contentText || '';
    }
    case ReplyType.Error: {
      return `## Error: Line ${line + 1}\n` + reply.errorText || '';
    }
  }
};
