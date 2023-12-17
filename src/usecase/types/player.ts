export type Player = {
  playerName: string;
  discordId?: string;
  currentRate: number;
  maxRate: number;
  gameCount: number;
  firstWinCount: number;
  secondWinCount: number;
  thirdWinCount: number;
};

export type NewPlayer = {
  playerName: string;
  discordId?: string;
};

export type PlayerObj = Record<string, Player>;
