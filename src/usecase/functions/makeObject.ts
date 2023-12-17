import { Player, PlayerObj } from '../types/player';

export const makePlayerObject = (playerList: Player[]): PlayerObj => {
  const playerObj: PlayerObj = {};
  playerList.forEach((player) => {
    playerObj[player.playerName] = player;
  });
  return playerObj;
};
