import { PlayerObj } from '../types/player';

export const addMedal = (
  playerObj: PlayerObj,
  firstWinner: string,
  secondWinner: string,
  thirdWinner: string
): PlayerObj => {
  playerObj[firstWinner].firstWinCount++;
  playerObj[secondWinner].secondWinCount++;
  playerObj[thirdWinner].thirdWinCount++;
  return playerObj;
};
