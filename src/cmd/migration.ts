import dotenv from 'dotenv';
import { PgPool } from '../infrastructure/postgres';
import { config } from '../config/config';

dotenv.config();
const pool = new PgPool();
pool.connect();

pool.query(`DROP TABLE IF EXISTS players CASCADE;`);
pool.query(`DROP TABLE IF EXISTS games CASCADE;`);
pool.query(`DROP TABLE IF EXISTS calculates CASCADE;`);

const queries = `
CREATE TABLE "players" (
  "player_name" VARCHAR(20) PRIMARY KEY,
  "discord_id" VARCHAR(20),
  "current_rate" INTEGER NOT NULL DEFAULT ${config.initialRate},
  "max_rate" INTEGER NOT NULL DEFAULT ${config.initialRate},
  "game_count" INTEGER NOT NULL DEFAULT 0,
  "first_win_count" INTEGER NOT NULL DEFAULT 0,
  "second_win_count" INTEGER NOT NULL DEFAULT 0,
  "third_win_count" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE "games" (
  "game_id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "count" INTEGER NOT NULL,
  "stack" INTEGER NOT NULL,
  "date" VARCHAR(10) NOT NULL
);

CREATE TABLE "calculates" (
  "calc_id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "game_id" INTEGER NOT NULL,
  "winner_name" VARCHAR(20) NOT NULL,
  "winner_rate" INTEGER NOT NULL,
  "winner_is_excluded" BOOLEAN NOT NULL,
  "loser_name" VARCHAR(20) NOT NULL,
  "loser_rate" INTEGER NOT NULL,
  "loser_is_excluded" BOOLEAN NOT NULL
);

ALTER TABLE "calculates" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("game_id");
ALTER TABLE "calculates" ADD FOREIGN KEY ("winner_name") REFERENCES "players" ("player_name");
ALTER TABLE "calculates" ADD FOREIGN KEY ("loser_name") REFERENCES "players" ("player_name");
`;

pool
  .query(queries)
  .then(() => {
    console.log('Migration Successful');
  })
  .catch((error) => {
    console.error('Migration Error:', error);
  })
  .finally(() => {
    pool.close();
  });
