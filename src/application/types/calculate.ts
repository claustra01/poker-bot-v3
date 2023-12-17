export type Calculate = {
  calcId: number;
  gameId: number;
  stack: number;
  winnerName: string;
  winnerRate: number;
  winnerIsExcluded: boolean;
  loserName: string;
  loserRate: number;
  loserIsExcluded: boolean;
};

export type NewCalculate = {
  gameId: number;
  stack: number;
  winnerName: string;
  winnerRate: number;
  winnerIsExcluded: boolean;
  loserName: string;
  loserRate: number;
  loserIsExcluded: boolean;
};
