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
