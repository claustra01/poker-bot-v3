import { config } from '../../config/config';
import { Calculate } from '../../domain/types/calculate';
import { PlayerObj } from '../../domain/types/player';

const BaseWeightedCoefficient = config.baseWeightedCoefficient;
const StackWeightedCoefficient = config.stackWeightedCoefficient;

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

const roundRate = (playerObj: PlayerObj): PlayerObj => {
  Object.values(playerObj).forEach((player) => {
    player.currentRate = Math.round(player.currentRate);
    player.maxRate = Math.max(player.currentRate, player.maxRate);
    player.gameCount++;
  });
  return playerObj;
};

export const calculateRate = (
  playerObj: PlayerObj,
  calcList: Calculate[]
): PlayerObj => {
  calcList.forEach((calc) => {
    const diff = calculateDiff(calcList[0]);
    if (
      !calc.loserIsExcluded ||
      (calc.winnerIsExcluded && calc.loserIsExcluded)
    ) {
      playerObj[calc.winnerName].currentRate += diff;
    }
    if (
      !calc.winnerIsExcluded ||
      (calc.winnerIsExcluded && calc.loserIsExcluded)
    ) {
      playerObj[calc.loserName].currentRate -= diff;
    }
  });
  playerObj = roundRate(playerObj);
  return playerObj;
};
