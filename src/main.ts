import { GatewayIntentBits, Client, Partials, Message } from 'discord.js';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

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
  if (message.author.bot) return;
  if (message.content === '!hello') {
    message.channel.send('Hello!');
  }
});

client.login(process.env.BOT_TOKEN);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
