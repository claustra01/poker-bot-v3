import { GatewayIntentBits, Client, Partials, Message } from 'discord.js';
import { Commands } from '../domain/commands';
import { commandPing } from '../adapter/ping';

export const runDiscordBot = () => {
  const client = new Client({
    intents: [
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
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

    commandLines.forEach((commandLine) => {
      if (!commandLine.startsWith('./')) return;

      const commandText = commandLine.split(' ');
      switch (commandText[0].slice(2)) {
        // ping
        case Commands.ping.toString(): {
          const replyPing = commandPing();
          message.reply(replyPing);
          break;
        }
        // other commands...
      }
    });
  });

  client.login(process.env.BOT_TOKEN);
};
