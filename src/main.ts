import express from 'express';
import dotenv from 'dotenv';
import { runDiscordBot } from './infrastructure/discord';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  runDiscordBot();
});
