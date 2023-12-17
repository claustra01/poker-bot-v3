import { config } from '../../config/config';
import { Reply, ReplyType } from '../../domain/types/reply';

const commandPrefix = config.commandPrefix;

export const commandHelp = (): Reply => {
  let replyText = '## コマンド一覧\n';
  replyText += `\`${commandPrefix}ping\`\n`;
  replyText += `Botがオンラインならレスポンスを返します。\n\n`;
  replyText += `\`${commandPrefix}help\`\n`;
  replyText += `コマンド一覧を表示します。\n\n`;
  replyText += `\`${commandPrefix}rate <識別キー|DiscordID>\`\n`;
  replyText += `プレイヤーのレートと入賞回数を表示します。\n\n`;
  replyText += `\`${commandPrefix}ranking <表示人数>\`\n`;
  replyText += `現在のptランキングを上から表示します。最大10人です。\n\n`;
  replyText += `\`※要権限\` \`${commandPrefix}register <識別キー> <DiscordID(Optional)>\`\n`;
  replyText += `プレイヤーを新しく登録します。\n\n`;
  replyText += `\`※要権限\` \`${commandPrefix}link <識別キー> <DiscordID>\`\n`;
  replyText += `プレイヤーとDiscordIDを紐付けます。\n\n`;
  replyText += `\`※要権限\` \`${commandPrefix}result <日付(format:YYYY-MM-DD)> <参加人数> <スタック> <1位の人> <2位の人> <3位の人>……\`\n`;
  replyText += `ポーカーの結果を保存し、レートを計算します。\n\n`;
  replyText += `さらに詳しい情報は[GitHubレポジトリ](https://github.com/claustra01/poker-bot-v3)で公開しています。`;
  return {
    type: ReplyType.Text,
    contentText: replyText,
  };
};
