import { isValid } from 'date-fns';
import { parse } from 'date-fns/fp';
import { config } from '../../config/config';
import { Calculate, NewCalculate } from '../../usecase/types/calculate';
import { Game, NewGame } from '../../usecase/types/game';
import { Player } from '../../usecase/types/player';
import { Reply, ReplyType } from '../../usecase/types/reply';
import { calculateController } from '../queries/calculate';
import { gameController } from '../queries/game';
import { playerController } from '../queries/player';
import { transactionController } from '../queries/transaction';

const parseDate = parse(new Date(), 'yyyy-MM-dd');

const insertGame = async (newData: NewGame): Promise<Game> => {
  return await gameController
    .create(newData)
    .then((game) => {
      return game;
    })
    .catch((error) => {
      throw error;
    });
};

const insertCalc = async (newData: NewCalculate): Promise<Calculate> => {
  return await calculateController
    .create(newData)
    .then((game) => {
      return game;
    })
    .catch((error) => {
      throw error;
    });
};

const isExcluded = (gameId: number, playerGameCount: number): boolean => {
  const calculatingGameCount = config.calculatingGameCount;
  if (gameId <= 5) return false;
  if (playerGameCount <= calculatingGameCount) return true;
  return false;
};

export const commandResult = async (args: string[]): Promise<Reply> => {
  if (args.length < 8) {
    return {
      type: ReplyType.Error,
      errorText:
        'Invalid Arguments: Date, EntryCount, Stack, Players...(4 or more)',
    };
  }

  const date = args[1];
  const parsedDate = parseDate(date);
  const entryCount = parseInt(args[2]);
  const stack = parseInt(args[3]);
  const playerNameList = args.slice(4);
  const playerList: Player[] = [];
  const calcList: Calculate[] = [];

  // validation
  if (
    !isValid(parsedDate) ||
    date.length !== 10 ||
    parsedDate.getFullYear() < 2000
  ) {
    return {
      type: ReplyType.Error,
      errorText: 'Error: Invalid date format: YYYY-MM-DD',
    };
  }
  if (isNaN(entryCount) || isNaN(stack)) {
    return {
      type: ReplyType.Error,
      errorText: 'Error: entry count and stack must be numbers',
    };
  }
  if (entryCount != playerNameList.length) {
    return {
      type: ReplyType.Error,
      errorText: 'Error: entry count and number of players do not match',
    };
  }
  for (let i = 0; i < playerNameList.length; i++) {
    try {
      const player = await playerController.readByDiscordOrName(
        playerNameList[i]
      );
      playerList.push(player);
    } catch (error) {
      return {
        type: ReplyType.Error,
        errorText: `${error}`,
      };
    }
  }

  // insert data
  try {
    await transactionController.begin();
    const game = await insertGame({
      date,
      entryCount,
      stack,
    });
    for (let i = 0; i < playerList.length - 1; i++) {
      for (let j = 1; j < playerList.length; j++) {
        if (i < j) {
          const calc = await insertCalc({
            gameId: game.gameId,
            stack: game.stack,
            winnerName: playerList[i].playerName,
            winnerRate: playerList[i].currentRate,
            winnerIsExcluded: isExcluded(game.gameId, playerList[i].gameCount),
            loserName: playerList[j].playerName,
            loserRate: playerList[j].currentRate,
            loserIsExcluded: isExcluded(game.gameId, playerList[j].gameCount),
          });
          calcList.push(calc);
        }
      }
    }
    await transactionController.commit();
  } catch (error) {
    await transactionController.rollback();
    return {
      type: ReplyType.Error,
      errorText: `${error}`,
    };
  }

  // calculate rate

  return {
    type: ReplyType.Error,
    contentText: 'Not Implemented',
  };
};
