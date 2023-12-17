import { Calculate } from '../types/calculate';
import { Game } from '../types/game';
import { Player } from '../types/player';

export const parsePlayer = (rawData: unknown): Player => {
  const data = rawData as {
    player_name: string;
    discord_id?: string;
    current_rate: number;
    max_rate: number;
    game_count: number;
    first_win_count: number;
    second_win_count: number;
    third_win_count: number;
  };
  return {
    playerName: data.player_name,
    discordId: data.discord_id,
    currentRate: data.current_rate,
    maxRate: data.max_rate,
    gameCount: data.game_count,
    firstWinCount: data.first_win_count,
    secondWinCount: data.second_win_count,
    thirdWinCount: data.third_win_count,
  };
};

export const parsePlayerList = (rawData: unknown[]): Player[] => {
  const dataList = rawData as {
    player_name: string;
    discord_id?: string;
    current_rate: number;
    max_rate: number;
    game_count: number;
    first_win_count: number;
    second_win_count: number;
    third_win_count: number;
  }[];
  const playerList: Player[] = [];
  dataList.forEach((data) => {
    playerList.push({
      playerName: data.player_name,
      discordId: data.discord_id,
      currentRate: data.current_rate,
      maxRate: data.max_rate,
      gameCount: data.game_count,
      firstWinCount: data.first_win_count,
      secondWinCount: data.second_win_count,
      thirdWinCount: data.third_win_count,
    });
  });
  return playerList;
};

export const parseGame = (rawData: unknown): Game => {
  const data = rawData as {
    game_id: number;
    entry_count: number;
    stack: number;
    date: Date;
  };
  return {
    gameId: data.game_id,
    entryCount: data.entry_count,
    stack: data.stack,
    date: data.date,
  };
};

export const parseGameList = (rawData: unknown[]): Game[] => {
  const dataList = rawData as {
    game_id: number;
    entry_count: number;
    stack: number;
    date: Date;
  }[];
  const gameList: Game[] = [];
  dataList.forEach((data) => {
    gameList.push({
      gameId: data.game_id,
      entryCount: data.entry_count,
      stack: data.stack,
      date: data.date,
    });
  });
  return gameList;
};

export const parseCalculate = (rawData: unknown): Calculate => {
  const data = rawData as {
    calc_id: number;
    game_id: number;
    winner_name: string;
    winner_rate: number;
    winner_is_excluded: boolean;
    loser_name: string;
    loser_rate: number;
    loser_is_excluded: boolean;
  };
  return {
    calcId: data.calc_id,
    gameId: data.game_id,
    winnerName: data.winner_name,
    winnerRate: data.winner_rate,
    winnerIsExcluded: data.winner_is_excluded,
    loserName: data.loser_name,
    loserRate: data.loser_rate,
    loserIsExcluded: data.loser_is_excluded,
  };
};

export const parseCalculateList = (rawData: unknown[]): Calculate[] => {
  const dataList = rawData as {
    calc_id: number;
    game_id: number;
    winner_name: string;
    winner_rate: number;
    winner_is_excluded: boolean;
    loser_name: string;
    loser_rate: number;
    loser_is_excluded: boolean;
  }[];
  const calculateList: Calculate[] = [];
  dataList.forEach((data) => {
    calculateList.push({
      calcId: data.calc_id,
      gameId: data.game_id,
      winnerName: data.winner_name,
      winnerRate: data.winner_rate,
      winnerIsExcluded: data.winner_is_excluded,
      loserName: data.loser_name,
      loserRate: data.loser_rate,
      loserIsExcluded: data.loser_is_excluded,
    });
  });
  return calculateList;
};
