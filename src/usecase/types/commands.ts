export interface Command {
  name: string;
  requirePermission: boolean;
}

export const enum CommandList {
  ping = 'ping',
  newplayer = 'newplayer',
}

export const commands: Record<CommandList, Command> = {
  ping: {
    name: 'ping',
    requirePermission: false,
  },
  newplayer: {
    name: 'newplayer',
    requirePermission: false,
  },
};
