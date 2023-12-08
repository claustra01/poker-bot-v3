export enum ReplyType {
  Text,
  Error,
}

export type Reply = {
  type: ReplyType;
  contentText?: string;
  errorText?: string;
};
