import express from 'express';
import dotenv from 'dotenv';
import { runDiscordBot } from './infrastructure/discord';
import { config } from './config/config';
import { PgPool } from './infrastructure/postgres';

dotenv.config();
config.load();

const pool = new PgPool();
pool.connect();

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  runDiscordBot();
});
