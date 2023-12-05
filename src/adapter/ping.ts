import { Message } from 'discord.js';

export const commandPing = (message: Message) => {
  message.reply('pong');
};
