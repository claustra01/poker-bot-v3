export type Calculate = {
  calc_id: number;
  game_id: number;
  winner_name: string;
  winner_rate: number;
  winner_is_excluded: boolean;
  loser_name: string;
  loser_rate: number;
  loser_is_excluded: boolean;
};

export type NewCalculate = {
  game_id: number;
  winner_name: string;
  winner_rate: number;
  winner_is_excluded: boolean;
  loser_name: string;
  loser_rate: number;
  loser_is_excluded: boolean;
};
