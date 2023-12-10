import { GatewayIntentBits, Client, Partials, Message } from 'discord.js';
import { Commands } from '../usecase/type/commands';
import { commandPing } from '../adapter/command/ping';

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
    const messageText = message.content.split(' ');
    if (message.author.bot) return;
    if (!messageText[0].startsWith('./')) return;

    switch (messageText[0].slice(2)) {
      // ping
      case Commands.ping.toString(): {
        const replyPing = commandPing();
        message.reply(replyPing);
        break;
      }
      // other commands...
    }
  });

  client.login(process.env.BOT_TOKEN);
};
