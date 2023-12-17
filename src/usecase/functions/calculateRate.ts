import { config } from '../../config/config';
import { Calculate } from '../types/calculate';
import { Player } from '../types/player';

const BaseWeightedCoefficient = config.BaseWeightedCoefficient;
const StackWeightedCoefficient = config.StackWeightedCoefficient;

const log100 = (x: number): number => {
  return Math.log(x) / Math.log(100);
};

const calculateDiff = (calc: Calculate): number => {
  const baseDiff =
    1 / (1 + Math.pow(10, (calc.winnerRate - calc.loserRate) / 400));
  return (
    baseDiff *
    BaseWeightedCoefficient *
    Math.pow(log100(calc.stack), StackWeightedCoefficient)
  );
};

const roundRate = (
  playerObj: Record<string, Player>
): Record<string, Player> => {
  Object.values(playerObj).forEach((player) => {
    player.currentRate = Math.round(player.currentRate);
    player.maxRate = Math.max(player.currentRate, player.maxRate);
    player.gameCount++;
  });
  return playerObj;
};

export const calculateRate = (
  playerObj: Record<string, Player>,
  calcList: Calculate[]
): Record<string, Player> => {
  let gameCount = calcList[0].gameId;
  calcList.forEach((calc) => {
    if (calc.gameId !== gameCount) {
      playerObj = roundRate(playerObj);
      gameCount = calc.gameId;
    }
    const diff = calculateDiff(calcList[0]);
    if (!calc.winnerIsExcluded) {
      playerObj[calc.winnerName].currentRate += diff;
    }
    if (!calc.loserIsExcluded) {
      playerObj[calc.loserName].currentRate -= diff;
    }
  });
  playerObj = roundRate(playerObj);
  return playerObj;
};
