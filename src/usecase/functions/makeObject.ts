import { Player } from '../types/player';

export const makePlayerObject = (
  playerList: Player[]
): Record<string, Player> => {
  const playerObj: Record<string, Player> = {};
  playerList.forEach((player) => {
    playerObj[player.playerName] = player;
  });
  return playerObj;
};
