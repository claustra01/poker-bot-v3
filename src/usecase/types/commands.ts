export interface Command {
  name: string;
  requirePermission: boolean;
}

export const enum CommandList {
  ping = 'ping',
  help = 'help',
  rate = 'rate',
  ranking = 'ranking',
  register = 'register',
  link = 'link',
  result = 'result',
  rollback = 'rollback',
  recalculate = 'recalculate',
}

export const commands: Record<CommandList, Command> = {
  ping: {
    name: 'ping',
    requirePermission: false,
  },
  help: {
    name: 'help',
    requirePermission: false,
  },
  rate: {
    name: 'rate',
    requirePermission: false,
  },
  ranking: {
    name: 'ranking',
    requirePermission: false,
  },
  register: {
    name: 'register',
    requirePermission: true,
  },
  link: {
    name: 'link',
    requirePermission: true,
  },
  result: {
    name: 'result',
    requirePermission: true,
  },
  rollback: {
    name: 'rollback',
    requirePermission: true,
  },
  recalculate: {
    name: 'recalculate',
    requirePermission: true,
  },
};
