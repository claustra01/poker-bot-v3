import { Client, GatewayIntentBits, Message, Partials } from 'discord.js';
import { commandHelp } from '../adapter/commands/help';
import { commandLink } from '../adapter/commands/link';
import { commandPing } from '../adapter/commands/ping';
import { commandRanking } from '../adapter/commands/ranking';
import { commandRate } from '../adapter/commands/rate';
import { commandRecalculate } from '../adapter/commands/recalculate';
import { commandRegister } from '../adapter/commands/register';
import { commandResult } from '../adapter/commands/result';
import { commandRollback } from '../adapter/commands/rollback';
import { config } from '../config/config';
import { commands } from '../domain/types/commands';
import { Reply, ReplyType } from '../domain/types/reply';
import { generateReply } from '../usecase/functions/generateReply';

const commandPrefix = config.commandPrefix;
const permittedRole = config.permittedRole;

const checkPermission = (
  message: Message,
  line: number,
  requirePermission: boolean
): boolean => {
  if (!requirePermission) return true;

  try {
    const guild = message.guild;
    const member = guild?.members.cache.get(message.author.id);
    const role = guild?.roles.cache.find((r) => r.name === permittedRole);
    const hasPermission = member?.roles.cache.has(role?.id || '');
    if (!hasPermission) {
      const noPermissionError: Reply = {
        type: ReplyType.Error,
        errorText: 'No Permission',
      };
      const replyText = generateReply(noPermissionError, line);
      message.reply(replyText);
      return false;
    }
    return true;
  } catch {
    const discordClientError: Reply = {
      type: ReplyType.Error,
      errorText: 'Discord Client Error',
    };
    const replyText = generateReply(discordClientError, line);
    message.reply(replyText);
    return false;
  }
};

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
      if (!commandLine.startsWith(commandPrefix)) return;

      const commandText = commandLine.split(' ');
      switch (commandText[0].slice(commandPrefix.length)) {
        // ping
        case commands.ping.name: {
          if (!checkPermission(message, line, commands.ping.requirePermission))
            break;
          const reply = commandPing();
          const replyText = generateReply(reply, line);
          message.reply(replyText);
          break;
        }
        // help
        case commands.help.name: {
          if (!checkPermission(message, line, commands.ping.requirePermission))
            break;
          const reply = commandHelp();
          const replyText = generateReply(reply, line);
          message.reply(replyText);
          break;
        }
        // rate
        case commands.rate.name: {
          if (!checkPermission(message, line, commands.ping.requirePermission))
            break;
          const reply = await commandRate(commandText);
          const replyText = generateReply(reply, line);
          message.reply(replyText);
          break;
        }
        // ranking
        case commands.ranking.name: {
          if (!checkPermission(message, line, commands.ping.requirePermission))
            break;
          const reply = await commandRanking(commandText);
          const replyText = generateReply(reply, line);
          message.reply(replyText);
          break;
        }
        // register
        case commands.register.name: {
          if (
            !checkPermission(message, line, commands.register.requirePermission)
          )
            break;
          const reply = await commandRegister(commandText);
          const replyText = generateReply(reply, line);
          message.reply(replyText);
          break;
        }
        // link
        case commands.link.name: {
          if (!checkPermission(message, line, commands.link.requirePermission))
            break;
          const reply = await commandLink(commandText);
          const replyText = generateReply(reply, line);
          message.reply(replyText);
          break;
        }
        // result
        case commands.result.name: {
          if (!checkPermission(message, line, commands.link.requirePermission))
            break;
          const reply = await commandResult(commandText);
          const replyText = generateReply(reply, line);
          message.reply(replyText);
          break;
        }
        // rollback
        case commands.rollback.name: {
          if (!checkPermission(message, line, commands.link.requirePermission))
            break;
          const reply = await commandRollback(commandText);
          const replyText = generateReply(reply, line);
          message.reply(replyText);
          break;
        }
        // recalculate
        case commands.recalculate.name: {
          if (!checkPermission(message, line, commands.link.requirePermission))
            break;
          const reply = await commandRecalculate();
          const replyText = generateReply(reply, line);
          message.reply(replyText);
          break;
        }
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

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  });

  client.login(process.env.BOT_TOKEN);
};
