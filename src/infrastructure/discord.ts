import { GatewayIntentBits, Client, Partials, Message } from 'discord.js';
import { config } from '../config/config';
import { commands } from '../usecase/types/commands';
import { Reply, ReplyType } from '../usecase/types/reply';
import { generateReply } from '../usecase/functions/generateReply';
import { commandPing } from '../adapter/commands/ping';
import { commandRegister } from '../adapter/commands/register';
import { commandLink } from '../adapter/commands/link';

export const runDiscordBot = () => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Message, Partials.Channel],
  });

  client.once('ready', () => {
    console.log('Ready!');
    if (client.user) {
      console.log(client.user.tag);
    }
  });

  client.on('messageCreate', async (message: Message) => {
    const commandLines = message.content.split('\n');
    if (message.author.bot) return;

    for (const [line, commandLine] of commandLines.entries()) {
      const prefix = config.commandPrefix;
      if (!commandLine.startsWith(prefix)) return;

      const commandText = commandLine.split(' ');
      switch (commandText[0].slice(prefix.length)) {
        // ping
        case commands.ping.name: {
          const reply = commandPing();
          const replyText = generateReply(reply, line);
          message.reply(replyText);
          break;
        }
        // register
        case commands.register.name: {
          const reply = await commandRegister(commandText);
          const replyText = generateReply(reply, line);
          message.reply(replyText);
          break;
        }
        // link
        case commands.link.name: {
          const reply = await commandLink(commandText);
          const replyText = generateReply(reply, line);
          message.reply(replyText);
          break;
        }
        // other commands...

        // invalid commands
        default: {
          const invalidCommandError: Reply = {
            type: ReplyType.Error,
            errorText: 'Invalid Command',
          };
          const replyText = generateReply(invalidCommandError, line);
          message.reply(replyText);
          return;
        }
      }
    }
  });

  client.login(process.env.BOT_TOKEN);
};
