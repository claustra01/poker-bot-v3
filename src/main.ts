import dotenv from 'dotenv';
import express from 'express';
import { calculateController } from './adapter/queries/calculate';
import { gameController } from './adapter/queries/game';
import { playerController } from './adapter/queries/player';
import { config } from './config/config';
import { runDiscordBot } from './infrastructure/discord';
import { PgPool } from './infrastructure/postgres';

dotenv.config();
config.load();

const pool = new PgPool();
pool.connect();
playerController.setPool(pool);
gameController.setPool(pool);
calculateController.setPool(pool);

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  runDiscordBot();
});
